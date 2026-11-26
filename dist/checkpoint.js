(() => {
  function comparison(camp, level, profileLevel) {
    if (level !== profileLevel) return null;
    const benchmark = {id: 'camp', title: camp.place, zone: camp.zone,
      type: 'Grinding', min: camp.min, max: Grinding.end(camp) - 1};
    const routes = [benchmark, ...Routes.items.filter(route => route.type !== 'Grinding')];
    const result = Tracker.preferredRoute(routes, benchmark.id);
    if (!result) return null;
    return {route: routes.find(route => route.id === result.id), pace: Math.round(result.pace),
      count: result.count};
  }

  function render(host, read, save) {
    const profile = Tracker.summary().level;
    const progress = read().checkpoint || {};
    const saved = Number.isInteger(progress.level) && progress.level <= 60 ? progress.level : 46;
    const level = Math.max(profile, saved);
    const undo = progress.previous >= profile && progress.previous < saved;
    const camp = Grinding.band(level);
    const next = Grinding.end(camp);
    const measured = level < 60 && comparison(camp, level, profile);
    const route = measured && measured.route.type !== 'Grinding' && measured.route;
    const undoButton = undo ? '<button type="button" class="act" data-undo>Undo</button>' : '';
    let content;
    if (level === 60) {
      const title = profile === 60 ? 'Level 60 reached' : 'Final checkpoint complete';
      content = `<h1>${title}</h1><p>Your sessions and elapsed XP/hour are available in the <a href="#journal">session log</a>.</p>${undoButton}`;
    } else {
      const ready = route?.type === 'Dungeon';
      const title = route ? route.title : camp.place;
      const pull = route ? route.steps[0][1] : camp.pull;
      const target = route ? route.description : camp.target;
      const fallback = route ? `Work ${camp.target} at ${camp.place}. ${camp.pull}` : camp.fallback;
      const evidence = measured ? `Measured · ${measured.pace.toLocaleString()} XP/hour across ${measured.count} comparable morning sessions.` :
        'Camp estimate · compare your elapsed XP/hour in the session log.';
      content = `<p class="eyebrow">Level ${camp.min}–${next-1} · ${route ? route.zone : camp.zone}</p>
        <h1>${title}</h1><p class="checkpoint-target">${target}</p>
        <dl><dt>${route ? 'Start here' : 'First pull'}</dt><dd>${ready ? 'Go only with a ready healer and party. ' : ''}${pull}</dd>
        <dt>When to leave</dt><dd>Mark Done at level ${next}. ${route ? route.steps.at(-1)[1] : 'Switch to the fallback early if waiting for respawns or recovering from PvP costs you the circuit.'}</dd>
        <dt>${route ? 'Solo fallback' : 'Nearby fallback'}</dt><dd>${fallback}</dd></dl>
        <p class="checkpoint-evidence">${evidence}</p>
        <div class="checkpoint-actions"><button class="act primary" type="button" data-done>Done</button>${undoButton}
        <a href="#grinding">Grinding tips</a>${route ? `<button class="act" data-home-route="${route.id}">Route details</button>` : ''}</div>`;
    }
    host.innerHTML = `<article class="checkpoint">${content}</article>`;
    const update = (value, focusSelector) => {
      if (!save({checkpoint: value})) return;
      render(host, read, save);
      host.querySelector(focusSelector)?.focus();
    };
    host.querySelector('[data-done]')?.addEventListener('click', () =>
      update({level: next, previous: level}, '[data-undo]'));
    host.querySelector('[data-undo]')?.addEventListener('click', () =>
      update({level: progress.previous}, '[data-done]'));
  }
  window.Checkpoint = {render};
})();
