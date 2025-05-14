from web3 import Web3
import json
import os
import hashlib

# Connect to Ganache Local Blockchain
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))

contract_address = "0x548861B24168Ca36Da125cE687075681E723A7fa"  # Replace with actual contract address

# Load Contract ABI
abi_path = os.path.join(os.path.dirname(__file__), "contract_abi.json")
with open(abi_path, "r") as f:
    contract_abi = json.load(f)["abi"]

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

def store_document_hash(doc_hash):
    """Stores document hash on blockchain"""
    try:
        txn = contract.functions.storeHash(doc_hash).build_transaction({
            'from': w3.eth.accounts[0],  # ✅ Ensure correct sender
            'nonce': w3.eth.get_transaction_count(w3.eth.accounts[0]),
            'gas': 3000000
        })
        signed_txn = w3.eth.account.sign_transaction(txn, private_key="0x280a22256e8cfa026d3d7b2c6c44030fdc005161996ecad45d823da1743c5aed")
        txn_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)  # ✅ Corrected attribute
        return txn_hash.hex()
    except Exception as e:
        print(f"Blockchain store error: {e}")
        return None

def verify_document_hash(doc_hash):
    """Verifies document hash on blockchain"""
    try:
        result = contract.functions.verifyDocument(doc_hash).call()  # ✅ No hashing needed
        return result
    except Exception as e:
        print(f"Blockchain verification error: {e}")
        return False


