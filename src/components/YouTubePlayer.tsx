import React from 'react';
import { extractVideoId } from '../utils/urlValidator';

interface YouTubePlayerProps {
    videoUrl: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl }) => {
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
        return <div className="alert alert-warning">Invalid YouTube URL</div>;
    }

    return (
        <div className="ratio ratio-16x9">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubePlayer;
