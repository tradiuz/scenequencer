/*
Name this macro modal-popup
Requires Advanced Macros
Set to execute as Everyone and give players limited permissions
*/

const modalTitle = scope.title ?? "";
const modalBody = scope.body ?? "";
const duration = scope.duration ?? 0;
const modalPicture = scope.picture ?? '';

let modal = document.createElement('dialog');
modal.style.position = 'fixed';
modal.style.top = modalPicture ? '70%' : '30%';
modal.style.left = '50%';
modal.style.marginInline = 'auto';
modal.style.transform = 'translate(-50%, -50%)';
modal.style.width = '50%';
modal.style.minHeight = '33%';
modal.style.padding = '10px';
modal.style.columnGap = '10px';
modal.style.zIndex = 100;
modal.style.borderRadius = '10px';
modal.style.border = 'thick double var(--primary-color)';
modal.style.background = 'rgba(0,0,0,.9)';
modal.style.display = 'grid';
modal.style.grid = `${modalPicture ? '2em / 33% ' : ''}auto`;
modal.style.gridAutoRows = 'auto';
modal.style.alignItems = 'center';
modal.style.fontSize = '2em';
modal.style.opacity = 0;
modal.style.transition = 'opacity 1s';
modal.style.fontFamily = 'Courier New';
modal.style.color = 'var(--primary-color)';
modal.innerHTML = `${modalPicture ? `<div  style="min-height: 100%; grid-area: 1 / 1 / span 2 / 1; border-radius:30px; background:url('${modalPicture}') ; background-size: contain; background-position: center; background-repeat: no-repeat; background-color: rgba(from var(--primary-color) r g b / 15%);"></div>` : ''}
<div><h2 style="font-family: 'Bruno Ace'; text-align: center">${modalTitle}</h2></div>
<div><p>${modalBody}</p></div>`;

document.body.appendChild(modal);
console.log(modal);
setTimeout(() => modal.style.opacity = 1, 100);

setTimeout(() => {
    modal.style.opacity = 0;
    setTimeout(() => modal.remove(), duration / 10);
}, duration);