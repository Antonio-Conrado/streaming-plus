# Streaming Plus

**Streaming Plus** is a website to watch movies and series, mainly in Spanish, with subtitles available in some cases.

This project is built with **Next.js**, using **Tailwind CSS**, **DaisyUI**, and **Supabase** for user authentication and storing favorite media.

It consumes data from [The Movie Database (TMDb) API](https://www.themoviedb.org/) to fetch movie and series information.

## Online Demo

The frontend demo is available at:  
[https://streaming-plus-media.netlify.app](https://streaming-plus-media.netlify.app)

---

## Requirements

- Node.js (recommended >= 20)
- npm or yarn

You need to have the following accounts and credentials to run this project:

- **TMDb (The Movie Database)** account:  
  This project uses the TMDb API — not IMDb — to fetch movie and series information.  
  You must create a free account at [https://www.themoviedb.org/](https://www.themoviedb.org/) and generate an API key from your account settings.  
  This API key is required to access movie, series, and cast data.

- **Supabase** account:  
  Create an account at [https://supabase.com/](https://supabase.com/) and start a new project.  
  From the project settings, you will need:

  - The **Project URL**
  - The **anon public API key**  
    These are used in the frontend to connect to Supabase.

  Additionally, you will need the **JWT secret** from your Supabase project if you perform server-side verification or role-based access control (RLS).

Supabase is used in this project to:

- Authenticate users (sign up, log in, log out)
- Store each user's favorite movies and series

---

## Installation

1. Clone this repository:

```bash
  git clone https://github.com/Antonio-Conrado/streaming-plus.git
```

2. Navigate to the project folder:

   ```bash
   cd streaming-plus
   ```

3. Create a `.env` file in the root directory and copy the contents from `.env.template`, replacing the values with your own:

   ```bash
   cp .env.template .env
   ```

4. Install the dependencies:

   ```bash
   npm i
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

---
