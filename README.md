# Resumio — AI Job Application Assistant

AI-powered full-stack application that analyzes your CV against job descriptions, generates tailored cover letters with real-time streaming, and prepares you for interviews.

## Features

- **CV Analysis** - Upload PDF or DOCX, get instant match score against any job description
- **Real-time Streaming** - Cover letter streams token by token via Server-Sent Events (SSE)
- **Smart Scraping** - Automatically extracts job descriptions from any URL (Greenhouse, Lever, etc.)
- **AI Cover Letter** - Personalized cover letters generated from your actual CV experience
- **Interview Prep** - 5 tailored interview questions with suggested answers
- **Missing Skills** - Clear breakdown of gaps between your CV and the job requirements
- **Rate Limiting** - Global IP-based throttling to prevent abuse
- **Session Management** - In-memory session store bridges POST data to SSE stream

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend:**
- NestJS (Node.js framework)
- TypeScript
- Google Gemini API (AI)
- SSE (Server-Sent Events)

**Testing:**
- Playwright (E2E)

## Prerequisites

- Node.js (v18+)
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))
- Git

## Architecture

```
User → Next.js Frontend
    ├── POST /upload/cv       → Parse PDF/DOCX → return plain text
    ├── POST /job/scrape      → Cheerio HTML scraping → return plain text
    ├── POST /analyze/prepare → Store cover letter prompt in memory → return sessionId
    ├── POST /analyze         → Gemini API → return matchScore, missingSkills, interviewQuestions
    └── GET  /analyze/stream/:sessionId → Gemini streaming → SSE chunks → cover letter
```

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/STAR-IW/resumio
cd resumio
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Start backend:
```bash
npm run start:dev
```

Server runs on: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

App runs on: `http://localhost:3000`

## Key Endpoints

**Upload:**
- `POST /upload/cv` - Upload PDF or DOCX, returns extracted plain text

**Job Description:**
- `POST /job/scrape` - Scrape job description from URL
- `POST /job/paste` - Accept raw pasted job description

**Analysis:**
- `POST /analyze/prepare` - Create session, store cover letter prompt, return sessionId
- `POST /analyze` - Full CV/JD analysis, returns matchScore, missingSkills, interviewQuestions
- `GET /analyze/stream/:sessionId` - Stream cover letter via SSE

## Testing

### Run E2E Tests
```bash
cd frontend
npx playwright test
```

### Run with browser visible
```bash
npx playwright test --headed
```

### View test report
```bash
npx playwright show-report
```

## Key Features Explained

### SSE Streaming Architecture
Cover letter streams in real time using a two-step approach:
1. `POST /analyze/prepare` — stores the cover letter prompt in an in-memory Map with a UUID key, returns `sessionId` instantly
2. Frontend opens `EventSource` immediately using `sessionId`
3. `POST /analyze` runs in parallel — score/skills/questions load when ready
4. Cover letter streams while analysis completes

### AsyncGenerator Streaming
```
Gemini generateContentStream → AsyncGenerator yields chunks
→ NestJS @Sse Observable → EventSource onmessage → setCoverLetter(prev + chunk)
```

### Job Scraping
Uses `cheerio` to parse HTML from job posting URLs. LinkedIn detected and blocked with a friendly fallback to paste mode. Supports Greenhouse, Lever, Ashby, and most ATS platforms.

### File Parsing
- PDF: `pdf-parse` extracts plain text from buffer
- DOCX: `mammoth` extracts plain text from buffer
- Memory storage only — files never written to disk

## Security Features

- Global rate limiting (NestJS Throttler)
- CORS configured for production frontend URL
- File size limit (5MB)
- Input length validation
- LinkedIn scraping blocked with user-friendly error

## Deployment

**Live Demo:** [https://resumioai-frontend.onrender.com](https://resumioai-frontend.onrender.com)

### Render Deployment

**Backend (Web Service):**
- Root directory: `backend`
- Build command: `npm install --include=dev && npm run build`
- Start command: `node dist/main`
- Environment variables: `GEMINI_API_KEY`, `FRONTEND_URL`, `NODE_ENV`

**Frontend (Web Service):**
- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variables: `NEXT_PUBLIC_API_URL`

## Known Limitations / Future Improvements

- Replace in-memory session store with Redis for multi-instance support
- Stream all sections via Vercel AI SDK (not just cover letter)
- Add user authentication and analysis history (PostgreSQL)
- Chrome extension for one-click job description capture
- Stripe subscription tiers
- Support OpenAI / Anthropic as alternative LLM providers

## Author

Itai - [GitHub](https://github.com/STAR-IW)

---