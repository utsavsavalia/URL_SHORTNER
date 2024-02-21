import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [retrievalURL, setRetrievalURL] = useState('');

  
  const shortenURL = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/shorten', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({originalURL}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const shortID = await response.json();
  
      // Use your shortened URL as needed
      setShortenedURL(shortID.shortID);
  
    } catch (error) {
      console.error('Error shortening URL:', error.message);
    }
  };
  
  const handleRetrieve = async () => {
    try{
      const response2 = await fetch(`http://localhost:3001/${shortenedURL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }

      const resLog = await response2.json()
      setRetrievalURL(resLog)
  
    } catch (error) {
      console.error('Error shortening URL:', error.message);
    }

  }

  function openLinkedIn() {
    window.open("https://www.linkedin.com/in/daniel-detchev-454b56196/")
    window.open("https://www.linkedin.com/in/utsav-savalia/")
  }

  return (
    <div className='flexwhole'>
      <div className='top'>
      <h1 className='text-white text-3xl pl-3 floater'>URL Shortener</h1>
      <p onClick={openLinkedIn} className='contact'>Contact</p>
      </div>


      <div className='flexer'>
        <div className='border-indigo-800'>
      <input className='pl-2 border-solid border-2 border-indigo-900'
        type="text"
        placeholder="Enter URL to shorten"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
      />
      <button className = "ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={shortenURL}>Shorten</button>
      </div>
      
      {shortenedURL && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
            {shortenedURL}
          </a>
        </div>
      )}

        <p className='border-r-4 text-white border-stone-900 midbar roun'>_</p>

      {/* <h1>URL Retriever</h1> */}
      <input className='pl-2 border-solid border-2 border-indigo-900'
        type="text"
        placeholder="Enter shortened URL"
      />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleRetrieve}>Retrieve</button>

      
      {setRetrievalURL && (
        <div>
          <p>Orig URL:</p>
          <p href={retrievalURL} target="_blank" rel="noopener noreferrer">
            {retrievalURL}
          </p>
        </div>
      )}

      </div>
    </div>
  );
}

export default App;
