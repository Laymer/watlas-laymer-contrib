WARRIOR ATLAS 1.0.0
World of Warcraft: Forever | Interface 16001 | Levels 46–60

INSTALL ON WINDOWS
1. Close the game. In Battle.net, select WoW Forever, then Show in Explorer.
2. Extract this archive into World of Warcraft\_forever_\Interface\AddOns.
   The resulting path should end in AddOns\WarriorAtlas\WarriorAtlas.toc.
3. Start Forever, open AddOns on the character screen and enable Warrior Atlas.
   Enter the world on your leveling warrior and type /watlas help.

RECORD ONE COMPARABLE SESSION
• At the start of travel or group assembly, type /watlas start dungeon.
  Other modes: questing, grinding, mixed. With no mode the addon chooses
  Dungeon in a five-player instance and Questing elsewhere.
• The small, draggable meter shows elapsed time, XP gained, all-in XP/hour,
  wallet change, all deaths, time you marked as PvP downtime, and a route tip.
  /watlas hide hides it while recording; /watlas show restores it.
• Use /watlas pvp when a hostile encounter interrupts leveling. Repeat when
  you resume your route. These intervals are measured from your two presses.
  Deaths count every PLAYER_DEAD event the client delivers during the run.
• End after the final hand-in or return travel, using /watlas stop.
  Sessions survive /reload. The clock includes offline time if you log out
  before stopping. Stop before a long break when you want an online-only run.
• Type /watlas export. Copy the highlighted text with Ctrl+C (Cmd+C on Mac).
  In the Warrior Atlas website, open Session log and its addon import, paste
  the record and review it. The copy contains your session and character
  name. It has no account identifier, credentials, chat or combat log.
• /watlas history shows the latest ten sessions; /watlas export 2 opens
  the preceding session. Up to fifty are retained per character.

HOW TO READ IT
• XP is computed from the start/end bar readings and the Forever 46–60
  progression table, including level crossings, quest XP and rested kills.
  Your own total time includes waiting, travel, corpse runs and reset time.
• Wallet change uses carried copper at each endpoint. Repairs, trading,
  purchases and mail affect it. Item value remains outside this calculation.
• The exported weapon is the equipped main hand when you stop. If an item
  link is unavailable the optional weapon field is omitted. PvP minutes
  represent manually marked interruptions. The addon does not attribute
  deaths to attackers, identify factions, or scrape combat information.
• When there are at least ten recorded minutes in another activity near your
  level (within two levels), the advisor can compare your present run with
  the duration-weighted historical pace. Specific route tips and the
  two-interruption / three-minute PvP switch signal are planning heuristics.
• Everything is local. The game never sends a record to the website.
  Exporting again yields the same identifier for a finished session.
• API and math were checked outside WoW. A live-client test is still needed.

QUICK IN-GAME CHECK
1. Note your current XP, wallet, weapon, and time. Start questing.
2. Earn XP and inspect the meter. Reload the UI; the same run should resume.
3. Toggle /watlas pvp twice about ten seconds apart. Check the marked time.
4. Gain a level if convenient. The XP total should bridge the end of the old
   bar and the start of the new bar. Stop, export and paste into the site.
5. Compare exact end XP and wallet to the character UI. With the same pasted
   export, the website should recognize the existing session.

REFERENCES
Forever game version and TOC
https://warcraft.wiki.gg/wiki/TOC_format
https://github.com/realworldbuilder/wowwrapped/blob/main/docs/addon-api.md
https://github.com/Atraeau/WoW-Addons
Forever XP requirements
https://gearinsight.app/wow/en/forever/xp
API
https://warcraft.wiki.gg/wiki/API_UnitXP
https://warcraft.wiki.gg/wiki/API_GetMoney
https://warcraft.wiki.gg/wiki/API_GetInventoryItemLink
Dungeon levels
https://worldofwarcraft.blizzard.com/en-us/news/24301455
