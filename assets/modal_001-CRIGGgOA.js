import{$ as g}from"./dom-Da7vCbvn.js";function p(e,r){const t=document.createElement("div");return t.className=r,e.append(t),t}function k(e,r){const t=document.body,f={...t.style},v={duration:"--modal-duration"},n={},d=[];let y=null,C=0,h=r.zIndex;const E=()=>g(`.${e}`,t),I=()=>(h+=2,h),x=a=>{a.finally(()=>{y=null}),y=a},z=(a,i)=>{y||d.includes(a)||x(new Promise(L=>{const{enterClass:c,duration:l}=r.animation,{onBeforeEnter:s,onAfterEnter:m}=i,u=n[a];let o=E();o||(o=p(t,e)),d.push(a),t.style.overflow="hidden",t.style.setProperty(v.duration,`${r.animation.duration}ms`),u.element.style.zIndex=`${I()}`,u.element.style.display=u.style.display,o.style.zIndex=`${+u.element.style.zIndex-1}`,d.length<=1&&o.classList.add(c),s&&s(),setTimeout(()=>{d.length<=1&&(o==null||o.classList.remove(c)),m&&m(),L()},l)}))},M=(a,i)=>{y||d.includes(a)&&x(new Promise(L=>{const{leaveClass:c,duration:l}=r.animation,{onBeforeLeave:s,onAfterLeave:m}=i,u=n[a],o=E();d.pop(),d.length===0&&o.classList.add(c),s&&s(),setTimeout(()=>{if(u.element.style.zIndex="",u.element.style.display="none",d.length===0)o.classList.remove(c),o.remove(),t.style.overflow=f.overflow,t.style.removeProperty(v.duration),h=r.zIndex;else{const $=d.slice(-1)[0];o.style.zIndex=`${+n[$].element.style.zIndex-1}`}m&&m(),L()},l)}))};return{useModal:a=>{const{element:i,closeable:L=!1,onModalClick:c}=a;let l="";return i&&(l=`${e}-${++C}`,n[l]={element:i,style:{...i.style},enter:()=>z(l,a),leave:()=>M(l,a)},i.style.display="none",i.addEventListener("click",s=>{if(s.target===i&&!y){if(c&&c(),L)return n[l].leave();x(new Promise(m=>{n[l].element.classList.add("dialog-shake"),setTimeout(()=>{n[l].element.classList.remove("dialog-shake"),m()},r.animation.duration)}))}})),{enter:()=>{var s;return(s=n[l])==null?void 0:s.enter()},leave:()=>{var s;return(s=n[l])==null?void 0:s.leave()}}}}}const{useModal:w}=k("modal",{zIndex:1e3,animation:{duration:300,enterClass:"modal-enter",leaveClass:"modal-leave"}});g.all("[data-dialog]").forEach(e=>{const r=e.dataset.dialog,t=e.dataset.dialogCloseable==="true",f={enterClass:"dialog-enter",leaveClass:"dialog-leave"},v=w({element:e,closeable:t,onModalClick:()=>{},onBeforeEnter:()=>{e.classList.add(f.enterClass)},onAfterEnter:()=>{e.classList.remove(f.enterClass)},onBeforeLeave:()=>{e.classList.add(f.leaveClass)},onAfterLeave:()=>{e.classList.remove(f.leaveClass)}});g.all(`[data-dialog-enter="${r}"]`).forEach(n=>{n.addEventListener("click",v.enter)}),g.all(".dialog .dialog__close-button",e).forEach(n=>{n.addEventListener("click",v.leave)})});
