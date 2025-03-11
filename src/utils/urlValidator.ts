export const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeUrlPattern.test(url);
};

export const validateYouTubeUrl = isValidYouTubeUrl;

export const extractVideoId = (url: string): string | null => {
    // For regular YouTube URLs (youtube.com)
    let match = url.match(/[?&]v=([^&]+)/);
    if (match) return match[1];

    // For shortened YouTube URLs (youtu.be)
    match = url.match(/youtu\.be\/([^?&]+)/);
    if (match) return match[1];

    // For embed URLs
    match = url.match(/embed\/([^/?&]+)/);
    if (match) return match[1];

    return null;
};
