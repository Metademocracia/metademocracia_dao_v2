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
} from "@graphprotocol/graph-ts";
import { Delegation } from "../../generated/schema";

import { includeAcount } from "./config";
//const includeAcount = "factoryv4.metademocracia.testnet";

export default function tokens(
  tokenId: string,
  decimals: string,
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  outcome: near.ExecutionOutcome,
  blockHeader: near.BlockHeader
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) return;

  const methodName = action.toFunctionCall().methodName;

  if (methodName == "ft_transfer" || methodName == "ft_transfer_call") {
    if (outcome.logs.length > 0) {
      for (let index = 0; index < outcome.logs.length; index++) {
        //obtenemos la primera iteracion del log
        const outcomeLog = outcome.logs[index].toString();

        if (!outcomeLog.includes("EVENT_JSON:")) return;

        const parsed = outcomeLog.replace("EVENT_JSON:", "");

        //convirtiendo el log en un objeto ValueJSON
        let outcomelogs = json.try_fromString(parsed);

        //validamos que se cree un objeto tipo ValueJSON valido a partir del log capturado
        if (!outcomelogs.isOk) return;

        const jsonlog = outcomelogs.value.toObject();
        const eventData = jsonlog.get("data");

        if (!eventData) return;

        const eventArray: JSONValue[] = eventData.toArray();

        const data = eventArray[0].toObject();
        const new_owner_id = data.get("new_owner_id");
        const amount = data.get("amount");
        const old_owner_id = data.get("old_owner_id");

        if (!new_owner_id || !amount || !old_owner_id) return;

        let id_delegation = receipt.id.toBase58();

        //entradas
        if (new_owner_id.toString().includes(includeAcount)) {
          let delegation = Delegation.load(id_delegation);
          if (!delegation) {
            delegation = new Delegation(id_delegation);
            delegation.receipt_id = id_delegation;
            delegation.contract_id = new_owner_id.toString();
            delegation.type_transfer = "Entrada";
            delegation.token_id = tokenId;
            delegation.date_time = BigInt.fromU64(blockHeader.timestampNanosec);
            delegation.predecessor_id = old_owner_id.toString();
            delegation.receiver_id = new_owner_id.toString();
            delegation.token_decimals = BigInt.fromString(decimals);
            delegation.amount = BigInt.fromString(amount.toString());

            delegation.save();
          }
        }

        //salidas
        if (old_owner_id.toString().includes(includeAcount)) {
          let delegation = Delegation.load(id_delegation);
          if (!delegation) {
            delegation = new Delegation(id_delegation);
            delegation.receipt_id = id_delegation;
            delegation.contract_id = old_owner_id.toString();
            delegation.type_transfer = "Salida";
            delegation.token_id = tokenId;
            delegation.date_time = BigInt.fromU64(blockHeader.timestampNanosec);
            delegation.predecessor_id = old_owner_id.toString();
            delegation.receiver_id = new_owner_id.toString();
            delegation.token_decimals = BigInt.fromString(decimals);
            delegation.amount = BigInt.fromString(amount.toString());

            delegation.save();
          }
        }
      }
    }
  }
}
