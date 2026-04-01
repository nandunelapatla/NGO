# 🌿 HopeFoundation — NGO Website

A full-stack, responsive NGO website built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and **Firebase** (Firestore + Authentication).

---

## 🌍 Live Demo

👉 **[https://ngo-two-plum.vercel.app](https://ngo-two-plum.vercel.app)**

---

## ✨ Features

### 🏠 Pages
- **Home** — Hero banner, mission cards, animated counters, featured projects, testimonials
- **About Us** — NGO history, vision & mission cards, team grid
- **Our Works** — Filterable project grid (Education, Health, Environment, Community)
- **Register as Volunteer** — Full form with validation + Firebase Firestore integration
- **Photo Gallery** — Category filters, image grid, lightbox with prev/next navigation
- **Contact Us** — Contact form, address info, embedded Google Maps
- **Admin Panel** — Protected route, volunteer data table from Firestore

### 🔐 Authentication
- Hardcoded admin login (`admin / admin123`) — demo only
- **Google Authentication** via Firebase Auth

### 🌟 Extra Features
- 🌙 Dark mode toggle (persists via localStorage)
- ⬆️ Back-to-top floating button
- ⏳ Loading spinner on first load
- 📱 Fully mobile responsive
- 🔍 SEO optimized with React Helmet
- 🚫 Duplicate email prevention on volunteer form

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Routing | React Router DOM v6 |
| Forms | React Hook Form |
| Notifications | React Toastify |
| Icons | Lucide React |
| Database | Firebase Firestore |
| Authentication | Firebase Auth + Google |
| SEO | React Helmet Async |
| Deployment | Vercel |

---

## 📁 Folder Structure
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── ProjectCard.jsx
│   ├── TeamCard.jsx
│   ├── GalleryItem.jsx
│   └── Lightbox.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── OurWorks.jsx
│   ├── Volunteer.jsx
│   ├── Gallery.jsx
│   ├── Contact.jsx
│   └── Admin.jsx
├── firebase.js
├── App.jsx
└── main.jsx
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Firebase account

### 1. Clone the repository
```bash
git clone https://github.com/nandunelapatla/NGO.git
cd NGO
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Firestore Database** (test mode)
4. Enable **Authentication** → Google sign-in
5. Register a Web App and copy the config

### 4. Create `.env` file
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Run the development server
```bash
npm run dev
```

---

## 🔥 Firebase Setup

### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Firestore Collections
- `volunteers` — from Volunteer registration form
- `contacts` — from Contact Us form

---

## 🔑 Admin Panel

Access at `/admin` route:

| Method | Credentials |
|--------|------------|
| Hardcoded | `admin` / `admin123` |
| Google Auth | Any Google account |

---

## 📦 Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 👨‍💻 Developer

**Nanda Kishor Reddy Nelapatla**  
B.Tech CSE (Data Science) — Geethanjali College of Engineering and Technology

---

## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com/) — Backend & Auth
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Lucide React](https://lucide.dev/) — Icons
- [Vercel](https://vercel.com/) — Deployment
