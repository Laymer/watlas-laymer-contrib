(() => {
  'use strict';

  const dungeonOverview = ['Blizzard · Forever dungeon locations and level ranges', 'https://worldofwarcraft.blizzard.com/en-us/news/24301455/explore-the-new-dungeons-of-world-of-warcraft-forever'];
  const dungeonXP = ['Blizzard · Dungeon XP and group level differences', 'https://us.forums.blizzard.com/en/wow/t/player-level-dungeon-xp-adjustment-november-14/2416343/1'];
  const art = { desert: 'assets/desert.webp', forest: 'assets/forest.webp', ruins: 'assets/ruins.webp', chart: 'assets/paper.png' };
  const items = [
    {
      id: 'zul-farrak', title: 'Zul’Farrak', zone: 'Tanaris', type: 'Dungeon', min: 46, max: 49, art: 'ruins',
      description: 'Stack Gadgetzan quests and tank the Sandfury ruins with a level-matched party.',
      staging: 'Gadgetzan', group: '5 players', evidence: 'Forever dungeon guide',
      steps: [
        ['Before you ride', 'Pick up Troll Temper from Trenton Lighthammer (51.4, 28.6) and Divino-matic Rod from Chief Engineer Bilgewhizzle (52.4, 28.4). Check Tran’rek (51.6, 26.8) for Scarab Shells if available.'],
        ['Form up in Tanaris', 'Recruit while working nearby objectives. Once your healer and damage dealers are ready, ride northwest from Gadgetzan to the walled entrance around (39, 20).'],
        ['Agree on the objectives', 'Loot trolls and beetles for your quests. Confirm the party plans the prisoner event for Sergeant Bly’s rod. Add Gahz’rilla only if someone brings the mallet.'],
        ['Time the whole run', 'Count travel, recruitment and turn-ins. Record a first-clear session separately from repeats so one-time quest XP does not inflate your repeat estimate.']
      ],
      fallback: 'Stay in Tanaris and work the Steamwheedle pirate quests while watching for a healer.',
      refs: [['Icy Veins · Forever quest pickups and prerequisites', 'https://www.icy-veins.com/wow-forever/zul-farrak-quests'], ['Wowhead · Forever Zul’Farrak strategy', 'https://www.wowhead.com/forever/guide/zulfarrak-dungeon-overview-location-rewards'], dungeonXP]
    },
    {
      id: 'tanaris', title: 'Tanaris quest circuit', zone: 'Tanaris', type: 'Questing', min: 46, max: 49, art: 'desert',
      description: 'Pair the Steamwheedle pirate bounties on one coastal loop from Gadgetzan.',
      staging: 'Steamwheedle Port', group: 'Solo', evidence: 'Forever quest records',
      steps: [
        ['Start at the port', 'Ride east from Gadgetzan. At Steamwheedle Port, take Pirate Hats Ahoy! from Haughty Modiste (66.6, 22.3) and Southsea Shakedown from Security Chief Bilgewhizzle (67.1, 23.9).'],
        ['Work the coast', 'Ride south to Lost Rigger Cove. Kill Southsea pirates for both objectives and loot each body as you advance. Pull from the camp edge to avoid extra runners.'],
        ['Finish in one trip', 'Check the remaining pirate types before riding back. Turn in both quests together at the port, then return to Gadgetzan or join a ready Zul’Farrak group.']
      ],
      fallback: 'If the cove is contested, try the active Wastewander chain east of Gadgetzan or shift to Feralas if your hearthstone is there.',
      refs: [['Forever quest data · Pirate Hats Ahoy! and nearby pickups', 'https://www.wowforeveraddon.com/guides/quests/tanaris/pirate-hats-ahoy/'], ['Forever Tavern · Tanaris quest objectives', 'https://forever-tavern.com/zones/tanaris/']]
    },
    {
      id: 'feralas', title: 'Feralas field loop', zone: 'Feralas', type: 'Grinding', min: 46, max: 49, art: 'forest',
      description: 'Use Feathermoon’s yeti-hide chain to give a short solo grind a clear finish.',
      staging: 'Feathermoon Stronghold', group: 'Solo', evidence: 'Forever quest records',
      steps: [
        ['Check your quest log', 'Visit Pratt McGrubben at Feathermoon Stronghold (30.6, 42.7). Start The Mark of Quality or, if you finished it, pick up Improved Quality.'],
        ['Match the camp to the quest', 'For The Mark of Quality, hunt Feral Scar yetis in Feral Scar Vale. For Improved Quality, move to Rage Scar Hold and kill Rage Scar yetis. The two quests require different hides.'],
        ['Measure a short pull circuit', 'Work single targets and pairs near the camp edge. Include recovery and any PvP interruptions in your timer. Return to Pratt when you have the ten hides for your current quest.']
      ],
      fallback: 'If hides are finished and kill XP slows, move on to Tanaris. Treat an OOX beacon drop as an optional bonus.',
      refs: [['Questing.wiki · The Mark of Quality', 'https://questing.wiki/wow-forever/quests/2821/'], ['Azeroth Wiki · Improved Quality', 'https://azeroth.wiki/forever/quests/improved-quality']]
    },
    {
      id: 'dunemaul', title: 'Dunemaul ogre circuit', zone: 'Tanaris', type: 'Grinding', min: 46, max: 48, art: 'desert',
      description: 'Measure a camp of level 45–46 melee ogres southwest of Gadgetzan.',
      staging: 'Dunemaul Compound', group: 'Solo', evidence: 'Community spawn map',
      steps: [
        ['Find the camp', 'Ride southwest from Gadgetzan to Dunemaul Compound. The Forever spawn guide places a concentration of ordinary Dunemaul Ogres near (38.4, 53.8). Check the unit nameplate and level before pulling.'],
        ['Benchmark one circuit', 'Record a ten-minute block from your first pull. Keep to melee ogres where possible, leave room for runners, and count time spent bandaging or looking for the next target.'],
        ['Decide whether to stay', 'If you finish a circuit before targets return, move rather than wait. Land Ragers (45–47) cluster around (45.6, 48.4). Farther east, Wastewander Assassins (44–45) cluster near (61.8, 35.6).']
      ],
      fallback: 'When a hostile party camps central Tanaris, try Feralas yetis if already bound there. In the Eastern Kingdoms, try non-elite Vilebranch Axe Throwers (45–46) near (46.6, 66.4) in the Hinterlands, west of the elite trolls at Jintha’Alor.',
      refs: [['The Forever Guides · Mapped targets, levels and camp coordinates', 'https://theforeverguides.com/leveling/grinding-40-50/'], ['Polestar · Alliance Tanaris 46–48 route', 'https://polestar.guide/guides/alliance/40-50/04-tanaris'], ['NoHitJerome · Level 40–50 grinding segment (6:45)', 'https://www.youtube.com/watch?v=OV8ZSM62r4Y&t=405s'], ['NoHitJerome · Supplied level 46 guide (contents unverified)', 'https://nohitjerome.com/wow-forever/grind/level-46/']]
    },
    {
      id: 'alcaz', title: 'Alcaz Prison', zone: 'Dustwallow Marsh', type: 'Dungeon', min: 48, max: 53, art: 'chart',
      description: 'Stage at Theramore for Forever’s five-player island prison.',
      staging: 'Theramore Isle', group: '5 players', evidence: 'Blizzard · Forever',
      steps: [
        ['Prepare the Alliance chain', 'If you pass through Stormwind, visit Master Mathias Shaw for Our Man in Theramore. The Alliance prison quests depend on this chain. Check its current step before expecting an in-dungeon turn-in.'],
        ['Rally at Theramore', 'Confirm the party is ready before traveling to Alcaz Island in northeastern Dustwallow Marsh. Bring repairs and supplies from town.'],
        ['Choose your clear', 'Agree which quest targets the group needs. As a lower-bracket tank, start with small pulls and use the first packs to judge incoming damage and healer recovery.'],
        ['Decide on a second run', 'Compare total XP per elapsed hour with your solo log, including the island journey. Keep a repeat group only while the numbers work.']
      ],
      fallback: 'If the group dissolves before departure, continue Tanaris or a Searing Gorge circuit, depending on your flight paths.',
      refs: [dungeonOverview, ['Icy Veins · Alliance prison quest chains', 'https://www.icy-veins.com/wow-forever/alcaz-prison-quests'], dungeonXP]
    },
    {
      id: 'searing-gorge', title: 'Thorium Point circuit', zone: 'Searing Gorge', type: 'Questing', min: 48, max: 52, art: 'ruins',
      description: 'Clear Dark Iron work camps and return to Thorium Point with several objectives.',
      staging: 'Thorium Point', group: 'Solo', evidence: 'Forever quest records',
      steps: [
        ['Read the noticeboard', 'At Thorium Point (37.6, 26.5), take JOB OPPORTUNITY: Culling the Competition. Check the hub for Fiery Menace! and Curse These Fat Fingers.'],
        ['Work the Dark Iron camps', 'Target Dark Iron Taskmasters and Slavers for Culling the Competition. Complete the spider and golem objectives where they overlap your return journey.'],
        ['Turn in together', 'Return to Taskmaster Scrange (39.0, 27.5) and the other givers once their objectives are complete. If you see an ore node along your line of travel, take it between pulls.']
      ],
      fallback: 'A crowded camp makes this loop expensive on a PvP realm. Swap to a second objective or begin the next Un’Goro circuit once you reach its bracket.',
      refs: [['Azeroth Wiki · Culling the Competition', 'https://azeroth.wiki/forever/quests/job-opportunity-culling-the-competition'], ['Forever zone map · Thorium Point quest cluster', 'https://www.wowforeveraddon.com/zones/searing-gorge/']]
    },
    {
      id: 'felwood', title: 'Deadwood Village', zone: 'Felwood', type: 'Grinding', min: 48, max: 51, art: 'forest',
      description: 'Test a compact furbolg circuit at the southern entrance to Felwood.',
      staging: 'Emerald Sanctuary', group: 'Solo', evidence: 'Forever quest records',
      steps: [
        ['Pick up Timbermaw Ally', 'Look for Grazle near Emerald Sanctuary (50.9, 85.0). Head to Deadwood Village, southwest of him at roughly (48, 91).'],
        ['Rotate through the village', 'Kill six each of the Deadwood Warriors, Gardeners and Pathfinders. Work from the outer edge so a runner does not bring the rest of a tent.'],
        ['Check your rate', 'Return to Grazle. Continuing on kills alone is worthwhile only while your measured pace competes with your remaining quest circuits.']
      ],
      fallback: 'If Deadwood Village is camped, switch to Thorium Point’s Dark Iron tasks in the Eastern Kingdoms on your next relocation. With only a few minutes left, complete another nearby Felwood objective instead of crossing continents.',
      refs: [['Azeroth Wiki · Timbermaw Ally', 'https://azeroth.wiki/forever/quests/timbermaw-ally'], ['Bind on Forever · Deadwood Village map', 'https://bindonforever.com/quest/8460']]
    },
    {
      id: 'maraudon', title: 'Maraudon Princess run', zone: 'Desolace', type: 'Dungeon', min: 50, max: 53, art: 'chart',
      description: 'Tank the Earth Song Falls route and claim the one-handed Thrash Blade quest reward.',
      staging: 'Nijel’s Point', group: '5 players', evidence: 'Forever quest records',
      steps: [
        ['Bank the quest from 45', 'At Nijel’s Point, take Corruption of Earth and Seed from Keeper Marandis (63.8, 10.6). The level-45 requirement lets you prepare early. Princess Theradras is a level-51 elite, so aim to tank her around level 50–52 with suitable gear and a ready healer.'],
        ['Agree on the entrance', 'Travel to the Valley of Spears in western Desolace. For a short Princess run, ask whether someone can open the Earth Song Falls shortcut with the Scepter of Celebras. A party using an outer wing needs a longer session.'],
        ['Kill the Princess', 'In inner Maraudon, stay with the agreed route to Princess Theradras. Confirm the kill appears in your quest log before leaving.'],
        ['Choose the weapon', 'Return to Keeper Marandis and compare Thrash Blade with your current one-hander. It is a selectable quest reward. If you take it, measure the change in solo kill pace before spending more time on weapon farming.']
      ],
      fallback: 'If nobody has the shortcut or the group is far away, stay with your current outdoor circuit. Save the quest for a confirmed Princess party.',
      refs: [['Questing.wiki · Alliance Thrash Blade quest and minimum level', 'https://questing.wiki/wow-forever/quests/7065/'], ['Bind on Forever · Princess Theradras level', 'https://bindonforever.com/npc/12201'], ['Forever Tavern · Maraudon and the Earth Song Falls shortcut', 'https://forever-tavern.com/dungeons/maraudon/']]
    },
    {
      id: 'ungoro', title: 'Un’Goro expedition', zone: 'Un’Goro Crater', type: 'Questing', min: 50, max: 55, art: 'forest',
      description: 'Pair Torwa’s wildlife quests with a crystal-gathering loop around the crater.',
      staging: 'Marshal’s Refuge', group: 'Solo', evidence: 'Forever quest records',
      steps: [
        ['Enter from Tanaris', 'Meet Torwa Pathfinder by the southeastern ramp (71.6, 76.0). Pick up The Fare of Lar’korwi and The Apes of Un’Goro if available.'],
        ['Open the northern hub', 'Collect colored power crystals encountered on the ride to Marshal’s Refuge. Unlock the flight path and visit J.D. Collie for Crystals of Power.'],
        ['Batch your objectives', 'Plan each ride for one side of the crater. Return the seven crystals of each color when ready and take the pylon investigations for your next trips. Watch for roaming elite devilsaurs.']
      ],
      fallback: 'If hostile players control Marshal’s Refuge, stay on the southeastern wildlife objectives near Torwa until the hub clears. At level 53+, Chillwind Camp in the Western Plaguelands offers a different continent for your next session.',
      refs: [['Questing.wiki · Crystals of Power and follow-ups', 'https://questing.wiki/wow-forever/quests/4284/'], ['Forever XP · Un’Goro quest index', 'https://forever-xp.com/quests/zone/un-goro-crater/'], ['WGE · Un’Goro route and hub locations', 'https://worstguidesever.com/wow-forever-ungoro-crater-leveling-guide/']]
    },
    {
      id: 'sunken-temple', title: 'Sunken Temple', zone: 'Swamp of Sorrows', type: 'Dungeon', min: 52, max: 55, art: 'chart',
      description: 'Bank the Warrior class quest before a planned Temple of Atal’Hakkar clear.',
      staging: 'Pool of Tears', group: '5 players', evidence: 'Forever class guide',
      steps: [
        ['Prepare at level 50+', 'Pick up A Troubled Spirit from a Warrior trainer in a major city. Follow the chain through the Fallen Hero of the Horde near the Blasted Lands border until you hold Voodoo Feathers.'],
        ['Set the route with your party', 'Meet at the Pool of Tears in the Swamp of Sorrows. Confirm that the group will kill the troll minibosses required for the feathers.'],
        ['Clear and hand in', 'Check the quest tracker before leaving the dungeon, then return to the Fallen Hero. Use your log to decide whether another clear without the class quest merits the travel.']
      ],
      fallback: 'If the shoreline or entrance is camped and you cannot assemble safely, return to the Blasted Lands for unfinished Warrior chain steps. For the next session, choose a quieter Un’Goro or Chillwind quest circuit.',
      refs: [['Icy Veins · Warrior class quests in Forever', 'https://www.icy-veins.com/wow-forever/warrior-class-quests'], ['Warcraft Tavern · Sunken Temple quests', 'https://www.warcrafttavern.com/forever/guides/sunken-temple-quests/']]
    },
    {
      id: 'chillwind', title: 'The Scourge cauldrons', zone: 'Western Plaguelands', type: 'Questing', min: 53, max: 58, art: 'ruins',
      description: 'Use the Alliance base at Chillwind Camp to connect the plagued farms.',
      staging: 'Chillwind Camp', group: 'Solo', evidence: 'Forever quest records',
      steps: [
        ['Start at Chillwind', 'Visit Commander Ashlam Valorfist at the camp (42.7, 84.0). Complete Clear the Way, then speak with High Priestess MacDonnell for the cauldron chain.'],
        ['Take the farms in order', 'Start at Felstone Field and accept the return quest at its cauldron. Back at Chillwind, take the next farm assignment for Dalson’s Tears.'],
        ['Advance with your level', 'Continue to the Writhing Haunt and later Gahrron’s Withering. Leave the higher-level farm for another session if the packs are taking too long to clear.']
      ],
      fallback: 'If another faction controls the farm, move east and start Tirion’s wildlife objectives once its enemies are manageable.',
      refs: [['PullCall · Alliance cauldron chain', 'https://pullcall.com/forever/db/quest/5215-the-scourge-cauldrons'], ['Forever quest data · Clear the Way', 'https://www.wowforeveraddon.com/guides/quests/western-plaguelands/clear-the-way/']]
    },
    {
      id: 'blackrock-depths', title: 'Blackrock Depths prison wing', zone: 'Blackrock Mountain', type: 'Dungeon', min: 53, max: 57, art: 'chart',
      description: 'Plan a short Detention Block run with Dark Iron drops and available prisoner objectives.',
      staging: 'Morgan’s Vigil', group: '5 players', evidence: 'Forever dungeon guide',
      steps: [
        ['Collect the local work', 'At Morgan’s Vigil, take The Good Stuff from Oralius (84.6, 68.6) at level 50+. If Marshal Maxwell offers Marshal Windsor, take it too. That quest needs the Dragonkin Menace and True Masters chain; check before promising the party a Windsor objective.'],
        ['Add Kharan if ready', 'Kharan Mighthammer is available from King Magni in Ironforge after The Smoldering Ruins of Thaurissan chain. Carry it when already prepared; making a fresh cross-zone detour can defeat the point of a short wing.'],
        ['Stop at the prison', 'Enter Blackrock Depths in Blackrock Mountain. Clear the Detention Block to High Interrogator Gerstahn, loot the Prison Cell Key and speak with the prisoners named in your log. Loot Dark Iron dwarves along the way.'],
        ['Hand in and review', 'Return to Morgan’s Vigil or Ironforge for your completed objectives. The twenty Dark Iron Fanny Packs can take multiple runs. Book an Emperor clear or the later Windsor escort as a separate session.']
      ],
      fallback: 'If Blackrock Mountain’s approach is being camped, stay at Morgan’s Vigil for local quests or move north to the Chillwind farm circuit when travel time permits.',
      refs: [['Icy Veins · BRD Alliance pickups and prerequisite chains', 'https://www.icy-veins.com/wow-forever/blackrock-depths-quests'], ['Questing.wiki · Prison key and quest planning', 'https://questing.wiki/wow-forever/dungeons/blackrock-depths/quests/'], ['WoWBocho · Detention Block and Gerstahn', 'https://wowbocho.com/forever/dungeon/brd/?ui=en']]
    },
    {
      id: 'mount-hyjal', title: 'Mount Hyjal foothills', zone: 'Mount Hyjal', type: 'Questing', min: 55, max: 60, art: 'forest',
      description: 'Open the Tainted Foothills flight and stack surface quests in Forever’s new high-level zone.',
      staging: 'Everlook', group: 'Solo', evidence: 'Forever field guide',
      steps: [
        ['Approach from Winterspring', 'Start from Everlook, ride south through Darkwhisper Gorge and follow the passage into Mount Hyjal. This is the outdoor zone. Allow extra time for the first trip and give elite patrols a wide berth.'],
        ['Learn the flight path', 'Speak to Bluebell at the Tainted Foothills flight point near (55, 83). This makes later returns from Everlook much shorter. The 55–60 band is a planning bracket; some opening quests become available at 54.'],
        ['Work the foothills', 'Check Ketharas in the foothills for Hope for Hatchlings and gather the Hyjal Owl Eggs. Pick up Leaves to Ligatures when available and collect Verdant Leaves along your route. Skip elite objectives if you are solo.'],
        ['Move up the mountain', 'When the foothill objectives are finished, visit Elderwild and check the Alliance quests from Sefira Everbright. At the upper end of the bracket, continue toward the Summit of Eternity or cash in ready turn-ins for the final level.']
      ],
      fallback: 'If enemy players control the gorge or the foothills flight, return to Everlook for the Ice Thistle loop. If you have already unlocked Hyjal’s flight, use it to bypass the gorge next session.',
      refs: [['Bind on Forever · Winterspring approach and 55–60 field route', 'https://bindonforever.com/articles/wow-forever-mount-hyjal-guide'], ['WoW Forever Outpost · Alliance entry quests and access caveats', 'https://wofwforever.com/en/guides/wow-forever-mount-hyjal-access/'], ['Hardcore Helper · Hope for Hatchlings', 'https://www.hardcorehelper.com/forever/guides/wow-forever-leveling-guide-55-60'], ['Bind on Forever · Leaves to Ligatures', 'https://bindonforever.com/quest/91755']]
    },
    {
      id: 'blackmaw', title: 'Blackmaw Hold', zone: 'Azshara', type: 'Dungeon', min: 55, max: 60, art: 'chart',
      description: 'Take a prepared party into the furbolg tunnels of northern Azshara.',
      staging: 'Talrendis Point', group: '5 players', evidence: 'Blizzard · Forever',
      steps: [
        ['Form in Azshara', 'Agree on the wing or boss you intend to finish. Blizzard lists a 55–60 level range and describes a substantial dungeon with multiple routes. Budget the session for the chosen segment.'],
        ['Find the outer gate', 'If you have the Talrendis Point flight, use it as your Alliance staging point and ride north. Look for the furbolg tunnel approach near (38.5, 33.3).'],
        ['Measure a first segment', 'Check early pulls for tank survivability, kill XP and healer pace. Repeat the segment only if the full group is staying and the previous session beat your solo route.']
      ],
      fallback: 'A level-55 tank with a scattered group can continue western Plaguelands quests or a level-appropriate outdoor route already in progress.',
      refs: [dungeonOverview, ['Mobalytics · Blackmaw Hold approach and encounters', 'https://mobalytics.gg/wow-forever/dungeons/blackmaw-hold-complete-dungeon-guide-uncas'], dungeonXP]
    },
    {
      id: 'plaguelands', title: 'Tirion’s hunting circuit', zone: 'Eastern Plaguelands', type: 'Questing', min: 56, max: 60, art: 'forest',
      description: 'Combine three of Tirion Fordring’s outdoor quests while working east across the zone.',
      staging: 'Thondroril River', group: 'Solo', evidence: 'Forever quest records',
      steps: [
        ['Find Tirion', 'Follow the eastern bank of the Thondroril River to Tirion Fordring. Accept Demon Dogs, Blood Tinged Skies and Carrion Grubbage together.'],
        ['Work shared ground', 'Kill the required plaguehounds, bats and carrion worms as you travel. Check the exact hound types in your quest log before moving to the next area.'],
        ['Bank the turn-ins', 'Return to Tirion after the three objectives are ready. If only a difficult hound type remains, combine that trip with another nearby objective.']
      ],
      fallback: 'If the road is busy with enemy players, work a quieter section of the route or return to an unfinished Chillwind farm.',
      refs: [['Azeroth Wiki · Tirion Fordring’s location and quests', 'https://azeroth.wiki/forever/map/eastern-plaguelands/tirion-fordring'], ['Forever Tavern · Eastern Plaguelands objectives', 'https://forever-tavern.com/zones/eastern-plaguelands/']]
    },
    {
      id: 'winterspring', title: 'Ice Thistle Hills', zone: 'Winterspring', type: 'Grinding', min: 56, max: 60, art: 'forest',
      description: 'Work the yeti camp near Everlook when you need a short, repeatable solo session.',
      staging: 'Everlook', group: 'Solo', evidence: 'Forever quest records',
      steps: [
        ['Start at Everlook', 'Visit Umi Rumplesnicker for Are We There, Yeti? and prepare bag space for the fur.'],
        ['Pull around Ice Thistle Hills', 'Hunt the Ice Thistle yetis southeast of town. Clear an outside circuit before moving into the den so you have an escape route.'],
        ['Reassess after the hand-in', 'Return ten Thick Yeti Furs to Umi for the first quest. Compare subsequent kill-only pace with a fresh quest hub, especially near level 60.']
      ],
      fallback: 'If the yeti den draws enemy players, move to Tirion’s outdoor quests in the Eastern Plaguelands for your next session. At 58–59, a prepared Shaper’s Terrace party is another way to spend less time exposed.',
      refs: [['Wowhead · Are We There, Yeti? in Forever', 'https://www.wowhead.com/forever/quest=3783/are-we-there-yeti'], ['MetaBot · Ice Thistle quest map', 'https://metabot.gg/en/wow-forever/quests/are-we-there-yeti-3783']]
    },
    {
      id: 'shapers-terrace', title: 'Shaper’s Terrace', zone: 'Un’Goro Crater', type: 'Dungeon', min: 58, max: 60, art: 'chart',
      description: 'Bring crater power crystals for a planned clear of the titan facility.',
      staging: 'Northern Un’Goro', group: '5 players', evidence: 'Blizzard · Forever',
      steps: [
        ['Rally in the crater', 'Arrange a group near Marshal’s Refuge before committing to a return flight. Keep the power crystals you encounter in Un’Goro for the consoles inside.'],
        ['Find the trail', 'Ride to the northern hills and look for the path up near (56, 12). Agree on the part of the terrace you intend to clear within the session.'],
        ['Choose the finish', 'At 58–59, compare XP from this clear with the XP still needed for 60. When only a small amount remains, a nearby completed quest can be a quicker finish than a fresh instance.']
      ],
      fallback: 'Stay with active Plaguelands or Winterspring objectives if the group would require substantial travel or a long wait.',
      refs: [dungeonOverview, ['Mobalytics · Shaper’s Terrace approach and encounters', 'https://mobalytics.gg/wow-forever/dungeons/the-shaper-s-terrace-complete-dungeon-guide-uncas']]
    }
  ];
  items.forEach(item => { item.image = art[item.art]; });

  const filters = { type: 'All', level: 'all' };
  const types = ['All', 'Dungeon', 'Questing', 'Grinding'];
  const typeIcons = { Dungeon: 'shield', Questing: 'map', Grinding: 'swords' };
  function elementIcon(name, size) {
    return window.Atlas?.icon?.(name, size) || '';
  }
  function levelOptions() {
    return Array.from({ length: 15 }, (_, i) => {
      const level = String(46 + i);
      return '<option value="' + level + '"' + (filters.level === level ? ' selected' : '') + '>Level ' + level + '</option>';
    }).join('');
  }
  function card(item) {
    return `<article class="route-card">
      <div class="route-card-art route-art-${item.art}" style="background-image:url('${item.image}')" aria-hidden="true">${item.art === 'chart' ? '<i class="route-insignia">' + elementIcon('dungeon', 38) + '</i>' : ''}<span>Lv. ${item.min}–${item.max}</span></div>
      <div class="route-card-body"><div class="route-card-meta">${elementIcon(typeIcons[item.type], 15)} ${item.type} <span>·</span> ${item.zone}</div>
      <h2><button type="button" data-route-id="${item.id}">${item.title}</button></h2><p>${item.description}</p>
      <button type="button" class="route-text-action" data-route-id="${item.id}" aria-label="View ${item.title} route">View route <span aria-hidden="true">→</span></button></div>
    </article>`;
  }

  function render(host) {
    host.innerHTML = `<section class="routes-view">
      <header class="routes-heading"><h1>Route planner</h1><p>Find your next quest circuit, solo grind or dungeon from level 46 to 60.</p></header>
      <div class="routes-filters"><div class="routes-type-filter" role="group" aria-label="Route type">${types.map(type => `<button type="button" data-route-type="${type}" aria-pressed="${filters.type === type}">${type === 'All' ? 'All routes' : type === 'Dungeon' ? 'Dungeons' : type}</button>`).join('')}</div>
      <div class="routes-level-controls"><button type="button" class="routes-mylevel" data-my-level>My level · ${window.Atlas?.getLevel?.() ?? 46}</button><label class="routes-level"><span>Level</span> <select aria-label="Filter by level"><option value="all">All levels</option>${levelOptions()}</select></label></div></div>
      <div class="routes-matches" aria-live="polite"></div><div class="routes-deck"></div>
      <p class="routes-legend">Level bands show when to try each route. At level 60, your leveling goal is complete.</p>
    </section>`;
    const root = host.querySelector('.routes-view');
    function update() {
      const matching = items.filter(item => (filters.type === 'All' || item.type === filters.type) && (filters.level === 'all' || (Number(filters.level) >= item.min && Number(filters.level) <= item.max)));
      root.querySelector('.routes-matches').textContent = matching.length + (matching.length === 1 ? ' route' : ' routes') + (filters.level === 'all' ? ' across levels 46–60' : ' at level ' + filters.level);
      root.querySelector('.routes-deck').innerHTML = matching.length ? matching.map(card).join('') : `<div class="routes-empty"><h2>No routes in this selection</h2><p>Choose another level or include all route types.</p><button type="button" class="route-secondary" data-clear-filters>Clear filters</button></div>`;
      root.querySelectorAll('[data-route-type]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.routeType === filters.type)));
    }
    root.querySelector('select').addEventListener('change', event => { filters.level = event.target.value; update(); });
    root.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      if (button.hasAttribute('data-route-type')) { filters.type = button.dataset.routeType; update(); }
      else if (button.hasAttribute('data-my-level')) { filters.level = String(Math.max(46, Math.min(60, window.Atlas?.getLevel?.() ?? 46))); root.querySelector('select').value = filters.level; update(); }
      else if (button.hasAttribute('data-route-id')) detail(button.dataset.routeId);
      else if (button.hasAttribute('data-clear-filters')) { filters.type = 'All'; filters.level = 'all'; root.querySelector('select').value = 'all'; update(); }
    });
    update();
  }

  function detail(id) {
    const item = items.find(route => route.id === id);
    if (!item) return;
    const stats = [['Level band', item.min + '–' + item.max], ['Start at', item.staging], ['Group', item.group]];
    const html = `<div class="route-detail">
        <div class="route-detail-hero route-art-${item.art}" style="background-image:url('${item.image}')" aria-hidden="true">${item.art === 'chart' ? '<i class="route-insignia">' + elementIcon('dungeon', 38) + '</i>' : ''}<span>${item.zone}</span></div>
        <div class="route-detail-meta">${elementIcon(typeIcons[item.type], 16)} ${item.type} <span>·</span> ${item.evidence}</div>
        <p class="route-detail-intro">${item.description}</p><dl class="route-stat-grid">${stats.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>
        <h3>Field instructions</h3><ol class="route-steps">${item.steps.map(([label, body], i) => `<li><span aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div><strong>${label}</strong><p>${body}</p></div></li>`).join('')}</ol>
        <div class="route-fallback"><h4>Fallback plan</h4><p>${item.fallback}</p></div>
        ${item.type === 'Dungeon' ? `<a class="route-dungeon-link" data-dungeon-link href="#dungeons/${item.id}">Open dungeon compendium <span aria-hidden="true">→</span></a>` : ''}
        <details class="route-sources"><summary>Route sources (${item.refs.length})</summary><ul>${item.refs.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a></li>`).join('')}</ul></details>
        <button type="button" class="route-track" data-track-route="${item.id}">Set as active route <span aria-hidden="true">→</span></button>
      </div>`;
    window.Atlas.modal(item.title, html);
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-dungeon-link]')) { window.Atlas.closeModal(); return; }
    const button = event.target.closest('[data-track-route]');
    if (!button) return;
    const id = button.dataset.trackRoute;
    window.Atlas.closeModal();
    window.Atlas.selectRoute(id);
  });
  window.Routes = { items, render, detail };
})();
