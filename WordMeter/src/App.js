// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    createTheme,
    ThemeProvider,
    CssBaseline,
} from '@mui/material';
import { saveAs } from 'file-saver';
import { useMediaQuery } from '@mui/material';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

// Main App component
function App() {
    // State variables to manage URL input, word count input, word frequency data, and UI states
    const [url, setUrl] = useState(localStorage.getItem('url') || '');
    const [topN, setTopN] = useState(parseInt(localStorage.getItem('topN'), 10) || 10);
    const [words, setWords] = useState(JSON.parse(localStorage.getItem('words') || '[]'));
    const [loading, setLoading] = useState(false); // Loading indicator for API call
    const [error, setError] = useState(''); // Error message display
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true'); // Dark mode toggle

    // Detect system dark mode preference
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    // Save state values to localStorage on change
    useEffect(() => {
        localStorage.setItem('url', url);
        localStorage.setItem('topN', topN);
        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('darkMode', darkMode);
    }, [url, topN, words, darkMode]);

    // Define the theme object based on dark mode preference
    const theme = createTheme({
        palette: {
            mode: darkMode || prefersDarkMode ? 'dark' : 'light',
        },
    });

    // Function to fetch word frequency data from backend
    const fetchWordFrequency = async () => {
        setLoading(true); // Start loading indicator
        setError(''); // Clear any previous errors
        setWords([]); // Clear previous word data

        try {
            // Post request to backend with URL and topN
            const response = await axios.post('http://localhost:5000/api/words', {
                url,
                topN: topN,
            });
            setWords(response.data.words); // Set fetched word data
        } catch (err) {
            setError('Error fetching word frequencies. Please check the URL or try again.'); // Display error on failure
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };

    // Function to clear input fields and reset state
    const clearInputs = () => {
        setUrl('');
        setTopN(10);
        setWords([]);
        setError('');
        // Remove saved data from localStorage
        localStorage.removeItem('url');
        localStorage.removeItem('topN');
        localStorage.removeItem('words');
    };

    // Function to download word frequency data as CSV file
    const downloadCSV = () => {
        const csvContent = words.map(word => `${word.word},${word.count}`).join('\n');
        const blob = new Blob([`Word,Count\n${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'word_frequencies.csv'); // Trigger download
    };

    // Render the app UI
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Ensures consistent styling for dark/light mode */}
            <Container maxWidth="sm" style={{ marginTop: '1.5rem' }}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    {/* Title and Dark Mode Toggle */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            style={{
                                background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold',
                            }}
                        >
                            WordMeter
                        </Typography>
                        {/* Toggle button for dark mode */}
                        <IconButton onClick={() => setDarkMode(!darkMode)} style={{marginBottom:'.75rem'}}>
                            {darkMode ? <CiLight size={24} color='#ffc107' /> : <MdDarkMode size={24} color='#000000' />}
                        </IconButton>
                    </Box>

                    {/* Input field for URL */}
                    <TextField
                        fullWidth
                        label="Enter URL"
                        variant="outlined"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    />

                    {/* Input field for top N words */}
                    <TextField
                        fullWidth
                        type="number"
                        label="Top N Words"
                        variant="outlined"
                        value={topN}
                        onChange={(e) => setTopN(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    />

                    {/* Button to start analysis */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={fetchWordFrequency}
                        disabled={loading || !url}
                        style={{ marginBottom: '1rem' }}
                    >
                        Analyze
                    </Button>

                    {/* Button to clear inputs */}
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={clearInputs}
                        disabled={loading}
                        style={{ marginBottom: '1rem' }}
                    >
                        Clear
                    </Button>

                    {/* Show loading spinner when fetching data */}
                    {loading && (
                        <Box display="flex" justifyContent="center" marginTop="1rem">
                            <CircularProgress />
                        </Box>
                    )}

                    {/* Show error message if API request fails */}
                    {error && (
                        <Box marginTop="1rem">
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    )}

                    {/* Display word frequency table if data is available */}
                    {words.length > 0 && (
                        <Box marginTop="2rem">
                            <Typography variant="h5" gutterBottom>
                                Top {topN} Most Frequent Words
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Word</strong></TableCell>
                                            <TableCell><strong>Frequency</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {words.map((wordObj, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{wordObj.word}</TableCell>
                                                <TableCell>{wordObj.count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Button to download table data as CSV */}
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={downloadCSV}
                                style={{ marginTop: '1rem' }}
                            >
                                Download CSV
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
