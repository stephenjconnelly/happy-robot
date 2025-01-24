# AI-Powered Document Summarizer

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- npm or Yarn
- OpenAI API Key

### Installation Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root
4. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
```

### Production Build
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Technical Choices

### Frontend
- React with Next.js for server-side rendering
- State management using React Hooks
- Modular CSS for styling

### Backend
- API Routes for file upload and text summarization
- OpenAI's GPT-3.5-turbo for generating summaries
- PDF.js for PDF text extraction

### Key Features
- File upload support (PDF and plain text)
- Configurable summary length
- Automatic key points extraction

## Limitations
- Limited to text and PDF file types
- Relies on OpenAI API (potential costs)
- Summary quality depends on AI model

## Future Improvements
- Support more file formats
- Add document preview
- Implement user authentication
- Enable saving/exporting summaries
- Add multi-language support

## Dependencies
- React
- Next.js
- Axios
- PDF-parse
- OpenAI SDK

## License
MIT License