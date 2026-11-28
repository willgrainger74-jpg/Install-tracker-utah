/* ═══════════════════════════════════════════════════════════════════
   ACTION INSTALL TRACKER — change history (audit.js)
   Every approval, pay edit, delete and rate change is written to the
   Firebase node `installAudit` with who did it and when. The Manager
   Portal's History tab reads it back.
   ═══════════════════════════════════════════════════════════════════ */
window.AIT_AUDIT=(function(){
    function sess(){try{return JSON.parse(localStorage.getItem('ait_session'))||null;}catch(e){return null;}}
    // who is making the change: a signed-in manager, the shared manager PIN, or the signed-in tech
    function who(){
        var s=sess(),onMgr=/install_manager\.html/.test(location.pathname);
        if(s&&s.role==='manager')return {by:s.name||s.username||'Manager',role:'manager'};
        if(onMgr)return {by:'Manager PIN',role:'manager'};
        return {by:(s&&s.name)||'Unknown',role:'tech'};
    }
    function money(n){return '$'+(parseFloat(n)||0).toFixed(2);}
    // describe which turn-in a change belongs to
    function ctx(col,dk,id,r,personName){
        r=r||{};
        return {col:col,dk:dk,id:id,job:String((col==='recalls'?r.originalJobNumber:r.jobNumber)||''),customer:r.customerName||'',
            personId:r.personId||r.loggedById||'',personName:personName||r.installerName||r.loggedByName||''};
    }
    function log(action,c,detail){
        try{
            var w=who(),rec={ts:Date.now(),by:w.by,role:w.role,action:action,detail:detail||''};
            Object.keys(c||{}).forEach(function(k){if(c[k]!=null&&c[k]!=='')rec[k]=c[k];});
            firebase.database().ref('installAudit').push(rec);
        }catch(e){}
    }
    return {log:log,who:who,ctx:ctx,money:money};
})();
