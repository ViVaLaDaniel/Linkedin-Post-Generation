# LinkedIn Post Generator 🚀

AI-powered LinkedIn post generator built with Next.js 15 and Google Gemini.

## Features

- 🤖 AI generates 5 unique post variants
- 🎨 5 styles: Inspirational, Educational, Success Story, Tips, Provocative
- ⚡ Rate limiting: 5 generations/day per IP
- 💎 PRO mode with unlimited access
- 📋 One-click copy to clipboard

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Google Gemini AI (gemini-2.0-flash-exp)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/ViVaLaDaniel/Linkedin-Post-Generation.git
cd Linkedin-Post-Generation
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PRO_CODES=PRO-CODE1,PRO-CODE2
NODE_ENV=development
```

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000/linkedin/

## Deployment (Digital Ocean)

1. Upload files to server
2. Configure nginx:
```nginx
location /linkedin {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

3. Start with PM2:
```bash
npm install
npm run build
pm2 start npm --name "linkedin-ai" -- start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key |
| `PRO_CODES` | Comma-separated PRO activation codes |
| `NODE_ENV` | Environment (development/production) |

## License

MIT
