// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
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
        `Entities of type Supply must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Supply", id.toString(), this);
    }
  }

  static load(id: string): Supply | null {
    return changetype<Supply | null>(store.get("Supply", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get total_daos(): BigInt {
    let value = this.get("total_daos");
    return value!.toBigInt();
  }

  set total_daos(value: BigInt) {
    this.set("total_daos", Value.fromBigInt(value));
  }

  get total_daos_user(): Array<string> {
    let value = this.get("total_daos_user");
    return value!.toStringArray();
  }

  set total_daos_user(value: Array<string>) {
    this.set("total_daos_user", Value.fromStringArray(value));
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
        `Entities of type Supplyuser must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Supplyuser", id.toString(), this);
    }
  }

  static load(id: string): Supplyuser | null {
    return changetype<Supplyuser | null>(store.get("Supplyuser", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get total_daos(): BigInt {
    let value = this.get("total_daos");
    return value!.toBigInt();
  }

  set total_daos(value: BigInt) {
    this.set("total_daos", Value.fromBigInt(value));
  }

  get supply(): string {
    let value = this.get("supply");
    return value!.toString();
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
        `Entities of type Dao must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Dao", id.toString(), this);
    }
  }

  static load(id: string): Dao | null {
    return changetype<Dao | null>(store.get("Dao", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get wallet_dao(): string {
    let value = this.get("wallet_dao");
    return value!.toString();
  }

  set wallet_dao(value: string) {
    this.set("wallet_dao", Value.fromString(value));
  }

  get owner_id(): string {
    let value = this.get("owner_id");
    return value!.toString();
  }

  set owner_id(value: string) {
    this.set("owner_id", Value.fromString(value));
  }
}