# 🌶️ Code Roaster (Desi Edition)

> **"Paste your code, get roasted, walk away with the fix."**  
> Built with **Google Antigravity 2.0**, **Google Stitch MCP**, **Gemini 3.5 Flash-Lite**, **Next.js 15 App Router**, and **Tailwind CSS v4**.  
> Specially crafted for **GDG on Campus MET** & **Pre-DevFest Nashik 2026**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org)
[![Gemini](https://img.shields.io/badge/Gemini-3.5%20Flash--Lite-blue?style=flat&logo=google)](https://aistudio.google.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![DevFest](https://img.shields.io/badge/DevFest-Nashik%202026-F9AB00?style=flat)](https://gdg.community.dev)

**Live Demo**: [avcoe-code-roaster-ivory.vercel.app](https://avcoe-code-roaster-ivory.vercel.app)

**Code Roaster (Desi Edition)** pairs technical code review with humorous, punchy Indian-dev commentary (Hinglish/Marathi slang + spicy developer metaphors). It detects real bugs, classifies them into `FATAL BUG`, `CODE SMELL`, and `OPTIMIZATION`, delivers a comedic critique across 3 intensity levels (**Dry**, **Sharp**, **Savage**), and gives you clean, corrected code with 1-click **Apply to Editor**.

---

## 📋 Prerequisites

Before starting, ensure you have:
1. **Node.js**: v18.18+ or v20+ installed ([Download Node.js](https://nodejs.org/)).
2. **Git**: Installed and configured on your system ([Download Git](https://git-scm.com/)).
3. **Google Account**: For Google AI Studio and Google Stitch.
4. **GitHub Account**: For version control.
5. **Vercel Account**: For deploying your live application.

---

## 📖 Step-by-Step Workshop Instructions

### Step 1: Install Antigravity 2.0 IDE & Get Google Stitch API Key

1. **Install Google Antigravity IDE**:
   - Download and set up the **Google Antigravity 2.0** IDE.
   - Launch Antigravity and open an empty folder or your project workspace.

2. **Generate a Google Stitch API Key**:
   - Visit the **Google Stitch** platform.
   - Head over to your profile/developer settings and create a new **Stitch API Key**.
   - Copy and save this key securely.

---

### Step 2: Install Google Stitch MCP in Antigravity

Antigravity connects directly to Model Context Protocol (MCP) servers to interact with external tools like Stitch.

1. In Antigravity, open the **MCP Servers** panel (`Settings` -> `MCP Servers` or click the MCP icon in the activity bar).
2. Locate or add **Google Stitch MCP** (`StitchMCP`).
3. Add your **Stitch API Key** in the configuration settings:
   ```json
   {
     "mcpServers": {
       "StitchMCP": {
         "command": "stitch-mcp",
         "env": {
           "STITCH_API_KEY": "<YOUR_STITCH_API_KEY>"
         }
       }
     }
   }
   ```
4. Verify that Stitch MCP connects successfully (status indicator will show green/active).

---

### Step 3: Generate the Wireframe with Stitch MCP

The repository includes a comprehensive design system specification in `prompts/designGDGmain.md` (or `designGDGmain.md`), specifying color palettes, neo-brutalist typography, layout rules, and DevFest Nashik branding.

1. In Antigravity's chat interface, attach the design file:
   - Type `@prompts/designGDGmain.md` (or `@designGDGmain.md`).
2. Run the following prompt:

```text
using this skill, generate a wireframe for me inside of google stitch using its mcp. Make sure to use the assests from the assest folders for logos and svgs
```

3. **What happens**:
   - Antigravity calls the Stitch MCP tools (`create_project`, `create_design_system`, `generate_screen_from_text`).
   - It creates a dedicated project and generates the high-fidelity wireframe screen inside Stitch.
   - Wait until Stitch returns the completed screen URL and visual preview.

---

### Step 4: Build the Full Next.js Web App with Antigravity

Now convert the wireframe and specifications into a full-stack Next.js project using Antigravity.

1. Attach the build prompt file:
   - Type `@prompts/02-antigravity-build-prompt.md` (or `@02-antigravity-build-prompt.md`).
2. Run the following prompt:

```text
using this context, create the project and use our generated wireframe that we just built as the main design. You can also extract its code from stitch as the reference for your code
```

3. **What happens**:
   - Antigravity reads the wireframe code and architecture prompt.
   - It scaffolds the Next.js project with App Router, TypeScript, and Tailwind CSS v4.
   - It writes the core application modules:
     - `config/app.config.ts`: App constants, roast levels, language list, and limits.
     - `types/roast.ts`: Strict TypeScript interfaces for roast payloads.
     - `lib/prompt.ts`: Desi persona system prompt and Hinglish instructions.
     - `lib/schema.ts`: Strict JSON schema for Gemini structured responses.
     - `lib/gemini.ts`: Robust `@google/genai` caller with retry backoff.
     - `app/api/roast/route.ts`: Secure server-side validation and endpoint.
     - `components/*`: `Workspace`, `CodeEditor`, `RoastReport`, `IssueCard`, `FixedCode`, etc.

---

### Step 5: Configure Gemini API Key (`.env.local`)

Code Roaster needs access to Gemini to roast code.

1. **Obtain your API Key for free**:
   - Visit [Google AI Studio](https://aistudio.google.com/apikey).
   - Sign in with your Google account and click **Create API Key**.
2. **Add to `.env.local`**:
   - In your project root, create a file named `.env.local` (or copy `.env.example`):
     ```bash
     cp .env.example .env.local
     ```
   - Open `.env.local` and paste your key:
     ```env
     GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```

> ⚠️ **Important**: Never commit `.env.local` to Git! It is already added to `.gitignore`.

---

### Step 6: Create a New GitHub Repository

1. Open [GitHub](https://github.com/new).
2. Create a new repository (e.g., `code-roaster` or `code-roaster-gdg`).
3. Set the repository to **Public**.
4. Leave **Initialize this repository with a README** unchecked (we already have our code).
5. Copy your repository's remote URL:
   ```text
   https://github.com/<YOUR_USERNAME_OR_ORG>/code-roaster.git
   ```

---

### Step 7: Run Locally & Push to GitHub via Antigravity

1. **Test the app locally**:
   Open your terminal in the project directory and run:

   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser:
   - Click **Load Sample Bug** or paste your own broken code.
   - Select a Roast Level (**Dry**, **Sharp**, or **Savage**).
   - Hit **Roast Me / भाजून काढ 🔥** (or press `Ctrl` + `Enter`).
   - Verify the roast comments, issue breakdown, and corrected code.

3. **Commit and push using Antigravity**:
   In Antigravity's chat, give the following command:

```text
initialize a git repository here and commit + push the changes to this remote https://github.com/<YOUR_USERNAME_OR_ORG>/code-roaster.git
```

   *(Replace the URL with your copied GitHub repository link)*.

   Or run manually in your terminal:
   ```bash
   git add .
   git commit -m "feat: complete Code Roaster Desi Edition with Stitch & Gemini"
   git branch -M main
   git remote remove origin
   git remote add origin https://github.com/<YOUR_USERNAME_OR_ORG>/code-roaster.git
   git push -u origin main
   ```

---

### Step 8: Deploy to Vercel

1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Under **Import Git Repository**, find and select your `code-roaster` repository.
4. In the **Configure Project** screen:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
5. Expand **Environment Variables**:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: *(Paste your Gemini API key from Google AI Studio)*
   - Click **Add**.
6. Click **Deploy**.
7. In under a minute, your spicy Code Roaster app is live on a `.vercel.app` URL! 🎉

---

## 🛠️ Tech Stack & Architecture

- **Agentic IDE**: Google Antigravity 2.0
- **Design & Wireframing Engine**: Google Stitch MCP
- **Framework**: Next.js 15 (App Router, Server Actions / Route Handlers)
- **UI & Components**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Neo-brutalist technical drafting aesthetics, Warli geometric accents, Space Grotesk + JetBrains Mono fonts)
- **AI Intelligence**: Google Gemini API via official `@google/genai` SDK (`gemini-3.5-flash-lite`)
- **Deployment**: Vercel

```
┌────────────────────────────────────────────────────────┐
│                   Google Antigravity 2.0               │
│                                                        │
│  [Prompts] ─────────► [Stitch MCP] ─────► Wireframe    │
│  - designGDGmain.md        │                           │
│  - build-prompt.md         ▼                           │
│                     [Next.js App]                      │
│                            │                           │
│                            ▼                           │
│                   [Gemini 3.5 Flash]                   │
│               (Hinglish Roasts + Fixes)                │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
                    [GitHub] ──► [Vercel]
```

---

## 📂 Repository Structure

```
├── .env.example                 # Environment variables template
├── 02-antigravity-build-prompt.md # Complete end-to-end prompt for Antigravity
├── designGDGmain.md             # Complete Stitch design system & style tokens
├── app/
│   ├── layout.tsx               # Root layout with Space Grotesk & JetBrains Mono fonts
│   ├── page.tsx                 # Main page entry point
│   ├── globals.css              # Neo-brutalist utilities, drafting grid, theme colors
│   └── api/
│       └── roast/
│           └── route.ts         # Secure Next.js API route validating inputs
├── components/
│   ├── Workspace.tsx            # Main state orchestrator (code, language, reports)
│   ├── TopBar.tsx               # DevFest Nashik branded header & quick links
│   ├── RoastControls.tsx        # Language selector, roast intensity pill switches
│   ├── CodeEditor.tsx           # Line gutters, error highlighting, sample loader
│   ├── RoastReport.tsx          # Render container for roasts and fixes
│   ├── IssueCard.tsx            # Severity badges (Fatal Bug, Code Smell, Optimization)
│   ├── FixedCode.tsx            # Diff view, copy-to-clipboard, apply-to-editor
│   ├── ErrorMessageInput.tsx    # Collapsible drawer for stack traces
│   ├── StatusBar.tsx            # Status ticker, character count, ready indicator
│   └── EmptyState.tsx           # Playful "{ ?_? }" awaiting submission card
├── config/
│   └── app.config.ts            # Central config for languages, models, and limits
├── lib/
│   ├── api.ts                   # Client-side fetch helper
│   ├── gemini.ts                # Google Gen AI SDK integration with retry backoff
│   ├── prompt.ts                # System instructions with Hinglish / Desi flavor
│   └── schema.ts                # Structured JSON schema for Gemini output
└── types/
    └── roast.ts                 # TypeScript type definitions
```

---

## 💡 Troubleshooting & Tips

- **Missing `GEMINI_API_KEY`**: Ensure `.env.local` exists in the root directory and contains `GEMINI_API_KEY=...`. Restart `npm run dev` after changing environment variables.
- **Stitch MCP Connection Issues**: If Antigravity cannot connect to Stitch MCP, check that your `STITCH_API_KEY` is valid and that the MCP process is running under `Settings -> MCP Servers`.
- **429 Rate Limit on Gemini**: Gemini Free Tier gives generous RPM. If you hit rate limits, wait 10 seconds or verify `gemini-3.5-flash-lite` in `config/app.config.ts`.
- **Vercel Deployment**: Make sure `GEMINI_API_KEY` is added to your Vercel Project Settings under **Environment Variables**.

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| `Ctrl + Enter` / `Cmd + Enter` | Trigger AI Code Roast | Global |
| `Escape` | Dismiss error traceback drawer | Global |
| `Tab` | Insert 4-space code indentation | Code Editor |

---

## 🤝 Community & Credits

- **Organized by**: [Google Developer Group (GDG) Nashik](https://gdgnashik.com/) & **GDG on Campus MET**
- **Event**: DevFest Nashik 2026 / Pre-DevFest AI Hands-on Workshop
- **Special Thanks**: Google Antigravity Team & Google Stitch Team for developer tools!

---

<p align="center">
  <b>Happy Coding & Happy Roasting! 🔥</b><br>
  <i>"कोड सुधारून घ्या, आधीच वेळ निघून गेली आहे!"</i>
</p>
