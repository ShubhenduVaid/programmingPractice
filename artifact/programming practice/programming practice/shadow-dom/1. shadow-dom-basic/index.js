const shadowHost = document.createElement("div");
const shadowRoot = shadowHost.attachShadow({ mode: "open" });
shadowRoot.innerHTML = `<div><h1>Hi Shadow root H1 element</h1></div>`

const container = document.querySelector('body')
container.append(shadowHost)

console.log(document.querySelectorAll('h1').length)
console.log(document.querySelectorAll('h1')[0].textContent)

console.log(shadowHost.shadowRoot.querySelectorAll('h1').length)
console.log(shadowHost.shadowRoot.querySelectorAll('h1')[0].textContent)