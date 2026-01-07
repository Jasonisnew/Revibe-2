# Revibe Product Improvements (Cursor Task List)

---

## 1. Strengthen the Visual Design

**Reason:** The current style feels “too cute,” so it does not match a strong rehab / performance brand. A stronger look increases trust.

**Scope / Requirements:**
- Keep the existing design system (colors, typography, glassmorphism), but adjust **tone** (more athletic, more “precision + strength”).
- Improve layout consistency (spacing, alignment, section rhythm).
- Ensure accessibility (contrast, focus states, readable sizes).

---

## 2. Add Backend Data + Database

**Reason:** Without real stored data, core features can’t persist (users lose progress, history, plans).

**Scope / Requirements:**
- Add a database layer for key entities (at minimum: user profile, sessions, calendar items, movement library, chat history if needed).
- Add backend endpoints for CRUD where needed (create/read/update/delete).
- Handle loading, error, and empty states on the UI.
- Keep data handling secure (don’t expose secrets in the client).

---

## 3. Camera Function (MVP) + Movement Support

**Reason:** Camera-based form feedback is a main product value. The MVP needs to reliably run for core movements.

**Scope / Requirements:**
- Implement camera capture flow that works on both desktop + mobile.
- Provide clear permission UX (allow/deny handling, retry option).
- Connect camera output to movement detection pipeline (MVP).
- **Fix movement support:** make all targeted movements function **except the lateral raise** (explicitly exclude lateral raise for now).
- Add helpful guidance UI (positioning tips, “move back,” “move into frame,” etc.).

---

## 4. Home Page Routing + Functional Navigation Link

**Reason:** If the Home link does not work, users get lost and bounce.

**Scope / Requirements:**
- Make navigation to Home page always work (logo click + Home link).
- Ensure routes do not break on refresh (client-side routing config).
- Add active-state styling for nav items.

---

## 5. Make the Calendar Work

**Reason:** Scheduling and adherence are a rehab product core. A non-functional calendar blocks daily use.

**Scope / Requirements:**
- Implement full calendar flow (view, add session, edit session, delete session).
- Persist events in the database (not local-only).
- Add reminders or clear “upcoming session” UI if already in scope.
- Mobile-friendly calendar interaction (tap targets, scrolling, readable labels).

---

## 6. Add More Movements (More User Choice)

**Reason:** More movement options increase usefulness and retention.

**Scope / Requirements:**
- Add a “Movement Library” structure (categories, search/filter if possible).
- Ensure each movement has:
  - name, difficulty, target area, instructions, and demo asset if available
- Connect movements to camera sessions and to calendar scheduling.

---

## 7. AI Chat

**Reason:** AI chat improves guidance, motivation, and answers common rehab questions.

**Scope / Requirements:**
- Add AI chat UI (conversation list, message bubbles, typing state).
- Add safety UX (basic disclaimer, encourage professional care for pain red flags).
- Store chat history in database if required (or keep session-only for MVP, but define which).
- Ensure performance is smooth on mobile.

---

## 8. Change an API for a Function

**Reason:** If one feature depends on the wrong API or an outdated endpoint, it causes failures and inconsistent behavior.

**Scope / Requirements:**
- Identify the function using the incorrect API.
- Replace it with the correct endpoint/service.
- Update request/response handling (types, error states, retries if needed).
- Add minimal logging for debugging (dev-only).

---

## 9. Settings Page / Profile Page

**Reason:** Users need a place to manage identity, preferences, and progress settings.

**Scope / Requirements:**
- Add profile basics (name, email, goals, injury focus area, notification preferences).
- Connect to backend + database.
- Add clear save feedback (success/error).
- Ensure accessible forms (labels, validation, keyboard navigation).

---

## Notes

- Maintain existing design system (colors, typography, glassmorphism).
- Ensure all additions are responsive and accessible.
- Test on mobile widths **320px – 768px**.
- Optimize any images/assets that are added.
- Add proper **alt text** for any images/icons that convey meaning.
