!function(){var t,e=document.querySelector("body"),a=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");a.addEventListener("click",(function(){a.disabled=!0,d.disabled=!1,t=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),d.addEventListener("click",(function(){clearInterval(t),a.disabled=!1,d.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.d62f64e6.js.map
