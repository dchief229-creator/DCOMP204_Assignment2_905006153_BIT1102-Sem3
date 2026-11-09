(function(){
var L=[
{id:1,t:"Hill Station Student Lodge",loc:"Hill Station",p:1200,r:"Single",f:["Water","Electricity","Internet"],a:"Available"},
{id:2,t:"Fourah Bay Shared House",loc:"Fourah Bay",p:750,r:"Shared",f:["Water","Electricity"],a:"Available"},
{id:3,t:"Wilberforce Courtyard Apartments",loc:"Wilberforce",p:2200,r:"Self-contained",f:["Water","Electricity","Internet"],a:"Few rooms left"},
{id:4,t:"Congo Cross Student Rooms",loc:"Congo Cross",p:900,r:"Single",f:["Water","Electricity"],a:"Available"},
{id:5,t:"Kissy Road Hostel",loc:"Kissy",p:650,r:"Shared",f:["Water"],a:"Waitlist"},
{id:6,t:"Lumley Garden Studios",loc:"Lumley",p:1900,r:"Self-contained",f:["Water","Electricity","Internet"],a:"Available"},
{id:7,t:"Aberdeen Quiet Rooms",loc:"Aberdeen",p:1400,r:"Single",f:["Water","Electricity","Internet"],a:"Few rooms left"},
{id:8,t:"Goderich Shared Flat",loc:"Goderich",p:800,r:"Shared",f:["Water","Electricity","Internet"],a:"Available"}];
var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
var n=function(v){return 'NLe '+v.toLocaleString('en-US')};
var slot=function(nm,alt,cls,over){return '<figure class="ph scene '+cls+'"><img src="images/'+nm+'.jpg" alt="'+alt+'" loading="lazy" onerror="this.remove()"><span class="hint">Add photo: images/'+nm+'.jpg</span>'+(over||'')+'</figure>'};
var img=function(l,x){return slot('listing-'+l.id,l.t,'ratio '+['','green','island','history'][l.id%4],x?'':'<span class="tagon">'+l.r+'</span><button class="heart" type="button" aria-label="Save listing" aria-pressed="false">&#9825;</button>')};
var av=function(l){return '<span class="badge '+(l.a==='Available'?'ok':'warn')+'">'+l.a+'</span>'};
function card(l){return '<article class="card">'+img(l)+'<h3>'+l.t+'</h3><p class="loc">'+l.loc+', Freetown</p><p class="price"><b>'+n(l.p)+'</b> / month</p><button class="btn sm" data-id="'+l.id+'">View details</button></article>'}
function row(l){return '<article class="rowc">'+img(l)+'<div><h3>'+l.t+'</h3><p class="loc">'+l.loc+', Freetown</p><p class="price"><b>'+n(l.p)+'</b> / month</p><p class="meta"><span class="badge">'+l.r+'</span>'+l.f.join(', ')+av(l)+'</p></div><button class="btn sm" data-id="'+l.id+'">View details</button></article>'}
var ft=$('#featured');if(ft)ft.innerHTML=[1,2,3].map(function(i){return card(L[i-1])}).join('');
var res=$('#results');
function chk(nm){return $$('input[name='+nm+']:checked').map(function(x){return x.value})}
function run(){if(!res)return;
 var q=($('#f-q')?$('#f-q').value:'').trim().toLowerCase(),lo=$('#f-loc').value,mn=+$('#f-min').value||0,mx=+$('#f-max').value||1e9,rm=chk('room'),fc=chk('fac');
 var out=L.filter(function(l){return (!q||(l.t+' '+l.loc+' '+l.r).toLowerCase().indexOf(q)>-1)&&(!lo||l.loc===lo)&&l.p>=mn&&l.p<=mx&&(!rm.length||rm.indexOf(l.r)>-1)&&fc.every(function(x){return l.f.indexOf(x)>-1})});
 var sv=$('#sort')?$('#sort').value:'';if(sv==='lo')out.sort(function(a,b){return a.p-b.p});if(sv==='hi')out.sort(function(a,b){return b.p-a.p});$('#count').textContent=out.length+(out.length===1?' result found':' results found');
 res.innerHTML=out.length?out.map(row).join(''):'<p class="empty panel">No accommodation matches these filters. Try a wider price range or reset the filters.</p>'}
if(res){
 var P=new URLSearchParams(location.search);
 if(P.get('loc'))$('#f-loc').value=P.get('loc');if(P.get('q')&&$('#f-q'))$('#f-q').value=P.get('q');if(P.get('max'))$('#f-max').value=P.get('max');
 if(P.get('room')){$$('input[name=room]').forEach(function(c){c.checked=c.value===P.get('room')})}
 $('#apply').addEventListener('click',run);
 $('#reset').addEventListener('click',function(){$('#f-loc').value='';$('#f-min').value='';$('#f-max').value='';$$('.filters input[type=checkbox]').forEach(function(c){c.checked=false});if($('#f-q'))$('#f-q').value='';run()});
 var sf=$('#sform');if(sf)sf.addEventListener('submit',function(e){e.preventDefault();run()});
 $$('.filters select,.filters input').forEach(function(x){x.addEventListener('change',run)});run();
}
document.addEventListener('click',function(e){var b=e.target.closest('button[data-id]');if(!b)return;
 var l=L[b.dataset.id-1],d=$('#dlg');if(!d){d=document.createElement('dialog');d.id='dlg';document.body.appendChild(d)}
 d.innerHTML='<div class="dbody">'+img(l,1)+'<div class="thumbs">'+slot('listing-'+l.id+'-2',l.t+' room','ratio sm')+slot('listing-'+l.id+'-3',l.t+' detail','ratio sm')+'</div>'+'<h3>'+l.t+'</h3><p class="loc">'+l.loc+', Freetown</p><p class="price"><b>'+n(l.p)+'</b> / month</p><p class="meta"><span class="badge">'+l.r+'</span>'+l.f.join(', ')+av(l)+'</p><p class="loc">Rent, rooms and facilities are sample details. Confirm everything with the provider before paying.</p><div class="cta"><a class="btn solid sm" href="contact.html?subject='+encodeURIComponent('Enquiry about '+l.t)+'">Send enquiry</a><button class="btn sm" onclick="this.closest(\'dialog\').close()">Close</button></div></div>';
 d.showModal()});
document.addEventListener('click',function(e){var h=e.target.closest('.heart');if(!h)return;var on=h.getAttribute('aria-pressed')!=='true';h.setAttribute('aria-pressed',on);h.innerHTML=on?'&#9829;':'&#9825;'});
var so=$('#sort');if(so)so.addEventListener('change',run);
var hq=$('#q');if(hq)hq.addEventListener('keydown',function(e){if(e.key==='Enter'&&hq.value.trim())location.href='search.html?q='+encodeURIComponent(hq.value.trim())});
var sj=$('#subject');if(sj){var s=new URLSearchParams(location.search).get('subject');if(s)sj.value=s}
$$('form[data-ok]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var r=f.querySelectorAll('[required]');for(var i=0;i<r.length;i++)if(!r[i].value){r[i].focus();return}f.querySelector('.ok').style.display='block';f.reset()})});
})();
