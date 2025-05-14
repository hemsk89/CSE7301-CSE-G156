import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import VerifyDocument from './VerifyDocument';
import FetchDocument from './FetchDocument';
import UploadForm from './UploadForm';

function App() {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="App">
      <center><h1>TrustDoc</h1></center>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="card">
        {activeTab === 'upload' && <UploadForm />}
        {activeTab === 'verify' && <VerifyDocument />}
        {activeTab === 'fetch' && <FetchDocument />}
      </div>
    </div>
  );
}

export default App;
