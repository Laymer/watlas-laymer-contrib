# Warrior Atlas

A World of Warcraft: Forever leveling dashboard and companion addon for Laymer Migii, a Human Protection Warrior on US PvP. The atlas covers levels 46–60 and compares routes using elapsed XP per hour, including group formation, travel and PvP downtime.

## Run the dashboard

From the repository root, start a local server with Python 3.

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Open [the dashboard](http://127.0.0.1:8000/). On systems that use the `python3` command, substitute `python3` for `python`. The site is buildless. Character progress and session entries are stored in the browser for the origin where you use it.

## Install the addon

Extract [WarriorAtlas.zip](dist/assets/WarriorAtlas.zip) into the Forever installation's `Interface/AddOns/` folder. Alternatively, copy [addon/WarriorAtlas](addon/WarriorAtlas) into that folder. After enabling the addon, start a session with `/watlas start questing`, finish with `/watlas stop`, then type `/watlas export`. Paste the completed record into **Session log → Import addon**.

See [the addon guide](addon/WarriorAtlas/README.txt) for the full command list, recording details and live-client test checklist.

## Project layout

| Path | Contents |
| --- | --- |
| `dist/` | Website source, route planner, dungeon compendium, XP and gold calculators, session journal and research references |
| `dist/assets/` | Artwork, fonts and their license, and downloadable addon |
| `addon/WarriorAtlas/` | Addon Lua, interface manifest and installation guide |

The 05:00–06:00 morning comparison window uses Europe/Brussels. The research library and route guides retain their sources and distinguish measured XP rates from planning estimates.

The four WebP illustrations, paper texture and crest are creator-supplied artwork. Inter is distributed with its [SIL Open Font License](dist/assets/inter-license.txt).
