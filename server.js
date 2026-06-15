import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize waitlist file if it doesn't exist
if (!fs.existsSync(WAITLIST_FILE)) {
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify([], null, 2));
}

// Serve the built frontend from dist/
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());
app.use(express.json());

// POST /api/waitlist - Add a new waitlist signup
app.post('/api/waitlist', (req, res) => {
  const { email, name, source } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    const waitlist = JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf-8'));

    // Check for duplicates
    const existing = waitlist.find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      return res.status(200).json({
        message: "You're already on the waitlist! We'll be in touch soon.",
        already_exists: true,
      });
    }

    const entry = {
      email: email.toLowerCase().trim(),
      name: name || 'Waitlist Subscriber',
      source: source || 'landing-page',
      signed_up_at: new Date().toISOString(),
    };

    waitlist.push(entry);
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));

    console.log(`[Waitlist] New signup: ${entry.email}`);

    res.status(201).json({
      message: "You're on the list! We'll be in touch soon.",
      already_exists: false,
    });
  } catch (err) {
    console.error('[Waitlist] Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/waitlist/count - Get total signup count (for internal use)
app.get('/api/waitlist/count', (req, res) => {
  try {
    const waitlist = JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf-8'));
    res.json({ count: waitlist.length });
  } catch (err) {
    res.json({ count: 0 });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[BillShield] Server running on http://0.0.0.0:${PORT}`);
});

// Catch-all: serve index.html for any unmatched route (SPA support)
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});