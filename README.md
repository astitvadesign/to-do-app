# Simple Frontend To‑Do App

This is a minimal no-backend to‑do app built with plain HTML, CSS and JavaScript. It supports:

- Create task
- View tasks
- Persistence using browser localStorage

- Create task
- View tasks
- Remove (delete) tasks

Files
- `index.html` — main UI
- `styles.css` — simple styling
- `app.js` — application logic (add & render tasks)

How to run

Open `index.html` directly in your browser, or serve the folder with a simple HTTP server (recommended if you want nicer behavior).

Python 3 quick server (runs on port 8000):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser and click `index.html`.

Notes
- Tasks are saved to localStorage under the key `todo_tasks_v1`.
- This app intentionally keeps features minimal: create and view. Want edit/delete, search, or priorities? I can add them.
