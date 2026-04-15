import {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Readme Component
 * Fetches and displays the project's documentation from a Markdown file.
 * Useful for providing on-screen technical guidance or user manuals.
 */
function Readme() {
    // State to store the raw text content of the README file
    const [content, setContent] = useState('');

    /**
     * Lifecycle Hook (Effect)
     * Performs an asynchronous fetch request to retrieve the Markdown file 
     * from the public directory upon component mounting.
     */
    useEffect(() => {
        fetch('README.md')
            .then(res => res.text()) // Convert the response stream into plain text
            .then(text => setContent(text)); // Update state to trigger a re-render
    }, []); // Empty dependency array ensures this runs only once

    return(
        /**
         * The ReactMarkdown component acts as a parser.
         * it converts the raw Markdown string into valid HTML elements 
         * (e.g., # to <h1>, * to <li>, etc.)
         */
        <div>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}

export default Readme;