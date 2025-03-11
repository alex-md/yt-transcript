(this["webpackJsonpyoutube-transcript-tool"]=this["webpackJsonpyoutube-transcript-tool"]||[]).push([[0],{25:function(e,t,s){},26:function(e,t,s){"use strict";s.r(t);var a=s(3),r=s.n(a),c=s(10),i=s.n(c),l=s(1);var n=e=>{let{transcript:t,highlightedWords:s=[]}=e;const[r,c]=Object(a.useState)([]);Object(a.useEffect)((()=>{const e=t.split("\n").filter((e=>""!==e.trim())).map((e=>{const t=e.match(/\[([\d:]+)\]/);return{timestamp:t?t[1]:"0:00",text:e.replace(/\[[\d:]+\]\s*/,"").trim()}}));c(e)}),[t]);const i=e=>{if(!s.length)return e;const t=new RegExp(`(${s.join("|")})`,"gi");return e.split(t).map(((e,t)=>s.some((t=>t.toLowerCase()===e.toLowerCase()))?Object(l.jsx)("mark",{className:"bg-warning text-dark px-1 rounded",children:e},t):e))};return Object(l.jsx)("div",{className:"transcript-container",children:0===r.length?Object(l.jsx)("div",{className:"alert alert-info",children:"No transcript content available."}):Object(l.jsx)("div",{className:"list-group",children:r.map(((e,t)=>Object(l.jsxs)("div",{className:"list-group-item list-group-item-action d-flex py-3 border-0 border-bottom",children:[Object(l.jsx)("div",{className:"timestamp badge bg-secondary text-white align-self-start me-3 px-2 py-1 rounded-pill",children:e.timestamp}),Object(l.jsx)("div",{className:"transcript-text flex-grow-1 fw-light",children:i(e.text)})]},t)))})})};const o=e=>/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(e),d=e=>{let t=e.match(/[?&]v=([^&]+)/);return t?t[1]:(t=e.match(/youtu\.be\/([^?&]+)/),t?t[1]:(t=e.match(/embed\/([^/?&]+)/),t?t[1]:null))};var b=e=>{let{videoUrl:t}=e;const s=d(t);return s?Object(l.jsx)("div",{className:"ratio ratio-16x9",children:Object(l.jsx)("iframe",{src:`https://www.youtube.com/embed/${s}?enablejsapi=1`,title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})}):Object(l.jsx)("div",{className:"alert alert-warning",children:"Invalid YouTube URL"})},m=s(28);const j=async e=>{const t=d(e);if(!t)throw new Error("Invalid YouTube URL");return(async e=>{const t=await m.a.get(`https://video.google.com/timedtext?lang=en&v=${e}`);return h(t.data)})(t)},h=e=>{var t;const s=null===(t=(new DOMParser).parseFromString(e,"text/xml").getElementsByTagName("body")[0])||void 0===t?void 0:t.childNodes;if(!s)return"No transcript available for this video.";let a="";for(let r=0;r<s.length;r++){const e=s[r];if("s"===e.nodeName){const t=e,s=t.getAttribute("t")||"0",r=(t.getAttribute("d"),e.textContent);a+=`[${u(s)}] ${r}\n`}}return a.trim()||"No transcript available for this video."},u=e=>{const t=parseInt(e,10)/1e3,s=Math.floor(t/60),a=Math.floor(t%60);return`${s}:${a<10?"0":""}${a}`};var p=()=>{const[e,t]=Object(a.useState)(""),[s,r]=Object(a.useState)(""),[c,i]=Object(a.useState)(""),[d,m]=Object(a.useState)(!1),[h,u]=Object(a.useState)(""),[p,x]=Object(a.useState)([]);return Object(l.jsx)("div",{className:"container py-4",children:Object(l.jsx)("div",{className:"row justify-content-center",children:Object(l.jsx)("div",{className:"col-12 col-lg-10",children:Object(l.jsxs)("div",{className:"card shadow-lg border-0 rounded-3 mb-4",children:[Object(l.jsx)("div",{className:"card-header bg-primary text-white text-center p-3",children:Object(l.jsxs)("h1",{className:"display-5 fw-bold",children:[Object(l.jsx)("i",{className:"bi bi-youtube me-2"}),"YouTube Transcript Tool"]})}),Object(l.jsxs)("div",{className:"card-body p-4",children:[Object(l.jsxs)("div",{className:"mb-4",children:[Object(l.jsxs)("div",{className:"input-group mb-3 shadow-sm",children:[Object(l.jsx)("span",{className:"input-group-text bg-light",children:Object(l.jsx)("i",{className:"bi bi-link-45deg"})}),Object(l.jsx)("input",{type:"text",className:"form-control form-control-lg",value:e,onChange:e=>{t(e.target.value)},placeholder:"Enter YouTube video URL","aria-label":"YouTube URL"}),Object(l.jsx)("button",{className:`btn ${d?"btn-secondary":"btn-primary"} btn-lg`,onClick:async()=>{if(o(e)){m(!0),i("");try{const t=await j(e);r(t),i("")}catch(t){i("Failed to fetch transcript. Please try again."),console.error(t)}finally{m(!1)}}else i("Invalid YouTube URL. Please enter a valid URL.")},disabled:d,children:d?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("span",{className:"spinner-border spinner-border-sm me-2",role:"status","aria-hidden":"true"}),"Loading..."]}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("i",{className:"bi bi-file-text me-2"})," Get Transcript"]})})]}),c&&Object(l.jsxs)("div",{className:"alert alert-danger mt-3",role:"alert",children:[Object(l.jsx)("i",{className:"bi bi-exclamation-triangle-fill me-2"}),c]})]}),s&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{className:"mb-4",children:Object(l.jsxs)("div",{className:"input-group shadow-sm",children:[Object(l.jsx)("span",{className:"input-group-text bg-light",children:Object(l.jsx)("i",{className:"bi bi-search"})}),Object(l.jsx)("input",{type:"text",className:"form-control",value:h,onChange:e=>{u(e.target.value)},placeholder:"Search in transcript","aria-label":"Search term"}),Object(l.jsxs)("button",{className:"btn btn-outline-secondary",onClick:()=>{h.trim()?x(h.split(/\s+/).filter((e=>e.length>0))):x([])},type:"button",children:[Object(l.jsx)("i",{className:"bi bi-filter"})," Filter"]})]})}),Object(l.jsxs)("div",{className:"card shadow-sm mb-4",children:[Object(l.jsxs)("div",{className:"card-header bg-light d-flex align-items-center",children:[Object(l.jsx)("i",{className:"bi bi-play-btn me-2"}),Object(l.jsx)("h2",{className:"h5 mb-0",children:"Video Player"})]}),Object(l.jsx)("div",{className:"card-body p-0",children:Object(l.jsx)(b,{videoUrl:e})})]}),Object(l.jsxs)("div",{className:"card shadow-sm",children:[Object(l.jsxs)("div",{className:"card-header bg-light d-flex align-items-center",children:[Object(l.jsx)("i",{className:"bi bi-chat-quote me-2"}),Object(l.jsx)("h2",{className:"h5 mb-0",children:"Transcript"}),Object(l.jsx)("span",{className:"badge bg-primary ms-2",children:p.length>0?"Filtered":"Full"})]}),Object(l.jsx)("div",{className:"card-body",children:Object(l.jsx)(n,{transcript:s,highlightedWords:p})})]})]})]})]})})})})};s(22),s(23),s(24),s(25);i.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(p,{})}),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.48436174.chunk.js.map