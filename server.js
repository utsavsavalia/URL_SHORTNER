const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { redirect } = require('react-router-dom');
const app = express();
const PORT = process.env.PORT || 3001;

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
  const { originalURL } = req.body;
  // test check the output for debug.
  console.log(`The original URL: ${originalURL}`);
  const shortID = customHash(originalURL);

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

    res.json(urlData.originalURL);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function customHash(input, length = 10) {
  let hash = 0;

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  hash = Math.abs(hash);
  const hashString = hash.toString(16);
  return hashString.substring(0, length);
}