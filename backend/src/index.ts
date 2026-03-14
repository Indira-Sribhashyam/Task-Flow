import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Load .env variables FIRST — before anything reads process.env
dotenv.config();

const app = express();

// ── Global Middleware ──────────────────────────────────────
// Allow requests from the Next.js frontend (any origin in dev)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ── Routes ────────────────────────────────────────────────
// Imported here so they're registered after middleware
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// ── Health Check ──────────────────────────────────────────
// Quick way to confirm the server is running (useful for Render/Railway)
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start listening.
// This prevents requests coming in before the DB is ready.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
