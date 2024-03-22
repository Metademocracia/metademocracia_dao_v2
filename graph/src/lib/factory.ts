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
  bigInt,
} from "@graphprotocol/graph-ts";
import { Supply, Dao, Supplyuser } from "../../generated/schema";

export default function factory(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  outcome: near.ExecutionOutcome,
  blockHeader: near.BlockHeader
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) return;

  const methodName = action.toFunctionCall().methodName;

  if (methodName == "on_create") {
    if (outcome.logs.length > 0) {
      const outcomeLog = outcome.logs[0].toString();

      if (!json.try_fromString(outcomeLog).isOk) return;
      let outcomelogs = json.try_fromString(outcomeLog);
      const jsonObject = outcomelogs.value.toObject();

      if (jsonObject) {
        const wallet_dao = jsonObject.get("wallet_dao");
        const owner_id = jsonObject.get("owner_id");

        if (!wallet_dao || !owner_id) return;

        let dao = Dao.load(wallet_dao.toString());
        if (dao) {
          let supply = Supply.load("1");
          if (!supply) {
            supply = new Supply("1");
            supply.total_daos = BigInt.fromI32(0);
          }
          supply.total_daos = supply.total_daos.plus(BigInt.fromI32(1));
          supply.save();

          let supply_user = Supplyuser.load(owner_id.toString());
          if (!supply_user) {
            supply_user = new Supplyuser(owner_id.toString());
            supply_user.supply = "1";
            supply_user.total_daos = BigInt.fromI32(0);
          }
          supply_user.total_daos = supply_user.total_daos.plus(
            BigInt.fromI32(1)
          );
          supply_user.save();
            
        } else {
          dao = new Dao(wallet_dao.toString());
          dao.wallet_dao = wallet_dao.toString();
          dao.proposal_actives = BigInt.fromI32(0);
          dao.proposal_total = BigInt.fromI32(0);
          dao.proposal_bond = "";
          dao.proposal_period = "";
          dao.creation_date = BigInt.fromString(blockHeader.timestampNanosec.toString());
          dao.total_members = BigInt.fromI32(0);
        }
        dao.owner_id = owner_id.toString();
        dao.save();
      }
    }
  }
}
