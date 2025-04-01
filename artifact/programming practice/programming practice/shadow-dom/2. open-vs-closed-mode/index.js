const shadowHost = document.createElement("div");

// const shadowRoot = shadowHost.attachShadow({ mode: "open" });
const shadowRoot = shadowHost.attachShadow({ mode: "closed" });
shadowRoot.innerHTML = `<h1>Hi Shadow root H1 element</h1>`

const container = document.querySelector('body')
container.append(shadowHost)

// change text of the heading in shadow document
shadowHost.shadowRoot.querySelectorAll('h1')[0].innerText = "I M Batman!"
