import{r as s,u as g,j as a,B as u,T as c,a as p,b as h}from"./index-BkklOD1L.js";import{T as n}from"./TextField-CxaqP63m.js";import"./List-D_zX7YuV.js";function b(){const[o,i]=s.useState(""),[r,l]=s.useState(""),d=g(),m=async()=>{try{const e=await fetch(`${h}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:o,password:r})}),t=await e.json();e.ok?(sessionStorage.setItem("token",t.token),sessionStorage.setItem("userName",t.userName),sessionStorage.setItem("role",t.role),d("/dashboard")):alert(t.message||"Login failed")}catch(e){console.error("Error logging in:",e)}};return a.jsxs(u,{sx:{maxWidth:400,mx:"auto",mt:8,p:4,borderRadius:"8px",textAlign:"center",backgroundColor:"secondary.main",color:"primary.main",border:"2px solid",borderColor:"primary.main"},children:[a.jsx(c,{variant:"h5",mb:2,children:"Login"}),a.jsx(n,{label:"Email",fullWidth:!0,margin:"normal",value:o,onChange:e=>i(e.target.value)}),a.jsx(n,{label:"Password",type:"password",fullWidth:!0,margin:"normal",value:r,onChange:e=>l(e.target.value)}),a.jsx(p,{variant:"contained",fullWidth:!0,sx:{mt:2},onClick:m,children:"Login"})]})}export{b as default};
