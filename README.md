# matcha cozy 🍵

A macOS rice built around a warm matcha/beige/caffe latte palette. Minimal, functional, cozy.

> Tested on macOS Sequoia 15.7.4 — Intel MacBook Pro 13" 2020

---

## preview

<!-- screenshots coming soon -->

---

## stack

| role | tool |
|------|------|
| window manager | [AeroSpace](https://github.com/nikitabobko/AeroSpace) |
| status bar | [SketchyBar](https://github.com/FelixKratz/SketchyBar) |
| terminal | [Ghostty](https://ghostty.org) |
| shell prompt | [Starship](https://starship.rs) |
| desktop widgets | [Übersicht](https://tracesof.net/uebersicht/) |
| window borders | [JankyBorders](https://github.com/FelixKratz/JankyBorders) |
| app launcher | [Raycast](https://raycast.com) |
| fetch | [Fastfetch](https://github.com/fastfetch-cli/fastfetch) |

---

## fonts

- **[Monaspace Krypton](https://monaspace.githubnext.com)** — terminal & UI text
- **[JetBrainsMono Nerd Font](https://www.nerdfonts.com)** — icons throughout

```bash
brew install --cask font-monaspace
brew install --cask font-jetbrains-mono-nerd-font
```

---

## palette

| name | hex | usage |
|------|-----|-------|
| crust | `#1a1612` | darkest background |
| base | `#242018` | terminal background |
| mantle | `#2e2a20` | bar background |
| surface | `#3d3828` | borders, separators |
| matcha | `#8aab6e` | primary accent |
| sage | `#b5c9a1` | secondary accent |
| latte | `#c8b49a` | muted text |
| cream | `#e8dcc8` | primary text |
| peach | `#d4956a` | warm accent, warnings |

---

## dependencies

Install Homebrew first if you don't have it:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install everything:
```bash
# window manager
brew install --cask nikitabobko/tap/aerospace

# status bar
brew tap FelixKratz/formulae
brew install sketchybar
brew install lua
git clone https://github.com/FelixKratz/SbarLua.git /tmp/SbarLua && cd /tmp/SbarLua && make install

# terminal
brew install --cask ghostty

# shell prompt
brew install starship

# widgets
# download Übersicht from https://tracesof.net/uebersicht/

# borders
brew install FelixKratz/formulae/borders

# fetch
brew install fastfetch

# zsh plugins
brew install zsh-autosuggestions zsh-syntax-highlighting

# fonts
brew install --cask font-monaspace
brew install --cask font-jetbrains-mono-nerd-font
```

---

## setup

Clone the repo:
```bash
git clone https://github.com/rgabrex/MacOs-cozy-rice ~/Documents/GitHub/MacOs-cozy-rice
cd ~/Documents/GitHub/MacOs-cozy-rice
```

Copy configs to the right places:
```bash
# sketchybar
cp -r sketchybar ~/.config/sketchybar

# ghostty
cp -r ghostty ~/.config/ghostty

# fastfetch
cp -r fastfetch ~/.config/fastfetch

# borders
cp -r borders ~/.config/borders

# starship
cp starship.toml ~/.config/starship.toml

# aerospace
cp .aerospace.toml ~/.aerospace.toml

# zshrc
cp .zshrc ~/.zshrc

# übersicht widgets
cp -r ubersicht/* ~/Library/Application\ Support/Übersicht/widgets/
```

Start services:
```bash
brew services start sketchybar
brew services start borders
open -a AeroSpace
open -a Übersicht
```

Reload shell:
```bash
source ~/.zshrc
```

---

## aerospace keybinds

| keybind | action |
|---------|--------|
| `alt + h/j/k/l` | focus window left/down/up/right |
| `alt + shift + h/j/k/l` | move window |
| `alt + 1..5` | switch workspace |
| `alt + shift + 1..5` | move window to workspace |
| `alt + /` | toggle split orientation |
| `alt + shift + c` | reload config |

---

## ghostty keybinds

| keybind | action |
|---------|--------|
| `cmd + enter` | toggle fullscreen |
| `cmd + d` | split right |
| `cmd + shift + d` | split down |
| `cmd + t` | new tab |
| `cmd + w` | close pane |
| `cmd + \`` | toggle quick terminal |

---

## notes

- SketchyBar uses the Lua config from [FelixKratz/dotfiles](https://github.com/FelixKratz/dotfiles) as a base
- Übersicht widgets include: clock, weather (Milano), GitHub activity, Spotify, schedule, calendar, system info
- The wallpaper is a GIF embedded as base64 in `ubersicht/wallpaper.jsx` — replace it with your own
- JankyBorders uses `#8aab6e` for active windows and `#2e2a20` for inactive ones
