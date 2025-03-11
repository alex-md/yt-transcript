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
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`
        )
        const captions = response.data.items[0].contentDetails.caption
        return captions === "true"
    } catch (error) {
        console.error("Error checking captions:", error)
        return false
    }
}
