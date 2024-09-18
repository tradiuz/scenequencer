// Name this macro 'modify-ui'
const uiSelectors = ["#ui-left", "#ui-top", "#taskbar", "#ui-right", "#players", "#hotbar"];
const duration = scope.duration ?? 500;
const opacity = scope.opacity ?? 1;
uiSelectors.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        element.style.opacity = opacity;
    }
});