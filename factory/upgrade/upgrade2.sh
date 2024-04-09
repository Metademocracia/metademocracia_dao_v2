#!/bin/bash
#### --------------------------------------------
#### NOTE: The following flows are supported in this file, for testing!
# - deploy factory v2
# - create new DAO
# - create 1-3 proposals
# - upgrade to factory v3 
# - submit DAO code v2 
# - submit DAO metadata v2
# - submit DAO code v3 
# - submit DAO metadata v3
# - upgrade DAO to v3 
# - check if proposals return
#### --------------------------------------------
set -e

# TODO: Change to the official approved commit:
COMMIT_V3=596f27a649c5df3310e945a37a41a957492c0322
# git checkout $COMMIT_V3

# build the things
#./build.sh

export NEAR_ENV=testnet
export FACTORY=testnet

#if [ -z ${NEAR_ACCT+x} ]; then
#  # export NEAR_ACCT=sputnikv2.$FACTORY
#  export NEAR_ACCT=sputnikpm.$FACTORY
#else
#  export NEAR_ACCT=$NEAR_ACCT
#fi

export NEAR_ACCT=$NEAR_ACCT=hpalencia.testnet
export FACTORY_ACCOUNT_ID=factoryv4.metademocracia.testnet
export DAO_ACCOUNT_ID=pruebas12.factoryv4.metademocracia.testnet
#export DAO_ACCOUNT_ID=croncat.sputnikv2.$FACTORY
# export DAO_ACCOUNT_ID=sputnikdao-dev-v2-1645228499.factory3.sputnikpm.testnet
export MAX_GAS=300000000000000
export GAS_100_TGAS=100000000000000
export GAS_150_TGAS=150000000000000


#### --------------------------------------------
#### Get DAO v3 code data & store it in factory
#### --------------------------------------------

http --json post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=query \
params:='{"request_type":"view_code","finality":"final","account_id":"factoryv4.metademocracia.testnet"}' \
| jq -r .result.code_base64 \
| base64 --decode > metadao_dao_v1_1.wasm

V2_BYTES='cat metadao_dao_v1_1.wasm | base64'
near call factoryv4.metademocracia.testnet store $(eval "$V2_BYTES") --base64 --accountId factoryv4.metademocracia.testnet --gas 100000000000000 --amount 10 > v2_code_hash_result.txt

V2_CODE_HASH=$(eval "tail -1 v2_code_hash_result.txt | sed 's/^.//;s/.$//'")
echo "V2 CODE HASH: $V2_CODE_HASH"
near call factoryv4.metademocracia.testnet store_contract_metadata '{"code_hash": "'$V2_CODE_HASH'", "metadata": {"version": [2,0], "commit_id": "596f27a649c5df3310e945a37a41a957492c0322"}, "set_default": true}' --accountId factoryv4.metademocracia.testnet

near view factoryv4.metademocracia.testnet get_contracts_metadata

echo "Upgrade V3 CODE HASH: $V2_CODE_HASH"

near call pruebas12.factoryv4.metademocracia.testnet add_proposal '{"proposal": {"title": "actualizacion", "description": "Upgrade to v3", "kind": { "UpgradeSelf": { "hash": "'$V2_CODE_HASH'" } }, "link": "" } }' --accountId hpalencia.testnet --depositYocto 200000000000000000000000



rm metadao_dao_v1_1.wasm
rm v3_code_hash_result.txt

echo "Dev Factory Deploy & Test Complete"




# near deploy factoryv4.metademocracia.testnet target/wasm32-unknown-unknown/release/metadao_factory.wasm --force

# near call factoryv4.metademocracia.testnet pruebas '{"commit_id": "596f27a649c5df3310e945a37a41a957492c0322"}' --accountId factoryv4.metademocracia.testnet --gas 100000000000000

# near call factoryv4.metademocracia.testnet insert_dao_list '{"account_id": "pruebas12.factoryv4.metademocracia.testnet"}' --accountId factoryv4.metademocracia.testnet

# near view factoryv4.metademocracia.testnet get_dao_list