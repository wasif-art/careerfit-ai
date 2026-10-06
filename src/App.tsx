import {useState,useEffect,useRef} from 'react'
import {D,K,Q,C,score,rank,prof,why,ld,sv,type Career} from './data'

const G='bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-2xl px-6 py-3 shadow-lg shadow-violet-500/25 hover:scale-[1.03] active:scale-95 transition disabled:opacity-40 disabled:hover:scale-100';
const O='rounded-2xl px-6 py-3 font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-40';
const Page=({children}:any)=><div className="fade max-w-6xl mx-auto px-4 py-8">{children}</div>;
const Card=({children,className='',onClick}:any)=><div onClick={onClick} className={(onClick?'cursor-pointer ':'')+'rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur p-5 shadow-sm '+className}>{children}</div>;
const Chip=({children}:any)=><span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">{children}</span>;
const H=({t,s}:any)=><div className="mb-6"><h2 className="text-3xl font-extrabold">{t}</h2><p className="text-slate-500 dark:text-slate-400 mt-1">{s}</p></div>;
function Bar({p}:{p:number}){const[w,setW]=useState(0);useEffect(()=>{const t=setTimeout(()=>setW(p),60);return()=>clearTimeout(t)},[p]);return <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-1000" style={{width:w+'%'}}/></div>}
function Radar({s}:{s:{v:number[];c:string}[]}){const R=85,cx=130,cy=115;const p=(i:number,r:number)=>[cx+r*Math.sin(i*Math.PI/3),cy-r*Math.cos(i*Math.PI/3)];
return <svg viewBox="0 0 260 235" className="w-full max-w-sm mx-auto">
{[.25,.5,.75,1].map(k=><polygon key={k} points={D.map((_,i)=>p(i,R*k).join()).join(' ')} fill="none" stroke="currentColor" opacity=".18"/>)}
{D.map((d,i)=>{const [x,y]=p(i,R+20);return <text key={d} x={x} y={y+3} fontSize="9" textAnchor="middle" fill="currentColor" opacity=".7">{d.split('-')[0]}</text>})}
{s.map((a,j)=><polygon key={j} points={a.v.map((x,i)=>p(i,R*x).join()).join(' ')} fill={a.c} fillOpacity=".2" stroke={a.c} strokeWidth="2"/>)}</svg>}
const Save=({id,saved,tg}:any)=><button onClick={e=>{e.stopPropagation();tg(id)}} title="Save career" className="text-xl hover:scale-125 transition">{saved.includes(id)?'💜':'🤍'}</button>;

function Home({go}:any){
const steps=[['📝','Answer','Take an 18-question quiz on personality, interests, skills and work style.'],['🧠','Analyze','We score your six core skill dimensions and compare them with every career.'],['🎯','Discover','See your top 5 matches with percentages and the reasons behind them.'],['🗺️','Roadmap','Get a personalised learning path that targets your skill gaps.']];
return <Page>
<div className="grid lg:grid-cols-2 gap-10 items-center py-8">
<div><span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 mb-5">✨ AI-powered career guidance</span>
<h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">What Career <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">Actually Fits</span> You?</h1>
<p className="mt-5 text-lg text-slate-600 dark:text-slate-400">Stop guessing. CareerFit AI analyses how you think, what you enjoy and what you are good at, then matches you with careers and builds your roadmap.</p>
<div className="flex flex-wrap gap-3 mt-8"><button className={G} onClick={()=>go('quiz')}>Find My Career →</button><button className={O} onClick={()=>go('explore')}>Explore Careers</button></div></div>
<div className="relative flo"><div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/30 to-violet-500/30 blur-3xl rounded-full"/>
<Card className="relative"><p className="text-xs uppercase tracking-wide text-slate-500 mb-3">Sample result</p>
{[['Software Developer',92],['Data Scientist',87],['UI/UX Designer',82]].map(([n,p]:any)=><div key={n} className="mb-4"><div className="flex justify-between font-semibold mb-1.5"><span>{n}</span><span className="text-violet-500">{p}%</span></div><Bar p={p}/></div>)}</Card></div></div>
<h2 className="text-2xl font-bold text-center mt-14 mb-6">How It Works</h2>
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{steps.map(([e,t,d],i)=><Card key={t} onClick={()=>go(['quiz','quiz','results','dash'][i])} className="hover:-translate-y-1 hover:shadow-xl transition"><div className="text-4xl mb-3">{e}</div><p className="text-xs text-violet-500 font-bold">STEP {i+1}</p><h3 className="text-xl font-bold">{t}</h3><p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{d}</p></Card>)}</div>
</Page>}

function Quiz({done}:any){
const[i,setI]=useState(0),[a,setA]=useState<number[]>(Array(Q.length).fill(-1)),nx=useRef<any>(null);
const q=Q[i],L=['Not me at all','Somewhat','Mostly me','Absolutely me'];
return <Page><div className="max-w-2xl mx-auto">
<div className="flex justify-between items-center text-sm mb-2"><span className="font-semibold">Question {i+1} of {Q.length}</span><Chip>{q[1]}</Chip></div>
<Bar p={(i+(a[i]>=0?1:0))/Q.length*100}/>
<div key={i} className="fade mt-8"><h2 className="text-2xl font-bold mb-6">{q[0]}</h2>
<div className="grid gap-3">{L.map((l,k)=><button key={k} style={{animationDelay:k*70+'ms'}} onClick={()=>{setA(a.map((x,j)=>j===i?k:x));if(i<Q.length-1){clearTimeout(nx.current);nx.current=setTimeout(()=>setI(x=>x+1),380)}}} className={'fade text-left rounded-2xl border-2 px-5 py-4 flex items-center gap-4 transition hover:scale-[1.02] '+(a[i]===k?'border-violet-500 bg-violet-50 dark:bg-violet-950/50 shadow-lg shadow-violet-500/20':'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-blue-400')}>
<span className={'w-8 h-8 rounded-full grid place-items-center text-sm font-bold '+(a[i]===k?'bg-gradient-to-r from-blue-600 to-violet-600 text-white':'bg-slate-200 dark:bg-slate-800')}>{a[i]===k?'✓':k+1}</span><span className="font-medium">{l}</span></button>)}</div></div>
<div className="flex justify-between mt-8"><button className={O} disabled={i===0} onClick={()=>{clearTimeout(nx.current);setI(i-1)}}>← Previous</button>
{i<Q.length-1?<button className={G} disabled={a[i]<0} onClick={()=>{clearTimeout(nx.current);setI(i+1)}}>Next →</button>:<button className={G} disabled={a[i]<0} onClick={()=>done(a)}>See my results ✨</button>}</div></div></Page>}

function Results({u,go,saved,tg,demo}:any){
if(!u)return <Page><Card className="text-center py-12"><p className="text-5xl mb-3">🧭</p><p className="mb-5">Take the quiz first to see your matches.</p><div className="flex gap-3 justify-center flex-wrap"><button className={G} onClick={()=>go('quiz')}>Start the quiz</button><button className={O} onClick={demo}>Try a sample profile</button></div></Card></Page>;
const r=rank(u).slice(0,5),top=r[0].c;
const st=D.map((d,i)=>[d,u[i]] as [string,number]).sort((a,b)=>b[1]-a[1]).slice(0,3);
const gp=D.map((d,i)=>[d,top.v[i]-u[i],u[i],top.v[i]] as any).filter(x=>x[1]>.1).sort((a,b)=>b[1]-a[1]).slice(0,3);
return <Page><H t="Your Top 5 Career Matches" s="Calculated from your answers across 6 skill dimensions."/>
<div className="grid lg:grid-cols-3 gap-4 mb-6">
<Card><h3 className="font-bold mb-2">Your profile vs {top.n}</h3><Radar s={[{v:u,c:'#8b5cf6'},{v:top.v,c:'#3b82f6'}]}/><p className="text-xs text-center text-slate-500"><span className="text-violet-500">■</span> You &nbsp;<span className="text-blue-500">■</span> {top.n}</p></Card>
<Card><h3 className="font-bold mb-3">💪 Your strengths</h3>{st.map(([d,v])=><div key={d} className="mb-3"><div className="flex justify-between text-sm mb-1"><span>{d}</span><span>{Math.round(v*100)}%</span></div><Bar p={v*100}/></div>)}</Card>
<Card><h3 className="font-bold mb-3">🎯 Skill gaps for {top.n}</h3>{gp.length?gp.map(x=><div key={x[0]} className="mb-3"><div className="flex justify-between text-sm mb-1"><span>{x[0]}</span><span className="text-slate-500">{Math.round(x[2]*100)}% → {Math.round(x[3]*100)}%</span></div><Bar p={x[2]*100}/></div>):<p className="text-sm text-slate-500">No major gaps. You are ready to start!</p>}</Card></div>
<div className="grid gap-4">{r.map(({c,p},i)=><Card key={c.id} onClick={()=>go('details',c.id)} className="hover:shadow-xl transition"><div className="flex items-start gap-4"><div className="text-4xl">{c.e}</div><div className="flex-1">
<div className="flex justify-between items-center"><h3 className="text-xl font-bold">#{i+1} {c.n}</h3><div className="flex items-center gap-3"><span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">{p}%</span><Save id={c.id} saved={saved} tg={tg}/></div></div>
<div className="my-3"><Bar p={p}/></div><p className="text-sm text-slate-600 dark:text-slate-400">{why(u,c)}</p>
<button className="mt-3 text-sm font-semibold text-violet-500 hover:underline" onClick={()=>go('details',c.id)}>View details & roadmap →</button></div></div></Card>)}</div><div className="text-center mt-6"><button className={O} onClick={()=>go('quiz')}>🔄 Retake quiz</button></div></Page>}

function Details({c,u,go,saved,tg}:any){
const gaps=u?D.map((d,i)=>[d,c.v[i]-u[i]] as [string,number]).filter(x=>x[1]>.15).sort((a,b)=>b[1]-a[1]):[];
const T=['Months 1–2','Months 3–4','Months 5–8','Months 9–12'];
return <Page><button className="text-sm text-violet-500 mb-4" onClick={()=>go('explore')}>← All careers</button>
<Card className="mb-4"><div className="flex items-center gap-4"><span className="text-5xl">{c.e}</span><div className="flex-1"><h2 className="text-3xl font-extrabold">{c.n}</h2><Chip>{c.cat}</Chip></div>{u&&<div className="text-right"><p className="text-3xl font-extrabold text-violet-500">{score(u,c.v)}%</p><p className="text-xs text-slate-500">your match</p></div>}<Save id={c.id} saved={saved} tg={tg}/></div>
<p className="mt-4 text-slate-600 dark:text-slate-400">{c.d}</p><div className="flex flex-wrap gap-3 mt-4"><button className={G+' !py-2'} onClick={()=>go('quiz')}>Check my fit</button><button className={O+' !py-2'} onClick={()=>go('advisor')}>Ask the advisor</button></div></Card>
<div className="grid md:grid-cols-2 gap-4 mb-4"><Card><h3 className="font-bold mb-3">Required skills</h3><div className="flex flex-wrap gap-2">{c.sk.map((s:string)=><Chip key={s}>{s}</Chip>)}</div><h3 className="font-bold mt-5 mb-1">🎓 Education</h3><p className="text-sm text-slate-600 dark:text-slate-400">{c.ed}</p><h3 className="font-bold mt-4 mb-1">📈 Career growth</h3><p className="text-sm text-slate-600 dark:text-slate-400">{c.gr}</p></Card>
<Card><h3 className="font-bold mb-2">Skill profile{u?' (you vs role)':''}</h3><Radar s={[...(u?[{v:u,c:'#8b5cf6'}]:[]),{v:c.v,c:'#3b82f6'}]}/></Card></div>
<Card><h3 className="text-xl font-bold mb-1">🗺️ {u?'Your personalised roadmap':'Learning roadmap'}</h3>
{u&&<p className="text-sm text-slate-500 mb-3">{gaps.length?'Priority focus: '+gaps.slice(0,3).map(g=>g[0]).join(', ')+'. Weave these into every step.':'No big gaps. Focus on projects and experience.'}</p>}
<div className="mt-4 space-y-4">{c.rm.map((s:string,i:number)=><div key={i} className="flex gap-4"><div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white grid place-items-center font-bold">{i+1}</div><div><p className="text-xs text-violet-500 font-semibold">{T[i]}</p><p className="font-medium">{s}</p></div></div>)}</div></Card></Page>}

function Explore({u,go,saved,tg}:any){
const[q,setQ]=useState(''),[f,setF]=useState('All');
const list=C.filter(c=>(f==='All'||c.cat===f)&&(c.n+c.d+c.sk.join()).toLowerCase().includes(q.toLowerCase()));
return <Page><H t="Career Explorer" s="Search and filter careers, then dive into the details."/>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="🔎 Search careers or skills (e.g. Python, design)…" className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-3 mb-4 outline-none focus:ring-2 ring-violet-500"/>
<div className="flex flex-wrap gap-2 mb-6">{['All','Tech','Data','Design','Business','Engineering','Healthcare','Finance','Law & Public','Education','Creative'].map(x=><button key={x} onClick={()=>setF(x)} className={'px-4 py-1.5 rounded-full text-sm font-medium transition '+(f===x?'bg-gradient-to-r from-blue-600 to-violet-600 text-white':'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700')}>{x}</button>)}</div>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{list.map(c=><Card key={c.id} onClick={()=>go('details',c.id)} className="hover:-translate-y-1 hover:shadow-xl transition flex flex-col"><div className="flex justify-between"><span className="text-4xl">{c.e}</span><Save id={c.id} saved={saved} tg={tg}/></div>
<h3 className="text-lg font-bold mt-2">{c.n}</h3><p className="text-sm text-slate-500 dark:text-slate-400 flex-1 my-2">{c.d}</p><div className="flex items-center justify-between"><Chip>{c.cat}</Chip>{u&&<b className="text-violet-500">{score(u,c.v)}%</b>}</div>
<button className={O+' mt-4 !py-2'} onClick={()=>go('details',c.id)}>View details</button></Card>)}</div>
{!list.length&&<p className="text-center text-slate-500 py-10">No careers found. Try another search.</p>}</Page>}

function Compare({u}:any){
const[sel,setSel]=useState(['sd','ds','ux']);const col=['#3b82f6','#8b5cf6','#ec4899'];
const tg=(id:string)=>setSel(sel.includes(id)?sel.filter(x=>x!==id):[...sel.slice(-2),id]);
const cs=sel.map(id=>C.find(c=>c.id===id) as Career);
return <Page><H t="Career Comparison" s="Pick up to 3 careers and compare the skills each one demands."/>
<div className="flex flex-wrap gap-2 mb-6">{C.map(c=>{const i=sel.indexOf(c.id);return <button key={c.id} onClick={()=>tg(c.id)} style={i>=0?{background:col[i],color:'#fff'}:{}} className={'px-3 py-1.5 rounded-full text-sm transition '+(i<0?'bg-slate-200 dark:bg-slate-800':'')}>{c.e} {c.n}</button>})}</div>
<div className="grid lg:grid-cols-2 gap-4"><Card><Radar s={[...cs.map((c,i)=>({v:c.v,c:col[i]})),...(u?[{v:u,c:'#10b981'}]:[])]}/>
<div className="flex flex-wrap gap-3 justify-center text-xs mt-2">{cs.map((c,i)=><span key={c.id}><b style={{color:col[i]}}>■</b> {c.n}</span>)}{u&&<span><b className="text-emerald-500">■</b> You</span>}</div></Card>
<Card>{D.map((d,k)=><div key={d} className="mb-4"><p className="text-sm font-semibold mb-1.5">{d}</p>{cs.map((c,i)=><div key={c.id} className="flex items-center gap-2 mb-1"><div className="flex-1 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{width:c.v[k]*100+'%',background:col[i]}}/></div><span className="text-xs w-9 text-right">{Math.round(c.v[k]*100)}%</span></div>)}</div>)}</Card></div></Page>}

function parse(t:string,base:number[]|null){const u=base?[...base]:[.5,.5,.5,.5,.5,.5];let hit=false;
t.toLowerCase().split(/\bbut\b|[,.;]/).forEach(cl=>{const neg=/weak|bad|poor|hate|dislike|avoid|not good|can't|cannot|terrible|don't|dont|scared/.test(cl);const pos=/like|love|enjoy|good|strong|great|interested|passion/.test(cl);K.forEach((r,i)=>{if(r.test(cl)){hit=true;u[i]=neg?.1:pos?.9:.7}})});return {u,hit}}
function Advisor({u,go}:any){
const[m,setM]=useState<any[]>([{r:'b',t:'Hi! I am your AI Career Advisor. Tell me what you enjoy and where you struggle, and I will suggest careers.'}]),[t,setT]=useState(''),[bz,setBz]=useState(false),end=useRef<any>(null),[ai,setAi]=useState<any>(null);
useEffect(()=>{const b=end.current&&end.current.parentElement;if(b)b.scrollTop=b.scrollHeight},[m,bz]);
useEffect(()=>{const c=(window as any).claude;if(c&&c.use)c.use('sample').then((x:any)=>setAi(x||null)).catch(()=>{})},[]);
const local=(x:string)=>{const {u:pu,hit}=parse(x,u);if(!hit)return {r:'b',t:'I could not spot any skills in that. Try something like "I enjoy design but I am weak in coding".'};const r=rank(pu).slice(0,3);return {r:'b',t:`Based on that, I would look at ${r.map(z=>z.c.n).join(', ')}. ${r[0].c.n} fits best (${r[0].p}%): ${why(pu,r[0].c).toLowerCase()}`,ids:r.map(z=>z.c.id)}};
const send=async(x:string)=>{if(!x.trim()||bz)return;const hist=[...m,{r:'u',t:x}];setM(hist);setT('');setBz(true);let b:any=null;
if(ai){try{const sys=`You are CareerFit AI, a friendly, honest career advisor for students. Careers you may recommend (id: name [needs 0-1 for coding,creativity,maths,communication,leadership,problem-solving]): ${C.map(c=>c.id+': '+c.n+' ['+c.v.join(',')+']').join('; ')}. ${u?'The user quiz profile, same order: ['+u.map(v=>v.toFixed(2)).join(',')+'].':'The user has not taken the quiz yet.'} Answer the latest message in under 120 words. Be specific and encouraging, mention trade-offs, and also handle general career questions (skills, courses, rough salary ranges). Reply ONLY with JSON: {"reply":"text","ids":["up to 3 relevant career ids from the list, or empty"]}`;
const turns=hist.slice(1).map(z=>({role:z.r==='u'?'user':'assistant',content:z.t}));
const o=await ai.json([{role:'user',content:sys},{role:'assistant',content:'Understood.'},...turns],{cache:false});
if(o&&o.reply)b={r:'b',t:String(o.reply),ids:(o.ids||[]).filter((id:string)=>C.some(c=>c.id===id)).slice(0,3)}}catch(e:any){if(e&&e.code==='not_granted')setAi(null)}}
if(!b)b=local(x);setM(p=>[...p,b]);setBz(false)};
return <Page><H t="AI Career Advisor" s={ai?"✨ Powered by Claude. Ask anything about careers, skills or courses.":"Smart-match mode (keyword based). Open this page in Claude to enable full AI."}/>
<Card className="max-w-3xl mx-auto !p-0 overflow-hidden"><div className="h-96 overflow-y-auto p-4 space-y-3">
{m.map((x,i)=><div key={i} className={'fade flex '+(x.r==='u'?'justify-end':'')}><div className={'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm '+(x.r==='u'?'bg-gradient-to-r from-blue-600 to-violet-600 text-white':'bg-slate-100 dark:bg-slate-800')}>{x.t}
{x.ids&&<div className="flex flex-wrap gap-2 mt-2">{x.ids.map((id:string)=><button key={id} onClick={()=>go('details',id)} className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800">{C.find(c=>c.id===id)?.n} →</button>)}</div>}</div></div>)}
{bz&&<div className="text-slate-400 text-sm animate-pulse">Advisor is thinking…</div>}<div ref={end}/></div>
<div className="flex flex-wrap gap-2 px-4 pb-2">{["I like coding but I'm weak in maths. Which career suits me?","I love design and talking to people, but hate coding","I enjoy leading teams and solving problems"].map(s=><button key={s} onClick={()=>send(s)} className="text-xs px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-left">{s}</button>)}</div>
<div className="flex gap-2 p-4 border-t border-slate-200 dark:border-slate-800"><input value={t} onChange={e=>setT(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(t)} placeholder="Ask about your career…" className="flex-1 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 outline-none focus:ring-2 ring-violet-500"/><button className={G+' !px-5 !py-2.5'} onClick={()=>send(t)}>Send</button></div></Card></Page>}

function Dash({u,go,saved,tg,demo,reset}:any){
if(!u)return <Page><Card className="text-center py-12"><p className="text-5xl mb-3">📊</p><p className="mb-5">Your dashboard fills up after you take the quiz.</p><div className="flex gap-3 justify-center flex-wrap"><button className={G} onClick={()=>go('quiz')}>Take the quiz</button><button className={O} onClick={demo}>Try a sample profile</button></div></Card></Page>;
const r=rank(u),top=r[0].c;const gp=D.map((d,i)=>[d,top.v[i]-u[i]] as [string,number]).filter(x=>x[1]>.1).sort((a,b)=>b[1]-a[1]);
return <Page><H t="Your Dashboard" s="Everything about your career journey in one place."/>
<div className="grid md:grid-cols-3 gap-4 mb-4">
<Card onClick={()=>go('details',top.id)} className="bg-gradient-to-br from-blue-600 to-violet-600 !text-white !border-0"><p className="text-sm opacity-80">Best career match</p><p className="text-5xl font-extrabold my-2">{r[0].p}%</p><p className="text-xl font-bold">{top.e} {top.n}</p><button className="mt-4 text-sm underline" onClick={()=>go('details',top.id)}>Open roadmap →</button></Card>
<Card><h3 className="font-bold mb-3">Skills</h3>{D.map((d,i)=><div key={d} className="mb-2.5"><div className="flex justify-between text-xs mb-1"><span>{d}</span><span>{Math.round(u[i]*100)}%</span></div><Bar p={u[i]*100}/></div>)}</Card>
<Card><h3 className="font-bold mb-3">Skill gaps</h3>{gp.length?gp.map(g=><div key={g[0]} className="flex justify-between text-sm mb-2"><span>{g[0]}</span><span className="text-pink-500 font-semibold">-{Math.round(g[1]*100)}%</span></div>):<p className="text-sm text-slate-500">No gaps for your top match 🎉</p>}<p className="text-xs text-slate-500 mt-3">Relative to {top.n}.</p></Card></div>
<div className="grid md:grid-cols-2 gap-4"><Card><h3 className="font-bold mb-3">💜 Saved careers</h3>{saved.length?saved.map((id:string)=>{const c=C.find(x=>x.id===id) as Career;return <div key={id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"><button onClick={()=>go('details',id)} className="font-medium text-left hover:text-violet-500">{c.e} {c.n}</button><span className="flex items-center gap-3"><b className="text-violet-500">{score(u,c.v)}%</b><button onClick={()=>tg(id)} className="text-slate-400 hover:text-red-500">✕</button></span></div>}):<p className="text-sm text-slate-500">Tap the heart on any career to save it here.</p>}</Card>
<Card><h3 className="font-bold mb-3">🗺️ Roadmap: {top.n}</h3>{top.rm.map((s:string,i:number)=><div key={i} className="flex gap-3 mb-3 text-sm"><span className="w-6 h-6 shrink-0 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300 grid place-items-center text-xs font-bold">{i+1}</span>{s}</div>)}</Card></div><div className="flex flex-wrap gap-3 justify-center mt-6"><button className={O} onClick={()=>go('quiz')}>🔄 Retake quiz</button><button className={O} onClick={reset}>🗑️ Reset my data</button></div></Page>}

function App(){
const[pg,setPg]=useState('home'),[cid,setCid]=useState('sd'),[toast,setToast]=useState('');
const[dark,setDark]=useState<boolean>(()=>{const s=ld('cf-theme',null);return s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches});
const[ans,setAns]=useState<number[]|null>(()=>ld('cf-ans',null)),[saved,setSaved]=useState<string[]>(()=>ld('cf-saved',[]));
useEffect(()=>{document.documentElement.classList.toggle('dark',dark);sv('cf-theme',dark?'dark':'light')},[dark]);
const u=ans?prof(ans):null;
const go=(p:string,id?:string)=>{setPg(p);if(id)setCid(id);window.scrollTo({top:0,behavior:'smooth'})};
const note=(m:string)=>{setToast(m);setTimeout(()=>setToast(''),2200)};
const tg=(id:string)=>{const n=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];setSaved(n);sv('cf-saved',n);note(saved.includes(id)?'Removed from saved':'Saved to your Dashboard 💜')};
const demo=()=>{const a=[2,2,1,3,3,2,2,3,1,3,1,2,1,3,2,1,3,1];setAns(a);sv('cf-ans',a);note('Sample profile loaded. Retake the quiz for your own result.')};
const reset=()=>{setAns(null);setSaved([]);sv('cf-ans',null);sv('cf-saved',[]);note('Your data was cleared');go('home')};
const nav=[['home','🏠','Home'],['quiz','🧠','Quiz'],['results','🎯','Results'],['explore','🔎','Explore'],['compare','⚖️','Compare'],['advisor','🤖','Advisor'],['dash','📊','Dashboard']];
return <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/50 to-violet-50/50 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/50 text-slate-900 dark:text-slate-100">
<header className="sticky z-20 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800" style={{top:'env(safe-area-inset-top,0px)'}}>
<div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-2">
<button onClick={()=>go('home')} className="text-left shrink-0 mr-auto md:mr-0"><span className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">CareerFit AI</span><span className="hidden sm:block text-[11px] text-slate-500 -mt-1">Discover the career that fits you.</span></button>
<nav className="order-last md:order-none w-full md:w-auto md:flex-1 flex flex-wrap gap-1">{nav.map(([k,e,l])=><button key={k} onClick={()=>go(k)} className={'px-3 py-1.5 rounded-xl text-sm whitespace-nowrap transition '+(pg===k||(k==='explore'&&pg==='details')?'bg-gradient-to-r from-blue-600 to-violet-600 text-white':'hover:bg-slate-200 dark:hover:bg-slate-800')}>{e} {l}</button>)}</nav>
<button onClick={()=>setDark(!dark)} aria-label="Toggle theme" className="w-10 h-10 shrink-0 rounded-xl border border-slate-300 dark:border-slate-700 hover:scale-110 transition">{dark?'☀️':'🌙'}</button></div></header>
{pg==='home'&&<Home go={go}/>}
{pg==='quiz'&&<Quiz done={(a:number[])=>{setAns(a);sv('cf-ans',a);go('results')}}/>}
{pg==='results'&&<Results u={u} go={go} saved={saved} tg={tg} demo={demo}/>}
{pg==='details'&&<Details c={C.find(c=>c.id===cid)} u={u} go={go} saved={saved} tg={tg}/>}
{pg==='explore'&&<Explore u={u} go={go} saved={saved} tg={tg}/>}
{pg==='compare'&&<Compare u={u}/>}
{pg==='advisor'&&<Advisor u={u} go={go}/>}
{pg==='dash'&&<Dash u={u} go={go} saved={saved} tg={tg} demo={demo} reset={reset}/>}
{toast&&<div className="fixed inset-x-0 bottom-6 z-30 flex justify-center pointer-events-none"><div className="fade px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl text-sm">{toast}</div></div>}
<footer className="text-center text-xs text-slate-500 py-8">CareerFit AI · Discover the career that fits you.</footer></div>}

export default App
