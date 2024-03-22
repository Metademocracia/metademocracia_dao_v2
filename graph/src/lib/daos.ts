import {
  near,
  JSONValue,
  json,
  ipfs,
  log,
  TypedMap,
  Value,
  typeConversion,
  BigDecimal,
  BigInt,
  Bytes,
  JSONValueKind,
} from "@graphprotocol/graph-ts";
import { Proposal, Vote, Dao, Group, Member } from "../../generated/schema";

export default function daos(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  outcome: near.ExecutionOutcome,
  blockHeader: near.BlockHeader
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) return;

  const methodName = action.toFunctionCall().methodName;

  if (methodName == "new") {
    let policy = json
      .try_fromBytes(action.toFunctionCall().args)
      .value.toObject()
      .get("policy");
    if (!policy) return;
    let proposalBond = policy.toObject().get("proposal_bond");
    if (!proposalBond) return;

    let roles = policy.toObject().get("roles");
    if (!roles) return;

    let dao = Dao.load(receipt.receiverId);
    if (!dao) {
      dao = new Dao(receipt.receiverId);
      dao.wallet_dao = receipt.receiverId;
      dao.proposal_actives = BigInt.fromI32(0);
      dao.proposal_total = BigInt.fromI32(0);
      dao.proposal_bond = "";
      dao.proposal_period = "";
      dao.creation_date = BigInt.fromString(
        blockHeader.timestampNanosec.toString()
      );
      dao.total_members = BigInt.fromI32(0);
      dao.owner_id = receipt.receiverId;
      dao.save();
    }

    let membersCount = BigInt.fromI32(0);
    let rolArray = roles.toArray();
    for (let index = 0; index < rolArray.length; index++) {
      let nameRol = rolArray[index].toObject().get("name");
      if (!nameRol) continue;

      let groupId = receipt.receiverId + "|" + index.toString();
      let group = new Group(groupId);
      group.dao = receipt.receiverId;
      group.group = nameRol.toString();
      group.save();

      if (nameRol.toString() === "all" || nameRol.toString() === "Todos")
        continue;

      let kind = rolArray[index].toObject().get("kind");
      if (kind!.kind != JSONValueKind.OBJECT) continue;

      let membersRol = kind!.toObject().get("Group");
      if (!membersRol) continue;

      let members = membersRol.toArray();
      for (let subIndex = 0; subIndex < members.length; subIndex++) {
        membersCount = membersCount.plus(BigInt.fromI32(1));

        let member = new Member(
          receipt.receiverId +
            "|" +
            index.toString() +
            "|" +
            members[subIndex].toString()
        );
        member.dao = receipt.receiverId;
        member.group = groupId;
        member.member = members[subIndex].toString();
        member.votes = BigInt.fromI32(0)
        member.save();
      }
    }

    dao = Dao.load(receipt.receiverId);
    if (dao) {
      dao.total_members = dao.total_members.plus(membersCount);
      dao.save();
    }
  }

  if (methodName == "add_proposal") {
    if (outcome.logs.length > 0) {
      const outcomeLog = outcome.logs[0].toString();

      if (!json.try_fromString(outcomeLog).isOk) return;
      let outcomelogs = json.try_fromString(outcomeLog);
      const jsonObject = outcomelogs.value.toObject();

      if (jsonObject) {
        const id = jsonObject.get("id");
        const title = jsonObject.get("title");
        const description = jsonObject.get("description");
        const kind = jsonObject.get("kind");
        const proposer = jsonObject.get("proposer");
        const submission_time = jsonObject.get("submission_time");
        const status = jsonObject.get("status");
        const creation_date = jsonObject.get("creation_date");
        const link = jsonObject.get("link");

        if (
          !id ||
          !title ||
          !description ||
          !kind ||
          !proposer ||
          !submission_time ||
          !status ||
          !creation_date ||
          !link
        )
          return;

        let idProposalDaos = receipt.receiverId + "|" + id.toString();
        let proposal = Proposal.load(idProposalDaos);
        if (!proposal) {
          const kindAny = json.try_fromString(kind.toString()).value;
          let type_proposal = ""; //kindAny.toString();
          if (kindAny.kind == JSONValueKind.OBJECT) {
            type_proposal = kindAny.toObject().entries[0].key;
          } else {
            type_proposal = kindAny.toString();
          }

          proposal = new Proposal(idProposalDaos);
          proposal.title = title.toString();
          proposal.description = description.toString();
          proposal.proposal_type = type_proposal;
          proposal.proposal_id = BigInt.fromString(id.toString());
          proposal.contract_id = receipt.receiverId;
          proposal.kind = kind.toString();
          proposal.submission_time = BigInt.fromString(
            submission_time.toString()
          );
          proposal.upvote = BigInt.fromI32(0);
          proposal.downvote = BigInt.fromI32(0);
          proposal.proposer = proposer.toString();
          proposal.status = status.toString();
          proposal.creation_date = BigInt.fromString(creation_date.toString());
          proposal.user_creation = receipt.predecessorId;
          proposal.link = link.toString();
          proposal.save();

          let dao = Dao.load(receipt.receiverId);
          if (dao) {
            dao.proposal_actives = dao.proposal_actives.plus(BigInt.fromI32(1));
            dao.proposal_total = dao.proposal_total.plus(BigInt.fromI32(1));

            dao.save();
          }
        }
      }
    }
  }

  if (methodName == "act_proposal") {
    if (outcome.logs.length > 0) {
      const outcomeLog = outcome.logs[0].toString();

      if (!json.try_fromString(outcomeLog).isOk) return;
      let outcomelogs = json.try_fromString(outcomeLog);
      const jsonObject = outcomelogs.value.toObject();

      if (jsonObject) {
        const id = jsonObject.get("id");
        const action = jsonObject.get("action");
        const status = jsonObject.get("status");
        //const memo = jsonObject.get('memo');
        const sender_id = jsonObject.get("sender_id");
        const kind = jsonObject.get("kind");

        if (!id || !action || !status || !sender_id || !kind) return;

        if (
          action.toString() == "Finalize" ||
          action.toString() == "VoteApprove" ||
          action.toString() == "VoteReject" ||
          action.toString() == "Approved"
        ) {
          let proposalIdDaos = receipt.receiverId + "|" + id.toString();
          let proposal = Proposal.load(proposalIdDaos);
          if (proposal) {
            // se verifica que la propuesta se este culminando por primera vez para reducir la cantidad de propuestas
            // activas en la entidad Dao en el campo total_activas
            if (
              proposal.status == "InProgress" &&
              status.toString() != "InProgress"
            ) {
              let dao = Dao.load(receipt.receiverId);
              if (dao) {
                dao.proposal_actives = dao.proposal_actives.minus(
                  BigInt.fromI32(1)
                );

                dao.save();
              }
            }

            //aqui se registra el voto
            let idVote =
              receipt.receiverId +
              "|" +
              id.toString() +
              "|" +
              sender_id.toString();
            let vote = Vote.load(idVote);
            if (!vote) {
              vote = new Vote(idVote);
              vote.proposal = receipt.receiverId + "|" + id.toString();
              vote.user_id = sender_id.toString();
              vote.vote = action.toString();
              vote.date_time = BigInt.fromU64(blockHeader.timestampNanosec);

              if (action.toString() == "VoteApprove") {
                proposal.upvote = proposal.upvote.plus(BigInt.fromI32(1));
              }

              if (action.toString() == "VoteReject") {
                proposal.downvote = proposal.downvote.plus(BigInt.fromI32(1));
              }

              
              for(let i=0; i<10; i++) {
                const memberId = receipt.receiverId + "|" + i.toString() + "|" + sender_id.toString();

                const memberLoad = Member.load(memberId)
                if(memberLoad) {
                  memberLoad.votes = memberLoad.votes.plus(BigInt.fromI32(1));
                  memberLoad.save()
                }
              }

              vote.save();
            }

            //en caso de aprobacion se verifica el typo de propuesta para proceder a realizar las inserciones
            if (status.toString() == "Approved") {
              proposal.approval_date = BigInt.fromU64(
                blockHeader.timestampNanosec
              );

              const kindAny = json.try_fromString(kind.toString()).value;

              if (
                proposal.proposal_type == "RemoveMemberFromRole" ||
                proposal.proposal_type == "AddMemberToRole"
              ) {
                const dataMember = kindAny
                  .toObject()
                  .get(proposal.proposal_type)!
                  .toObject();
                const memberWallet = dataMember.get("member_id")!.toString();
                const rolName = dataMember.get("role")!.toString();
                let rolId = "";
                
                for(let i=0; i<10; i++) {
                  let groupId = receipt.receiverId + "|" + i.toString()
                  const groupLoad = Group.load(groupId)
                  if(groupLoad) {
                    if(groupLoad.group == rolName) {
                      rolId = i.toString()
                      break;
                    }
                  }
                }
                const memberId =
                  receipt.receiverId + "|" + rolId + "|" + memberWallet;

                let verifyMember = Member.load(memberId);
                let dao = Dao.load(receipt.receiverId);

                if (!dao) return;

                if (proposal.proposal_type == "AddMemberToRole") {
                  if (!verifyMember) {
                    let member = new Member(memberId);
                    member.dao = receipt.receiverId;
                    member.group = receipt.receiverId + "|" + rolId;
                    member.member = memberWallet;
                    member.votes = BigInt.fromI32(0);
                    member.save();

                    dao.total_members = dao.total_members.plus(
                      BigInt.fromI32(1)
                    );
                    dao.save();
                  }
                } else if (proposal.proposal_type == "RemoveMemberFromRole") {
                  if (verifyMember) {
                    verifyMember.delete();

                    dao.total_members = dao.total_members.minus(
                      BigInt.fromI32(1)
                    );
                    dao.save();
                  }
                }
              }
            }

            proposal.status = status.toString();
            proposal.save();
          }
        }
      }
    }
  }

  if (methodName == "on_proposal_callback") {
    if (outcome.logs.length > 0) {
      const outcomeLog = outcome.logs[0].toString();

      if (!json.try_fromString(outcomeLog).isOk) return;
      let outcomelogs = json.try_fromString(outcomeLog);
      const jsonObject = outcomelogs.value.toObject();

      if (jsonObject) {
        const id = jsonObject.get("id");
        const status = jsonObject.get("status");
        //const memo = jsonObject.get('memo');
        //const sender_id = jsonObject.get("sender_id");
        //const kind = jsonObject.get("kind");

        if (!id || !status) return;

        let proposalIdDaos = receipt.receiverId + "|" + id.toString();
        let proposal = Proposal.load(proposalIdDaos);
        if (proposal) {
          // se verifica que la propuesta se este culminando por primera vez para reducir la cantidad de propuestas
          // activas en la entidad Dao en el campo total_activas
          if (status.toString() == "Failed") {
            let dao = Dao.load(receipt.receiverId);
            if (dao) {
              dao.proposal_actives = dao.proposal_actives.plus(
                BigInt.fromI32(1)
              );

              dao.save();
            }
          }

          proposal.status = status.toString();
          proposal.save();
        }
      }
    }
  }
}
