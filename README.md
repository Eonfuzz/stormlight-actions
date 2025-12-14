---
plugin: Stormlight Action Icons
type: documentation
tags:
  - obsidian/plugin
  - markdown
  - codemirror
---

# Stormlight Action Icons (Obsidian Plugin)

This plugin turns **inline code tokens** like `` `strm: r` `` into a styled **inline “action icon” widget** in both:

- **Reading mode** (rendered Markdown)
- **Live Preview** (CodeMirror editor)

It’s designed so you can type simple, searchable text tokens, while your notes display compact action glyphs via CSS.

> [!credit]
> **Heavy inspiration / base code credit:** https://github.com/thiagocoutinhor/pf2-action-icons

---

## How to use

Write one of the supported tokens inside **inline code** (single backticks):

- `` `strm: r` ``
- `` `strm: 1` ``
- `` `strm: u` ``

That’s it — the plugin replaces the inline code with a `<span>` in preview.

> [!important]
> It only matches when the inline code content is *just* the token (with optional whitespace).  
> Example ✅ `` `strm: r` ``  
> Example ❌ `` `do strm: r now` ``

---

## Trigger format

All replacements are anchored to this pattern (case-insensitive): `strm: <token>`


- Trigger word is **fixed**: `strm`
- Whitespace is flexible: `strm: r`, ` strm :   r ` etc.

---

## Supported actions

The plugin has two concepts per action:

1) **Input token** (what you type after `strm:`) — configurable via settings  
2) **Rendered text** (what the widget displays) — fixed in code (`ACTION_STRINGS`)

### Default inputs → rendered output

| Action | Default input you type | Rendered output | CSS modifier class |
|---|---:|---:|---|
| Reaction | `r` | `r` | `.strm-widget-r` |
| Opportunity | `o` | `o` | `.strm-widget-o` |
| Complication | `c` | `c` | `.strm-widget-c` |
| 1 action | `1` | `1` | `.strm-widget-1` |
| 2 actions | `2` | `2` | `.strm-widget-2` |
| 3 actions | `3` | `3` | `.strm-widget-3` |
| Free | `f` | `0` | `.strm-widget-u` *(see note)* |
| Unlimited | `u` | `8` | `.strm-widget-u` |

> [!note] Free action CSS class
> In the current code, **Free** renders `0` but uses the **unlimited** CSS modifier class: `.strm-widget-u`.  
> This is because the “command” for Free is set to `DEFAULT_SETTINGS.unlimited`.

### “Star”
`ACTION_STRINGS` includes `star: "s"` but there is **no replacement rule wired up** for it yet, so `` `strm: s` `` won’t render unless you add a corresponding replacement.

---

## Settings (what’s configurable)

The plugin loads settings from Obsidian’s stored plugin data and merges with defaults:

```ts
reaction: "r"
opportunity: "o"
complication: "c"
unlimited: "u"
one: "1"
two: "2"
three: "3"
free: "f"
```

## Credits
[!credit]
Heavy inspiration / base code credit: https://github.com/thiagocoutinhor/pf2-action-icons
