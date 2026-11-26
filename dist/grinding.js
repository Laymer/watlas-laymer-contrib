(() => {
  const camps = [
    { min: 46, place: 'Dunemaul Compound', zone: 'Tanaris', target: 'Dunemaul Ogres',
      pull: 'Ride southwest from Gadgetzan to the outer huts (38, 54). Draw one melee ogre back into the sand before trying a pair.',
      fallback: 'Try the Land Ragers northeast of the compound (46, 48).' },
    { min: 49, place: 'Deadwood Village', zone: 'Felwood', target: 'Deadwood Warriors',
      pull: 'From Emerald Sanctuary ride southwest to the tents (48, 91). Pull a warrior out of the village so a fleeing target runs across cleared ground.',
      fallback: 'Pick off lone wildlife on the road back toward Emerald Sanctuary.' },
    { min: 52, place: 'Fungal Rock', zone: 'Un’Goro Crater', target: 'Un’Goro apes',
      pull: 'Approach the cave in the north of the crater. Pull one ape from the mouth and finish it outside. Watch the approach for patrols.',
      fallback: 'Circle back toward Marshal’s Refuge and collect outstanding crystal objectives.' },
    { min: 54, place: 'Felstone Field', zone: 'Western Plaguelands', target: 'Melee undead at the farm',
      pull: 'Ride north from Chillwind Camp. Work from the field edge with your back to cleared ground. Leave casters by the buildings.',
      fallback: 'Return toward Chillwind for the Clear the Way objectives at Sorrow Hill.' },
    { min: 56, place: 'Ice Thistle Hills', zone: 'Winterspring', target: 'Ice Thistle yetis',
      pull: 'Ride southeast from Everlook. Pull the outdoor yetis singly along the hillside, keeping the den entrance clear.',
      fallback: 'Try scattered bears west toward Everlook while the hillside respawns.' },
    { min: 58, place: 'Ice Thistle den', zone: 'Winterspring', target: 'Ice Thistle Matriarchs and Patriarchs',
      pull: 'Clear the mouth of the den first. Draw one adult yeti back to the entrance and check its level before adding another.',
      fallback: 'Return to the outdoor yetis at Ice Thistle Hills if the den is occupied.' }
  ];
  function band(level) {
    return camps.findLast(camp => level >= camp.min);
  }
  function end(camp) {
    return camps[camps.indexOf(camp) + 1]?.min || 60;
  }
  function render(host) {
    host.innerHTML = `<article class="field-guide"><h1>Grinding tips</h1>
      <p>Start with the camp for your level. These are planning estimates until you have timed your own runs.</p>
      <h2>Work a melee pack</h2>
      <p>Equip a shield and use Defensive Stance. Pull a melee target onto clear ground. Step back until the whole pack faces you, then use Shield Block as swings arrive. Use Revenge when a block, dodge or parry lights it up. Focus one target down first.</p>
      <p>Shield Specialization (5/5) generates Rage on blocks. Improved Revenge (3/3) increases its damage. Charging in Defensive Stance requires Vanguard, the 16-point Protection talent. Without Vanguard, pull at range or walk into aggro range.</p>
      <p>After a non-trivial kill, Victory Rush becomes available for 20 seconds. When its 30-second cooldown is ready, strike the next safe target while missing health to recover 10% of maximum health. Avoid chasing a new pack just to spend the proc.</p>
      <p>Break line of sight to bring a caster to you and interrupt with Shield Bash. Pull runners away from occupied ground and finish them first. When respawns or enemy players keep you idle, take the nearby fallback and keep the session clock running.</p>
      <h2>Test one more mob</h2>
      <ol><li>At the same camp, run two ten-minute circuits with similar gear, rested XP and competition. Start each clock from the same staging point with <code>/watlas start grinding</code>.</li>
      <li>Use your comfortable pull size for the first circuit. Add one mob per pull in the second. Include travel, recovery, PvP and corpse runs. Stop with <code>/watlas stop</code> and import each <code>/watlas export</code> in the <a href="#journal">session log</a>.</li>
      <li>Open both entries. Compare XP gained divided by total elapsed hours and check deaths. Keep the larger pull only if it gains time without extra deaths. Repeat a close or interrupted trial.</li></ol>
      <p>Time a quest circuit or a ready dungeon group the same way, starting before travel or recruitment and ending after hand-in. Switch when comparable personal runs beat the camp. Separate first-clear quest XP from repeat clears.</p>
      <h2>Camps by level</h2>${camps.map(c => `<section><h3>${c.min}–${end(c)-1} · ${c.place}</h3><p><strong>${c.zone} · ${c.target}.</strong> ${c.pull} Move on at level ${end(c)}. ${c.fallback}</p></section>`).join('')}
      <h2>Class sources</h2><p>Consulted 26 November 2026.</p><ul>
      <li><a href="https://news.blizzard.com/en-us/article/24301514/world-of-warcraft-forever-class-deep-dives-priest-and-warrior">Blizzard · Warrior class changes and Victory Rush timing</a></li>
      <li><a href="https://www.icy-veins.com/wow-forever/protection-warrior-leveling/">Abide · Protection Warrior leveling and talent ranks</a></li>
      <li><a href="https://mobalytics.gg/wow-forever/classes/protection-warrior-guide-kalltorak">KallTorak · Protection Warrior pulls and priorities</a></li></ul></article>`;
  }
  window.Grinding = { band, end, render };
})();
