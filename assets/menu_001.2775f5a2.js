const l=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};l();var c;(c=document.querySelector(".navigation-toggle"))==null||c.addEventListener("click",()=>{var o;(o=document.querySelector(".navigation"))==null||o.classList.toggle("is-expand")});Array.from(document.querySelectorAll(".menu-item")).forEach(o=>{o.onclick=function(){var r;(r=document.querySelector(".menu-item.is-active"))==null||r.classList.toggle("is-active"),o.classList.toggle("is-active")}});