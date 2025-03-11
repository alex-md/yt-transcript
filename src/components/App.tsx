import React, { useState } from 'react';
import TranscriptDisplay from './TranscriptDisplay';
import YouTubePlayer from './YouTubePlayer';
import { validateYouTubeUrl } from '../utils/urlValidator';
import { fetchTranscript } from '../services/transcriptService';

const App: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [transcript, setTranscript] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [highlightedWords, setHighlightedWords] = useState<string[]>([]);

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            setHighlightedWords(searchTerm.split(/\s+/).filter(word => word.length > 0));
        } else {
            setHighlightedWords([]);
        }
    };

    const handleFetchTranscript = async () => {
        if (validateYouTubeUrl(videoUrl)) {
            setLoading(true);
            setError('');

            try {
                const fetchedTranscript = await fetchTranscript(videoUrl);
                setTranscript(fetchedTranscript);
                setError('');
            } catch (err) {
                setError('Failed to fetch transcript. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Invalid YouTube URL. Please enter a valid URL.');
        }
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <div className="card shadow-lg border-0 rounded-3 mb-4">
                        <div className="card-header bg-primary text-white text-center p-3">
                            <h1 className="display-5 fw-bold">
                                <i className="bi bi-youtube me-2"></i>
                                YouTube Transcript Tool
                            </h1>
                        </div>
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <div className="input-group mb-3 shadow-sm">
                                    <span className="input-group-text bg-light">
                                        <i className="bi bi-link-45deg"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        value={videoUrl}
                                        onChange={handleUrlChange}
                                        placeholder="Enter YouTube video URL"
                                        aria-label="YouTube URL"
                                    />
                                    <button
                                        className={`btn ${loading ? 'btn-secondary' : 'btn-primary'} btn-lg`}
                                        onClick={handleFetchTranscript}
                                        disabled={loading}
                                    >
                                        {loading ?
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </> :
                                            <>
                                                <i className="bi bi-file-text me-2"></i> Get Transcript
                                            </>
                                        }
                                    </button>
                                </div>
                                {error && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        {error}
                                    </div>
                                )}
                            </div>

                            {transcript && (
                                <>
                                    <div className="mb-4">
                                        <div className="input-group shadow-sm">
                                            <span className="input-group-text bg-light">
                                                <i className="bi bi-search"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                placeholder="Search in transcript"
                                                aria-label="Search term"
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={handleSearch}
                                                type="button"
                                            >
                                                <i className="bi bi-filter"></i> Filter
                                            </button>
                                        </div>
                                    </div>

                                    <div className="card shadow-sm mb-4">
                                        <div className="card-header bg-light d-flex align-items-center">
                                            <i className="bi bi-play-btn me-2"></i>
                                            <h2 className="h5 mb-0">Video Player</h2>
                                        </div>
                                        <div className="card-body p-0">
                                            <YouTubePlayer videoUrl={videoUrl} />
                                        </div>
                                    </div>

                                    <div className="card shadow-sm">
                                        <div className="card-header bg-light d-flex align-items-center">
                                            <i className="bi bi-chat-quote me-2"></i>
                                            <h2 className="h5 mb-0">Transcript</h2>
                                            <span className="badge bg-primary ms-2">
                                                {highlightedWords.length > 0 ? 'Filtered' : 'Full'}
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <TranscriptDisplay
                                                transcript={transcript}
                                                highlightedWords={highlightedWords}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
