(() => {
  'use strict';

  const zones = { brussels: 'Europe/Brussels', newYork: 'America/New_York', losAngeles: 'America/Los_Angeles' };
  const formatter = (zone, options) => new Intl.DateTimeFormat('en-GB', {timeZone: zone, ...options});
  const calendar = { year: 'numeric', month: '2-digit', day: '2-digit' };
  function localDate(instant = new Date()) {
    const parts = formatter(zones.brussels, calendar).formatToParts(instant);
    const get = type => parts.find(p => p.type === type).value;
    return get('year') + '-' + get('month') + '-' + get('day');
  }
  function times(date = localDate()) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
    const anchor = new Date(date + 'T05:00:00Z');
    if (!Number.isFinite(+anchor) || anchor.toISOString().slice(0, 10) !== date) return null;
    const localHour = Number(formatter(zones.brussels, {hour: '2-digit', hourCycle: 'h23'}).format(anchor));
    const start = new Date(+anchor + (5 - localHour) * 3600000);
    const end = new Date(+start + 3600000);
    const ranges = {date};
    for (const [key, zone] of Object.entries(zones)) {
      const display = formatter(zone, {weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'});
      ranges[key] = display.format(start) + ' – ' + display.format(end);
    }
    return ranges;
  }

  const fmt = value => Math.round(value).toLocaleString('en-GB');
  const decimal = value => value.toLocaleString('en-GB', {maximumFractionDigits: 2});
  const hrs = hours => {
    const min = Math.round(hours * 60);
    return min < 60 ? min + ' min' : Math.floor(min / 60) + 'h ' + String(min % 60).padStart(2, '0') + 'm';
  };
  const fmtRate = n => fmt(n) + ' XP/h';
  const safe = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const stateKey = 'warrior-atlas:decision-inputs:v1';
  const tabList = {dungeon: 'Dungeon', pvp: 'World PvP', weapon: 'Weapon', time: 'Time zones'};
  const examples = {
    dungeon: {solo: 20000, points: 18000, run: 38, travel: 6, wait: 10, overlap: 2000, left: 60},
    pvp: {points: 7000, action: 16, lost: 9, alt: 20000, move: 5, left: 35},
    weapon: {price: 28, wallet: 36, reserve: 15, gph: 10, before: 20000, after: 22500, horizon: 250000}
  };
  const fields = {
    dungeon: [
      ['solo','Solo pace (XP/h)','Full elapsed session, with downtime.'],
      ['points','Dungeon XP','Kills and turn-ins you can complete this run.'],
      ['run','Clear and hand-in (min)','From entry to the last planned turn-in.'],
      ['travel','Travel (min)','Time outside the clear and recruitment.'],
      ['wait','Recruitment (min)','Count only time outside the travel estimate.'],
      ['overlap','XP while recruiting','Optional if you quest while forming.'],
      ['left','Time available (min)','Your remaining play window.']
    ],
    pvp: [
      ['points','XP in the sample','Your total gain in the current area.'],
      ['action','Other play time (min)','All sample time excluding PvP delays.'],
      ['lost','PvP time lost (min)','Fighting, corpse runs and waiting.'],
      ['alt','Alternative pace (XP/h)','A comparable full session in the fallback area.'],
      ['move','Relocation time (min)','Flight, ride and setup for that fallback.'],
      ['left','Time remaining (min)','From now until you log out.']
    ],
    weapon: [
      ['price','Total upgrade cost (g)','Include supplies, travel fees and enchant.'],
      ['wallet','Gold on hand (g)','Defaults to your last recorded balance.'],
      ['reserve','Training and repair reserve (g)','Gold you intend to keep after purchase.'],
      ['gph','Funding pace (g/h)','Net gold per hour. Needed if gold is short.'],
      ['before','Current pace (XP/h)','Use comparable mobs, rest and session length.'],
      ['after','Upgraded pace (XP/h)','A measured or explicitly assumed comparison.'],
      ['horizon','XP until replacement or 60','Shorten the horizon for a temporary weapon.']
    ]
  };
  const records = {};
  function load(tab) {
    if (records[tab]) return records[tab];
    let stored;
    try { stored = JSON.parse(localStorage.getItem(stateKey))?.[tab]; } catch (_) {}
    const profile = window.Tracker?.summary?.() || {};
    const defaults = Object.assign({}, tab === 'dungeon' ? {overlap: 0, left: 60} : {});
    if (tab === 'pvp') defaults.left = 60;
    if (tab === 'weapon') {
      if (profile.gold != null) defaults.wallet = profile.gold;
      if (profile.pace > 0) defaults.before = Math.round(profile.pace);
      if (Number.isFinite(profile.remaining)) defaults.horizon = profile.remaining;
    }
    records[tab] = {example: stored?.example === true, values: defaults};
    for (const [key] of fields[tab] || []) {
      const v = stored?.values?.[key];
      if (v === '' || (v != null && Number.isFinite(Number(v)) && Number(v) >= 0)) records[tab].values[key] = v;
    }
    return records[tab];
  }
  function save(tab) {
    try {
      const old = JSON.parse(localStorage.getItem(stateKey)) || {};
      old[tab] = records[tab];
      localStorage.setItem(stateKey, JSON.stringify(old));
    } catch (_) {}
  }
  const intro = {
    dungeon:'Compare a complete tanking run with the solo XP you could earn in the same time.',
    pvp:'Compare staying in a contested area with moving to a fallback before logout.',
    weapon:'Compare the time saved by faster kills with time spent funding a purchase.',
    time:'Plan your Brussels morning against the US evening on the selected date.'
  };
  const result = (heading, body, metrics = []) => '<h3>' + heading + '</h3><p>' + body + '</p>' +
    (metrics.length ? '<dl>' + metrics.map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>').join('') + '</dl>' : '');
  const incomplete = msg => result('Your comparison', msg || 'Enter the missing measurements above, or load the example to try a comparison.');
  function values(tab) {
    const stored = load(tab).values, v = {};
    for (const [k] of fields[tab]) {
      const value = stored[k];
      v[k] = value === undefined || value === '' ? null : Number(value);
    }
    return v;
  }
  const has = (v, keys) => keys.every(k => Number.isFinite(v[k]) && v[k] >= 0);
  function dungeon(v) {
    if (!has(v,['solo','points','run','travel','wait','left']) || !(v.solo > 0 && v.run > 0 && v.left > 0)) return incomplete();
    if ((v.overlap ?? 0) < 0 || !Number.isFinite(v.overlap ?? 0)) return incomplete();
    const minutes = v.run + v.travel + v.wait;
    const gain = v.points + (v.overlap || 0);
    const rate = 60 * gain / minutes;
    const difference = gain - v.solo * minutes / 60;
    const allowance = Math.max(0, 60 * gain / v.solo - v.run - v.travel);
    const stats = [['All-in dungeon pace',fmtRate(rate)], ['Total commitment',fmt(minutes) + ' min'], ['Recruitment break-even*',decimal(allowance) + ' min']];
    if (v.wait === 0 && v.overlap > 0) return incomplete('Enter recruitment time for the XP you expect to earn while forming the group.');
    if (minutes > v.left) return result('Keep questing this session', 'The planned clear and hand-ins exceed your window by ' + decimal(minutes - v.left) + ' min. Compare a shorter run with only the XP and rewards you can collect before logout.', stats);
    const title = Math.abs(difference) < 1 ? 'Both routes are level on XP' : difference > 0 ? 'Take the dungeon run' : 'Stay on the solo route';
    const body = Math.abs(difference) < 1 ? 'Use a one-time quest, needed drop or safer play to break the tie.' : 'At the entered pace, ' + (difference > 0 ? 'the dungeon gains ' : 'solo play gains ') + fmt(Math.abs(difference)) + ' more XP over these ' + decimal(minutes) + ' minutes.';
    return result(title, body, stats);
  }
  function pvp(v) {
    if (!has(v,['points','action','lost','alt','move','left']) || v.action <= 0 || v.alt <= 0 || v.left <= 0) return incomplete();
    const now = v.points / (v.action + v.lost) * 60;
    const stay = now * v.left / 60;
    const relocate = Math.max(0, v.left - v.move) * v.alt / 60;
    const tie = Math.max(0, v.left * (1 - now / v.alt));
    const heading = Math.abs(relocate-stay)<1 ? 'Both options are level on XP' : relocate > stay ? 'Move to the fallback' : 'Stay in the current area';
    const body = 'If current pressure continues, expect about ' + fmt(stay) + ' XP by staying or ' + fmt(relocate) + ' XP by moving. Time the full ride before committing.';
    return result(heading, body, [['Current all-in pace',fmtRate(now)],['Time lost to PvP',decimal(100*v.lost/(v.lost+v.action))+'%'],['Break-even travel time',decimal(tie)+' min']]);
  }
  function weapon(v) {
    if (!has(v,['price','wallet','reserve','before','after','horizon']) || v.before <= 0 || v.after <= 0) return incomplete();
    if (!v.horizon) return result('No leveling time to recover','There is no XP left over this weapon’s entered useful life.');
    const need = Math.max(0, v.price+v.reserve-v.wallet);
    if (need && !(v.gph > 0)) return result('Enter a funding pace', 'Your buying shortfall is ' + decimal(need) + 'g after protecting your reserve. Add net gold per hour to compare farming time.');
    const farm = need ? need/v.gph : 0;
    const benefit = v.horizon * (1/v.before - 1/v.after);
    const net = benefit-farm;
    const stats = [['Funding shortfall',decimal(need)+'g'],['Dedicated funding time',hrs(farm)],['Leveling time at new pace',hrs(v.horizon/v.after)]];
    if (benefit <= 0) return result('Keep the current weapon for speed', 'The entered upgraded pace offers no leveling-time gain before replacement.', stats);
    return result(net > 0 ? 'The upgrade repays its time cost' : 'Keep the gold for this horizon',
      'The higher pace saves ' + hrs(benefit) + ' before replacement. After dedicated funding, the upgrade ' + (net >= 0 ? 'saves ' : 'costs ') + hrs(Math.abs(net)) + ' of play time.', stats);
  }
  function alternatives(level) {
    const items = window.Routes?.items || [];
    if (level >= 60) return '';
    const active = window.Atlas?.selectedRoute?.()?.id;
    const eligible = items.filter(r => r.min <= level && level <= r.max && r.id !== active);
    const solo = eligible.filter(r => r.type !== 'Dungeon');
    let pair = solo.length ? [solo[0], ...solo.slice(1).filter(r => r.zone !== solo[0].zone).slice(0,1)] : [];
    const instance = eligible.find(r => r.type === 'Dungeon');
    if (instance) pair.push(instance);
    return pair.length ? '<div class="dec-options"><h4>Fallbacks at level ' + level + '</h4>' + pair.map(r=>'<button type="button" data-dec-route="'+safe(r.id)+'">'+safe(r.title)+' <span>↗</span></button>').join('')+'</div>' : '';
  }
  function fieldsHTML(tab, rec) {
    return '<div class="dec-grid">' + fields[tab].map(([key, label, help]) =>
      '<label><strong>' + label + '</strong><input type="number" inputmode="decimal" min="0" step="any" data-dec-value="'+key+'" value="'+safe(rec.values[key] ?? '')+'" placeholder="Enter value"><small>'+help+'</small></label>').join('') + '</div>';
  }
  let dateChoice;
  function timeBody() {
    const date = dateChoice || localDate();
    return '<label class="dec-date"><strong>Session date in Brussels</strong><input type="date" data-dec-date value="'+safe(date)+'"></label><div class="dec-result" aria-live="polite"></div><p class="dec-foot">US West Coast players may still be in their evening session. Check the local group list and your recent PvP loss before treating a morning as quiet. Daylight-saving changes are applied separately for each city.</p>';
  }
  function displayTimes(target, date) {
    const tz = times(date);
    target.innerHTML = tz ? result('Your morning window', 'Weekdays below are local to each city.', [['Brussels', tz.brussels],['New York', tz.newYork],['Los Angeles', tz.losAngeles]]) : incomplete('Choose a valid date in Brussels.');
  }
  const calc = {dungeon, pvp, weapon};
  const notes = {
    dungeon:'*Maximum recruitment time at the entered total XP, travel and clear duration. A zero-minute allowance means the dungeon already ties or trails before recruitment. Count one-time quest XP only on the first run.',
    pvp:'This scenario carries your observed PvP loss forward and uses the fallback’s measured net pace after arrival. Neither rate is a server-wide estimate.',
    weapon:'The estimate holds both XP rates constant and assumes funding earns zero XP. Only the cash needed to buy while retaining the reserve costs farming time. Shorten the XP horizon if a dungeon reward could replace the weapon.'
  };
  function open(tab = 'dungeon') {
    if (!Object.hasOwn(tabList, tab)) tab = 'dungeon';
    const level = window.Tracker?.summary?.()?.level || 46;
    const nav = Object.entries(tabList).map(([key,label]) => '<button type="button" data-dec-tab="'+key+'" aria-pressed="'+(tab===key)+'">'+label+'</button>').join('');
    const rec = tab === 'time' ? null : load(tab);
    const toolbar = '<div class="dec-tools"><span data-dec-kind>'+(rec?.example ? 'Example scenario · editable' : 'Your scenario')+'</span><button type="button" data-dec-example>Load example</button></div>';
    let body = tab === 'time' ? timeBody() : toolbar + fieldsHTML(tab,rec) + '<div class="dec-result" aria-live="polite"></div><p class="dec-foot">'+notes[tab]+'</p>';
    if (tab === 'weapon' && window.Tracker?.summary?.()?.remainingIsUpperBound) body += '<p class="dec-foot">Your full-level XP-to-60 figure is an upper bound until current XP is recorded.</p>';
    if (tab === 'pvp') body += alternatives(level);
    window.Atlas.modal('Field calculator','<section class="dec-panel"><div class="dec-tabs" role="group" aria-label="Calculation">'+nav+'</div><p class="dec-intro">'+intro[tab]+'</p>'+body+'</section>');
    const host = document.querySelector('.dec-panel');
    if (!host) return;
    const output = host.querySelector('.dec-result');
    const update = () => {
      if (tab === 'time') displayTimes(output, host.querySelector('[data-dec-date]').value);
      else output.innerHTML = calc[tab](values(tab));
    };
    update();
    host.addEventListener('click', e => {
      const btn=e.target.closest('button');
      if (!btn) return;
      if (btn.dataset.decTab) open(btn.dataset.decTab);
      else if (btn.hasAttribute('data-dec-example')) {
        records[tab] = {example: true, values:{...examples[tab]}}; save(tab); open(tab);
      } else if (btn.dataset.decRoute) window.Routes?.detail?.(btn.dataset.decRoute);
    });
    host.addEventListener('input', e => {
      if (e.target.hasAttribute('data-dec-date')) dateChoice = e.target.value;
      else if (e.target.dataset.decValue) {
        rec.values[e.target.dataset.decValue]=e.target.value;
        save(tab);
      }
      update();
    });
  }
  window.Decisions = {open, times};
})();
