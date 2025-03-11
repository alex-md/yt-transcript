# YouTube Transcript Tool

## Overview
The YouTube Transcript Tool is a web application designed to extract and display transcripts from YouTube videos in English. Users can input a YouTube video URL, and the tool will retrieve the spoken content, format it for readability, and provide an embedded YouTube player for easy navigation.

## Features
- **Transcript Extraction**: Automatically detects and retrieves transcripts from YouTube videos.
- **Timestamped Display**: Displays the transcript with timestamps for each segment of dialogue.
- **Word Highlighting**: Allows users to highlight specific words within the transcript.
- **Copy Functionality**: Users can easily copy the entire transcript to their clipboard.
- **Embedded YouTube Player**: Synchronizes video playback with the displayed transcript.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/youtube-transcript-tool.git
   ```
2. Navigate to the project directory:
   ```
   cd youtube-transcript-tool
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.
3. Enter a valid YouTube video URL in the input field and press enter to extract the transcript.

## Project Structure
```
youtube-transcript-tool
├── src
│   ├── components
│   │   ├── App.tsx
│   │   ├── TranscriptDisplay.tsx
│   │   └── YouTubePlayer.tsx
│   ├── services
│   │   ├── transcriptService.ts
│   │   └── youtubeService.ts
│   ├── utils
│   │   └── urlValidator.ts
│   ├── styles
│       └── App.css
│   └── index.tsx
├── public
│   ├── index.html
│   └── favicon.ico
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.