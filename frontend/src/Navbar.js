import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav>
      <button
        className={`nav-button ${activeTab === 'upload' ? 'nav-button-active' : ''}`}
        onClick={() => setActiveTab('upload')}>
        Upload Document
      </button>
      <button
        className={`nav-button ${activeTab === 'verify' ? 'nav-button-active' : ''}`}
        onClick={() => setActiveTab('verify')}>
        Verify Document
      </button>
      <button
        className={`nav-button ${activeTab === 'fetch' ? 'nav-button-active' : ''}`}
        onClick={() => setActiveTab('fetch')}>
        Fetch Document
      </button>
    </nav>
  );
}

export default Navbar;
