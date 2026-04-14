# CLAUDE.md — Project Developer Guideline

This file is the main reference for Claude Code when working on this project.
Read this fully before making any changes.

---

## 1. What This Project Is

A **single-page learning website** that teaches OutSystems application security to beginners and non-native English speakers.

- Source documents live in the `Document/` folder (PDF and DOCX files)
- When the user adds a new document, Claude should read it, simplify the content, and add it to the website
- No build tools — the site is plain HTML + CSS + JS, opened directly in a browser

---

## 2. Files in This Project

| File | Purpose |
|---|---|
| `index.html` | All page structure: sidebar nav + every content section |
| `style.css` | All styles — design tokens, sidebar, cards, components |
| `script.js` | Navigation logic + sidebar accordion toggle |
| `Document/` | Source documents to read and convert into website content |
| `AGENT.MD` | Original agent task brief (reference only) |
| `CLAUDE.md` | This file — developer guideline |

> `node_modules/` exists only because `mammoth` was installed to extract `.docx` text.
> Use `node -e "require('mammoth').extractRawText(...)"` to read DOCX files.

---

## 3. How to Add a New Document

When the user says "I added a new file, please add it to the website":

### Step 1 — Read the document
- **DOCX**: `node -e "const mammoth=require('mammoth'); mammoth.extractRawText({path:'Document/FILENAME.docx'}).then(r=>console.log(r.value))"`
- **PDF**: Use the `Read` tool with the `pages` parameter (max 20 pages at a time)

### Step 2 — Plan the content
- Identify: main topic, key ideas, important terms
- Decide how many sections to create (usually 2–5 per document)
- Choose a nav group to place them in, or create a new group if the topic is clearly different

### Step 3 — Add nav items to the sidebar (`index.html`)
Add items inside the correct `<li class="nav-group">` block:
```html
<li><a href="#YOUR-ID" class="nav-link" data-section="YOUR-ID">Section Label</a></li>
```
If a new group is needed, copy this pattern:
```html
<li class="nav-group">
  <button class="nav-group-header">
    <span>Group Name</span>
    <svg class="nav-chevron" viewBox="0 0 16 16" fill="none">
      <polyline points="4,6 8,10 12,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <ul class="nav-sub-list">
    <li><a href="#YOUR-ID" class="nav-link" data-section="YOUR-ID">Section Label</a></li>
  </ul>
</li>
```
> **Do NOT add `open` class** — all groups start closed by default.

### Step 4 — Add the content section (`index.html`)
Paste before `</main>`. Copy this skeleton:
```html
<section id="YOUR-ID" class="content-section">
  <div class="section-header">
    <span class="section-icon">EMOJI</span>
    <h1>Section Title</h1>
  </div>
  <div class="overview-box">
    <p>One or two sentences summarising what this section covers.</p>
  </div>

  <h2>Sub-topic</h2>
  <p>Explanation in simple English.</p>
  <ul>
    <li>Key point 1</li>
    <li>Key point 2</li>
  </ul>
</section>
```

### Step 5 — Update `Document/` source list in this file (Section 8 below)

---

## 4. Writing Style Rules

### Language
- **Simple English** — short sentences, active voice, no academic words
- If a technical term must be used, explain it in the same sentence or the next one
- Write as if you are explaining to a smart colleague who is new to security, not an expert
- Never copy raw document text — always rewrite, rearrange, and simplify

### Explanation Depth — This Is the Most Important Rule
**Do not just state facts. Explain the "why" and "how" behind each concept.**

For every topic, answer three questions before writing:
1. **What is the threat?** — What can go wrong without this protection? What does an attacker actually do?
2. **How does the protection work?** — Not just "OutSystems does X" but *why* X stops the attack
3. **What does the developer need to do?** — Concrete, actionable steps

**Bad (too shallow):**
> "OutSystems uses session fixation protection. Every time a user logs in, OutSystems creates a new session ID."

**Good (explains the threat + the mechanism):**
> "A session fixation attack works like this: an attacker visits your site and gets a session ID. They trick a real user into using that same session ID. When the user logs in, the attacker already knows the session ID — so they are now logged in too. OutSystems prevents this by creating a brand new session ID every time a user logs in. Even if the attacker pre-set a session ID, it becomes invalid the moment the user authenticates."

### Structure for Every Section
1. **Overview box** — 1–2 sentences: what this section is about
2. **Why it matters / The threat** — what goes wrong without this; use a real attack scenario
3. **How it works** — the mechanism, step by step if needed
4. **Key concepts** — use concept-list or cards for multiple items
5. **Example box** — a concrete before/after or attack scenario
6. **Best practices** — numbered or bulleted, actionable

### Writing Attack Scenarios
When explaining a vulnerability, always write a short scenario:
- Set the scene (what the attacker does)
- Show the damage (what happens to the victim)
- Show the fix (what stops it)

Use the `example-box` component for these. Format: **Without protection: [attack succeeds]. With protection: [attack fails].**

### Target Reader Profile
- Non-native English speaker
- Works with OutSystems but is not a security specialist
- Understands basic web development concepts (forms, databases, login)
- Does not know terms like "session fixation", "CSRF", "TLS handshake" without explanation

---

## 5. Sidebar Structure & Rules

The sidebar is an **accordion menu**:
- Each group (`<li class="nav-group">`) starts **closed** (no `open` class)
- Clicking the group header toggles it open/closed (handled in `script.js`)
- When a nav link is clicked, its parent group auto-opens
- Group header labels must fit on **one line** — keep them short (max ~20 chars)

Current groups and their sections:

| Group Label | Section IDs |
|---|---|
| Getting Started | `intro` |
| Built-in Protections | `secure-code`, `session`, `auth`, `rbac`, `brute-force`, `https`, `auditing`, `vuln-mgmt` |
| Developer Responsibilities | `permissions`, `logging`, `errors`, `custom-code`, `data-encrypt`, `mobile`, `best-practices` |
| Runtime Environment | `passwords`, `end-user-auth`, `it-user-auth`, `transit`, `rest`, `csp`, `cookies`, `viewstate`, `console-access` |
| After Development | `sast`, `pentest` |
| Reactive Web Apps | `reactive-client`, `reactive-server`, `reactive-tips` |
| Reference | `owasp` |

---

## 6. CSS Design Tokens (from `style.css`)

```
--bg:            #f5f6fa   (page background)
--surface:       #ffffff   (cards, modals)
--border:        #e2e6ea
--text:          #2d3436   (main text)
--text-muted:    #636e72   (secondary text)
--primary:       #2d6cdf   (blue — links, accents, active state)
--primary-light: #eef2fb   (light blue — overview boxes, hover bg)
--green:         #00b894
--green-light:   #eafaf5
--orange:        #e17055
--orange-light:  #fef0ec
--purple:        #6c5ce7
--purple-light:  #f0eeff
--yellow:        #fdcb6e
--red:           #d63031
--radius:        8px
--shadow:        0 2px 8px rgba(0,0,0,0.08)
```

**Sidebar colors** (not tokens — hardcoded):
- Sidebar bg: `#f5f6fa`
- Group card bg: `#ebebf0`, border: `#e2e4ea`
- Sub-list bg: `#f5f6fa`
- Active link bg: `#dfe5f5`

---

## 7. Available UI Components

Use these existing classes — do not invent new ones unless necessary.

| Component | Class | Usage |
|---|---|---|
| Overview box | `overview-box` | Blue-left-bordered intro paragraph at top of section |
| Tip box | `tip-box` + `tip-icon` | Green-left-bordered tip. Add `<span class="tip-icon">💡</span>` inside |
| Example box | `example-box` | Yellow-left-bordered example text |
| Card grid | `card-grid` > `card card-COLOR` | 2–4 column responsive cards. Colors: `card-blue`, `card-green`, `card-orange`, `card-red` |
| Concept list | `concept-list` > `concept-item` | Row layout with a badge icon and text |
| Badge (concept) | `concept-badge badge-COLOR` | Colored square badge. Colors: `badge-red`, `badge-orange`, `badge-blue`, `badge-green`, `badge-purple`, `badge-yellow` |
| OWASP table | `owasp-table` > `owasp-row` | Grid table for risk lists |
| Status pill | `status-auto` / `status-dev` | Inline green/orange label |

**Card color usage guide:**
- `card-blue` — informational / neutral
- `card-green` — good practice / safe
- `card-orange` — warning / caution
- `card-red` — danger / bad practice

---

## 8. Source Documents Log

| File | Topics Covered | Sections Added |
|---|---|---|
| `outsystems-application-security.pdf` | Full security guide (54 pages) | All sections except reactive and OWASP mobile |
| `Develop secure OutSystems app.docx` | Secure development practices | Merged into relevant Developer Responsibilities sections |
| `Best practices for reactive web security.docx` | Reactive Web App security (client-side, server-side, tips) | `reactive-client`, `reactive-server`, `reactive-tips` |

When a new document is added, append a row to this table after processing it.

---

## 9. What NOT to Do

- Do not add `open` class to `<li class="nav-group">` in HTML — groups start closed
- Do not copy raw text from documents — always simplify
- Do not create complicated UI — this is a learning site, clarity first
- Do not add new CSS classes if an existing component already fits
- Do not use complex or academic English
- Do not add emojis unless they serve as section icons (`section-icon`)
- Do not write one-sentence explanations — every section needs depth (see Section 4)
- Do not just list features — explain the threat each feature protects against
- Do not skip the attack scenario — every security concept needs a real example of what goes wrong
