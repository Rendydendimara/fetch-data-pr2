var ei=Object.defineProperty,ii=Object.defineProperties;var ni=Object.getOwnPropertyDescriptors;var Ne=Object.getOwnPropertySymbols;var ti=Object.prototype.hasOwnProperty,li=Object.prototype.propertyIsEnumerable;var _e=(a,d,m)=>d in a?ei(a,d,{enumerable:!0,configurable:!0,writable:!0,value:m}):a[d]=m,p=(a,d)=>{for(var m in d||(d={}))ti.call(d,m)&&_e(a,m,d[m]);if(Ne)for(var m of Ne(d))li.call(d,m)&&_e(a,m,d[m]);return a},D=(a,d)=>ii(a,ni(d));import{j as o,T as y,a as i,b as s,F as K,B as W,u as ai,r as g,c as C,d as w,e as Z,f as ee,I as E,S as je,g as ve,h as j,i as pe,M as oi,k as ri,l as si,m as ci,n as ke,o as me,p as di,q as pi,s as mi,R as hi,t as ui,C as xi}from"./vendor.4cff2dd0.js";const fi=function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))B(h);new MutationObserver(h=>{for(const b of h)if(b.type==="childList")for(const v of b.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&B(v)}).observe(document,{childList:!0,subtree:!0});function m(h){const b={};return h.integrity&&(b.integrity=h.integrity),h.referrerpolicy&&(b.referrerPolicy=h.referrerpolicy),h.crossorigin==="use-credentials"?b.credentials="include":h.crossorigin==="anonymous"?b.credentials="omit":b.credentials="same-origin",b}function B(h){if(h.ep)return;h.ep=!0;const b=m(h);fetch(h.href,b)}};fi();const Di="_inputHeigth_2m13i_1",gi="_dataTabelDetail_2m13i_5";var O={inputHeigth:Di,dataTabelDetail:gi};const G=a=>{var B,h,b,v;const d=()=>{var R;a.haveAction&&a.onEdit&&a.onEdit((R=Number(a.id))!=null?R:0)},m=()=>{var R;a.haveAction&&a.onDelete&&a.onDelete((R=Number(a.id))!=null?R:0)};return a.isHumico?o(y,{w:"full",children:[i(s,{borderStyle:"none",px:"4px",py:"4px",className:O.dataTabelDetail,textTransform:"capitalize",textAlign:"left",justifyContent:"center",alignItems:"center",children:a.name.replaceAll("_"," ")}),i(s,{borderStyle:"none",px:"0px",py:"4px",textAlign:"center",justifyContent:"center",alignItems:"center",className:O.dataTabelDetail,children:a.total?ie(Number((B=a.total)!=null?B:0),"IDR"):0})]}):o(y,{w:"full",children:[i(s,{borderStyle:"none",px:"4px",py:"4px",className:O.dataTabelDetail,textTransform:"capitalize",textAlign:"left",justifyContent:"center",alignItems:"center",children:a.name.replaceAll("_"," ")}),i(s,{borderStyle:"none",px:"0px",py:"4px",textAlign:"center",justifyContent:"center",alignItems:"center",className:O.dataTabelDetail,children:a.total?ie(Number((h=a.total)!=null?h:0),"IDR"):0}),i(s,{borderStyle:"none",px:"0px",py:"4px",textAlign:"center",justifyContent:"center",alignItems:"center",className:O.dataTabelDetail,children:a.nominal?ie(Number((b=a.nominal)!=null?b:0),"IDR"):0}),i(s,{borderStyle:"none",px:"0px",py:"4px",textAlign:"center",justifyContent:"center",alignItems:"center",className:O.dataTabelDetail,children:a.kurs?ie(Number((v=a.kurs)!=null?v:0),"IDR"):0}),i(s,{borderStyle:"none",px:"0px",py:"4px",textAlign:"center",justifyContent:"center",alignItems:"center",className:O.dataTabelDetail,children:a.nominalDolar?ie(Number(a.nominalDolar),"IDR"):0}),i(s,{borderStyle:"none",px:"0px",py:"4px",className:O.dataTabelDetail,children:a.haveAction&&o(K,{textAlign:"center",justifyContent:"center",alignItems:"center",gridGap:"15px",children:[a.onEdit&&i(W,{size:"sm",backgroundColor:"orange.400",color:"white",fontWeight:"600",onClick:d,children:"Edit"}),a.onDelete&&i(W,{size:"sm",backgroundColor:"red.400",color:"white",fontWeight:"600",onClick:m,children:"Delete"})]})})]})},Ie={headers:{"Access-Control-Allow-Origin":"*"}},ie=(a,d)=>{const m=a;return m<1?String(m):d==="IDR"?new Intl.NumberFormat("en-ID",{style:"currency",currency:"IDR"}).format(m).replace(/[IDR]/gi,"").replace(/(\.+\d{2})/,"").trimLeft():d==="USD"?a.toLocaleString("en-US",{currency:"USD"}):a.toString()},Te={control:a=>D(p({},a),{background:"#fff",minHeight:"30px",height:"30px"}),valueContainer:a=>D(p({},a),{height:"30px",padding:"0 6px"}),input:a=>D(p({},a),{margin:"0px"}),indicatorSeparator:()=>({display:"none"}),indicatorsContainer:a=>D(p({},a),{height:"30px"})};function bi(){const a=ai(),[d,m]=g.exports.useState([]),[B,h]=g.exports.useState([]),[b,v]=g.exports.useState([]),[R,ne]=g.exports.useState([]),[Q,te]=g.exports.useState(""),[V,le]=g.exports.useState(""),[A,q]=g.exports.useState([]),[N,I]=g.exports.useState([]),[Ee,Re]=g.exports.useState(!1),[Be,he]=g.exports.useState(!1),[J,ue]=g.exports.useState([]),[F,xe]=g.exports.useState([]),[_,fe]=g.exports.useState({mjid:"",sid:"",emkl:"",ratePajak:"",rateBonus:""}),[u,U]=g.exports.useState({fixIsiJobsheetID:null,nominalDipakai1IDR2USD:"",nominal:"",kurs:"",nominalDollar:""}),[x,L]=g.exports.useState({fixIsiJobsheetID:null,nominalDipakai1IDR2USD:"",nominal:"",kurs:"",nominalDollar:""}),[M,ae]=g.exports.useState(null),[$,oe]=g.exports.useState(null),[De,X]=g.exports.useState(!1),[ge,be]=g.exports.useState(!1),[Je,Fe]=g.exports.useState([]),Ue=async()=>{const e=await ke.get("/api/apcargo/public/admin/getJSbuyingSelling",Ie);if(e.status===200){let n=[];e.data.hasOwnProperty("hasil")&&(e.data.hasil.forEach(t=>{n.push({value:t.id,label:t.nama})}),m(n))}},Le=(e,n)=>{U(D(p({},u),{fixIsiJobsheetID:e}))},Pe=(e,n)=>{L(D(p({},x),{fixIsiJobsheetID:e}))},ye=e=>{if(e.target.name==="emkl")fe(D(p({},_),{[e.target.name]:e.target.value}));else{const n=/^([0-9]|[^,$\w])*$/;let t=e.target.value;(e.target.value===""||n.test(t))&&fe(D(p({},_),{[e.target.name]:t}))}},re=e=>{const n=/^([0-9]|[^,$\w])*$/;let t=e.target.value;if(e.target.value===""||n.test(t)){let l=D(p({},u),{[e.target.name]:t});if(l.kurs==="999"||l.nominal==="999")U(D(p({},l),{nominalDollar:""}));else if(e.target.name==="nominal"||e.target.name==="kurs"){const r=Number(l.nominal)/Number(l.kurs);l=D(p({},l),{nominalDollar:String(r==1/0||isNaN(r)?0:r)}),U(l)}else if(e.target.name==="nominalDollar"||e.target.name==="kurs"){const r=Number(l.nominalDollar)*Number(l.kurs);l=D(p({},l),{nominal:String(r==1/0||isNaN(r)?0:r)}),U(l)}else U(p({},l))}},se=e=>{const n=/^([0-9]|[^,$\w])*$/;let t=e.target.value;if(e.target.value===""||n.test(t)){let l=D(p({},x),{[e.target.name]:t});if(l.kurs==="999"||l.nominal==="999")L(D(p({},l),{nominalDollar:""}));else if(e.target.name==="nominal"||e.target.name==="kurs"){const r=Number(l.nominal)/Number(l.kurs);l=D(p({},l),{nominalDollar:String(r==1/0||isNaN(r)?0:r)}),L(l)}else if(e.target.name==="nominalDollar"||e.target.name==="kurs"){const r=Number(l.nominalDollar)*Number(l.kurs);l=D(p({},l),{nominal:String(r==1/0||isNaN(r)?0:r)}),L(l)}else L(p({},l))}},He=()=>{var e,n;if(M){if(De){const t=me(A,["id",String(M)]);q([...A.slice(0,t),D(p({},A[t]),{id:String(M),fix_isijobsheet_id:(n=(e=u.fixIsiJobsheetID)==null?void 0:e.value)!=null?n:"",nominaldipakai:u.nominalDipakai1IDR2USD,nominal:u.nominal,kurs:u.kurs,nominaldolar:u.nominalDollar}),...A.slice(t+1,A.length)]),X(!1)}else{const t=me(J,["id",M]);ue([...J.slice(0,t),{id:M,fixIsiJobsheetID:u.fixIsiJobsheetID,nominalDipakai1IDR2USD:u.nominalDipakai1IDR2USD,nominal:u.nominal,kurs:u.kurs,nominalDollar:u.nominalDollar},...J.slice(t+1,J.length)])}ae(null),a({title:"Success",description:"success update data buying.",status:"success",position:"bottom-right",duration:5e3,isClosable:!0})}else{const t=[...J,{id:new Date().getTime(),fixIsiJobsheetID:u.fixIsiJobsheetID,nominalDipakai1IDR2USD:u.nominalDipakai1IDR2USD,nominal:u.nominal,kurs:u.kurs,nominalDollar:u.nominalDollar}].sort((l,r)=>l.id>r.id?-1:l.id<r.id?1:0);ue(t),a({title:"Success",description:"success add data buying.",status:"success",position:"bottom-right",duration:5e3,isClosable:!0})}ce("buying")},We=()=>{var e,n;if($){if(ge){const t=me(N,["id",String($)]);I([...N.slice(0,t),D(p({},N[t]),{id:String($),fix_isijobsheet_id:(n=(e=x.fixIsiJobsheetID)==null?void 0:e.value)!=null?n:"",nominaldipakai:x.nominalDipakai1IDR2USD,nominal:x.nominal,kurs:x.kurs,nominaldolar:x.nominalDollar}),...N.slice(t+1,N.length)]),X(!1)}else{const t=me(F,["id",$]);xe([...F.slice(0,t),{id:$,fixIsiJobsheetID:x.fixIsiJobsheetID,nominalDipakai1IDR2USD:x.nominalDipakai1IDR2USD,nominal:x.nominal,kurs:x.kurs,nominalDollar:x.nominalDollar},...F.slice(t+1,F.length)])}oe(null),a({title:"Success",description:"success update data selling.",status:"success",position:"bottom-right",duration:5e3,isClosable:!0})}else{const t=[...F,{id:new Date().getTime(),fixIsiJobsheetID:x.fixIsiJobsheetID,nominalDipakai1IDR2USD:x.nominalDipakai1IDR2USD,nominal:x.nominal,kurs:x.kurs,nominalDollar:x.nominalDollar}].sort((l,r)=>l.id>r.id?-1:l.id<r.id?1:0);xe(t),a({title:"Success",description:"success add data selling.",status:"success",duration:5e3,position:"bottom-right",isClosable:!0})}ce("selling")},ce=e=>{e==="buying"?U({fixIsiJobsheetID:null,nominalDipakai1IDR2USD:"",nominal:"",kurs:"",nominalDollar:""}):L({fixIsiJobsheetID:null,nominalDipakai1IDR2USD:"",nominal:"",kurs:"",nominalDollar:""}),De&&X(!1),ge&&be(!1),M!==null&&ae(null),$!==null&&oe(null)},Oe=e=>{De&&X(!1);let n=J.filter(t=>t.id===e);n.length>0&&(ae(e),U({fixIsiJobsheetID:n[0].fixIsiJobsheetID,nominalDipakai1IDR2USD:n[0].nominalDipakai1IDR2USD,nominal:n[0].nominal,kurs:n[0].kurs,nominalDollar:n[0].nominalDollar}))},Me=e=>{var t;let n=A.filter(l=>Number(l.id)===e);if(n.length>0){let l=d.filter(r=>r.value===n[0].fix_isijobsheet_id);ae(e),X(!0),U({fixIsiJobsheetID:(t=l[0])!=null?t:n[0].fix_isijobsheet_id,nominalDipakai1IDR2USD:n[0].nominaldipakai,nominal:n[0].nominal,kurs:n[0].kurs,nominalDollar:n[0].nominaldolar})}},$e=e=>{const n=J.filter(t=>t.id!==e);ue(n)},Ke=e=>{const n=A.filter(t=>Number(t.id)!==e);q(n)},Ge=e=>{ge&&be(!1);let n=F.filter(t=>t.id===e);n.length>0&&(oe(e),L({fixIsiJobsheetID:n[0].fixIsiJobsheetID,nominalDipakai1IDR2USD:n[0].nominalDipakai1IDR2USD,nominal:n[0].nominal,kurs:n[0].kurs,nominalDollar:n[0].nominalDollar}))},qe=e=>{var t;let n=N.filter(l=>Number(l.id)===e);if(n.length>0){let l=d.filter(r=>r.value===n[0].fix_isijobsheet_id);oe(e),be(!0),L({fixIsiJobsheetID:(t=l[0])!=null?t:n[0].fix_isijobsheet_id,nominalDipakai1IDR2USD:n[0].nominaldipakai,nominal:n[0].nominal,kurs:n[0].kurs,nominalDollar:n[0].nominaldolar})}},Ye=e=>{const n=N.filter(t=>Number(t.id)!==e);I(n)},Qe=e=>{const n=F.filter(t=>t.id!==e);xe(n)},Ve=async e=>{var t,l,r,T,P;const n=await ke.get(`/api/apcargo/public/admin/getJSData/${e}`,Ie);if(n.status===200){let z=[];const de=[],c=n.data.hasil.pasif,f=n.data.hasil.aktif;let S=[],Se=[];f.buy.forEach(k=>{let H=d.filter(Y=>Y.value===k.fix_isijobsheet_id);H.length>0?S.push(D(p({},k),{fix_isijobsheet_id:H[0]})):S.push(k)}),te(f.tableatas.kodeshipment),le(f.tableatas.lokasistuffing),Fe(n.data.hasil.container),f.sell.forEach(k=>{let H=d.filter(Y=>Y.value===k.fix_isijobsheet_id);H.length>0?Se.push(D(p({},k),{fix_isijobsheet_id:H[0]})):Se.push(k)}),q(S),I(Se);for(let k in c){let H=[];c[k].map(Y=>{let we=[];for(let Ae in Y)we.push({label:Ae,value:Y[Ae]});H.push(we)}),z.push({label:k,data:H})}const Ze=z.filter(k=>k.label==="humico");z=z.filter(k=>k.label!=="humico"),ne(Ze),h(z),v(de),fe({sid:(t=f.tableatas.sid)!=null?t:"",mjid:(l=f.tableatas.mjid)!=null?l:"",emkl:(r=f.tableatas.emkl)!=null?r:"",ratePajak:(T=f.tableatas.rate_pajak)!=null?T:"",rateBonus:(P=f.tableatas.rate_bonus)!=null?P:""})}},Ce=e=>{let n=d.filter(t=>t.value===e);return n.length>0?n[0].label:"null"},Xe=e=>{var r,T,P,z,de;e.preventDefault(),he(!0);let n=[],t=[];J.forEach(c=>{var f,S;n.push({nominaldipakai:c.nominalDipakai1IDR2USD,nominal:c.nominal,kurs:c.kurs,nominaldolar:c.nominalDollar,biayalapangan:(S=(f=c.fixIsiJobsheetID)==null?void 0:f.value)!=null?S:null})}),F.forEach(c=>{var f,S;t.push({nominaldipakai:c.nominalDipakai1IDR2USD,nominal:c.nominal,kurs:c.kurs,nominaldolar:c.nominalDollar,biayalapangan:(S=(f=c.fixIsiJobsheetID)==null?void 0:f.value)!=null?S:null})}),A.forEach(c=>{var f,S;n.push({nominaldipakai:c.nominaldipakai,nominal:c.nominal,kurs:c.kurs,nominaldolar:c.nominaldolar,biayalapangan:(S=(f=c.fix_isijobsheet_id)==null?void 0:f.value)!=null?S:c.fix_isijobsheet_id,jid:c.jid})}),N.forEach(c=>{var f,S;t.push({nominaldipakai:c.nominaldipakai,nominal:c.nominal,kurs:c.kurs,nominaldolar:c.nominaldolar,biayalapangan:(S=(f=c.fix_isijobsheet_id)==null?void 0:f.value)!=null?S:c.fix_isijobsheet_id,jid:c.jid})});const l={jobsheet:{mjid:(r=_.mjid)!=null?r:0,sid:(T=_.sid)!=null?T:0,js:{rate_pajak:(P=_.ratePajak)!=null?P:0,bonus:(z=_.rateBonus)!=null?z:0,emkl:(de=_.emkl)!=null?de:0},buying:n,selling:t}};console.log("data",l),ke.post("/api/apcargo/public/postDataJS",l,Ie).then(c=>{he(!1),a({title:"Success",description:"Success post data.",status:"success",position:"bottom-right",duration:5e3,isClosable:!0})}).catch(c=>{he(!1),a({title:"Failed",description:"Pailed post data.",status:"error",position:"bottom-right",duration:5e3,isClosable:!0}),console.log("err",c)})};return g.exports.useEffect(()=>{Ue();const e=window.location.href.split("/"),n=e[e.length-1];n&&Ve(n)},[]),o(C,{p:"20px",children:[o(C,{w:"full",mt:"20px",children:[i(C,{w:"full",mb:"25px",children:o(C,{w:"full",children:[i(w,{fontSize:"24px",fontWeight:"bold",color:"#000000",children:Q}),Q&&o(w,{mr:"15px",fontSize:"20px",fontWeight:"bold",color:"#000000",children:["Lokasi Stuffing: ",V?`${V}`:"null"]}),Je.map((e,n)=>{var t,l,r,T;return o(K,{alignItems:"center",children:[o(w,{mr:"15px",fontSize:"20px",fontWeight:"bold",color:"#000000",children:["No Container: ",(t=e==null?void 0:e.kodecontainer)!=null?t:"null"]}),o(w,{mr:"15px",fontSize:"20px",fontWeight:"bold",color:"#000000",children:["No Seal: ",(l=e==null?void 0:e.noseal)!=null?l:"null"]}),o(w,{mr:"15px",fontSize:"20px",fontWeight:"bold",color:"#000000",children:["Capacity: ",(r=e==null?void 0:e.nama)!=null?r:"null"]}),o(w,{mr:"15px",fontSize:"20px",fontWeight:"bold",color:"#000000",children:["Notes: ",(T=e==null?void 0:e.notes)!=null?T:"null"]})]})}),_.mjid&&i("a",{href:`https://panellokasee.host/apcargo/public/admin/fix_mainjobsheet/lihatjobsheet/${_.mjid}`,rel:"noreferrer",target:"_blank",children:i(W,{width:"150px",height:"35px",bgColor:"blue.300",color:"white",mb:"25px",mt:"20px",children:"Lihat hasil"})}),i(C,{w:{base:"100%",sm:"100%",md:"50%",xl:"50%"},children:i(Z,{size:"sm",children:o(ee,{children:[o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"EMKL"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"emkl",value:_.emkl,onChange:ye,height:"30px"})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Rate Pajak"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"ratePajak",value:_.ratePajak,onChange:ye,height:"30px",type:"string"})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Rate Bonus"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"rateBonus",value:_.rateBonus,onChange:ye,height:"30px",type:"string"})})]})]})})})]})}),i(C,{w:"full",children:o(K,{gridGap:"3",flexDirection:{base:"column",sm:"column",md:"row",xl:"row"},children:[o(C,{w:{base:"100%",sm:"100%",md:"50%",xl:"50%"},children:[i(w,{bgColor:"gray.400",fontWeight:"bold",fontSize:"14px",children:"Buying"}),i(Z,{size:"sm",children:o(ee,{children:[o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Fix Isi Jobsheet ID"}),i(s,{borderStyle:"none",px:"0px",py:"4px",height:"30px",children:i(je,{options:d,onChange:Le,placeholder:"Select jobsheet id",styles:Te,value:u.fixIsiJobsheetID})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Nominal Dipakai 1 IDR 2 USD"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"nominalDipakai1IDR2USD",onChange:re,height:"30px",value:u.nominalDipakai1IDR2USD,type:"string"})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Nominal"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"nominal",onChange:re,height:"30px",value:u.nominal,type:"string"})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Kurs"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"kurs",onChange:re,height:"30px",value:u.kurs,type:"string"})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Nominal Dollar"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"nominalDollar",onChange:re,height:"30px",value:u.nominalDollar,type:"text"})})]})]})}),o(K,{justifyContent:"center",w:"full",mt:"10px",gridGap:"15px",children:[i(W,{width:"150px",height:"35px",bgColor:"green.300",color:"white",onClick:He,children:M?"Update":"Add"}),i(W,{width:"150px",height:"35px",bgColor:"yellow.300",color:"white",onClick:()=>ce("buying"),children:"Cancel"})]})]}),o(C,{w:{base:"100%",sm:"100%",md:"50%",xl:"50%"},children:[i(w,{bgColor:"gray.400",fontWeight:"bold",fontSize:"14px",children:"Selling"}),i(Z,{size:"sm",children:o(ee,{children:[o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Fix Isi Jobsheet ID"}),i(s,{borderStyle:"none",px:"0px",py:"4px",height:"30px",children:i(je,{options:d,onChange:Pe,placeholder:"Select jobsheet id",styles:Te,value:x.fixIsiJobsheetID})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Nominal Dipakai 1 IDR 2 USD"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"nominalDipakai1IDR2USD",onChange:se,height:"30px",value:x.nominalDipakai1IDR2USD,type:"string"})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Nominal"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"nominal",onChange:se,height:"30px",value:x.nominal})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Kurs"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"kurs",onChange:se,height:"30px",value:x.kurs,type:"string"})})]}),o(y,{children:[i(s,{borderStyle:"none",px:"0px",py:"4px",children:"Nominal Dollar"}),i(s,{borderStyle:"none",px:"0px",py:"4px",children:i(E,{name:"nominalDollar",value:x.nominalDollar,onChange:se,type:"text",height:"30px"})})]})]})}),o(K,{justifyContent:"center",w:"full",mt:"10px",gridGap:"15px",children:[i(W,{width:"150px",height:"35px",bgColor:"green.300",color:"white",onClick:We,children:$?"Update":"Add"}),i(W,{width:"150px",height:"35px",bgColor:"yellow.300",color:"white",onClick:()=>ce("selling"),children:"Cancel"})]})]})]})}),i(C,{w:"full",mt:"10px",children:o(K,{gridGap:"3",flexDirection:{base:"column",sm:"column",md:"row",xl:"row"},children:[o(C,{w:{base:"100%",sm:"100%",md:"50%",xl:"50%"},borderWidth:"2px",borderColor:"gray.400",height:"auto",children:[i(w,{children:"Tabel Detail"}),i(C,{w:"full",h:"500px",maxH:"500px",overflowY:"scroll",children:o(Z,{size:"sm",children:[i(ve,{px:"4px",bgColor:"gray.200",children:o(y,{children:[i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",children:"Fix Isi Jobsheet ID"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",w:"100px",children:"Nominal Dipakai 1 IDR 2 USD"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",children:"Nominal"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",children:"Kurs"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",w:"80px",children:"Nominal Dollar"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",children:"Action"})]})}),o(ee,{children:[J.map((e,n)=>{var t,l;return i(G,{haveAction:!0,name:(l=(t=e.fixIsiJobsheetID)==null?void 0:t.label)!=null?l:"",total:String(e.nominalDipakai1IDR2USD),nominal:String(e.nominal),kurs:String(e.kurs),nominalDolar:String(e.nominalDollar),onEdit:Oe,onDelete:$e,id:e.id},n)}),A.map((e,n)=>{var t,l;return i(G,{haveAction:!0,name:(l=(t=e.fix_isijobsheet_id)==null?void 0:t.label)!=null?l:Ce(e.fix_isijobsheet_id),total:e.nominaldipakai,nominal:e.nominal,kurs:e.kurs,nominalDolar:e.nominaldolar,onEdit:Me,onDelete:Ke,id:e.id},n)}),B.map((e,n)=>o(pe,{children:[i(w,{mt:"10px",fontSize:"13px",borderStyle:"none",px:"0px",fontWeight:"bold",ml:"4px",textTransform:"capitalize",children:e.label},n),e.data.map((t,l)=>i(ze,{data:t},l))]})),R.map((e,n)=>o(pe,{children:[i(w,{mt:"10px",fontSize:"13px",borderStyle:"none",px:"0px",fontWeight:"bold",ml:"4px",textTransform:"capitalize",children:e.label},n),e.data.map((t,l)=>{var r,T,P,z;return o(pe,{children:[i(G,{name:(r=t[0].label)!=null?r:"",total:(T=t[0].value)!=null?T:0,isHumico:!0},l),i(G,{name:(P=t[1].label)!=null?P:"",total:(z=t[1].value)!=null?z:0,isHumico:!0},l)]})})]}))]})]})})]}),o(C,{w:{base:"100%",sm:"100%",md:"50%",xl:"50%"},borderWidth:"2px",borderColor:"gray.400",height:"auto",children:[i(w,{children:"Tabel Detail"}),i(C,{w:"full",h:"500px",maxH:"500px",overflowY:"scroll",children:o(Z,{size:"sm",children:[i(ve,{px:"4px",bgColor:"gray.200",children:o(y,{children:[i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",children:"Fix Isi Jobsheet ID"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",w:"100px",children:"Nominal Dipakai 1 IDR 2 USD"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",children:"Nominal"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",children:"Kurs"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",w:"80px",children:"Nominal Dollar"}),i(j,{borderStyle:"none",px:"0px",py:"4px",fontSize:"11px",textTransform:"capitalize",textAlign:"center",children:"Action"})]})}),o(ee,{children:[F.map((e,n)=>{var t,l;return i(G,{name:(l=(t=e.fixIsiJobsheetID)==null?void 0:t.label)!=null?l:"",total:String(e.nominalDipakai1IDR2USD),nominal:String(e.nominal),kurs:String(e.kurs),nominalDolar:String(e.nominalDollar),onEdit:Ge,onDelete:Qe,id:e.id,haveAction:!0},n)}),N.map((e,n)=>{var t,l;return i(G,{haveAction:!0,name:(l=(t=e.fix_isijobsheet_id)==null?void 0:t.label)!=null?l:Ce(e.fix_isijobsheet_id),total:e.nominaldipakai,nominal:e.nominal,kurs:e.kurs,nominalDolar:e.nominaldolar,onEdit:qe,onDelete:Ye,id:e.id},n)}),b.map((e,n)=>o(pe,{children:[i(w,{mt:"10px",fontSize:"13px",borderStyle:"none",px:"0px",fontWeight:"bold",ml:"4px",textTransform:"capitalize",children:e.label},n),e.data.map((t,l)=>i(ze,{data:t},l))]}))]})]})})]})]})}),i(K,{w:"full",my:"25px",justifyContent:"center",children:i(W,{bgColor:"green.300",color:"white",w:320,onClick:Xe,type:"submit",isLoading:Be,_hover:{},_focus:{},children:"POST API"})})]}),o(oi,{onClose:()=>Re(!1),closeOnOverlayClick:!1,isOpen:Ee,children:[i(ri,{}),i(si,{bgColor:"transparent",display:"flex",justifyContent:"center",maxH:"100vh",alignItems:"center",children:i(ci,{thickness:"6px",speed:"0.65s",emptyColor:"gray.200",color:"green.400",size:"xl"})})]})]})}const ze=a=>{var v,R,ne,Q,te,V,le,A,q,N;const d=a.data.filter(I=>I.label==="nama"),m=a.data.filter(I=>I.label==="dolar"),B=a.data.filter(I=>I.label==="nominal"),h=a.data.filter(I=>I.label==="kurs"),b=a.data.filter(I=>I.label==="nominalkredit");return i(G,{name:(R=(v=d[0])==null?void 0:v.value)!=null?R:"",total:(Q=(ne=m[0])==null?void 0:ne.value)!=null?Q:"",nominal:(V=(te=B[0])==null?void 0:te.value)!=null?V:"",kurs:(A=(le=h[0])==null?void 0:le.value)!=null?A:"",nominalDolar:(N=(q=b[0])==null?void 0:q.value)!=null?N:""})},yi=di({sm:"30em",md:"48em",lg:"62em",xl:"1390px","2xl":"2000px"}),Si=pi({colors:{brand:{100:"#f7fafc",900:"#1a202c"},app:{primary:"#b87514",brown1:"#ad3113",brown2:"#B87514",pink1:"#FEF9E6",pink2:"#FFF4E3",pink3:"#CF6662",pink4:"#F47573",grey1:"#ABABAB",grey2:"#5B5B5B",grey3:"#5E5E5E",grey4:"#8B8B8B",grey5:"#ADADAD",orange1:"#F3B65B",orange2:"#E79C37",orange3:"#E5E5E5",teal1:"#499F9C",teal2:"#374957",black1:"#3C3C3C"}},breakpoints:yi,fonts:{heading:"Nunito",body:"Nunito"}});mi`
  /*
  This will hide the focus indicator if the element receives focus    via the mouse,
  but it will still show up on keyboard focus.
*/
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;hi.render(i(ui.StrictMode,{children:i(xi,{theme:Si,children:i(bi,{})})}),document.getElementById("root"));window.resizeTo(window.screen.availWidth/2,window.screen.availHeight/2);