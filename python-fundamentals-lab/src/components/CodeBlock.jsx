import React from 'react';
import './CodeBlock.css';

const CodeBlock = ({ code, language = 'python' }) => {
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Simple syntax highlighting for Python
    const highlightCode = (code) => {
        const keywords = ['def', 'class', 'import', 'from', 'as', 'if', 'elif', 'else', 'for', 'while', 'in', 'return', 'True', 'False', 'None', 'and', 'or', 'not', 'with', 'try', 'except', 'finally', 'raise', 'pass', 'break', 'continue', 'lambda', 'yield'];
        const builtins = ['print', 'len', 'range', 'str', 'int', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'type', 'open', 'enumerate', 'zip', 'map', 'filter'];

        let highlighted = code;

        // Highlight strings
        highlighted = highlighted.replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>');

        // Highlight comments
        highlighted = highlighted.replace(/(#.*$)/gm, '<span class="comment">$&</span>');

        // Highlight numbers
        highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');

        // Highlight keywords
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
        });

        // Highlight builtins
        builtins.forEach(builtin => {
            const regex = new RegExp(`\\b${builtin}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="builtin">${builtin}</span>`);
        });

        return highlighted;
    };

    return (
        <div className="code-block">
            <div className="code-header">
                <span className="code-language">{language}</span>
                <button
                    className="copy-button"
                    onClick={copyToClipboard}
                    aria-label="Copy code"
                >
                    {copied ? (
                        <span className="copy-feedback">✓ Copied!</span>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    )}
                </button>
            </div>
            <pre className="code-content">
                <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
            </pre>
        </div>
    );
};

export default CodeBlock;
