import{V as Z,J as Q,z as b,r as m,j as x,i as D,W as _,k as M,c as E,s as v,d as L,f as tt,X as z,Y as G,g as H,P as et,m as N,Z as nt,e as ot,$ as st,a0 as rt}from"./index-BkklOD1L.js";import{C as at}from"./ClickAwayListener-COIce64v.js";const it=Z(),ct=Q("div",{name:"MuiContainer",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,e[`maxWidth${b(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),lt=t=>_({props:t,name:"MuiContainer",defaultTheme:it}),ut=(t,e)=>{const o=d=>E(e,d),{classes:r,fixed:c,disableGutters:g,maxWidth:n}=t,i={root:["root",n&&`maxWidth${b(String(n))}`,c&&"fixed",g&&"disableGutters"]};return M(i,o,r)};function dt(t={}){const{createStyledComponent:e=ct,useThemeProps:o=lt,componentName:r="MuiContainer"}=t,c=e(({theme:n,ownerState:i})=>({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",...!i.disableGutters&&{paddingLeft:n.spacing(2),paddingRight:n.spacing(2),[n.breakpoints.up("sm")]:{paddingLeft:n.spacing(3),paddingRight:n.spacing(3)}}}),({theme:n,ownerState:i})=>i.fixed&&Object.keys(n.breakpoints.values).reduce((d,p)=>{const l=p,f=n.breakpoints.values[l];return f!==0&&(d[n.breakpoints.up(l)]={maxWidth:`${f}${n.breakpoints.unit}`}),d},{}),({theme:n,ownerState:i})=>({...i.maxWidth==="xs"&&{[n.breakpoints.up("xs")]:{maxWidth:Math.max(n.breakpoints.values.xs,444)}},...i.maxWidth&&i.maxWidth!=="xs"&&{[n.breakpoints.up(i.maxWidth)]:{maxWidth:`${n.breakpoints.values[i.maxWidth]}${n.breakpoints.unit}`}}}));return m.forwardRef(function(i,d){const p=o(i),{className:l,component:f="div",disableGutters:h=!1,fixed:k=!1,maxWidth:C="lg",classes:S,...y}=p,s={...p,component:f,disableGutters:h,fixed:k,maxWidth:C},a=ut(s,r);return x.jsx(c,{as:f,ownerState:s,className:D(a.root,l),ref:d,...y})})}const Rt=dt({createStyledComponent:v("div",{name:"MuiContainer",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,e[`maxWidth${b(String(o.maxWidth))}`],o.fixed&&e.fixed,o.disableGutters&&e.disableGutters]}}),useThemeProps:t=>L({props:t,name:"MuiContainer"})});function pt(t={}){const{autoHideDuration:e=null,disableWindowBlurListener:o=!1,onClose:r,open:c,resumeHideDuration:g}=t,n=tt();m.useEffect(()=>{if(!c)return;function s(a){a.defaultPrevented||a.key==="Escape"&&(r==null||r(a,"escapeKeyDown"))}return document.addEventListener("keydown",s),()=>{document.removeEventListener("keydown",s)}},[c,r]);const i=z((s,a)=>{r==null||r(s,a)}),d=z(s=>{!r||s==null||n.start(s,()=>{i(null,"timeout")})});m.useEffect(()=>(c&&d(e),n.clear),[c,e,d,n]);const p=s=>{r==null||r(s,"clickaway")},l=n.clear,f=m.useCallback(()=>{e!=null&&d(g??e*.5)},[e,g,d]),h=s=>a=>{const u=s.onBlur;u==null||u(a),f()},k=s=>a=>{const u=s.onFocus;u==null||u(a),l()},C=s=>a=>{const u=s.onMouseEnter;u==null||u(a),l()},S=s=>a=>{const u=s.onMouseLeave;u==null||u(a),f()};return m.useEffect(()=>{if(!o&&c)return window.addEventListener("focus",f),window.addEventListener("blur",l),()=>{window.removeEventListener("focus",f),window.removeEventListener("blur",l)}},[o,c,f,l]),{getRootProps:(s={})=>{const a={...G(t),...G(s)};return{role:"presentation",...s,...a,onBlur:h(a),onFocus:k(a),onMouseEnter:C(a),onMouseLeave:S(a)}},onClickAway:p}}function ft(t){return E("MuiSnackbarContent",t)}H("MuiSnackbarContent",["root","message","action"]);const gt=t=>{const{classes:e}=t;return M({root:["root"],action:["action"],message:["message"]},ft,e)},mt=v(et,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(t,e)=>e.root})(N(({theme:t})=>{const e=t.palette.mode==="light"?.8:.98,o=nt(t.palette.background.default,e);return{...t.typography.body2,color:t.vars?t.vars.palette.SnackbarContent.color:t.palette.getContrastText(o),backgroundColor:t.vars?t.vars.palette.SnackbarContent.bg:o,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(t.vars||t).shape.borderRadius,flexGrow:1,[t.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}}})),xt=v("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(t,e)=>e.message})({padding:"8px 0"}),bt=v("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(t,e)=>e.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),ht=m.forwardRef(function(e,o){const r=L({props:e,name:"MuiSnackbarContent"}),{action:c,className:g,message:n,role:i="alert",...d}=r,p=r,l=gt(p);return x.jsxs(mt,{role:i,square:!0,elevation:6,className:D(l.root,g),ownerState:p,ref:o,...d,children:[x.jsx(xt,{className:l.message,ownerState:p,children:n}),c?x.jsx(bt,{className:l.action,ownerState:p,children:c}):null]})});function kt(t){return E("MuiSnackbar",t)}H("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const Ct=t=>{const{classes:e,anchorOrigin:o}=t,r={root:["root",`anchorOrigin${b(o.vertical)}${b(o.horizontal)}`]};return M(r,kt,e)},A=v("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:o}=t;return[e.root,e[`anchorOrigin${b(o.anchorOrigin.vertical)}${b(o.anchorOrigin.horizontal)}`]]}})(N(({theme:t})=>({zIndex:(t.vars||t).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center",variants:[{props:({ownerState:e})=>e.anchorOrigin.vertical==="top",style:{top:8,[t.breakpoints.up("sm")]:{top:24}}},{props:({ownerState:e})=>e.anchorOrigin.vertical!=="top",style:{bottom:8,[t.breakpoints.up("sm")]:{bottom:24}}},{props:({ownerState:e})=>e.anchorOrigin.horizontal==="left",style:{justifyContent:"flex-start",[t.breakpoints.up("sm")]:{left:24,right:"auto"}}},{props:({ownerState:e})=>e.anchorOrigin.horizontal==="right",style:{justifyContent:"flex-end",[t.breakpoints.up("sm")]:{right:24,left:"auto"}}},{props:({ownerState:e})=>e.anchorOrigin.horizontal==="center",style:{[t.breakpoints.up("sm")]:{left:"50%",right:"auto",transform:"translateX(-50%)"}}}]}))),Mt=m.forwardRef(function(e,o){const r=L({props:e,name:"MuiSnackbar"}),c=ot(),g={enter:c.transitions.duration.enteringScreen,exit:c.transitions.duration.leavingScreen},{action:n,anchorOrigin:{vertical:i,horizontal:d}={vertical:"bottom",horizontal:"left"},autoHideDuration:p=null,children:l,className:f,ClickAwayListenerProps:h,ContentProps:k,disableWindowBlurListener:C=!1,message:S,onBlur:y,onClose:s,onFocus:a,onMouseEnter:u,onMouseLeave:vt,open:P,resumeHideDuration:St,TransitionComponent:W=rt,transitionDuration:O=g,TransitionProps:{onEnter:T,onExited:$,...B}={},...U}=r,w={...r,anchorOrigin:{vertical:i,horizontal:d},autoHideDuration:p,disableWindowBlurListener:C,TransitionComponent:W,transitionDuration:O},I=Ct(w),{getRootProps:F,onClickAway:K}=pt({...w}),[X,j]=m.useState(!0),q=st({elementType:A,getSlotProps:F,externalForwardedProps:U,ownerState:w,additionalProps:{ref:o},className:[I.root,f]}),J=R=>{j(!0),$&&$(R)},V=(R,Y)=>{j(!1),T&&T(R,Y)};return!P&&X?null:x.jsx(at,{onClickAway:K,...h,children:x.jsx(A,{...q,children:x.jsx(W,{appear:!0,in:P,timeout:O,direction:i==="top"?"down":"up",onEnter:V,onExited:J,...B,children:l||x.jsx(ht,{message:S,action:n,...k})})})})});export{Rt as C,Mt as S};