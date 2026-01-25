# Isitopen - Project Documentation

## 1. What Availability Confusion You Solved
Many public places (shops, pharmacies, government offices) have official operating hours, but real-life availability often differs due to holidays, lunch breaks, or unexpected closures. Existing maps apps often show incorrect or outdated "Open/Closed" statuses.
**Isitopen** solves this by providing a platform focused *solely* on real-time, crowd-sourced availability updates. We removed the ambiguity of "confirmed by phone call 3 weeks ago" and replaced it with "confirmed by a user 5 minutes ago".

## 2. How Users Check Availability
1.  **Search**: Users type a city, area, or category (e.g., "Apollo in Indiranagar") into the smart search bar.
2.  **View Status**: The results show cards with clear indicators: "OPEN RIGHT NOW" (Green), "CLOSED NOW" (Red), or "UNKNOWN" (Amber).
3.  **Timestamp Confidence**: Every status includes a precise timestamp (e.g., "Last updated 10 mins ago"). If data is old, we explicitly warn the user rather than guessing.
4.  **No Login Required**: Anyone can check status instantly without creating an account.

## 3. How Time Waste is Reduced
*   **Eliminates Unnecessary Travel**: Users don't drive to a location only to find the shutters down.
*   **Instant Verification**: Instead of calling multiple numbers that might not be answered, users check the live status in seconds.
*   **Smart Suggestions**: If a place is closed, the search results immediately list other nearby open alternatives in the same category.

## 4. What New Idea You Added
*   **"Status Decay" Logic**: Unlike standard directories where data stays static for years, our status updates have a "life span". If a status isn't refreshed recently, it degrades to "Unknown". This prioritizes *freshness* over *completeness*.
*   **Anonymous Trust System**: We implemented IP-hashing and rate-limiting to allow anonymous crowdsourcing while preventing spam, removing the friction of sign-ups while maintaining data integrity.
*   **Natural Language Search**: Users can type queries like "Medical shop near Gandhinagar" and our logic intelligently splits looking for the category "Medical" in the area "Gandhinagar".

## 5. Tech and Tools Used While Coding
*   **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Framer Motion (for animations).
*   **Backend**: Next.js API Routes (Hono-like structure), MongoDB (Database), Mongoose (ORM).
*   **UI Components**: Shadcn UI, Lucide React (Icons), Sonner (Toasts), Leaflet (Maps).
*   **Deployment**: Vercel.

## 6. Time Taken
*   **Total Development Time**: ~2 Days.
    *   *Day 1*: Planning, UI Design, Core Database Setup, and Basic Routing.
    *   *Day 2*: Implementing Search Logic, Map Integration, Animations, Testing, and Deployment fixes.
