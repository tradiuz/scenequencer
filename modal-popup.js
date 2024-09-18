/*
Name this macro modal-popup
Requires Advanced Macros
Set to execute as Everyone and give players limited permissions
*/
const modalTitle = scope.title ?? "Title";
const modalBody = scope.body ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const duration = scope.duration ?? 5000;

let header = document.createElement('dialog');
header.style.position = 'fixed';
header.style.top = '30%';
header.style.left = '50%';
header.style.transform = 'translate(-50%, -50%)';
header.style.minWidth = '400px';
header.style.padding = '10px';
header.style.zIndex = 100;
header.style.borderRadius = '30px';
header.style.border = 'thick double var(--primary-color)';
header.style.background = 'rgba(0,0,0,.9)';
header.style.display = 'flex';
header.style.flexDirection = 'column';
header.style.justifyContent = 'flex-start';
header.style.alignItems = 'center';
header.style.fontSize = '2em';
header.style.opacity = 0;
header.style.transition = 'opacity 1s';
header.style.fontFamily = 'Courier New';
header.style.color = 'var(--primary-color)';
header.innerHTML = `<h2 style="font-family: 'Bruno Ace'">${modalTitle}</h2><p>${modalBody}</p>`;

document.body.appendChild(header);

setTimeout(() => header.style.opacity = 1, 100);

setTimeout(() => {
    header.style.opacity = 0;
    setTimeout(() => header.remove(), duration / 10);
}, duration);