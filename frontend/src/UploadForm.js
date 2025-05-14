import React, { useState } from 'react';
import axios from 'axios';
import { BrowserProvider } from 'ethers';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  // Handle file selection
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Upload document to Flask backend
  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/uploadDocument', formData);
      setResult(res.data);
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    try {
      const provider = new BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      setWalletAddress(await signer.getAddress());
    } catch (error) {
      console.error("MetaMask Connection Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Upload Document for Verification</h2>

      <div style={styles.card}>
        <input type="file" onChange={handleFileChange} style={styles.input} />
        <button onClick={handleUpload} style={styles.button}>Upload</button>
      </div>

      {result && (
        <div style={styles.resultContainer}>
          <h3>Results:</h3>
          <p><strong>Document Hash:</strong> {result.doc_hash}</p>
          <p><strong>Blockchain Transaction:</strong> {result.blockchain_txn}</p>
          <p><strong>IPFS Hash:</strong> {result.ipfs_hash}</p>

          {/* Show Extracted Text */}
          {result.extracted_text && (
            <div style={styles.textContainer}>
              <h3>Extracted Text:</h3>
              <pre style={styles.preText}>{result.extracted_text}</pre>
            </div>
          )}
        </div>
      )}

      <hr style={styles.separator} />

      <h2 style={styles.header}>Connect MetaMask</h2>
      <button onClick={connectWallet} style={styles.button}>Connect Wallet</button>
      {walletAddress && <p><strong>Wallet Address:</strong> {walletAddress}</p>}
    </div>
  );
}

// Inline Styles for Better UI
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    color: '#333',
    fontSize: '22px',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    margin: '10px auto',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px'
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#3b3b3b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s'
  },
  resultContainer: {
    backgroundColor: '#eaf7ea',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    margin: '10px auto',
    width: '50%'
  },
  textContainer: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '8px',
    textAlign: 'left',
    maxHeight: '200px',
    overflowY: 'auto'
  },
  preText: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '14px',
    color: '#333'
  },
  separator: {
    margin: '20px 0',
    border: '1px solid #ddd'
  }
};

export default UploadForm;
