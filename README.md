# Divya's Work Tracker

A Kanban-style dashboard for tracking Marketing Technology deliverables at Intuition.

## Setup

### 1. Deploy to Vercel
- Push this repo to GitHub
- Import it in Vercel (vercel.com > New Project)

### 2. Add Upstash Redis
- In your Vercel project dashboard, go to **Storage** tab
- Click **Create Database** > choose **Upstash Redis**
- This automatically sets `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars

### 3. Redeploy
- After adding the database, trigger a redeploy from the Vercel dashboard
- The app will auto-seed with all existing deliverables on first load

## Local Development

```bash
# Copy env example and fill in your Upstash Redis credentials
cp .env.example .env.local

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open http://localhost:3000

## How It Works
- **4 deliverable columns**: Search Performance, Website Performance, Data Management, Lead Ops & Revenue Mapping
- **3 sections per column**: Completed, Ongoing, Expected Impact
- **Edit in-browser**: Add tasks, check off completed ones, edit text, add notes, delete tasks
- **Persistent storage**: All data saved to Upstash Redis (survives cache clears, works across devices)
