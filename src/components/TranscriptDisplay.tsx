import React, { useState, useEffect } from 'react';

interface TranscriptDisplayProps {
    transcript: string;
    highlightedWords?: string[];
}

interface TranscriptSegment {
    text: string;
    timestamp: string;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript, highlightedWords = [] }) => {
    const [segments, setSegments] = useState<TranscriptSegment[]>([]);

    useEffect(() => {
        // Parse the transcript string into segments
        const parsedSegments = transcript
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
                const timestampMatch = line.match(/\[([\d:]+)\]/);
                const timestamp = timestampMatch ? timestampMatch[1] : '0:00';
                const text = line.replace(/\[[\d:]+\]\s*/, '').trim();
                return { timestamp, text };
            });

        setSegments(parsedSegments);
    }, [transcript]);

    const highlightText = (text: string) => {
        if (!highlightedWords.length) return text;

        const regex = new RegExp(`(${highlightedWords.join('|')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            highlightedWords.some(word => word.toLowerCase() === part.toLowerCase())
                ? <mark key={index} className="bg-warning text-dark px-1 rounded">{part}</mark>
                : part
        );
    };

    return (
        <div className="transcript-container">
            {segments.length === 0 ? (
                <div className="alert alert-info">No transcript content available.</div>
            ) : (
                <div className="list-group">
                    {segments.map((segment, index) => (
                        <div key={index} className="list-group-item list-group-item-action d-flex py-3 border-0 border-bottom">
                            <div className="timestamp badge bg-secondary text-white align-self-start me-3 px-2 py-1 rounded-pill">
                                {segment.timestamp}
                            </div>
                            <div className="transcript-text flex-grow-1 fw-light">
                                {highlightText(segment.text)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TranscriptDisplay;
