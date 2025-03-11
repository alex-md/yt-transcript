import axios from "axios"
import { validateYouTubeUrl } from "../utils/urlValidator"

// Using environment variable for API key
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || ""

export const checkCaptionsEnabled = async videoId => {
    try {
        if (!YOUTUBE_API_KEY) {
            console.error("YouTube API key is not set!")
            return false
        }

        // First check if video exists and get its details
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                part: 'contentDetails',
                id: videoId,
                key: YOUTUBE_API_KEY
            }
        }
        )

        if (!response.data.items || response.data.items.length === 0) {
            return false
        }

        // Check for caption availability
        const captionsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/captions`, {
            params: {
                part: 'snippet',
                videoId: videoId,
                key: YOUTUBE_API_KEY
            }
        }
        )

        return captionsResponse.data.items && captionsResponse.data.items.length > 0
    } catch (error) {
        console.error("Error checking captions:", error)
        return false
    }
}
