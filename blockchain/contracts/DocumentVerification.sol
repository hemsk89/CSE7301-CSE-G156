// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    mapping(string => bool) public documentHashes; // ✅ Store as string

    function storeHash(string memory _hash) public {
        documentHashes[_hash] = true;
    }

    function verifyDocument(string memory _hash) public view returns (bool) {
        return documentHashes[_hash];
    }
}
