# WordMeter

**WordMeter** is a web application that analyzes and displays the most frequently used words on a given webpage. Users simply input a URL and specify the number of top words they want to analyze, and WordMeter will fetch and present the word frequency data in a well-designed interface. This project uses React for the frontend and Express with Cheerio for backend web scraping.

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [File Structure](#file-structure)
6. [API Endpoints](#api-endpoints)
7. [Customization](#customization)
8. [Contributing](#contributing)


## Features

- **URL-based Word Frequency Analysis**: Analyze any web page's text and identify the top `N` most frequent words.
- **Dark and Light Mode**: Toggle between dark and light modes based on user preference.
- **CSV Export**: Download the word frequency analysis as a CSV file.
- **Data Persistence**: URL, top N count, word frequency data, and dark mode preference are stored in `localStorage`.
- **Error Handling**: User-friendly alerts when URL fetching fails.

## Tech Stack

**Frontend**:
- React with Material UI components for an enhanced UI experience.
- Axios for HTTP requests.
- React Icons for theme toggle icons.

**Backend**:
- Node.js and Express for handling API requests.
- Cheerio for web scraping.
- Axios for fetching HTML content.
- `he` for HTML entity decoding.

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hariome62014/WordMeter.git
   cd WordMeter
2. **Install dependencies**:
   ```bash
   npm install
3. **Run the frontend server**:
   ```bash
   npm start

The frontend app will open on http://localhost:3000.
   
4. **Run the backend server**:
   ```bash
   node server.js
The backend server will start on http://localhost:5000.



## Usage
1. Open the app in your browser at http://localhost:3000.
2. Enter the URL of the page to analyze and specify the number of top words to retrieve.
3. Click Analyze to see the word frequency results.
4. Use the Clear button to reset input fields.
5. Toggle between light and dark mode by clicking the moon or sun icon.
6. Download the results as a CSV file by clicking the Download CSV button.

## File Structure
```plaintext
WordMeter/
├── build/                 # Compiled frontend files for production
├── node_modules/          # Node.js packages
├── public/                # Public assets for the React frontend
├── src/                   # Source code for the frontend
│   ├── App.css            # Styles for the main React component
│   ├── App.js             # Main React app component
│   ├── App.test.js        # Tests for the main app component
│   ├── index.css          # Global styles
│   ├── index.js           # Main entry point for the React app
│   ├── logo.svg           # Logo asset
│   ├── reportWebVitals.js # Performance reporting
│   ├── setupTests.js      # Test setup configuration
├── .gitignore             # Files and directories to ignore in Git
├── package-lock.json      # Locked dependency tree for npm
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation (this file)
└── server.js              # Backend server code with routes and helper functions
```

## API Endpoints

### `POST /api/words`

Analyzes the frequency of words on a webpage.

- **URL**: `/api/words`
- **Method**: `POST`
- **Parameters**:
  - `url` (string): URL of the webpage to analyze.
  - `topN` (integer): Number of top frequent words to retrieve.
- **Response**:
  - `words`: Array of objects containing `word` and `count` properties.

#### Example request:

```json
{
  "url": "https://www.expertrec.com/",
  "topN": 10
}
```

## Customization

- **Dark Mode**: Modify theme settings in `App.js` to personalize the color scheme.
- **Stopwords List**: Add or modify words in the stopwords set in `server.js` to filter out additional common words.

## Contributing

We welcome contributions to enhance WordMeter! Feel free to open issues or submit pull requests with improvements.

## 

Happy analyzing!

 
