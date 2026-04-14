# AGENT.MD — Task Brief & Explanation Guidelines

---

## Goal

Build and maintain a learning website that summarizes and simplifies OutSystems security knowledge from the `Document/` folder. The target reader is a non-native English speaker who works with OutSystems but is not a security specialist.

---

## Responsibilities

The agent must:

1. Read and understand all files inside the `Document/` folder
2. Extract key knowledge and important concepts
3. Simplify the content so it is easy to understand
4. Organize the content into a clear, structured format
5. Present the result as a clean, simple website

---

## How to Explain Security Concepts — Core Principle

**Do not just state what a feature does. Explain the threat it protects against, how the protection works, and what happens without it.**

Every security concept has three parts. Always write all three:

### Part 1 — The Threat
Describe what an attacker can do when this protection is missing. Be concrete and specific. Name the type of attack. Show what damage it causes.

> Example: "Without HTTPS, anyone on the same Wi-Fi network can read the data being sent between the user's browser and the server — including passwords and session cookies."

### Part 2 — The Protection
Explain how the protection works — not just that it exists, but *why* it stops the attack. Use simple mechanical explanations.

> Example: "HTTPS creates an encrypted tunnel. Before any data is sent, the browser and server agree on an encryption key. All data is scrambled before leaving the device. Even if an attacker intercepts it, they only see random characters."

### Part 3 — What the Developer Needs to Do
Give a concrete, actionable instruction. Avoid vague advice like "use best practices." Tell the developer exactly what to configure, enable, or avoid.

> Example: "Enable SSL in your OutSystems environment settings. Enforce HTTPS for all apps. Enable HSTS so browsers always use HTTPS. Disable TLS 1.0 and 1.1 by contacting OutSystems Support."

---

## The "Before and After" Pattern

For any vulnerability, use this pattern in an `example-box`:

```
Without [protection]: [describe the attack + the damage]
With [protection]: [describe what happens when the attacker tries the same thing]
```

This makes abstract security concepts concrete and memorable.

---

## Writing Style Guidelines

- Use simple, clear English with short sentences
- Never use academic or jargon-heavy language without explaining the term first
- Write in active voice: "OutSystems creates a new session ID" not "A new session ID is created"
- Prefer short paragraphs — no more than 3–4 sentences per paragraph
- Use bullet points for lists of items; use numbered steps for processes with a clear order
- Use examples freely — a good example is worth three paragraphs of explanation
- Avoid vague phrases like "this improves security" — say specifically what attack it prevents

---

## Content Structure for Each Section

Every section on the website should follow this order:

1. **Overview box** — 1–2 sentences explaining what the section covers
2. **Why it matters** — the threat or problem this topic addresses
3. **How it works** — the mechanism explained step by step
4. **Key concepts** — use concept-list cards for multiple related ideas
5. **Example** — a concrete attack scenario or before/after comparison
6. **Best practices** — actionable instructions for the developer

Not every section needs all six parts, but never skip "Why it matters" and never skip "Best practices."

---

## Website Structure

1. **Side Menu** — collapsible accordion groups listing main topics
2. **Main Content Area** — content sections with headings, bullets, examples, and tip boxes

### Content Must Be:
- Well-structured (headings, bullet points, small paragraphs)
- Easy to read
- Simplified English — no complex wording

---

## Content Processing Rules

For each document:

1. Read the content
2. Identify: main topic, key ideas, important terms
3. For each concept, ask: What attack does this prevent? How? What must the developer do?
4. Rewrite with simpler wording and clearer explanations
5. Organize into sections: Overview → Why it matters → How it works → Example → Best Practices

---

## Constraints

- Do NOT copy raw content without simplification
- Do NOT write one-sentence explanations — depth is required (see explanation guidelines above)
- Do NOT list features without explaining the threat they protect against
- Do NOT use complex or academic English
- Do NOT create a complicated UI — focus on learning clarity over design
- Do NOT skip the attack scenario for security concepts

---

## Output Expectation

A clean, simple learning website with:
- Easy navigation via side menu (accordion groups, closed by default)
- Sections that explain both *what* and *why* — not just facts
- Concrete examples that make abstract attacks understandable
- Actionable best practices that tell developers exactly what to do
