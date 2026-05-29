# pi-todos

File-backed todo system for [pi](https://pi.dev). Persistent tasks across sessions, stored as real markdown files with JSON front matter.

Originally from [mitsuhiko/agent-stuff](https://github.com/mitsuhiko/agent-stuff/blob/main/pi-extensions/todos.ts). Adapted for use in [dmmulroy/.dotfiles](https://github.com/dmmulroy/.dotfiles/).

## What it does

Gives pi a persistent todo system backed by real files instead of conversation-only state:

- **Agent tool** — `todo` tool with actions: `list`, `list-all`, `get`, `create`, `update`, `append`, `delete`, `claim`, `release`
- **Human command** — `/todos` opens an interactive TUI browser with search, claim, close, reopen, delete, copy
- **File format** — Each todo is a standalone markdown file with JSON front matter: `{ id, title, tags, status, created_at, assigned_to_session }`
- **Session assignment** — Claim tasks to avoid conflicts, close when done
- **Garbage collection** — Auto-deletes closed todos older than 7 days
- **Locking** — File-based locks prevent concurrent edit conflicts

## Install

```bash
pi install npm:pi-todos
```

Or try it without installing:

```bash
pi -e npm:pi-todos
```

## Usage

### Agent tool

Ask the agent to manage todos:

- "list my todos"
- "create a todo to add tests for the tmux config"
- "claim TODO-deadbeef and start working on it"
- "append implementation notes to TODO-deadbeef"
- "close TODO-deadbeef"

### Interactive command

```bash
/todos
```

Opens a searchable todo browser. Keyboard shortcuts:
- `↑/↓` — select todo
- `Enter` — action menu
- `Ctrl+Shift+W` — work on selected todo
- `Ctrl+Shift+R` — refine selected todo
- `Esc` — close

## Storage

Default location: `.pi/todos/` in the current working directory.

Override with environment variable:

```bash
export PI_TODO_PATH=/absolute/or/relative/path
```

## No configuration needed

Works out of the box. Optional settings file at `.pi/todos/settings.json`:

```json
{
  "gc": true,
  "gcDays": 7
}
```
