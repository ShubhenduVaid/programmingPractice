class InstallAppBanner extends HTMLElement {
  constructor() {
    super();

    const that = this;

    // closed
    let shadowRoot = this.attachShadow({ mode: "closed" });

    const style = document.createElement("style");

    style.textContent = `
    h1{
      color: blue;
    }

    h2{
      color: grey;
    }

    button{
      border-radius: 50%;
    }
`;

    shadowRoot.appendChild(style);

    const container = document.createElement("div");

    const title = document.createElement("h1");
    title.innerText = this.getAttribute("data-title");

    const description = document.createElement("h2");
    description.innerHTML = this.getAttribute("data-description");

    const installButton = document.createElement("button");
    installButton.innerHTML = "Install";

    installButton.addEventListener("click", (e) => {
      const event = new CustomEvent("install", { detail: e });
      that.dispatchEvent(event);
    });

    container.append(title);
    container.append(description);
    container.append(installButton);

    shadowRoot.append(container);

    // observe mutations
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(() => {
      title.innerText = this.getAttribute("data-title");
      description.innerHTML = this.getAttribute("data-description");
    });
    observer.observe(this, config);
  }
}

customElements.define("install-app-banner", InstallAppBanner);
