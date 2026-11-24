/* ═══════════════════════════════════════════════════════════════════
   ACTION INSTALL TRACKER — collapsible job cards (cards.js)
   Shared by Log Installs and Log Recall.

   • A finished job folds to one line: customer, job #, what was done,
     piece rate vs hourly, and the total pay for that job.
   • "+ Add" folds everything above it so the day stays short.
   • While someone is typing in a field the list is NOT redrawn (a slow
     save landing mid-word used to wipe the field). It catches up the
     moment they leave the field.
   ═══════════════════════════════════════════════════════════════════ */
window.AIT_CC=(function(){
    var es=(localStorage.getItem('aitLang')||'en')==='es';
    var T={
        noname:es?'Sin nombre':'No name yet', piece:es?'Por pieza':'Piece rate', hourly:es?'Por hora':'Hourly',
        hrs:es?'hrs':'hrs', nopay:es?'Sin pago':'No pay yet', jobs:es?'Trabajos':'Jobs', daypay:es?'Pago del día':'Day pay',
        done:es?'✓ Listo — Cerrar':'✓ Done — Collapse', week:es?'Pago de la semana':'Week pay', fold:es?'Cerrar':'Collapse'
    };
    var S={state:{},first:true,last:null,held:false,o:null};
    var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});};
    var money=function(n){return '$'+(parseFloat(n)||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});};
    /* same math as jobPay() on every page: (qty × rate) per checked piece item + hours × hourly rate */
    function split(c){
        var piece=0;
        if(c.pieceItems){Object.keys(c.pieceItems).forEach(function(i){if(c.pieceItems[i]){
            var q=(c.pieceQty&&c.pieceQty[i]!=null&&c.pieceQty[i]!=='')?parseFloat(c.pieceQty[i]):1;
            var a=parseFloat((c.pieceAmounts&&c.pieceAmounts[i])||0)||0;piece+=(isNaN(q)?0:q)*a;}});}
        var hrs=parseFloat(c.hours)||0,hourly=hrs*(parseFloat(c.hourlyRate)||0);
        return {piece:piece,hourly:hourly,hrs:hrs,total:piece+hourly};
    }
    function typing(){
        var a=document.activeElement,list=S.o&&document.getElementById(S.o.list);
        return !!(a&&list&&list.contains(a)&&(a.tagName==='TEXTAREA'||(a.tagName==='INPUT'&&/^(text|number|tel)$/.test(a.type))));
    }
    function summary(c,i){
        var p=split(c),o=S.o,parts=[];
        if(p.piece)parts.push(T.piece+' <b>'+money(p.piece)+'</b>');
        if(p.hourly)parts.push(T.hourly+' <b>'+money(p.hourly)+'</b> ('+p.hrs+' '+T.hrs+')');
        var meta=(o.meta(c)||[]).filter(Boolean).map(esc).join(' · ');
        return '<button type="button" class="call-card cc-row '+(p.total?'cc-paid':'cc-nopay')+(c.continuing?' continuing':'')+'" onclick="AIT_CC.toggle(\''+c.id+'\')">'+
            '<span class="cc-n">'+(i+1)+'</span>'+
            '<span class="cc-main"><span class="cc-name">'+(esc(c.customerName)||T.noname)+'</span>'+
            (meta?'<span class="cc-meta">'+meta+'</span>':'')+
            (parts.length?'<span class="cc-split">'+parts.join(' · ')+'</span>':'')+'</span>'+
            '<span class="cc-pill">'+(c.approved?'✓ ':'')+(p.total?money(p.total):T.nopay)+'</span>'+
            '<span class="cc-chev">▾</span></button>';
    }
    function strip(arr){
        var t={piece:0,hourly:0,total:0};
        arr.forEach(function(c){var p=split(c);t.piece+=p.piece;t.hourly+=p.hourly;t.total+=p.total;});
        return '<div class="day-pay"><div><div class="dp-l">'+T.jobs+'</div><div class="dp-v">'+arr.length+'</div></div>'+
            '<div><div class="dp-l">'+T.piece+'</div><div class="dp-v">'+money(t.piece)+'</div></div>'+
            '<div><div class="dp-l">'+T.hourly+'</div><div class="dp-v">'+money(t.hourly)+'</div></div>'+
            '<div class="dp-tot"><div class="dp-l">'+T.daypay+'</div><div class="dp-v">'+money(t.total)+'</div></div></div>';
    }
    function draw(arr){
        S.last=arr;
        if(typing()){S.held=true;return;}
        S.held=false;
        var o=S.o,el=document.getElementById(o.list);if(!el)return;
        if(!arr.length){el.innerHTML=o.empty();S.first=false;return;}
        /* when a day is first opened, jobs that already have a customer and pay fold to one line.
           Anything added or opened after that stays open until it is folded by hand. */
        arr.forEach(function(c){if(!(c.id in S.state))S.state[c.id]=S.first?!(c.customerName&&split(c).total>0):true;});
        S.first=false;
        el.innerHTML=strip(arr)+arr.map(function(c,i){return S.state[c.id]?o.full(c,i):summary(c,i);}).join('');
    }
    document.addEventListener('focusout',function(){
        if(!S.held)return;
        setTimeout(function(){if(S.held&&!typing()&&S.last)draw(S.last);},140);
    });
    return {
        T:T, split:split, money:money,
        init:function(o){S.o=o;},
        reset:function(){S.state={};S.first=true;S.last=null;S.held=false;},
        draw:draw,
        redraw:function(){if(S.last)draw(S.last);},
        toggle:function(id){
            S.state[id]=!S.state[id];
            if(S.last)draw(S.last);
            if(S.state[id])setTimeout(function(){var el=document.querySelector('[data-cc="'+id+'"]');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},40);
        },
        foldAll:function(){Object.keys(S.state).forEach(function(id){S.state[id]=false;});},
        foldBtn:function(id){return '<button type="button" class="cc-fold" onclick="AIT_CC.toggle(\''+id+'\')" aria-label="'+T.fold+'">▴</button>';},
        doneBtn:function(id){return '<button type="button" class="cc-done" onclick="AIT_CC.toggle(\''+id+'\')">'+T.done+'</button>';},
        /* week strip under the calendar: tot = [{n,pay} × 7] */
        weekStrip:function(elId,tot,word){
            var el=document.getElementById(elId);if(!el)return;
            var n=0,pay=0;tot.forEach(function(d){if(d){n+=d.n;pay+=d.pay;}});
            el.innerHTML='<span>'+n+' '+word+'</span><span>'+T.week+'<b>'+money(pay)+'</b></span>';
        }
    };
})();
