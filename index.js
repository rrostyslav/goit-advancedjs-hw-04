import{a as q,i as p,S as E}from"./assets/vendor-DqB7j7Ix.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();async function h(t,r=1){var e;const n="16531795-762868b1c54a77ec034bf5734",s="https://pixabay.com/api/";try{return(await q.get(s,{params:{key:n,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}catch(o){throw new Error(`HTTP error! Status: ${((e=o.response)==null?void 0:e.status)||"Unknown"}`)}}function b(t,r,n=!1){const s=t.map(e=>{const{webformatURL:o,largeImageURL:a,tags:l,likes:f,views:d,comments:m,downloads:i}=e;return`
      <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img class="gallery-image" src="${o}" alt="${l}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${f}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${d}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${m}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${i}
            </p>
          </div>
        </a>
      </li>
    `}).join("");n?r.insertAdjacentHTML("beforeend",s):r.innerHTML=s}function L(t){t.style.display="flex"}function u(t){t.style.display="none"}function v(t){t.innerHTML=""}function w(t){t.style.display="block"}function g(t){t.style.display="none"}function S(t){t.style.display="block"}function M(t){t.style.display="none"}function $(){var r;const t=((r=document.querySelector(".gallery-item"))==null?void 0:r.getBoundingClientRect().height)||0;t&&window.scrollBy({top:t*2,behavior:"smooth"})}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".form"),r=document.querySelector(".gallery"),n=document.querySelector(".loader-container"),s=document.querySelector(".load-more-button"),e=document.querySelector(".load-more-loader"),o=document.querySelector(".end-message");let a,l=1,f="",d=0;g(s),M(o),u(e);function m(){a?a.refresh():a=new E(".gallery a",{captionsData:"alt",captionDelay:250})}t.addEventListener("submit",async i=>{i.preventDefault();const y=i.target.elements.searchQuery.value.trim();if(!y){p.error({title:"Error",message:"Please enter a search query",position:"topRight"});return}l=1,f=y,v(r),g(s),M(o),L(n);try{const c=await h(y,l);if(d=c.totalHits,u(n),c.hits.length===0){p.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(c.hits,r),m(),c.hits.length<d?w(s):S(o)}catch(c){u(n),p.error({title:"Error",message:`An error occurred: ${c.message}`,position:"topRight"})}}),s.addEventListener("click",async()=>{g(s),L(e),l+=1;try{const i=await h(f,l);u(e),b(i.hits,r,!0),m(),$(),l*15>=d?(g(s),S(o)):w(s)}catch(i){u(e),p.error({title:"Error",message:`An error occurred: ${i.message}`,position:"topRight"})}})});
//# sourceMappingURL=index.js.map
