// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [originalURL, setOriginalURL] = useState('');
//   const [shortenedURL, setShortenedURL] = useState('');

//   const shortenURL = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/test', {
//         originalURL,
//       });
//       setShortenedURL(`http://localhost:3000/${response.data.shortID}`);
//     } catch (error) {
//       console.error('Error shortening URL:', error);
//     }
//   };

//   return (
//     <div className='tester'>
//       <h1>URL Shortener</h1>
//       <input
//         type="text"
//         placeholder="Enter URL to shorten"
//         value={originalURL}
//         onChange={(e) => setOriginalURL(e.target.value)}
//       />
//       <button onClick={shortenURL}>Shorten</button>
//       {shortenedURL && (
//         <div>
//           <p>Shortened URL:</p>
//           <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
//             {shortenedURL}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import { customHash } from './functions'
import React, { useState } from 'react';
import axios from 'axios';

export const shorURL = "";

function App() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');

  
  const shortenURL = async () => {
    const shortID = ""
    const bod = customHash(originalURL)
    try {
      const response = await fetch('http://localhost:3001/api/shorten', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bod }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      shortID = await response.json();
      console.log('Shortened URL data:', shortID);
  
      // Use your shortened URL as needed
      // setShortenedURL(`http://localhost:3001/${data.shortID}`);
  
    } catch (error) {
      console.error('Error shortening URL:', error.message);
    }

    try{
      // const shortID = 'test_string_123';
      const response2 = await fetch(`http://localhost:3001/${shortID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ bod }),
      });

      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }

      // // Handle the redirect manually, as fetch does not automatically follow redirects
      // if (response2.redirected) {
      //   window.location.href = response2.url;
      // } else {
      //   const data2 = await response2.json();
      //   console.log('long URL data:', data2);
      //   // Use your long URL data as needed
      //   // For example, you can access the long URL with data2.originalURL
      // }

      // const data2 = await response2.json();
      // console.log('long URL data:', data2);
  
      // // Use your shortened URL as needed
      // // setShortenedURL(`http://localhost:3001/${data.shortID}`);

  
    } catch (error) {
      console.error('Error shortening URL:', error.message);
    }
  
  };
  
  const lookupUrl = async () => {
    
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL to shorten"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
      />
      <button onClick={shortenURL}>Shorten</button>
      {shortenedURL && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
            {shortenedURL}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
