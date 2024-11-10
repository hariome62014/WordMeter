const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const cheerio = require('cheerio');
const he = require('he'); // For decoding HTML entities

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Enhanced stopwords list
// const stopwords = new Set([
//     'the', 'and', 'to', 'a', 'of', 'in', 'for', 'is', 'on', 'that', 'with', 
//     'as', 'at', 'by', 'an', 'it', 'or', 'this', 'from', 'be', 'are', 'was', 
//     'were', 'has', 'have', 'not', 'but', 'all', 'can', 'will', 'about', 'if', 
//     'they', 'so', 'we', 'my', 'you', 'do', 'just', 'there', 'like', 'would', 
//     'get', 'what', 'when', 'your', 'how', 'up', 'no', 'yes', 'could', 'out', 
//     'our', 'which', 'more', 'one', 'their', 'now', 'new', 'use', 'see', 'good', 
//     'make', 'some', 'way'
// ]);

// Helper function to count word frequency
const getWordFrequency = (text, topN) => {
    const wordCounts = {};
    const words = text
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .toLowerCase()
        .split(/\s+/) // Split by whitespace
        .filter(word => word 
            // && !stopwords.has(word)
        ); // Exclude stopwords

    for (const word of words) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    const sortedWords = Object.entries(wordCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, topN)
        .map(([word, count]) => ({ word, count }));

    return sortedWords;
};

// Helper function to extract meaningful text from the page
const extractText = (html) => {
    const $ = cheerio.load(html);

    // Remove script and style tags
    $('script, style').remove();

    // Decode HTML entities (e.g., &amp; -> &)
    const text = he.decode($('body').text());

    // Clean up the text
    return text.replace(/\s+/g, ' ').trim(); // Normalize whitespace
};

// Route for word frequency analysis
app.post('/api/words', async (req, res) => {
    const { url, topN } = req.body;

    try {
        const response = await axios.get(url);
        const text = extractText(response.data);
        const wordFrequency = getWordFrequency(text, topN);
        res.json({ words: wordFrequency });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data. Please check the URL.' });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
