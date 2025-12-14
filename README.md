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
<img width="569" height="257" alt="image" src="https://github.com/user-attachments/assets/eb8cc0d8-f428-4e57-aa00-9f215ced9bbe" />

> [!credit]
> **Heavy inspiration / base code credit:** https://github.com/thiagocoutinhor/pf2-action-icons

---

## How to use

Write one of the supported tokens inside **inline code** (single backticks):

- `` `strm:r` ``
- `` `strm:1` ``
- `` `strm:u` ``

And that's it!
---

## Trigger format

All replacements are anchored to this pattern (case-insensitive): `strm: <token>`

| Action | Default input you type | Rendered output | CSS modifier class |
|---|---:|
| Reaction | `r` |
| Opportunity | `o` |
| Complication | `c` |
| 1 action | `1` |
| 2 actions | `2` |
| 3 actions | `3` |
| Free | `f` | `0` |
| Unlimited | `u` |

---

## Credits
[!credit]
Heavy inspiration / base code credit: https://github.com/thiagocoutinhor/pf2-action-icons
