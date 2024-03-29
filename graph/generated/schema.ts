// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Supply extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Supply entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Supply must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Supply", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Supply | null {
    return changetype<Supply | null>(store.get_in_block("Supply", id));
  }

  static load(id: string): Supply | null {
    return changetype<Supply | null>(store.get("Supply", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get total_daos(): BigInt {
    let value = this.get("total_daos");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set total_daos(value: BigInt) {
    this.set("total_daos", Value.fromBigInt(value));
  }

  get total_daos_user(): SupplyuserLoader {
    return new SupplyuserLoader(
      "Supply",
      this.get("id")!.toString(),
      "total_daos_user",
    );
  }
}

export class Supplyuser extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Supplyuser entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Supplyuser must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Supplyuser", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Supplyuser | null {
    return changetype<Supplyuser | null>(store.get_in_block("Supplyuser", id));
  }

  static load(id: string): Supplyuser | null {
    return changetype<Supplyuser | null>(store.get("Supplyuser", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get total_daos(): BigInt {
    let value = this.get("total_daos");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set total_daos(value: BigInt) {
    this.set("total_daos", Value.fromBigInt(value));
  }

  get supply(): string {
    let value = this.get("supply");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set supply(value: string) {
    this.set("supply", Value.fromString(value));
  }
}

export class Dao extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Dao entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Dao must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Dao", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Dao | null {
    return changetype<Dao | null>(store.get_in_block("Dao", id));
  }

  static load(id: string): Dao | null {
    return changetype<Dao | null>(store.get("Dao", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get wallet_dao(): string {
    let value = this.get("wallet_dao");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set wallet_dao(value: string) {
    this.set("wallet_dao", Value.fromString(value));
  }

  get owner_id(): string {
    let value = this.get("owner_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set owner_id(value: string) {
    this.set("owner_id", Value.fromString(value));
  }

  get proposal_actives(): BigInt {
    let value = this.get("proposal_actives");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set proposal_actives(value: BigInt) {
    this.set("proposal_actives", Value.fromBigInt(value));
  }

  get proposal_total(): BigInt {
    let value = this.get("proposal_total");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set proposal_total(value: BigInt) {
    this.set("proposal_total", Value.fromBigInt(value));
  }

  get proposal_bond(): string | null {
    let value = this.get("proposal_bond");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set proposal_bond(value: string | null) {
    if (!value) {
      this.unset("proposal_bond");
    } else {
      this.set("proposal_bond", Value.fromString(<string>value));
    }
  }

  get proposal_period(): string | null {
    let value = this.get("proposal_period");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set proposal_period(value: string | null) {
    if (!value) {
      this.unset("proposal_period");
    } else {
      this.set("proposal_period", Value.fromString(<string>value));
    }
  }

  get total_members(): BigInt {
    let value = this.get("total_members");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set total_members(value: BigInt) {
    this.set("total_members", Value.fromBigInt(value));
  }

  get creation_date(): BigInt {
    let value = this.get("creation_date");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set creation_date(value: BigInt) {
    this.set("creation_date", Value.fromBigInt(value));
  }

  get groups(): GroupLoader {
    return new GroupLoader("Dao", this.get("id")!.toString(), "groups");
  }

  get members(): MemberLoader {
    return new MemberLoader("Dao", this.get("id")!.toString(), "members");
  }
}

export class Group extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Group entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Group must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Group", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Group | null {
    return changetype<Group | null>(store.get_in_block("Group", id));
  }

  static load(id: string): Group | null {
    return changetype<Group | null>(store.get("Group", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dao(): string {
    let value = this.get("dao");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set dao(value: string) {
    this.set("dao", Value.fromString(value));
  }

  get group(): string {
    let value = this.get("group");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set group(value: string) {
    this.set("group", Value.fromString(value));
  }

  get members(): MemberLoader {
    return new MemberLoader("Group", this.get("id")!.toString(), "members");
  }
}

export class Member extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Member entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Member must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Member", id.toString(), this);
    }
  }

  delete(): void {
    let id = this.get("id");
    assert(id != null, "Cannot delete Member entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Member must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.remove("Member", id.toString());
    }
  }

  static loadInBlock(id: string): Member | null {
    return changetype<Member | null>(store.get_in_block("Member", id));
  }

  static load(id: string): Member | null {
    return changetype<Member | null>(store.get("Member", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dao(): string {
    let value = this.get("dao");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set dao(value: string) {
    this.set("dao", Value.fromString(value));
  }

  get group(): string {
    let value = this.get("group");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set group(value: string) {
    this.set("group", Value.fromString(value));
  }

  get member(): string {
    let value = this.get("member");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set member(value: string) {
    this.set("member", Value.fromString(value));
  }

  get votes(): BigInt {
    let value = this.get("votes");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set votes(value: BigInt) {
    this.set("votes", Value.fromBigInt(value));
  }

}

export class Proposal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Proposal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Proposal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Proposal", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Proposal | null {
    return changetype<Proposal | null>(store.get_in_block("Proposal", id));
  }

  static load(id: string): Proposal | null {
    return changetype<Proposal | null>(store.get("Proposal", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proposal_id(): BigInt {
    let value = this.get("proposal_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set proposal_id(value: BigInt) {
    this.set("proposal_id", Value.fromBigInt(value));
  }

  get title(): string {
    let value = this.get("title");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get contract_id(): string {
    let value = this.get("contract_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set contract_id(value: string) {
    this.set("contract_id", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get proposal_type(): string {
    let value = this.get("proposal_type");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set proposal_type(value: string) {
    this.set("proposal_type", Value.fromString(value));
  }

  get kind(): string {
    let value = this.get("kind");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set kind(value: string) {
    this.set("kind", Value.fromString(value));
  }

  get proposer(): string {
    let value = this.get("proposer");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set proposer(value: string) {
    this.set("proposer", Value.fromString(value));
  }

  get submission_time(): BigInt {
    let value = this.get("submission_time");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set submission_time(value: BigInt) {
    this.set("submission_time", Value.fromBigInt(value));
  }

  get upvote(): BigInt {
    let value = this.get("upvote");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set upvote(value: BigInt) {
    this.set("upvote", Value.fromBigInt(value));
  }

  get downvote(): BigInt {
    let value = this.get("downvote");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set downvote(value: BigInt) {
    this.set("downvote", Value.fromBigInt(value));
  }

  get vote(): VoteLoader {
    return new VoteLoader("Proposal", this.get("id")!.toString(), "vote");
  }

  get status(): string {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get approval_date(): BigInt | null {
    let value = this.get("approval_date");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set approval_date(value: BigInt | null) {
    if (!value) {
      this.unset("approval_date");
    } else {
      this.set("approval_date", Value.fromBigInt(<BigInt>value));
    }
  }

  get creation_date(): BigInt {
    let value = this.get("creation_date");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set creation_date(value: BigInt) {
    this.set("creation_date", Value.fromBigInt(value));
  }

  get user_creation(): string {
    let value = this.get("user_creation");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set user_creation(value: string) {
    this.set("user_creation", Value.fromString(value));
  }

  get link(): string {
    let value = this.get("link");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set link(value: string) {
    this.set("link", Value.fromString(value));
  }
}

export class Vote extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Vote entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Vote must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Vote", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Vote | null {
    return changetype<Vote | null>(store.get_in_block("Vote", id));
  }

  static load(id: string): Vote | null {
    return changetype<Vote | null>(store.get("Vote", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proposal(): string {
    let value = this.get("proposal");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set proposal(value: string) {
    this.set("proposal", Value.fromString(value));
  }

  get user_id(): string {
    let value = this.get("user_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set user_id(value: string) {
    this.set("user_id", Value.fromString(value));
  }

  get vote(): string {
    let value = this.get("vote");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set vote(value: string) {
    this.set("vote", Value.fromString(value));
  }

  get date_time(): BigInt {
    let value = this.get("date_time");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set date_time(value: BigInt) {
    this.set("date_time", Value.fromBigInt(value));
  }
}

export class Delegation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Delegation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Delegation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Delegation", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Delegation | null {
    return changetype<Delegation | null>(store.get_in_block("Delegation", id));
  }

  static load(id: string): Delegation | null {
    return changetype<Delegation | null>(store.get("Delegation", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get receipt_id(): string {
    let value = this.get("receipt_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set receipt_id(value: string) {
    this.set("receipt_id", Value.fromString(value));
  }

  get contract_id(): string {
    let value = this.get("contract_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set contract_id(value: string) {
    this.set("contract_id", Value.fromString(value));
  }

  get token_id(): string {
    let value = this.get("token_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set token_id(value: string) {
    this.set("token_id", Value.fromString(value));
  }

  get token_decimals(): BigInt {
    let value = this.get("token_decimals");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set token_decimals(value: BigInt) {
    this.set("token_decimals", Value.fromBigInt(value));
  }

  get date_time(): BigInt {
    let value = this.get("date_time");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set date_time(value: BigInt) {
    this.set("date_time", Value.fromBigInt(value));
  }

  get predecessor_id(): string {
    let value = this.get("predecessor_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set predecessor_id(value: string) {
    this.set("predecessor_id", Value.fromString(value));
  }

  get receiver_id(): string {
    let value = this.get("receiver_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set receiver_id(value: string) {
    this.set("receiver_id", Value.fromString(value));
  }

  get type_transfer(): string {
    let value = this.get("type_transfer");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set type_transfer(value: string) {
    this.set("type_transfer", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class Prueba extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Prueba entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Prueba must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Prueba", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Prueba | null {
    return changetype<Prueba | null>(store.get_in_block("Prueba", id));
  }

  static load(id: string): Prueba | null {
    return changetype<Prueba | null>(store.get("Prueba", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get data1(): string {
    let value = this.get("data1");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set data1(value: string) {
    this.set("data1", Value.fromString(value));
  }

  get data2(): string {
    let value = this.get("data2");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set data2(value: string) {
    this.set("data2", Value.fromString(value));
  }

  get data3(): string {
    let value = this.get("data3");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set data3(value: string) {
    this.set("data3", Value.fromString(value));
  }
}

export class SupplyuserLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): Supplyuser[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<Supplyuser[]>(value);
  }
}

export class GroupLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): Group[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<Group[]>(value);
  }
}

export class MemberLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): Member[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<Member[]>(value);
  }
}

export class VoteLoader extends Entity {
  _entity: string;
  _field: string;
  _id: string;

  constructor(entity: string, id: string, field: string) {
    super();
    this._entity = entity;
    this._id = id;
    this._field = field;
  }

  load(): Vote[] {
    let value = store.loadRelated(this._entity, this._id, this._field);
    return changetype<Vote[]>(value);
  }
}
