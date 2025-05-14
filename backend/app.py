from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import hashlib
from blockchain import store_document_hash, verify_document_hash
from ipfs import upload_to_ipfs
from ocr import extract_text_textract  # ✅ Use only Amazon Textract

app = Flask(__name__)
CORS(app)

@app.route('/uploadDocument', methods=['POST'])
def upload_document():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    file = request.files['file']
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    # Extract text using only Amazon Textract
    extracted_text = extract_text_textract(file_path)

    if not extracted_text or "Error" in extracted_text:
        return jsonify({"error": "Amazon Textract failed to extract text"}), 500

    # Generate hash from extracted text
    doc_hash = hashlib.sha256(extracted_text.encode()).hexdigest()

    # Store hash on Blockchain
    blockchain_txn = store_document_hash(doc_hash)

    # Upload document to IPFS
    ipfs_hash = upload_to_ipfs(file_path)

    return jsonify({
        "doc_hash": doc_hash,
        "blockchain_txn": blockchain_txn,
        "ipfs_hash": ipfs_hash,
        "extracted_text": extracted_text  # ✅ Print Textract output on screen
    })

@app.route('/verifyDocument', methods=['GET'])
def verify_document():
    doc_hash = request.args.get("doc_hash")
    verified = verify_document_hash(doc_hash)
    return jsonify({"verified": verified})

if __name__ == '__main__':
    app.run(debug=True)
