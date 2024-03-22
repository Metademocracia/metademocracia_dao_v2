import { near } from "@graphprotocol/graph-ts";

import Daos from "./lib/daos";
import Factory from "./lib/factory";
import NearToken from "./lib/near_token";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i],
      receipt.receipt,
      receipt.outcome,
      receipt.block.header
    );
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  outcome: near.ExecutionOutcome,
  blockHeader: near.BlockHeader
): void {
  Factory(action, receipt, outcome, blockHeader);

  Daos(action, receipt, outcome, blockHeader);

  NearToken(action, receipt, blockHeader);
}
