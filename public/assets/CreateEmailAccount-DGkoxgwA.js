import{p as M,j as e,r as s,B as F,a as n,S as H,v as G,b as m,C as J,I as k}from"./index-BkklOD1L.js";import{A as R,D as q}from"./Delete-BpmDt2JS.js";import{G as p}from"./Grid2-_pPbz8bZ.js";import{T as c,F as U,I as V,S as K}from"./TextField-CxaqP63m.js";import{D as Q,a as X,b as Y,c as Z}from"./DialogTitle-B0-RsWys.js";import{M as P}from"./MenuItem-BRiIjGjr.js";import{D as _}from"./DataGrid-DiJNVh4K.js";import"./List-D_zX7YuV.js";import"./ClickAwayListener-COIce64v.js";import"./FormControlLabel-DqzpyEZO.js";const ee=M(e.jsx("path",{d:"M5 4v2h14V4zm0 10h4v6h6v-6h4l-7-7z"}),"Publish"),ue=()=>{const d=sessionStorage.getItem("token"),[j,g]=s.useState(""),[C,b]=s.useState(""),[S,v]=s.useState(""),[w,y]=s.useState(""),[E,A]=s.useState("draft"),[x,u]=s.useState([]),[T,D]=s.useState(!1),[L,h]=s.useState(!1),[r,B]=s.useState([]),[l,N]=s.useState(""),$=async()=>{D(!0);try{const a=await(await fetch(`${m}/accounts/email-list`,{headers:{Authorization:`Bearer ${d}`}})).json();u(a)}catch(t){console.error("Error fetching emails:",t)}finally{D(!1)}};s.useEffect(()=>{$()},[]);const z=async t=>{t.preventDefault();const a={email:j,password:C,hostname:S,smtp:w,status:E};try{const i=await(await fetch(`${m}/accounts/email-list/create`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify(a)})).json();u([...x,i]),h(!1),g(""),b(""),v(""),y(""),A("draft")}catch(o){console.error("Error creating email:",o)}},I=async t=>{try{await fetch(`${m}/accounts/email-list`,{method:"DELETE",headers:{Authorization:`Bearer ${d}`,"Content-Type":"application/json"},body:JSON.stringify({ids:t})}),u(x.filter(a=>!t.includes(a.id)))}catch(a){console.error("Error deleting emails:",a)}},f=async(t,a)=>{try{await fetch(`${m}/accounts/update-status`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({ids:t,status:a})}),u(o=>o.map(i=>t.includes(i.id)?{...i,status:a}:i))}catch(o){console.error("Error updating status:",o)}},O=x.filter(t=>t.email.toLowerCase().includes(l.toLowerCase())||t.hostname.toLowerCase().includes(l.toLowerCase())||t.smtp.toString().includes(l)||t.status.toLowerCase().includes(l.toLowerCase())),W=[{field:"email",headerName:"Email",flex:1},{field:"hostname",headerName:"Hostname",flex:1},{field:"smtp",headerName:"Port",flex:.5},{field:"status",headerName:"Status",flex:1,renderCell:t=>e.jsx(J,{label:t.value,color:t.value==="published"?"success":"default"})},{field:"actions",headerName:"Actions",flex:1,renderCell:t=>e.jsxs(e.Fragment,{children:[e.jsx(k,{onClick:()=>f([t.row.id],t.row.status==="draft"?"published":"draft"),children:e.jsx(ee,{color:t.row.status==="draft"?"primary":"success"})}),e.jsx(k,{onClick:()=>I([t.row.id]),children:e.jsx(q,{color:"error"})})]})}];return e.jsxs(F,{sx:{width:"80%",mx:"auto",mt:4},children:[e.jsx("h2",{children:"Email Accounts Management"}),e.jsx(n,{variant:"outlined",color:"secondary.main",startIcon:e.jsx(R,{}),onClick:()=>h(!0),sx:{ml:"auto",mr:"auto",mb:4},children:"Create Email Account"}),e.jsxs(p,{container:!0,spacing:2,sx:{mb:2},children:[e.jsx(p,{item:!0,xs:12,md:6,children:e.jsx(c,{label:"Search",variant:"outlined",fullWidth:!0,value:l,onChange:t=>N(t.target.value)})}),e.jsx(p,{item:!0,xs:12,md:6,children:e.jsxs(H,{direction:"row",spacing:2,justifyContent:"flex-end",children:[e.jsx(n,{variant:"contained",color:"success",onClick:()=>f(r,"published"),disabled:r.length===0,children:"Publish"}),e.jsx(n,{variant:"contained",color:"primary",onClick:()=>f(r,"draft"),disabled:r.length===0,children:"Draft"}),e.jsx(n,{variant:"contained",color:"error",onClick:()=>I(r),disabled:r.length===0,children:"Delete"})]})})]}),e.jsxs(Q,{open:L,onClose:()=>h(!1),children:[e.jsx(X,{children:"Create Email Account"}),e.jsx(Y,{children:e.jsxs("form",{onSubmit:z,children:[e.jsx(c,{label:"Email",fullWidth:!0,value:j,onChange:t=>g(t.target.value.trim()),sx:{mb:2},required:!0}),e.jsx(c,{label:"Password",fullWidth:!0,value:C,onChange:t=>b(t.target.value.trim()),sx:{mb:2}}),e.jsx(c,{label:"Hostname",fullWidth:!0,value:S,onChange:t=>v(t.target.value.trim()),sx:{mb:2}}),e.jsx(c,{label:"Port",fullWidth:!0,value:w,onChange:t=>y(t.target.value.trim()),sx:{mb:2}}),e.jsxs(U,{fullWidth:!0,sx:{mb:2},children:[e.jsx(V,{children:"Status"}),e.jsxs(K,{value:E,onChange:t=>A(t.target.value),children:[e.jsx(P,{value:"draft",children:"Draft"}),e.jsx(P,{value:"published",children:"Published"})]})]}),e.jsxs(Z,{children:[e.jsx(n,{onClick:()=>h(!1),children:"Cancel"}),e.jsx(n,{type:"submit",variant:"contained",children:"Create"})]})]})})]}),T?e.jsx(G,{}):e.jsx(_,{rows:O,columns:W,pageSize:5,rowsPerPageOptions:[5,10],autoHeight:!0,checkboxSelection:!0,onRowSelectionModelChange:t=>B(t)})]})};export{ue as default};