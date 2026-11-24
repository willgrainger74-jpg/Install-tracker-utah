/* ═══════════════════════════════════════════════════════════════════
   ACTION INSTALL TRACKER — bottom tab bar (nav.js)
   One file builds the bar on every page. To add/move a page, edit
   TABS (the four on the bar) or MORE (the slide-up sheet).
   Styling lives in ui.css.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
    var es=(localStorage.getItem('aitLang')||'en')==='es';
    var I={
        home:'<path d="M5 12H3l9-9 9 9h-2"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"/>',
        log:'<path d="M7 10h3V7L6.5 3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1-3 3l-6-6a6 6 0 0 1-8-8z"/>',
        recall:'<path d="M9 14l-4-4 4-4"/><path d="M5 10h11a4 4 0 1 1 0 8h-1"/>',
        turnin:'<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 12h6M9 16h6"/>',
        more:'<path d="M4 6h16M4 12h16M4 18h16"/>',
        lookup:'<circle cx="10" cy="10" r="7"/><path d="M21 21l-6-6"/>',
        leaders:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
        payroll:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>',
        manager:'<circle cx="12" cy="12" r="9"/><path d="M8 16l2-6 6-2-2 6z"/>'
    };
    var svg=function(k){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+I[k]+'</svg>';};
    var TABS=[
        ['install_index.html','home',es?'Inicio':'Home'],
        ['install_log.html','log',es?'Registrar':'Log'],
        ['install_recall.html','recall',es?'Rellamadas':'Recalls'],
        ['install_turnins.html','turnin',es?'Entregas':'Turn-In']
    ];
    var MORE=[
        ['install_lookup.html','lookup',es?'Buscar Trabajo':'Job Lookup'],
        ['install_leaderboard.html','leaders',es?'Líderes':'Leaderboard'],
        ['install_payroll.html','payroll',es?'N\u00f3mina':'Payroll'],
        ['install_manager.html','manager',es?'Gerente':'Manager']
    ];
    var here=(location.pathname.split('/').pop()||'install_index.html');
    if(here==='index.html')here='install_index.html';
    var inMore=MORE.some(function(m){return m[0]===here;});
    var html='<nav id="abn">'+TABS.map(function(t){
        return '<a class="abn-tab'+(here===t[0]?' on':'')+'" href="'+t[0]+'"><span class="abn-ico">'+svg(t[1])+'</span><span class="abn-lab">'+t[2]+'</span></a>';
    }).join('')+'<button class="abn-tab'+(inMore?' on':'')+'" id="abn-more" type="button"><span class="abn-ico">'+svg('more')+'</span><span class="abn-lab">'+(es?'Más':'More')+'</span></button></nav>'+
    '<div id="abn-scrim"></div><div id="abn-sheet"><div class="abn-sh">'+(es?'Más':'More')+'</div><div class="abn-grid">'+MORE.map(function(m){
        return '<a class="abn-item" href="'+m[0]+'"><span class="i">'+svg(m[1])+'</span><span class="t">'+m[2]+'</span></a>';
    }).join('')+'</div></div>';
    var wrap=document.createElement('div');wrap.className='no-print';wrap.innerHTML=html;
    document.body.appendChild(wrap);
    var sheet=document.getElementById('abn-sheet'),scrim=document.getElementById('abn-scrim');
    document.getElementById('abn-more').onclick=function(){sheet.classList.toggle('open');scrim.classList.toggle('open');};
    scrim.onclick=function(){sheet.classList.remove('open');scrim.classList.remove('open');};
    if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(function(){});}
})();
