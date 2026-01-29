# IsItOpen 🏪✅

**IsItOpen** is a real-time, community-driven platform that helps users check if local businesses, banks, offices, and shops are currently **OPEN** or **CLOSED**. 

Stop guessing and start knowing before you go!

![Project Banner](https://via.placeholder.com/1200x600/10b981/ffffff?text=IsItOpen+Preview)

## 🚀 Features

-   **🔍 Smart Search**: Find places by name, category, city, or area. Supports natural queries like "Apollo Pharmacy at Indiranagar".
-   **⚡ Real-Time Status**: Get instant updates on whether a place is Open or Closed.
-   **👥 Crowdsourced Updates**: The community keeps data fresh by updating status in real-time.
-   **📍 Map Integration**: Pin precise locations using an interactive map (powered by Leaflet) when adding new places.
-   **🛡️ Confidence Scoring**: Smart backend logic detects conflicting updates to warn users if a status is uncertain.
-   **📱 Responsive Design**: Beautiful, mobile-first interface built with Tailwind CSS.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Backend**: [Hono](https://hono.dev/) (running on Next.js API Routes)
-   **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Maps**: [React Leaflet](https://react-leaflet.js.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   A MongoDB Atlas account (or local MongoDB instance)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/isitopen.git
    cd isitopen
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?appName=Cluster0
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
.
├── app/
│   ├── api/            # Hono backend API routes
│   └── ...             # Next.js App Router pages
├── components/         # Reusable UI components
├── lib/
│   ├── db.ts           # Database connection logic
│   └── models.ts       # Mongoose data models (Place, Status)
├── public/             # Static assets
└── ...
```

## 📡 API Documentation

The backend is built with **Hono** and exposed via Next.js API routes at `/api`.

| Method | Endpoint      | Description                          |
| :----- | :------------ | :----------------------------------- |
| `GET`  | `/api/health` | Check API status                     |
| `GET`  | `/api/search` | Search places (query params: `q`, `city`) |
| `GET`  | `/api/place`  | Get single place details by `id`     |
| `POST` | `/api/places` | Create a new place                   |
| `POST` | `/api/status` | Update status (OPEN/CLOSED)          |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
