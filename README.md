# Claude Chat Tree Viewer

A browser-based viewer for Claude conversation trees, showing all branches and alternate responses in three views: tree, linear, and minimap.

## Live Demo

[View the demo](<VERCEL_URL>)

## Features

- **Tree View** -- hierarchical display showing branch points and all paths through the conversation
- **Linear View** -- flat, chat-style reading of any single branch with tab switching
- **Minimap View** -- bird's-eye overview of the entire conversation tree with hover tooltips
- Dark theme optimized for readability
- Highlights active leaf path and branch points
- Expand/collapse individual messages or all at once
- Load your own exported JSON to explore any conversation

## Usage

### Viewing conversations

1. Visit the [live demo](<VERCEL_URL>) or open `index.html` locally
2. The demo conversation loads automatically
3. Click **Load JSON** in the toolbar to view your own exported conversation

### Extracting conversations from claude.ai

1. Open [claude.ai](https://claude.ai) and navigate to the conversation you want to export
2. Open your browser's DevTools console (F12 or Cmd+Shift+J)
3. Paste the contents of `script.js` into the console and press Enter
4. The script fetches the full conversation tree (including all branches) and downloads it as a JSON file
5. Load the downloaded JSON into the viewer

## How it works

Claude conversations are trees, not linear threads. When you edit a message or regenerate a response, Claude creates a new branch rather than overwriting the old one. The standard Claude UI only shows one path at a time. This viewer renders the entire tree so you can see all branches and alternate responses.

## Files

- `index.html` -- the complete viewer application (HTML + CSS + JS, no build step)
- `script.js` -- browser console script for extracting conversations from claude.ai
- `demo.json` -- sample conversation data loaded by default

## License

MIT
