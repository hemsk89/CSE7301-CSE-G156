import React, { useState } from 'react';

function FetchDocument() {
  const [ipfsHash, setIpfsHash] = useState('');
  
  const fetchDocument = () => {
    const url = `http://localhost:8080/ipfs/${ipfsHash}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Fetch Document from IPFS</h2>
      <input
        type="text"
        placeholder="Enter IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
        style={{ padding: '10px', width: '300px' }}
      />
      <br />
      <button onClick={fetchDocument} style={{ marginTop: '10px', padding: '10px', cursor: 'pointer' }}>
        Fetch Document
      </button>
    </div>
  );
}

export default FetchDocument;
