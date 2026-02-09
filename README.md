# VertexFlow

**VertexFlow** is a visual workflow editor that allows users to define and reason about pipelines using a **node-based canvas** instead of text configuration.

The project focuses on the **editing, state modeling, and validation layer** of workflow systems — specifically how complex graph-based logic can be created, modified, and validated interactively by users.

> This is intentionally **not** a full workflow execution engine. The scope is limited to composition, correctness, and UX clarity.

**Live Link:** https://vertexflow.vercel.app/

---

## Problem

As workflows grow, text-based configurations become hard to reason about:
- ordering mistakes are easy to make
- cycles are hard to detect visually
- small changes can break entire pipelines

For non-technical users especially, defining logic through JSON or YAML introduces unnecessary cognitive load.

Most failures in workflow systems happen **before execution** — during creation, editing, and validation.

---

## Solution

VertexFlow provides a **canvas-based editor** where users define workflows visually using connected nodes.  
The system emphasizes:
- predictable state updates under frequent mutations
- real-time structural feedback
- guardrails to prevent invalid pipelines

The goal is to make workflow structure **visible, inspectable, and safe to modify**.

---

## Scope & Non-Goals

This project intentionally focuses on a **realistic slice** of a larger system.

### In scope
- Visual workflow composition
- Graph state modeling
- Node and edge mutations
- Structural validation (DAG correctness)
- UX for non-technical users

### Out of scope
- Workflow execution
- Persistence / long-term storage
- Real-time collaboration
- Scheduling or retries

These boundaries were explicit tradeoffs to keep the system focused and correct.

---

## System Overview

VertexFlow is split into two clear layers:

1. **Editor Layer (Frontend)**  
   Responsible for user interaction, graph editing, and state consistency.

2. **Validation Layer (Backend)**  
   Responsible for verifying pipeline structure and enforcing correctness rules.

This mirrors how production systems separate **editor state** from **trusted validation logic**.

---

## Key Design Decisions

### Canvas-Based Interaction

A canvas model was chosen over form-based configuration to:
- support non-linear editing
- allow spatial reasoning about logic
- reduce cognitive load as pipelines scale

Node interactions include drag, resize, connect, and delete — all of which must keep graph state consistent.

---

### Centralized Graph State

Graph state (nodes, edges, IDs, mutations) is managed in a **centralized store** rather than component-level state.

This was necessary because:
- multiple UI components mutate shared state
- graph changes are event-driven and non-linear
- consistency must be preserved during frequent updates

A lightweight global store was preferred over prop drilling or local reducers to keep updates predictable and debuggable.

---

### Dynamic Text Parsing & Handles

Text nodes support variable interpolation using `{{variable}}` syntax.

This required:
- regex-based parsing of user input
- real-time detection of variable additions/removals
- dynamic creation and removal of input handles
- synchronization between UI and graph state

This models how templated data flows are handled in real workflow systems.

---

### Validation as a Separate Concern

Pipeline validation is handled server-side via a minimal API.

The backend:
- receives the current graph structure
- checks for cycles using topological sorting
- returns structural validity

This enforces correctness independently of client state and mirrors real-world trust boundaries.

---

## Failure Cases Considered

The system explicitly handles:
- node deletion with existing connections
- invalid or circular graph structures
- stale edges during rapid UI interactions
- inconsistent state during drag / resize operations

These cases were prioritized over feature breadth.

---

## Tradeoffs

- Prioritized clarity and correctness over feature depth
- Deferred execution to keep scope focused
- Kept backend intentionally minimal
- Optimized for single-user workflows

These tradeoffs were chosen deliberately, not due to limitations.

---

## What I’d Improve Next

With more time, I would explore:
- persistence and versioning
- richer validation rules per node
- collaborative editing
- execution simulation
- performance optimization for large graphs

---

## Tech Stack

### Frontend
- React 18
- React Flow
- Zustand
- CSS Variables (custom theming)

### Backend
- FastAPI (Python)
- DAG validation via topological sorting
- CORS-enabled API boundary

---

## Running Locally

### Prerequisites
- Node.js (v14+)
- Python 3.8+

### Frontend
```bash
cd frontend
npm install
npm start
```
### Backend
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Both services must be running for validation to work.

---

## Project Structure
` ` `text
VertexFlow/
├── frontend/
│   ├── src/
│   │   ├── store.js        # Centralized graph state
│   │   ├── ui.js           # Canvas configuration
│   │   ├── nodes/          # Node implementations
│   │   └── ...
├── backend/
│   └── main.py             # Pipeline validation API
└── README.md
` ` `
---

## Closing Note

VertexFlow is not a demo of libraries — it’s a focused exploration of how visual workflow editors behave under real interaction constraints.

The emphasis is on state modeling, correctness, and UX clarity, not on feature completeness.
