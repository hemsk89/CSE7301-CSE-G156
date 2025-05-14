import React, { useState } from 'react';
import axios from 'axios';

function VerifyDocument() {
  const [docHash, setDocHash] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = async () => {
    if (!docHash) return alert("Enter a document hash!");
    
    try {
      const res = await axios.get(`http://localhost:5000/verifyDocument?doc_hash=${docHash}`);
      setVerificationResult(res.data.verified);
    } catch (error) {
      console.error("Verification Error:", error);
    }
  };

  return (
    <div>
      <h2>Verify Document</h2>
      <input type="text" placeholder="Enter Document Hash" onChange={(e) => setDocHash(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>

      {verificationResult !== null && (
        <p>
          <strong>Verification Status:</strong> {verificationResult ? "✅ Valid Document" : "❌ Invalid Document"}
        </p>
      )}
    </div>
  );
}

export default VerifyDocument;
