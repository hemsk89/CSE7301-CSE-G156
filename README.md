AI & Blockchain-based Document Verification System

Overview

This project provides a secure and decentralized solution for verifying documents using AI-powered OCR (Amazon Textract), blockchain (Ethereum with Ganache), and decentralized storage (IPFS). The system ensures document authenticity and integrity.

Features

AI Text Extraction: Uses Amazon Textract to extract text from uploaded documents.

Blockchain Integration: Document hashes are stored and verified using Ethereum smart contracts.

IPFS Storage: Documents are uploaded and stored securely on IPFS, ensuring immutability.

MetaMask Integration: Secure wallet connection for blockchain transactions.

User-Friendly UI: Built with React.js for ease of use.

Project Components

Frontend: React.js, Axios

Backend: Flask, CORS

Blockchain: Ethereum (Ganache, Solidity, Web3.js)

AI OCR: Amazon Textract (AWS SDK)

Decentralized Storage: IPFS

Setup Instructions

Prerequisites

Node.js

Python

Ganache

IPFS

MetaMask

Installation

Clone the Repository:

Frontend Setup:

Backend Setup:

Blockchain Setup:

Open Ganache and create a workspace.

Deploy contracts using Truffle:

Configuration

Update paths and credentials in the following files:

ipfs.py: Path to your IPFS executable

blockchain.py: Contract address, ABI path, Ganache URL

AWS credentials for Amazon Textract setup

Usage

Upload a document through the React UI.

Text extracted using Amazon Textract.

Document hash generated and stored on the Ethereum blockchain.

Document uploaded to IPFS.

Verify documents via hash through the React UI.

File Structure

Contributing

Feel free to contribute by creating pull requests, reporting issues, or suggesting features.

License

This project is licensed under the MIT License.
