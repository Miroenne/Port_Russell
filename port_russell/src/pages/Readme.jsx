import {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';

function Readme() {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('/README.md')
            .then(res => res.text())
            .then(text => setContent(text));
    }, []);

    return(
        <div>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}

export default Readme;