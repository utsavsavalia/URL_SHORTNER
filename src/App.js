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



import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');

  const shortenURL = async () => {
    try {
      // const response = await axios.post('http://localhost:3001/api/shorten', {
      //   originalURL,
      // });
      const response = await fetch('http://localhost:3000/api/shorten', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ originalURL }), // body data type must match "Content-Type" header
      });
    

      // setShortenedURL(`http://localhost:3001/${response.data.shortID}`);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

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
