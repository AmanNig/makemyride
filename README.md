
# MakeMyRide

A modern ridesharing web application for the Indian market, built with React, Zustand, Supabase, Stripe, and Socket.IO.

## Features

- 🚗 **Ridesharing Platform**: Connect drivers and riders for seamless travel.
- 🔥 **Real-time Updates**: Live ride status and notifications using Socket.IO.
- 🧑‍💻 **Authentication & Database**: Managed by [Supabase](https://supabase.com/).
- 💳 **Payments**: Secure payment processing with [Stripe](https://stripe.com/).
- 🌈 **Modern UI**: Built with React 18, Zustand for state management, and styled with TailwindCSS.
- 🍞 **Toasts & Notifications**: User feedback with react-hot-toast.
- ⚡ **Fast Development**: Powered by Vite for instant reloads and fast builds.

## Tech Stack

- [React 18](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Supabase JS](https://supabase.com/docs/reference/javascript/introduction)
- [Stripe Node](https://github.com/stripe/stripe-node)
- [Socket.IO Client](https://socket.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide React Icons](https://lucide.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/indian-rideshare.git
   cd indian-rideshare
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Supabase and Stripe credentials:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser:**
   ```
   http://localhost:5173
   ```

## Scripts

- `dev` - Start the Vite development server
- `build` - Build the app for production
- `preview` - Preview the production build
- `lint` - Run ESLint

## Folder Structure

```
.
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── store/          # Zustand stores
│   ├── utils/          # Utility functions
│   └── main.tsx        # App entry point
├── .env                # Environment variables
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements and bug fixes.

## License

[MIT](LICENSE)

---

**Indian Rideshare** – Making travel easier, together.
```
```

**Explanation:**

- The README covers project purpose, features, tech stack, setup instructions, scripts, folder structure, and contribution guidelines.
- Update the repository URL and add more details as your project evolves.
- Add badges, screenshots, or demo links as needed for a more engaging README.

