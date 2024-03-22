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

import { Delegation, Prueba } from "../../generated/schema";
import { includeAcount } from "./config";

export default function nearToken(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader
): void {
  if (action.kind != near.ActionKind.TRANSFER) return;

  const deposit = action.toTransfer().deposit;
  const id_delegation = receipt.id.toBase58();

  //entradas
  if (
    receipt.receiverId.includes(includeAcount) &&
    receipt.predecessorId != "system"
  ) {
    let delegation = Delegation.load(id_delegation);
    if (!delegation) {
      delegation = new Delegation(id_delegation);
      delegation.receipt_id = id_delegation;
      delegation.contract_id = receipt.receiverId;
      delegation.type_transfer = "Entrada";
      delegation.token_id = "NEAR";
      delegation.date_time = BigInt.fromU64(blockHeader.timestampNanosec);
      delegation.predecessor_id = receipt.predecessorId;
      delegation.receiver_id = receipt.receiverId;
      delegation.token_decimals = BigInt.fromI32(24);
      delegation.amount = deposit;

      delegation.save();
    }
  }

  //salidas
  if(receipt.predecessorId.includes(includeAcount)){
    let delegation = Delegation.load(id_delegation);
    if (!delegation) {
      delegation = new Delegation(id_delegation);
      delegation.receipt_id = id_delegation;
      delegation.contract_id = receipt.predecessorId;
      delegation.type_transfer = "Salida";
      delegation.token_id = "NEAR";
      delegation.date_time = BigInt.fromU64(blockHeader.timestampNanosec);
      delegation.predecessor_id = receipt.predecessorId;
      delegation.receiver_id = receipt.receiverId;
      delegation.token_decimals = BigInt.fromI32(24);
      delegation.amount = deposit;

      delegation.save();
    }
  }
}
