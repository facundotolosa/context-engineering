# Cursor Training Sessions Proposal

## Overview

This document outlines the structure for the two advanced Cursor training sessions delivered by Facu. The goal is to move the engineering team from "using a chatbot" to "engineering with AI assistants."

---

## Session 1: Managing AI Context on Cursor

**Target Audience:** All Engineers  
**Duration:** 1 Hour  
**When:** January 2026

### Goal

To move engineers from "chatting" to "engineering context." Understanding that the quality of the output depends more on the context provided (Context Engineering) than on clever phrasing (Prompt Engineering).

### Agenda

#### 1. Prompt Engineering vs. Context Engineering (15 min)

- **The Shift:** Explain that while Prompt Engineering (how you ask) matters, **Context Engineering** (what information you provide) is the decisive factor in complex codebases.
- **Garbage In, Garbage Out:** If the relevant files aren't in context, the best system in the world won't prevent hallucinations.

#### 2. The Context Window: Explained (20 min)

- **The "Workbench" Analogy:**
  - Explain the Context Window not as a "brain" but as a **workbench**. It has limited space. If you fill it with clutter (long logs, irrelevant files), there is no room for the actual work (the solution).
  - _Visual Reference:_ Show a graphic of the context bar filling up.
- **The Cost of "Context Fear":**
  - Share personal anecdote: Staying in a stale chat thread because you're afraid to lose history is a fallacy. It leads to circular logic and degradation.

#### 3. Health Checks & The "2-Strike" Rule (10 min)

- **The Rule:** If Cursor has to summarize/drop context (or you see the "Context is full" warning) more than twice, or if the model hallucinates twice on the same task -> **The session is dead.**
- **Action:** Stop fighting. Create a new session.

#### 4. Intended Context Compression (15 min)

- **Proactive Management:** Don't wait for the window to fill. Manage it intentionally.
- **Techniques:**
  - `/summarize`: Use it to condense the current state before it gets too long.
  - **The "Markdown Handoff"**: Before killing a session, ask the LLM: _"Create a technical summary of what we discussed and what is pending, formatted as a markdown file."_ Use this file to seed the next chat (Context Injection).
- **Task Decomposition:** Large tasks must be broken down so they fit into a single context window. This enforces better engineering planning.

---
