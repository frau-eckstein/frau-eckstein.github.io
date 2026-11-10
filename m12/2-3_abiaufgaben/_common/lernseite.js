/* ══════════════════════════════════════════════════════════════════
   lernseite.js — gemeinsame Interaktionen aller Lernseiten
   ──────────────────────────────────────────────────────────────────
   Einbinden am Ende von <body>:  <script src="../_common/lernseite.js"></script>
   (Startseite im Hauptordner:    <script src="_common/lernseite.js"></script>)

   Alles wird über HTML-Attribute gesteuert – Seiten brauchen in der
   Regel KEIN eigenes JavaScript:

   • Fortschritt (Startseite)   <body data-thema="m9_2_1_quadratik">
       .level[data-level]  (oder .abschnitt[data-level])  mit  .erledigt input
       #fortschritt-fuellung, #fortschritt-zahl, #level-nav, #bonus-zahl
       .bonus-check input  – gespeichert unter data-id, sonst unter der
         Position (0, 1, 2 …). Alte Seiten speichern nach Position: dort
         KEIN data-id setzen und die Reihenfolge nicht ändern.
   • Selbstkontrolle            .pruefung  (Container) mit Knopf .pruefen
       Felder:  <input class="eingabe" data-loesung="2,5|5/2" data-toleranz="0.01">
                <select class="eingabe" data-loesung="b">
       Auswahl: <fieldset class="auswahl"> … <input type="radio|checkbox" data-richtig>
       Ausgabe: <div class="rueckmeldung"></div>
       optional data-text-richtig / data-text-falsch am Container
   • Wahr/Falsch                .wf-aussage[data-richtig="wahr|falsch"]
       mit zwei <button data-wert="wahr|falsch"> in .wf-knoepfe
   • Bildbetrachter             [data-bild="modal-id"] öffnet  .bild-modal#modal-id
   • Zurücksetzen               .zuruecksetzen in einem .pruefung-Container
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var THEMA = (document.body && document.body.getAttribute('data-thema')) || 'lernseite';

  function lade(schluessel) {
    try { return JSON.parse(localStorage.getItem(schluessel + '_' + THEMA)) || {}; } catch (e) { return {}; }
  }
  function speichere(schluessel, daten) {
    try { localStorage.setItem(schluessel + '_' + THEMA, JSON.stringify(daten)); } catch (e) { /* privat/blockiert */ }
  }
  function $all(sel, wurzel) { return Array.prototype.slice.call((wurzel || document).querySelectorAll(sel)); }

  /* ── Fortschritt der Level (Startseite) ─────────────────────────── */
  function fortschritt() {
    var checks = $all('[data-level] .erledigt input');
    if (!checks.length) return;
    var stand = lade('lvl');
    var nav = document.getElementById('level-nav');
    var links = [];

    checks.forEach(function (c) {
      var sec = c.closest('[data-level]');
      var lvl = sec.getAttribute('data-level');
      if (!sec.id) sec.id = 'level-' + lvl;
      if (stand[lvl]) c.checked = true;
      c.addEventListener('change', function () { stand[lvl] = c.checked; speichere('lvl', stand); update(); });
      if (nav) {
        var a = document.createElement('a');
        a.href = '#' + sec.id; a.textContent = lvl; a.title = 'Zu Level ' + lvl;
        nav.appendChild(a); links.push([a, sec]);
      }
    });

    function update() {
      var fertig = 0;
      checks.forEach(function (c) {
        var sec = c.closest('[data-level]');
        sec.classList.toggle('done', c.checked);
        if (c.checked) fertig++;
      });
      var p = Math.round(100 * fertig / checks.length);
      var f = document.getElementById('fortschritt-fuellung'); if (f) f.style.width = p + '%';
      var z = document.getElementById('fortschritt-zahl'); if (z) z.textContent = fertig + ' / ' + checks.length + ' Level';
      links.forEach(function (l) { l[0].classList.toggle('fertig', l[1].classList.contains('done')); });
    }
    update();
  }

  function bonus() {
    var checks = $all('.bonus-check input');
    if (!checks.length) return;
    var stand = lade('bonus');
    function update() {
      var n = checks.filter(function (c) { return c.checked; }).length;
      var el = document.getElementById('bonus-zahl'); if (el) el.textContent = n + ' / ' + checks.length;
    }
    checks.forEach(function (c, i) {
      var key = c.getAttribute('data-id') || String(i);
      if (stand[key]) c.checked = true;
      c.addEventListener('change', function () { stand[key] = c.checked; speichere('bonus', stand); update(); });
    });
    update();
  }

  /* ── Vergleich von Antworten ────────────────────────────────────── */
  function normal(s) {
    return String(s).trim().toLowerCase()
      .replace(/−/g, '-')          // echtes Minus → Bindestrich
      .replace(/\s+/g, '')
      .replace(/\*/g, '·');
  }
  function alsZahl(s) {
    var t = normal(s).replace(',', '.');
    var m = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);   // Bruch 5/2
    if (m) return parseFloat(m[1]) / parseFloat(m[2]);
    return /^-?\d*\.?\d+(e-?\d+)?$/.test(t) ? parseFloat(t) : NaN;
  }
  function stimmt(wert, loesung, toleranz) {
    if (normal(wert) === '') return false;
    return String(loesung).split('|').some(function (l) {
      var a = alsZahl(wert), b = alsZahl(l);
      if (!isNaN(a) && !isNaN(b)) return Math.abs(a - b) <= (toleranz || 1e-9);
      return normal(wert) === normal(l);
    });
  }

  function zeige(el, art, text) {
    if (!el) return;
    el.className = 'rueckmeldung zeigen ' + art;
    el.setAttribute('role', 'status');
    var icon = art === 'richtig' ? 'haken' : art === 'teilweise' ? 'halb' : 'kreuz';
    el.innerHTML = '<span class="icon icon--' + icon + '" aria-hidden="true"></span><span></span>';
    el.lastChild.textContent = text;
  }

  /* ── Selbstkontrolle (.pruefung) ────────────────────────────────── */
  function pruefung() {
    $all('.pruefung').forEach(function (box) {
      var knopf = box.querySelector('.pruefen');
      var aus = box.querySelector('.rueckmeldung');
      if (knopf) knopf.addEventListener('click', function () {
        var gesamt = 0, richtig = 0;

        $all('[data-loesung]', box).forEach(function (f) {
          gesamt++;
          var ok = stimmt(f.value, f.getAttribute('data-loesung'), parseFloat(f.getAttribute('data-toleranz')));
          f.classList.toggle('richtig', ok); f.classList.toggle('falsch', !ok);
          f.setAttribute('aria-invalid', ok ? 'false' : 'true');
          if (ok) richtig++;
        });

        $all('.auswahl', box).forEach(function (fs) {
          gesamt++;
          var alleOk = true;
          $all('input', fs).forEach(function (i) {
            var soll = i.hasAttribute('data-richtig');
            var opt = i.closest('.option');
            if (opt) { opt.classList.remove('richtig', 'falsch'); }
            if (i.checked && opt) opt.classList.add(soll ? 'richtig' : 'falsch');
            if (i.checked !== soll) alleOk = false;
          });
          if (alleOk) richtig++;
        });

        if (!gesamt) return;
        if (richtig === gesamt) zeige(aus, 'richtig', box.getAttribute('data-text-richtig') || 'Super, alles richtig!');
        else if (richtig === 0) zeige(aus, 'falsch', box.getAttribute('data-text-falsch') || 'Das stimmt noch nicht. Schau dir die Hilfen an und versuche es noch einmal.');
        else zeige(aus, 'teilweise', richtig + ' von ' + gesamt + ' richtig – die markierten Felder solltest du noch einmal prüfen.');
      });

      var reset = box.querySelector('.zuruecksetzen');
      if (reset) reset.addEventListener('click', function () {
        $all('[data-loesung]', box).forEach(function (f) { f.value = ''; f.classList.remove('richtig', 'falsch'); f.removeAttribute('aria-invalid'); });
        $all('.auswahl input', box).forEach(function (i) { i.checked = false; });
        $all('.option', box).forEach(function (o) { o.classList.remove('richtig', 'falsch'); });
        if (aus) aus.className = 'rueckmeldung';
      });

      // Enter in einem Feld = Prüfen
      $all('input[data-loesung]', box).forEach(function (f) {
        f.addEventListener('keydown', function (e) { if (e.key === 'Enter' && knopf) { e.preventDefault(); knopf.click(); } });
      });
    });
  }

  /* ── Wahr/Falsch ───────────────────────────────────────────────── */
  function wahrFalsch() {
    $all('.wf-aussage').forEach(function (z) {
      var soll = (z.getAttribute('data-richtig') || '').toLowerCase();
      $all('.wf-knoepfe button', z).forEach(function (b) {
        b.type = 'button';
        b.addEventListener('click', function () {
          $all('.wf-knoepfe button', z).forEach(function (x) { x.classList.remove('gewaehlt'); x.setAttribute('aria-pressed', 'false'); });
          b.classList.add('gewaehlt'); b.setAttribute('aria-pressed', 'true');
          var ok = b.getAttribute('data-wert') === soll;
          z.classList.toggle('richtig', ok); z.classList.toggle('falsch', !ok);
        });
      });
    });
  }

  /* ── Bildbetrachter ─────────────────────────────────────────────── */
  function bilder() {
    $all('[data-bild]').forEach(function (t) {
      t.addEventListener('click', function () {
        var m = document.getElementById(t.getAttribute('data-bild'));
        if (m) { m.classList.add('offen'); var zu = m.querySelector('.bild-modal-zu'); if (zu) zu.focus(); }
      });
    });
    $all('.bild-modal').forEach(function (m) {
      m.addEventListener('click', function (e) { if (e.target === m || e.target.closest('.bild-modal-zu')) m.classList.remove('offen'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') $all('.bild-modal.offen').forEach(function (m) { m.classList.remove('offen'); });
    });
  }

  /* ── Lehrerbereich (nur Hürde, KEIN echter Schutz) ──────────────── */
  window.lehrerLogin = function (ziel, passwort) {
    var pw = window.prompt('Passwort für den Lehrerbereich:');
    if (pw !== null && pw === (passwort || 'Euler')) window.location.href = ziel || 'lehrer.html';
  };

  function start() { fortschritt(); bonus(); pruefung(); wahrFalsch(); bilder(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
