// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// import { customHash } from './src/functions';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(cors());

// // mongoose.connect('mongodb://localhost:27017/url-shortener', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });
// // mongoose.connection.once('open', () => {
// //   console.log('Connected to MongoDB');
// // });

// // const ShortURL = mongoose.model('ShortURL', {
// //     originalURL: String,
// //     shortID: String,
// //   });
  

//   app.post('/api/test', async (req, res) => {
//     const { originalURL } = req.body;
//     const shortID = customHash(originalURL);
  
//     try {
//       // const newURL = new ShortURL({ originalURL, shortID });
//     //   await newURL.save();
//       // res.json(newURL);
//       res.json(shortID)
//       console.log("here line 35.")
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
//   app.get('/:shortID', async (req, res) => {
//     const { shortID } = req.params;
  
//     try {
//       const urlData = await ShortURL.findOne({ shortID });
//       if (!urlData) {
//         return res.status(404).json({ error: 'URL not found' });
//       }
  
//       res.redirect(urlData.originalURL);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });










const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const ShortURL = mongoose.model('ShortURL', {
  originalURL: String,
  shortID: String,
});

app.post('/api/shorten', async (req, res) => {
  console.log("sdfasdf");
  const { originalURL } = req.body;
  const shortID = "shortid.generate();";

  try {
    const newURL = new ShortURL({ originalURL, shortID });
    await newURL.save();
    res.json(newURL);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/:shortID', async (req, res) => {
  const { shortID } = req.params;

  try {
    const urlData = await ShortURL.findOne({ shortID });
    if (!urlData) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(urlData.originalURL);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
