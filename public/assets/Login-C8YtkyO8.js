import{r,u as d,j as t,B as u,T as c,a as h}from"./index-Clq8qEyb.js";import{a as p}from"./constants-Dd5hli-r.js";import{T as n}from"./TextField-36JbiGwT.js";import"./List-C9zJ7A1r.js";function y(){const[s,i]=r.useState(""),[o,l]=r.useState(""),m=d(),g=async()=>{try{const e=await fetch(`${p}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,password:o})}),a=await e.json();e.ok?(sessionStorage.setItem("token",a.token),sessionStorage.setItem("userName",a.userName),sessionStorage.setItem("role",a.role),m("/dashboard")):alert(a.message||"Login failed")}catch(e){console.error("Error logging in:",e)}};return t.jsxs(u,{sx:{maxWidth:400,mx:"auto",mt:8,textAlign:"center"},children:[t.jsx(c,{variant:"h5",mb:2,children:"Login"}),t.jsx(n,{label:"Email",fullWidth:!0,margin:"normal",value:s,onChange:e=>i(e.target.value)}),t.jsx(n,{label:"Password",type:"password",fullWidth:!0,margin:"normal",value:o,onChange:e=>l(e.target.value)}),t.jsx(h,{variant:"contained",fullWidth:!0,sx:{mt:2},onClick:g,children:"Login"})]})}export{y as default};