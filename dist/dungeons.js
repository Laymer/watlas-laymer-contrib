/* Forever dungeon field notes. Coordinates refer to the named zone's map. */
window.Dungeons = (() => {
  'use strict';
  const sources = {
    mara: ['Icy Veins · Maraudon quests', 'https://www.icy-veins.com/wow-forever/maraudon-quests'],
    maramap: ['Forever Outpost · Maraudon map and quests', 'https://www.wofwforever.com/en/dungeons/maraudon/'],
    maraZone: ['Wowhead Forever · boss loot', 'https://www.wowhead.com/forever/zone=2100/maraudon'],
    thrash: ['Wowhead Forever · Thrash Blade', 'https://www.wowhead.com/forever/item=17705/thrash-blade'],
    thrashq: ['Bind on Forever · Alliance quest', 'https://bindonforever.com/quest/7065'],
    blackring: ['Wowhead Forever · Blackstone Ring', 'https://www.wowhead.com/forever/item=17713/blackstone-ring'],
    rot: ['Forever quest guide · Rot and Regret', 'https://wowclassicforever.info/quests/rot-and-regret/'],
    carvings: ['Icy Veins DB · required carvings', 'https://db.icy-veins.com/wow-forever/quests/7028'],
    brdmap: ['Forever Outpost · BRD maps and chains', 'https://www.wofwforever.com/en/dungeons/blackrock-depths/'],
    brdqs: ['Wowhead Forever · dungeon quest pickups', 'https://www.wowhead.com/forever/guide/dungeons/every-dungeon-quest-location'],
    brdblock: ['Warcraft Wiki · Detention Block layout', 'https://warcraft.wiki.gg/wiki/Detention_Block'],
    kharan: ['Azeroth.wiki · Kharan chain', 'https://azeroth.wiki/forever/quests/kharan-mighthammer'],
    brdshield: ['Wowhead Forever · Stoneshell Guard', 'https://www.wowhead.com/forever/item=11631/stoneshell-guard'],
    acprison: ['Warcraft Wiki · prisoner event', 'https://warcraft.wiki.gg/wiki/The_Secret_Prison'],
    zf: ['Icy Veins · Alliance quest table', 'https://www.icy-veins.com/wow-forever/zul-farrak-quests'],
    zfmap: ['Forever Outpost · map, chains and drops', 'https://wofwforever.com/en/dungeons/zul-farrak/'],
    zflive: ['EverlookDB · player-observed loot', 'https://everlookdb.com/zone/808/zulfarrak'],
    hand: ['Wowhead Forever · mace tooltip', 'https://www.wowhead.com/forever/item=9639/the-hand-of-antusul'],
    wall: ['Warcraft Wiki · shield tooltip', 'https://warcraft.wiki.gg/wiki/Wall_of_Water'],
    sang: ['Wowhead Forever · sword tooltip', 'https://www.wowhead.com/forever/item=9379/sangthraze-the-deflector'],
    ac: ['Icy Veins · Alcaz quest walkthrough', 'https://www.icy-veins.com/wow-forever/alcaz-prison-quests'],
    acdetail: ['Hardcore Helper · prison objectives and loot', 'https://www.hardcorehelper.com/forever/guides/alcaz-prison-dungeon-guide'],
    acloot: ['Forever Twinking · reported prison drops', 'https://forevertwinking.com/zones/902994'],
    bm: ['Mobalytics · Alliance quest walkthroughs', 'https://mobalytics.gg/wow-forever/dungeons/blackmaw-hold-dungeon-quests'],
    bmmap: ['Forever Outpost · pickups, chains and bosses', 'https://www.wofwforever.com/en/dungeons/blackmaw-hold/'],
    bloodfur: ['Wowhead Forever · Bloodfur Bulwark', 'https://www.wowhead.com/forever/item=280063/bloodfur-bulwark'],
    shaper: ['Wowhead Forever · Alliance dungeon guide', 'https://www.wowhead.com/forever/guide/the-shapers-terrace-dungeon-overview-location-rewards'],
    shp: ['Mobalytics · quest rewards and boss drops', 'https://mobalytics.gg/wow-forever/dungeons/the-shapers-terrace-guide'],
    shloot: ['MyGameAcademia · per-boss item tooltips', 'https://mygameacademia.com/forever/dungeon/shapers-terrace'],
    digest: ['Warcraft Wiki · Digestible Research', 'https://warcraft.wiki.gg/wiki/Digestible_Research'],
    st: ['Icy Veins · Sunken Temple quests', 'https://www.icy-veins.com/wow-forever/sunken-temple-quests'],
    stcircle: ['Questing.wiki · lower temple turn-ins', 'https://questing.wiki/wow-forever/quests/3447/'],
    stwar: ['Everfor · Warrior quest chain', 'https://everfor.gg/quests/8425/voodoo-feathers/'],
    stfull: ['Warcraft Tavern · Alliance and Warrior quests', 'https://www.warcrafttavern.com/forever/guides/sunken-temple-quests/'],
    stloot: ['The Forever Era · observed Shade loot', 'https://theforeverera.com/en/dungeons/temple-of-atalhakkar/shade-of-eranikus/'],
    crest: ['Wowhead Forever · Crest of Supremacy', 'https://www.wowhead.com/forever/item=10835/crest-of-supremacy'],
    flask: ['Endgame Tools · Forever flask effect', 'https://endgametools.com/en/wow-forever/items/20130'],
    dungeons: ['Blizzard · official dungeon brackets', 'https://worldofwarcraft.blizzard.com/en-us/news/24301455'],
    xp: ['Blizzard · dungeon kill XP', 'https://eu.forums.blizzard.com/en/wow/t/dungeon-enemy-xp-increased-8-november/640598'],
    gap: ['Blizzard · 12-level rule', 'https://us.forums.blizzard.com/en/wow/t/player-level-dungeon-xp-adjustment-november-14/2416343/1'],
    cap: ['Blizzard · November hotfixes', 'https://news.blizzard.com/en-gb/article/24315281/wow-forever-hotfixes-november-25-2026'],
    prot: ['Icy Veins · Forever Protection mechanics', 'https://www.icy-veins.com/wow-forever/protection-warrior-leveling']
  };
  function quest(name, min, start, unlock, objective, finish, reward, refs) {
    return { name, min, start, unlock, objective, finish, reward, refs };
  }
  function item(name, from, decision, refs) { return { name, from, decision, refs }; }
  const records = [
    {
      id:'zul-farrak', name:'Zul’Farrak', zone:'Tanaris', range:'46–49', type:'Classic dungeon in Forever', image:'desert',
      summary:'Pair the Gadgetzan quests with one run through the Sandfury city. This is the first instance to test at level 46.',
      access:'From Gadgetzan ride northwest to the instance portal at approximately 39, 19 in Tanaris. Pick up the Gadgetzan quests before leaving town.',
      prep:['Start in Gadgetzan. Visit Trenton Lighthammer, Chief Engineer Bilgewhizzle and Tran’rek in the same pass.','Recruit a healer and damage dealers while working the nearby Wastewander objectives. Confirm who has the Mallet of Zul’Farrak before budgeting for the hydra.','At the pyramid, free and defend the prisoners. Let Weegli open the gate to Chief Ukorz before challenging Sergeant Bly for the rod. Get the tablets, pool boss or scarabs only when the party has those objectives.'],
      skip:'If gathering the party would consume your remaining session, keep questing. A second clear loses the one-time quest rewards. Repeat only if the first clear’s kill pace still wins after travel and resets.',
      quests:[
        quest('Troll Temper',40,'Trenton Lighthammer, Gadgetzan (51.4, 28.8).','Available directly.','Loot 20 vials from Sandfury trolls. Check your count before the group leaves.','Trenton Lighthammer in Gadgetzan.','Experience and coin. Finish on a later on-route run if drops fall short.',['zf','zfmap']),
        quest('Divino-matic Rod',40,'Chief Engineer Bilgewhizzle, Gadgetzan (52.5, 28.5).','Available directly.','Complete the pyramid prisoner event, then confront Sergeant Bly and recover the rod.','Chief Engineer Bilgewhizzle in Gadgetzan.','Masons Fraternity Ring is the physical-gear choice among the rewards. Compare it with your weaker ring.',['zf','zfmap']),
        quest('Scarab Shells',40,'Tran’rek, Gadgetzan (51.6, 26.8).','Check him in town first. Forever quest data links the breadcrumb Tran’rek from Krazek in Booty Bay (27, 77.2). Skip a dedicated cross-continent trip if it is unavailable.','Loot five intact shells from scarabs inside.','Tran’rek in Gadgetzan.','Experience and coin. Single-run completion depends on loot.',['zf','zfmap']),
        quest('Gahz’rilla',40,'Wizzle Brassbolts, Mirage Raceway, Thousand Needles (78, 77).','Take it when crossing the Shimmering Flats. The Brassbolts Brothers in Ironforge leads here. One party member needs the Mallet of Zul’Farrak for the boss.','Use the mallet at the pool gong, kill Gahz’rilla and loot its Electrified Scale. For your own mallet, loot the Sacred Mallet in the Hinterlands at the Altar of Zul and use it atop Jintha’Alor.','Wizzle Brassbolts at Mirage Raceway.','Carrot on a Stick. Treat its mounted-speed bonus as a travel upgrade. Leave the optional summon out if nobody has the mallet.',['zf','zfmap']),
        quest('The Prophecy of Mosh’aru',40,'Yeh’kinya, Steamwheedle Port, Tanaris (67, 22.4).','Finish his Screecher Spirits in Feralas first. Particularly convenient if you already did this on your Feralas leg.','Recover the first tablet from Theka the Martyr and the second from Hydromancer Velratha.','Yeh’kinya at Steamwheedle Port.','Opens the later Ancient Egg and Sunken Temple chain.',['zf','zfmap']),
        quest('Tiara of the Deep',40,'Tabetha at her hut, Dustwallow Marsh (46, 57).','Pick up from Tabetha on a Dustwallow visit. Tabetha’s Task is a lead-in.','Loot the tiara from Hydromancer Velratha by the pool. The Gahz’rilla summon is unnecessary for Velratha.','Tabetha at the same hut.','Gemshale Pauldrons are one of the reward choices. Weigh the round trip against your current shoulders.',['zf','zfmap']),
        quest('Nekrum’s Medallion',40,'Thadius Grimshade, Nethergarde Keep, Blasted Lands (67, 19.4).','In the Hinterlands, start Witherbark Cages with Gryphon Master Talonaxe at Aerie Peak. Follow The Altar of Zul and Thadius Grimshade. Best when the chain is already complete.','Loot Nekrum Gutchewer at the pyramid encounter.','Thadius Grimshade, Nethergarde Keep.','Alliance chain progression and experience. High travel cost from Tanaris.',['zf','zfmap']),
        quest('The Witch Doctor’s Head',39,'Archmage Lan’dalock, Dalaran in Alterac Mountains (15.4, 73.8).','Alliance Forever quest. Pick it up when already visiting the Dalaran contact.','Kill Witch Doctor Zum’rah and take his head.','Archmage Lan’dalock in Dalaran.','Experience and reputation. Optional for a Tanaris-based morning.',['zf','zfmap'])
      ],
      gear:[
        item('The Hand of Antu’sul','Antu’sul · main-hand mace · requires 45.','33.33 weapon DPS with a nearby-enemy damage and attack-slow proc. A strong sword-and-board candidate if your main hand is weaker. Account for nearby controlled targets when using the proc.',['zflive','hand']),
        item('Sang’thraze the Deflector','Antu’sul · one-handed sword · requires 45.','33.24 DPS and a temporary parry proc. Compare the sword with your current weapon DPS and skill. Combine neither sword half during shield leveling if you still need it one-handed.',['zfmap','sang']),
        item('Wall of Water','Hydromancer Velratha · shield · requires 43.','1,676 armor and 27 block. Its spell power and mana regeneration offer little to Protection. Equip for a real armor or block upgrade over your current shield.',['zflive','wall'])
      ], refs:['zf','zfmap','zflive']
    },
    {
      id:'alcaz', name:'Alcaz Prison', zone:'Dustwallow Marsh', range:'48–53', type:'Forever original', image:'ruins',
      summary:'A strong first-run candidate with the Theramore chain ready. Speak to the prisoner before the group kills The Questioner.',
      access:'Travel to Theramore and meet your group for the crossing to Alcaz Island, northeast of the town. The prison entrance is on the island.',
      prep:['Start Our Man in Theramore with Master Mathias Shaw in Stormwind. Work the chain through The Return of the King? before committing to the island.','Collect both available jobs from Sully outside Theramore. Tell the party about Mason Connery before engaging The Questioner.'],
      skip:'Save this for a session with time for the island crossing and the prison wings. A special round trip to Alterac for one journal is poor preparation for a short session.',
      quests:[
        quest('A Bit of Wet Work',48,'Sully McCleary, Theramore graveyard, Dustwallow (63.4, 42.4).','Complete Shaw’s Our Man in Theramore chain through The Return of the King?.','Kill 15 Strashaz Soldiers and eight Strashaz Enchantresses. Take the head of Tidemistress Ca’zass.','Sully McCleary at the graveyard.','Theramore Defender’s Gauntlets, Marshdweller’s Pants or Naga Scale Spaulders. Compare the gauntlets and spaulders with equipped pieces.',['ac','acdetail']),
        quest('The Secret Prison',48,'Sully McCleary, Theramore graveyard (63.4, 42.4).','Same Theramore investigation as A Bit of Wet Work.','Find the hidden prisoner before killing The Questioner. Speak to the prisoner to advance the investigation.','Completes through the prison event inside Alcaz. Watch for Somber News and the separate prisoner objective.','Take Somber News to Sully in Theramore when offered.',['ac','acdetail','acprison']),
        quest('The Man in the Iron Chains',48,'Mason Connery, inside Alcaz Prison.','Reach and speak to Mason before the boss dies. The prisoner also offers a treasure chain.','Kill The Questioner, take the shackle key and return to the prisoner.','Mason Connery in Alcaz Prison.','Somber News takes you back to Sully. More Valuable Than Gold points to Connery’s Trunk in Moonbrook, Westfall, for the treasure follow-up.',['ac','acdetail']),
        quest('The Dragon’s Journal',46,'Archmage Lan’dalock, Dalaran, Alterac Mountains (15.4, 73.8).','Take it when already in the area. The pickup level is below the dungeon’s recommended range.','Loot Zarla’s Journal from Blazeroar in the prison.','Archmage Lan’dalock in Dalaran.','Experience and reputation. Group with the Theramore quests on a first clear.',['ac','acdetail'])
      ],
      gear:[item('Katerina’s Shanker','Katerina the Cleaner · one-handed dagger · requires 49.','35.6 DPS, +7 agility and dodge. Compare against your trained mace or sword. An undertrained dagger can cut kill speed until your weapon skill catches up.',['acdetail','acloot']),item('Girdle of Extracted Answers','The Questioner · waist · requires 48.','+12 strength and +15 stamina make this a practical pickup if the stat increase offsets the armor on your equipped belt.',['acdetail','acloot']),item('Fatebound Buckler','Horde reward from Thrall Needs to Know.','Laymer cannot earn this shield through the Alliance chain. The guaranteed Alliance gear choices appear under A Bit of Wet Work.',['ac','acdetail'])],refs:['dungeons','ac','acdetail','acloot']
    },
    {
      id:'maraudon', name:'Maraudon', zone:'Desolace', range:'50–53', type:'Classic dungeon in Forever',
      summary:'Princess Theradras unlocks a guaranteed Thrash Blade choice. Ask whether the party is doing a princess shortcut or both upper wings before collecting objectives.',
      access:'Ride from Nijel’s Point to the Valley of Spears in western Desolace. The cavern splits towards the orange and purple entrances. A player with the Scepter of Celebras can open the portal to the inner falls.',
      prep:['Pick up Corruption of Earth and Seed from Keeper Marandis at Nijel’s Point. The minimum is 45, but a party prepared for the final boss matters more than the pickup level.','For an inner-falls or “princess” run, prioritize Princess Theradras, Seed of Life and Rot and Regret if prepared. For a full run, add Talendria, Willow and Cavindra before entering.','Compare your main hand with 35.19 DPS plus the extra-attack proc. A substantial gap makes a quest-ready princess clear more attractive than cycling Zul’Farrak for a random sword.'],
      skip:'A party doing one upper wing cannot deliver Thrash Blade from that wing alone. If your equipped weapon is already comparable, weigh the full journey against the solo route before leaving Tanaris.',
      quests:[
        quest('Corruption of Earth and Seed',45,'Keeper Marandis, Nijel’s Point, Desolace (63.8, 10.6).','Alliance quest, available directly. Take it before joining a princess run.','Kill Princess Theradras in the inner Earth Song Falls section.','Keeper Marandis at Nijel’s Point.','Choose Thrash Blade for sword and shield when it improves your main hand. Other choices are Resurgence Rod and Verdant Keeper’s Aim.',['mara','thrashq','thrash']),
        quest('Vyletongue Corruption',41,'Talendria, Nijel’s Point, Desolace (68.4, 8.8).','Pick up your own vial before going to the orange entrance.','Fill it at the orange crystal pool before zoning in. Apply it to eight Vylestem Vines inside orange and kill the scions that emerge.','Talendria at Nijel’s Point.','Choice includes Woodseed Hoop, Sagebrush Girdle and Branchclaw Gauntlets. Skip for a princess-only trip.',['mara','maramap']),
        quest('Twisted Evils',41,'Willow, Scrabblescrew’s Camp, Desolace (62.2, 39.6).','Direct pickup along the road.','Collect Theradric Crystal Carvings through the instance. The Forever quest DB lists 25. Check your log before planning another run.','Willow at the camp.','Gear choices include Hulkstone Pauldrons and Relentless Chain.',['mara','carvings']),
        quest('Shadowshard Fragments',39,'Archmage Tervosh, Theramore in Dustwallow Marsh (59.6, 41.2).','Take this when in Theramore.','Collect ten fragments from Shadowshard rock elementals on the purple approach. The exterior cavern can supply them.','Archmage Tervosh in Theramore.','Choose the physical or caster Shadowshard pendant against your necklace. An inefficient pickup if you have already left Dustwallow.',['mara','maramap']),
        quest('The Pariah’s Instructions',39,'Centaur Pariah, southern Desolace (around 50, 87).','Direct pickup. Requires the approach and sections of both wings.','Get Amulet of Spirits from the Nameless Prophet. Reveal the five khans: Kolk near the portal platform, Gelk on the purple approach, Magra on orange, Maraudos inside purple and Veng inside orange. Combine their gems.','Centaur Pariah in southern Desolace.','Mark of the Chosen trinket. Commit to this before a two-wing run.',['mara','maramap']),
        quest('Legends of Maraudon',41,'Cavindra, entrance caverns on the orange side (Desolace 32.1, 64).','Collect before beginning both wings.','Take the Celebrian Rod from Noxxion in orange and the Celebrian Diamond from Lord Vyletongue in purple. Defeat Celebras the Cursed.','Celebras the Redeemed appears after the fight.','Starts the scepter ritual. A single-wing clear leaves one component outstanding.',['mara','maramap']),
        quest('The Scepter of Celebras',41,'Celebras the Redeemed, at his encounter inside Maraudon.','Turn in both components for Legends of Maraudon.','Stay for his crafting ritual and speak to him again when it finishes.','Celebras the Redeemed at the ritual.','Scepter of Celebras opens the shortcut to the inner falls for later groups.',['maramap']),
        quest('Rot and Regret',35,'Woodwyrd, Forlorn Gardens, Shen’dralas (69.4, 71.8).','Progress through Forlorn Gardens and Word of the Woods. Mithera (53, 75.8) sends you to Woodwyrd. New in Forever.','In Rotgrip’s pool below Princess Theradras, find the geyser under the stone bridge and collect the Vial of Earth Song Water.','Back at Woodwyrd, use the vial on the burning tree beside him and finish the objective there.','Overgrown Cuffs or Thornplated Cord. Add this when coming from Shen’dralas.',['mara','rot']),
        quest('Seed of Life',39,'Zaetar’s Spirit inside Maraudon after Princess Theradras dies.','Finish the princess encounter and talk to the spirit before leaving.','Carry the seed to Moonglade.','Keeper Remulos at the Shrine of Remulos, Moonglade.','Experience. Save the trip for a northern Kalimdor route.',['mara','maramap'])
      ],
      gear:[item('Thrash Blade','Corruption of Earth and Seed · Alliance quest choice.','35.19 DPS, speed 2.70 and a chance for an extra attack on your next swing. You can choose it after one successful quest completion. A particularly attractive replacement for a lower-DPS trained sword.',['thrash','thrashq']),item('Blackstone Ring','Princess Theradras · finger · requires 49.','+20 attack power, +6 stamina and +1% hit. The ring and the guaranteed sword can come from the same visit, but only the sword comes with completion.',['maraZone','blackring']),item('Gizlock’s Hypertech Buckler','Tinkerer Gizlock · shield · requires 48.','Forever’s version favors casters. Check actual mitigation and block value on the tooltip before replacing a shield with warrior stats.',['maraZone','maramap'])],refs:['mara','maramap','thrashq','maraZone']
    },
    {
      id:'blackrock-depths', name:'Blackrock Depths · Prison', zone:'Blackrock Mountain', range:'53–57', type:'Classic dungeon in Forever',
      summary:'A bounded Detention Block circuit for first-run quest XP. Agree on Gerstahn and the prison cells before the group forms.',
      access:'Enter Blackrock Mountain from Searing Gorge or the Burning Steppes. Follow the chains toward the central structure, descend to the quarry, then follow its tunnel to the instance portal.',
      prep:['At Morgan’s Vigil, collect Overmaster Pyron and The Good Stuff. Bring Marshal Windsor if his chain is available. In Ironforge, check whether King Magni offers Kharan Mighthammer.','Inside the Detention Block, defeat High Interrogator Gerstahn for prison-cell access, speak to each eligible prisoner, then exit. Add nearby Lord Roccor only if time allows.'],
      skip:'This segment ends in the Detention Block. General Angerforge, Golem Lord Argelmach, the Grim Guzzler, Lord Incendius and Emperor Dagran Thaurissan are separate objectives. Advertise a longer route before counting their XP or loot.',
      quests:[
        quest('Overmaster Pyron',48,'Jalinda Sprig at Morgan’s Vigil, Burning Steppes (85.4, 70.1).','Direct Alliance pickup.','Kill Pyron in the quarry on the way to the instance.','Jalinda Sprig at Morgan’s Vigil.','Unlocks Incendius! for a later, deeper clear. Let a waiting group continue into the portal before making a return trip.',['brdmap','brdqs']),
        quest('The Good Stuff',50,'Oralius at Morgan’s Vigil, Burning Steppes (84.6, 68.7).','Pick up before traveling to the mountain.','Loot 20 Dark Iron Fanny Packs from Dark Iron dwarves in the instance. Carry partial progress into future trips.','Oralius at Morgan’s Vigil.','One-time quest credit. Count it in XP/hour once you turn it in.',['brdmap','brdqs']),
        quest('Marshal Windsor',48,'Marshal Maxwell at Morgan’s Vigil (84.7, 69).','Begin with Helendis Riverhorn’s Dragonkin Menace and follow The True Masters through the Alliance contacts and Ragged John. Return to Maxwell.','Open Windsor’s cell in the Detention Block. Gerstahn’s Prison Cell Key or a party lockpicker can provide access.','Marshal Windsor, inside his cell.','Unlocks Abandoned Hope. Accept the hand-in before the group leaves.',['brdmap','brdqs','brdblock']),
        quest('Abandoned Hope',48,'Marshal Windsor in his cell in Blackrock Depths.','Speak to Windsor after completing Marshal Windsor.','Take Windsor’s report out of the dungeon.','Marshal Maxwell, Morgan’s Vigil.','On a later trip, A Crumpled Up Note can drop from the dungeon’s dwarves for eligible players.',['brdmap','brdqs']),
        quest('A Crumpled Up Note',50,'Use A Crumpled Up Note if it drops inside BRD.','Turn in Abandoned Hope before trying for the note.','Take the note to Windsor in the detention area.','Marshal Windsor in his cell.','Unlocks A Shred of Hope. Its lost information drops from Angerforge and Argelmach outside this circuit. Jail Break! follows that deeper step.',['brdmap']),
        quest('Kharan Mighthammer',50,'King Magni Bronzebeard, Ironforge (39.1, 56.2).','Finish both steps named The Smoldering Ruins of Thaurissan from Royal Historian Archesonus, including the Burning Steppes relics.','Reach Kharan’s cell in the Detention Block. Obtain Gerstahn’s Prison Cell Key if the party cannot unlock the door.','Kharan Mighthammer inside the prison.','Accept Kharan’s Tale while standing beside him.',['brdmap','kharan','brdblock']),
        quest('Kharan’s Tale',50,'Kharan Mighthammer, Detention Block cell.','Complete Kharan Mighthammer with Magni’s instructions.','Listen through Kharan’s dialogue before departing.','Kharan in the same cell.','Take The Bearer of Bad News to King Magni Bronzebeard (Ironforge 39.1, 56.2). The Fate of the Kingdom requires a separate Emperor run.',['kharan','brdmap'])
      ],
      gear:[item('Stoneshell Guard','Lord Roccor · shield · requires 47.','1,803 armor and 31 block with strength and stamina. Compare with Crest of Supremacy or Bloodfur Bulwark before adding the detour.',['brdshield','brdmap']),item('Prison Cell Key','High Interrogator Gerstahn · dungeon key.','This is the functional reward for a prison group that needs to reach the quest NPCs. The Shadowforge Key serves a different part of the city.',['brdblock','brdmap'])],refs:['brdmap','brdqs','brdblock','brdshield']
    },
    {
      id:'sunken-temple', name:'Sunken Temple', zone:'Swamp of Sorrows', range:'52–55', type:'Classic dungeon in Forever', image:'ruins',
      summary:'Plan the troll minibosses around Voodoo Feathers. Use the entrance tablets and paired lower-ring quests to add value on the same trip.',
      access:'Meet at the Temple of Atal’Hakkar in the Pool of Tears, eastern Swamp of Sorrows. Descend through the flooded approach to the portal.',
      prep:['At 50, ask a Warrior trainer for A Troubled Spirit. Do Warrior Kinship and War on the Shadowsworn before entering.','Agree on the lower statues, six troll guardians and Avatar event before the pull. A short boss-only run can bypass several objectives.'],
      skip:'If the Warrior chain is unfinished and you would have to cross continents to collect the other chains, stay on the outdoor circuit. Revisit when you can combine them.',
      quests:[
        quest('Voodoo Feathers',50,'Fallen Hero of the Horde, southern Swamp of Sorrows (34.3, 66.1). Alliance Warriors can speak to him.','A Troubled Spirit from a Warrior trainer → Warrior Kinship (seven helboars) → War on the Shadowsworn in the Blasted Lands.','Loot all six troll guardians. Gasher and Zul’Lor drop amber feathers, Hukku and Mijan blue, Zolo and Loro green. Collect two of each color.','Fallen Hero of the Horde at the border.','Compare Diamond Flask, Fury Visor and Razorsteel Shoulders. The Forever flask heals over five seconds and grants strength on completion.',['stwar','stfull','flask']),
        quest('Into the Depths',46,'Marvon Rivetseeker, Broken Pillar, Tanaris (52.6, 45.8).','Angelas Moonbreeze’s The Sunken Temple in Feathermoon sends you to Marvon. Complete The Stone Circle by retrieving it in Ratchet.','Carry the supplied Atal’ai Stone Circle to the lower temple.','Altar of Hakkar inside the temple.','Experience. Bundle with Secret of the Circle.',['st','stcircle']),
        quest('Secret of the Circle',46,'Marvon Rivetseeker, Broken Pillar, Tanaris (52.6, 45.8).','Complete The Stone Circle, then accept both of Marvon’s dungeon quests.','Activate the lower-ring statues in order: south, north, southwest, southeast, northwest, northeast. Defeat Atal’alarion.','Idol of Hakkar inside the temple.','Hakkari Urn. Check the Idol while your party is still on the lower floor.',['st','stcircle']),
        quest('Jammal’an the Prophet',38,'Atal’ai Exile, Shadra’Alor, Hinterlands (33.6, 75.2).','Direct pickup. Take this on your Hinterlands circuit.','Kill Jammal’an and take his head.','Atal’ai Exile in Shadra’Alor.','Gear choice including Helm of Exile. Budget for the return trip.',['st']),
        quest('The God Hakkar',40,'Yeh’kinya, Steamwheedle Port, Tanaris (67, 22.4).','Screecher Spirits → The Prophecy of Mosh’aru in Zul’Farrak → The Ancient Egg in the Hinterlands.','Bring the supplied egg. Complete the Avatar of Hakkar summoning event and capture its essence with the egg.','Yeh’kinya in Steamwheedle Port.','Options include Avenguard Helm and Lifeforce Dirk. Only include the event if someone has its summon item.',['st','stfull']),
        quest('Into the Temple of Atal’Hakkar',38,'Brohann Caskbelly, Dwarven District, Stormwind (69.4, 40.6).','Take In Search of the Temple from Brohann and follow the chain through Rhapsody’s Tale.','Collect ten Atal’ai Tablets along the corridors approaching the instance.','Brohann Caskbelly, Stormwind.','Guardian Talisman. The tablets can be collected outside the portal.',['st','stfull']),
        quest('Haze of Evil',47,'Gregan Brewspewer, northern Feralas (45.1, 25.6).','Advance Muigin’s Un’Goro chain through A Visit to Gregan.','Collect five Atal’ai Haze from the temple creatures.','Muigin at Marshal’s Refuge, Un’Goro (42.9, 9.6).','Experience on a Feralas-to-Un’Goro itinerary.',['stfull']),
        quest('The Essence of Eranikus',48,'Use the Essence of Eranikus dropped by the Shade of Eranikus.','Starts inside after the final boss.','Accept the quest from the item before leaving the boss room.','Essence Font behind the Shade inside the temple.','Chained Essence of Eranikus. Keep it if you want to continue the follow-up.',['st'])
      ],
      gear:[item('Crest of Supremacy','Shade of Eranikus · shield · requires 51.','1,930 armor, 35 block and +5 defense. Compare its strength, agility, stamina and protection with your equipped shield.',['stloot','crest']),item('Tooth of Eranikus','Shade of Eranikus · main-hand axe · requires 51.','One-handed option from the same fight. Check actual DPS and your axe skill before replacing a trained sword or mace.',['stloot']),item('Diamond Flask','Voodoo Feathers · Warrior quest reward.','The heal can reduce time spent eating between pulls. Finishing it grants +20 strength for one minute. Measure whether that is more useful than the armor reward for your current gear.',['stwar','flask'])],refs:['st','stfull','stwar','stloot']
    },
    {
      id:'blackmaw', name:'Blackmaw Hold', zone:'Azshara', range:'55–60', type:'Forever original', image:'forest',
      summary:'Stack the Azshara pickups on the northbound ride. Withermaw offers a shield directly relevant to Shield Slam.',
      access:'Ride north through Azshara to Ursolan and the Blackmaw stronghold. Join a group assembled for the same objectives before leaving your quest hub.',
      prep:['Collect Claws That Rend and Blackmaw Pouches near Eldarath, then check Lorekeeper Nok at Ursolan.','If you already worked through the Blackmaw Counter-Offensive chain, take Blackmaw Reclamation as well. A fresh multi-zone prerequisite can cost more time than the dungeon trip.'],
      skip:'If you are questing in Hyjal without an assembled group, keep that session in Hyjal. A targeted Withermaw kill is most attractive when the shield is a substantial improvement and there are first-run quests to turn in.',
      quests:[
        quest('Claws That Rend, Tusks that Gore',45,'Ogtinc, Azshara (42.4, 42.6).','Direct pickup on the approach.','Take the claws from Withermaw and tusks from Bonesnout the Unbroken.','Ogtinc in Azshara.','Weapon choices include Great Bear Claw, Wild Malleus and Staff of Wild Beasts. Inspect hand restrictions before selecting.',['bm','bmmap']),
        quest('Blackmaw Pouches',55,'Ekkal, Ruins of Eldarath, Azshara (42, 38.8).','Direct pickup at level 55.','Collect five Blackmaw Pouches inside.','Ekkal at the ruins.','Experience and coin. Bundles with nearby pickups.',['bm','bmmap']),
        quest('The Twin Bears',47,'Lorekeeper Nok, Ursolan, Azshara (41.4, 20).','Direct pickup.','Collect the Totem of Ursoc and the Totem of Ursol in the hold.','Lorekeeper Nok in Ursolan.','Guidance of Ursoc or Wisdom of Ursol.',['bm','bmmap']),
        quest('Blackmaw Reclamation',47,'Gatekeeper Rageroar, Ursolan (42.4, 20.2).','The documented chain runs from Korsa’s Master Feardred through Return to Rageroar, Timbermaw Reinforcements, Chieftain Bloodmaw and Blackmaw Counter-Offensive.','Take Varrox Bleakhoof’s head.','Gatekeeper Rageroar at Ursolan.','A choice of four rings. Compare the tooltip with both equipped rings.',['bm','bmmap']),
        quest('Get to the Roots of It',45,'Mathrengyl Bearwalker, Cenarion Enclave, Darnassus.','Complete Beneath Nordrassil from Commander Truesong in southern Azshara (11.8, 78.2).','Gather ten Nordrassil Root Caps in the hold.','Mathrengyl Bearwalker in Darnassus.','Experience and reputation. Best with a scheduled Darnassus visit.',['bm','bmmap']),
        quest('Blackmaw Magic',52,'Archmage Timear, Dalaran in Alterac Mountains (around 15, 74 on zone map).','Alliance pickup. Collect it on a Dalaran visit.','Recover Elder Shaman Bloodmane’s Blackmaw Ritual Totem.','Archmage Timear in Dalaran.','Experience, coin and reputation. A long detour from Azshara for this quest alone.',['bm','bmmap']),
        quest('A Lost Memento',47,'Use the Feathered Charm Necklace if it drops inside.','Item-started. The specific eligible mobs and drop rate are uncertain.','Accept the quest and find its owner after exiting.','Unele in Azshara (43.2, 18.1).','Nama’s Cherished Necklace. Treat the starter as a possible bonus.',['bm','bmmap'])
      ],
      gear:[item('Bloodfur Bulwark','Withermaw · shield · requires 55.','2,057 armor, 38 base block, +15 block value, +10 stamina and +2% block chance. Its extra block value supports Shield Slam as well as melee mitigation.',['bmmap','bloodfur','prot']),item('Bloody Claws of Attack','Elder Shaman Bloodmane · one-handed fist weapon · requires 56.','If this drops during Blackmaw Magic, compare its DPS and your fist skill to your existing main hand before switching.',['bmmap']),item('Spike Crested Bracers','Bonesnout the Unbroken · plate wrists.','Compare this offensive plate option while collecting Bonesnout’s tusks. Skip an extra reset solely for the bracers.',['bmmap'])],refs:['dungeons','bm','bmmap','bloodfur']
    },
    {
      id:'shapers-terrace', name:'Shaper’s Terrace', zone:'Un’Goro Crater', range:'58–60', type:'Forever original', image:'ruins',
      summary:'Prepare crystals on an Un’Goro quest circuit. Pick up Ironforge’s cartography kit yourself before the trip.',
      access:'The terrace is in the northern hills of Un’Goro Crater. Meet at the northern approach with power crystals gathered in the crater for the dungeon consoles.',
      prep:['Check Curator Thorius in the Hall of Explorers on your last Ironforge visit. Carry the cartographer’s kit for personal credit.','Combine crystal collection with your outdoor goals. Decide which console bosses to include while forming the party.'],
      skip:'At 59 with only a small XP remainder, compare the time to hand in your existing outdoor quests with travel plus a whole instance. You can come back at 60 for equipment.',
      quests:[
        quest('Panic at the Digsite',55,'Curator Thorius in the Hall of Explorers, Ironforge (about 72, 16).','Pick it up on your Ironforge stop.','Kill Venomridge, six Ravasaur Matriarchs and nine Ironhide Ravasaurs around the early dig site.','Curator Thorius, Ironforge.','Diemetradon Scale Spaulders or Ravasaur Hide Footpads. Count kills before leaving the early area.',['shaper','shp']),
        quest('Mapping the Way Forward',55,'Curator Thorius, Hall of Explorers, Ironforge (about 72, 16).','Collect the Explorers’ League Cartographer’s Kit personally. This objective cannot be shared.','Survey the Pillar of Assimilation, Achromatic Crystal, Western Gates, Regrowth Vestibule and Unearthed Stone Watcher with the kit.','Curator Thorius, Ironforge.','Choice includes Crystal-Infused Cleaver, Beastslayer’s Trident and Faintly Glowing Orb.',['shaper','shp']),
        quest('Digestible Research',55,'Look for the automatic quest offer at the start of Shaper’s Terrace.','Wowhead locates the start inside; Warcraft Wiki records an automatic start. The precise trigger remains undocumented.','Loot 15 Partially Digested Journal Pages inside. Check your log on the first pulls.','Curator Thorius, Hall of Explorers, Ironforge.','Expeditionary Legplates or Lost Researcher’s Hood. Compare the legplates when budgeting your gear upgrades.',['shaper','digest','shp'])
      ],
      gear:[item('Scaleguard Scimitar','Direhorn Matriarch · one-handed sword · requires 58.','41.4 DPS, +12 block value, +8 stamina and +14 attack power. Compare the weapon and Shield Slam gains together against your current main hand.',['shp','shloot']),item('Raptorscale Bulwark','Ravasaur Hunters Tor’Rel and Izha’Rel · shield.','2,153 armor and +12 strength. Compare it with Bloodfur Bulwark’s block value and block chance; higher armor alone does not settle the choice.',['shp','shloot','bloodfur'])],refs:['dungeons','shaper','shp','digest']
    }
  ];
  const key = 'laymer-atlas.dungeon-quests.v1';
  const states = ['Untracked','In quest log','Turned in'];
  const searchIcon = '<svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg>';
  const escape = text => String(text ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = text => String(text ?? '').toLowerCase().replace(/[\u2018\u2019']/g,'').replace(/[-_]/g,' ').trim();
  const ids = {zf:'zul-farrak',zulfarrak:'zul-farrak',shapers:'shapers-terrace',sunken:'sunken-temple'};
  const recordFor = id => records.find(d=>d.id===(ids[id] || id));
  const routeUrl = id => '#dungeons/' + id;
  function read() { try { const data=JSON.parse(localStorage.getItem(key)||'{}'); return data && typeof data==='object' && !Array.isArray(data) ? data : {}; } catch { return {}; } }
  function links(refs) { return refs.filter(id=>sources[id]).map(id=>`<a href="${sources[id][1]}" target="_blank" rel="noopener noreferrer">${escape(sources[id][0])} <span aria-hidden="true">↗</span></a>`).join(''); }
  function questId(d,i) { return d.id + '-' + i; }
  function verifiedCount(d, saved) { return d.quests.filter((_,i)=>saved[questId(d,i)]===2).length; }
  function progress(d) { return `${verifiedCount(d,read())} of ${d.quests.length} turned in`; }
  function reference(id) { const d=recordFor(id); return d ? `<a class="dg-reference" href="${routeUrl(d.id)}">${escape(d.name)} quest pickups &amp; loot <span aria-hidden="true">→</span></a>`:''; }
  function card(d, query) {
    const needle=normalize(query), matches=needle ? [...d.quests,...d.gear].filter(x=>normalize([x.name,x.start,x.from,x.reward,x.objective].filter(Boolean).join(' ')).includes(needle)).map(x=>x.name) : [];
    const matched=matches.length ? `<small class="dg-matched">Matches ${escape(matches.slice(0,3).join(' · '))}</small>` : '';
    return `<a class="dg-card" href="${routeUrl(d.id)}"><div class="dg-card-top"><span class="dg-level">Lv ${d.range}</span><span class="dg-type">${escape(d.zone)}</span></div><h2>${escape(d.name)}</h2><p>${escape(d.summary)}</p>${matched}<div class="dg-card-bottom"><span>${d.quests.length} quest entries · ${d.gear.length} gear notes</span><span aria-hidden="true">→</span></div></a>`;
  }
  function rulePanel() {
    return `<aside class="dg-rules"><h2>Build an XP-eligible party</h2><p>For each dungeon kill, compare the highest party member with the enemy. A gap over 12 levels gives the party zero kill XP from that enemy. A level 60 therefore suppresses XP on a level 47 enemy, while a level 48 enemy passes this specific check. Forever’s November 8 increase applies to dungeon kills. The November 20 reset limit is five entries per dungeon per hour.</p><div class="dg-links">${links(['gap','xp','cap'])}</div></aside>`;
  }
  function questRow(d,q,i,saved) {
    const id=questId(d,i), stage=saved[id] || 0;
    const fields=[['Pick up',q.start],['Prerequisites',q.unlock],['Inside',q.objective],['Hand in',q.finish],['Rewards',q.reward]];
    return `<details class="dg-quest"${i===0?' open':''}><summary><span class="dg-lvl-small">Lv ${q.min}+</span><strong>${escape(q.name)}</strong><span class="dg-stage" data-stage-id="${id}">${stage ? states[stage] : ''}</span><span class="dg-caret" aria-hidden="true">⌄</span></summary><div class="dg-quest-body"><dl>${fields.map(([label,value])=>`<div><dt>${label}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl><div class="dg-status-row"><label>My quest status <select data-dg-state="${id}" data-dg-dungeon="${d.id}">${states.map((s,j)=>`<option value="${j}"${stage===j?' selected':''}>${s}</option>`).join('')}</select></label><span class="dg-save" role="status"></span></div><div class="dg-links">${links(q.refs)}</div></div></details>`;
  }
  function detail(id) {
    const d=recordFor(id); if (!d) return '';
    const saved=read(), current=window.Tracker?.summary?.()?.weapon;
    return `<article class="dg-page dg-detail"><a href="#dungeons" class="dg-back">← All dungeons</a><header class="dg-header"><p class="dg-kicker">${escape(d.zone)} · ${escape(d.type)}</p><h1>${escape(d.name)}</h1><p>${escape(d.summary)}</p></header><div class="dg-subnav"><span class="dg-level">Run at ${d.range}</span><span>${d.quests.length} quest entries</span><span>${d.gear.length} gear notes</span></div><section class="dg-plan"><div><h2>Getting there</h2><p>${escape(d.access)}</p><h3>When to skip</h3><p>${escape(d.skip)}</p></div><div><h2>First run</h2><ol>${d.prep.map(s=>`<li>${escape(s)}</li>`).join('')}</ol></div></section><section class="dg-quest-section"><div class="dg-heading-row"><div><p class="dg-kicker">Alliance &amp; shared</p><h2>Quest checklist</h2></div><small data-dg-progress="${d.id}">${progress(d)}</small></div><p class="dg-note">The level beside a quest is its minimum pickup level. Follow-ups are grouped with their starting objective where indicated.</p>${d.quests.map((q,i)=>questRow(d,q,i,saved)).join('')}</section><section class="dg-gear-section"><div class="dg-heading-row"><div><p class="dg-kicker">Sword and shield</p><h2>Reward decisions</h2></div></div><p class="dg-note">${current?'Recorded main hand: '+escape(current)+'. ':''}Compare the equipped tooltip, weapon skill and time to obtain the item. Boss drops are possible upgrades; completion rewards depend on the quest.</p><div class="dg-gear-list">${d.gear.map(item=>`<div class="dg-gear"><h3>${escape(item.name)}</h3><p class="dg-origin">${escape(item.from)}</p><p>${escape(item.decision)}</p><div class="dg-links">${links(item.refs)}</div></div>`).join('')}</div></section><section class="dg-source-box"><h2>Dungeon references</h2><div class="dg-links">${links(d.refs)}</div><p>Checked 26 November 2026. The timing advice is a proposed route for a morning Protection Warrior. Test repeats against your own travel-inclusive XP/hour.</p></section></article>`;
  }
  function list(host) {
    const total=records.reduce((n,d)=>n+d.quests.length,0);
    host.innerHTML=`<div class="dg-page"><header class="dg-header"><p class="dg-kicker">Dungeon field guide</p><h1>Dungeon compendium</h1><p>Plan the first clear, pick up the Alliance quests and compare each reward against your current gear.</p></header><div class="dg-controls"><label class="dg-search">${searchIcon}<input data-dg-search type="search" aria-label="Search dungeons, quests, bosses or gear" placeholder="Dungeon, quest, boss or gear…"></label><span class="dg-display-count" role="status">${records.length} dungeons · ${total} quest entries</span></div><div class="dg-grid">${records.map(d=>card(d,'')).join('')}</div>${rulePanel()}</div>`;
    const field=host.querySelector('[data-dg-search]');
    field.addEventListener('input',()=>{
      const query=normalize(field.value);
      const found=records.filter(d=>normalize([d.name,d.zone,d.type,d.range,d.access,...d.quests.flatMap(q=>[q.name,q.start,q.unlock,q.objective,q.finish,q.reward]),...d.gear.flatMap(g=>[g.name,g.from,g.decision])].join(' ')).includes(query));
      const grid=host.querySelector('.dg-grid');
      grid.innerHTML=found.length ? found.map(d=>card(d,query)).join('') : '<p class="dg-empty">No matching dungeon, quest or gear record. <button type="button" data-dg-clear>Clear search</button></p>';
      if(!found.length)grid.querySelector('[data-dg-clear]').onclick=()=>{field.value='';field.dispatchEvent(new Event('input'));field.focus();};
      host.querySelector('.dg-display-count').textContent=query?`${found.length} matching dungeon${found.length===1?'':'s'}`:`${records.length} dungeons · ${total} quest entries`;
    });
  }
  function render(host,id) {
    const rawId=id || location.hash.split('/')[1];
    if(recordFor(rawId)){host.innerHTML=detail(rawId);return;}
    list(host);
  }
  document.addEventListener('change',event=>{
    const field=event.target.closest?.('[data-dg-state]'); if(!field)return;
    const value=Number(field.value), d=recordFor(field.dataset.dgDungeon); if(!d || !Number.isInteger(value) || value<0 || value>=states.length)return;
    const saved=read();saved[field.dataset.dgState]=value;
    const note=field.closest('.dg-status-row').querySelector('.dg-save');
    try {localStorage.setItem(key,JSON.stringify(saved));} catch {note.textContent='Browser storage is unavailable. This change cannot be saved.';return;}
    const scope=field.closest('.dg-page');
    scope.querySelector(`[data-stage-id="${field.dataset.dgState}"]`).textContent=value ? states[value]:'';
    scope.querySelector('[data-dg-progress]').textContent=progress(d);
    note.textContent='Saved';
  });
  return {render,detail,reference};
})();
