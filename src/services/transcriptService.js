import axios from "axios"
import { extractVideoId } from "../utils/urlValidator"

const YOUTUBE_API_KEY = "AIzaSyAt8PgT4NitpGvgiuKNvl4CNbvQrNPdcQI"
export const isCaptionsEnabled = async videoId => {
    const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=${YOUTUBE_API_KEY}`
    )
    return response.data.items && response.data.items.length > 0
}

export const getTranscript = async videoId => {
    const response = await axios.get(
        `https://video.google.com/timedtext?lang=en&v=${videoId}`
    )
    const transcript = parseTranscript(response.data)
    return transcript
}

export const fetchTranscript = async videoUrl => {
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
        throw new Error("Invalid YouTube URL")
    }

    return getTranscript(videoId)
}

const parseTranscript = data => {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(data, "text/xml")
    const texts = xmlDoc.getElementsByTagName("body")[0]?.childNodes

    if (!texts) {
        return "No transcript available for this video."
    }

    let transcript = ""

    for (let i = 0; i < texts.length; i++) {
        const textNode = texts[i]
        if (textNode.nodeName === "s") {
            const element = textNode
            const start = element.getAttribute("t") || "0"
            const duration = element.getAttribute("d")
            const text = textNode.textContent
            transcript += `[${formatTime(start)}] ${text}\n`
        }
    }

    return transcript.trim() || "No transcript available for this video."
}

const formatTime = time => {
    const seconds = parseInt(time, 10) / 1000
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
}
