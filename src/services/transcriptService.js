import axios from "axios"
import { extractVideoId } from "../utils/urlValidator"

// Use environment variable for API key
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY

export const fetchTranscript = async videoUrl => {
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
        throw new Error("Invalid YouTube URL")
    }

    try {
        // Get the transcript using the new YouTube Data API v3 endpoint
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/captions/download`, {
            params: {
                videoId: videoId,
                key: YOUTUBE_API_KEY,
                tfmt: 'ttml', // Request transcript in TTML format
                lang: 'en' // Request English captions
            },
            headers: {
                'Accept': 'application/json'
            }
        }
        )

        if (!response.data) {
            return "No transcript available for this video."
        }

        return parseTranscript(response.data)
    } catch (error) {
        console.error('Error fetching transcript:', error)
        if (error.response?.status === 403) {
            return "Error: Unable to access transcript. Please ensure you have configured your YouTube API key."
        } else if (error.response?.status === 404) {
            return "No transcript available for this video."
        }
        return "Error fetching transcript. Please try again."
    }
}

const parseTranscript = data => {
    let transcript = ""
    try {
        // Parse TTML format
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data, "text/xml")
        const paragraphs = xmlDoc.getElementsByTagName("p")

        for (let p of paragraphs) {
            const begin = p.getAttribute("begin")
            const text = p.textContent
            if (begin && text) {
                const timeInSeconds = parseFloat(begin)
                const minutes = Math.floor(timeInSeconds / 60)
                const seconds = Math.floor(timeInSeconds % 60)
                const timestamp = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                transcript += `[${timestamp}] ${text.trim()}\n`
            }
        }
    } catch (error) {
        console.error('Error parsing transcript:', error)
    }
    return transcript.trim() || "No transcript available for this video."
}
