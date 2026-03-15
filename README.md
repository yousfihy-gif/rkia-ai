# Rkia Council Starter

This is a beginner-friendly starter project for your Rkia AI council.

What this starter does:
- gives you a local console interface
- lets you switch between advisors
- saves local memory notes
- saves simple lead records
- sends your prompt to the OpenAI Responses API
- uses different personalities for Rkia, Abdelouahed, OUFAE, Taha, Yasmine, and Zahra

What this starter does **not** do yet:
- no website dashboard yet
- no Gmail integration yet
- no calendar yet
- no Supabase yet
- no real quote or invoice PDF generation yet
- no app deployment or App Store pipeline yet

This is the correct first step: get the council working locally, then add tools one by one.

## 1) What you need

- Node.js 20+
- an OpenAI API key
- a code editor like VS Code

## 2) Setup

Copy `.env.example` to `.env` and add your API key.

```bash
cp .env.example .env
```

Then install dependencies:

```bash
npm install
```

## 3) Run it

```bash
npm run dev
```

You will see a prompt like this:

```text
[rkia] >
```

## 4) Commands

Switch advisors:

```text
/agent rkia
/agent abdelouahed
/agent oufae
/agent taha
/agent yasmine
/agent zahra
```

Save a memory note:

```text
/memory Hamza wants a moving-company booking app for New York.
```

Save a lead:

```text
/lead Sarah | moving estimate | 2-bedroom move in Brooklyn next Saturday
```

See saved memory + leads:

```text
/context
```

Quit:

```text
/exit
```

## 5) Good beginner test prompts

Try these:

```text
Rkia, help me relaunch HY Services in New York.
```

```text
Abdelouahed, what is the fastest online service I can sell this month?
```

```text
OUFAE, suggest a simple healthy workday meal plan.
```

```text
Taha, what legal pages would a small SaaS website usually need?
```

```text
Yasmine, organize a 30-day launch checklist for HY Services NYC.
```

```text
Zahra, suggest 5 Islamic app ideas that could genuinely help people.
```

## 6) What to build next

In this order:
1. Supabase database
2. dashboard UI
3. quote + invoice tools
4. email integration
5. builder pipeline for websites/apps
6. content pipeline for HYFACTS007
7. approval system
8. automations

## 7) Beginner advice

Do **not** try to build everything in one shot.

Build Rkia in layers:
- layer 1: council and memory
- layer 2: business tools
- layer 3: website/app builder
- layer 4: content tools
- layer 5: automations and approvals

That is how you avoid getting overwhelmed.
