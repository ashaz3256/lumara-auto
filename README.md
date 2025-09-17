# Lumara Auto - AI Car Triage

An AI-powered car triage application that provides instant, safe advice for vehicle symptoms. Users can describe their car's issues and receive severity assessment, likely causes, and actionable steps.

## Features

- **AI-Powered Analysis**: Uses OpenAI GPT-4 with custom knowledge base for accurate diagnostics
- **Safety-First Approach**: Implements safety gates for critical symptoms (STOP/LIMIT/OK)
- **Comprehensive Knowledge Base**: Covers common automotive issues with fuel-specific guidance
- **PDF Reports**: Generate professional reports for mechanics
- **Mobile-Responsive**: Works seamlessly on all devices
- **Free to Use**: Core functionality is completely free

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon/Supabase)
- **AI**: Vercel AI SDK with OpenAI GPT-4
- **PDF Generation**: @react-pdf/renderer
- **Testing**: Vitest (unit), Playwright (E2E)
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lumara-auto
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` with your actual values:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/lumara_auto"
OPENAI_API_KEY="your_openai_api_key_here"
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
/apps/web
  /app
    /(marketing)          # Marketing pages
    /(app)               # Application pages
      /check             # Symptom wizard
      /result/[id]       # Results page
    /api                 # API routes
  /components            # React components
  /lib                   # Utilities and configurations
/packages
  /kb                   # Knowledge base markdown files
  /types                # Shared TypeScript types
/prisma                 # Database schema and migrations
/tests/e2e              # Playwright E2E tests
```

## Key Features

### Safety Gates
The application implements critical safety checks that override AI recommendations:
- **STOP**: Oil pressure warning, overheating, brake failure
- **LIMIT**: Battery/charging issues
- **OK**: General maintenance issues

### Knowledge Base
Comprehensive automotive knowledge covering:
- Engine issues (petrol/diesel)
- Warning lights and systems
- Temperature and cooling
- Starting and electrical
- Brake systems
- Smoke and emissions

### AI Integration
- Uses Vercel AI SDK for reliable AI interactions
- Implements function calling for knowledge base retrieval
- Applies safety rules before AI processing
- Validates all AI outputs with Zod schemas

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Base URL for authentication | Yes |
| `SENTRY_DSN` | Sentry error tracking (optional) | No |
| `POSTHOG_KEY` | PostHog analytics (optional) | No |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@lumara-auto.com or create an issue in the GitHub repository.

## Roadmap

- [ ] User accounts and session history
- [ ] Premium features (advanced diagnostics, maintenance reminders)
- [ ] Mobile app
- [ ] OBD-II integration
- [ ] Multi-language support
- [ ] Mechanic marketplace integration
