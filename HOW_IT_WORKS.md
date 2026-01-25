# How IsItOpen Works: System Logic & Workflow

This document outlines the technical and logical flow of the IsItOpen platform, ensuring transparency in how data is handled, updated, and presented.

## 1. Core Data Model

### Place
- Represents a physical establishment (Shop, Pharmacy, etc.).
- Contains basic info: Name, City, Area, Coordinates (`lat/lng`), Image, and Google Maps Link.

### Status
- Represents a single update (e.g., "Open" or "Closed").
- Linked to a `Place`.
- Timestampted (`createdAt`).
- **Crowd-Sourced**: Updates come from users (public) or staff.

---

## 2. Real-Time Status Logic

Unlike platforms that rely on static "9-5" schedules, IsItOpen relies on **Latest Confirmed Updates**.

### The "Most Recent Win" Rule
We do **not** use majority voting (e.g., "5 people say open vs 3 people say closed").
Why? Because availability changes instantly. If a shop closes at 8:00 PM, the update at 8:01 PM saying "Closed" is more true than the 10 updates from 7:00 PM saying "Open".

**Logic:**
1. Fetch all `Status` records for a place.
2. Sort by `createdAt` descending (newest first).
3. The top record determines the current status.

### Auto-Expiry
To prevent stale data from misleading users:
- If the latest update is older than **30 minutes**, the status automatically reverts to **"UNKNOWN"**.
- This forces a fresh check and encourages new updates.

### Confidence Monitor & Conflict Detection
To handle spam or confusion:
1. We analyze the last 3 updates.
2. If we detect conflicting signals (e.g., Open -> Closed -> Open) within a short window (15 minutes), the system flags the status as **"Uncertain"**.
3. This adds a warning badge to the UI ("⚠️ Status fluctuating").

---

## 3. Trust & Safety Mechanisms

### Anonymous Verification
- We do not require mandatory login (to double speed).
- However, we generate a one-way hash of the user's IP address.
- This allows us to track *activity* without storing *identity*.

### Rate Limiting
- A single IP hash cannot update the **same place** more than once every **10 minutes**.
- This prevents a single malicious actor from toggling the status repeatedly to annoy others.

---

## 4. User Workflow

1. **Search**: User searches for a place by Name or City.
   - *System*: Fuzzy search on keywords. Returns results sorted by creation date.
2. **View**: User sees a list of places with live badges ("Open", "Closed", "Unknown").
   - *System*: Computes status on-the-fly based on the logic above.
3. **Update**: A user physically at the location clicks "It's Open".
   - *System*:
     - Checks Rate Limit.
     - Saves new `Status` record.
     - Returns success.
   - The UI updates instantly for everyone.

---
