class InstallAppBanner extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });

    const container = document.createElement("div");

    const title = document.createElement("h1");
    title.innerText = "draw.io Diagrams & Whiteboards";

    const description = document.createElement("h2");
    description.innerHTML =
      "Create powerful, easy to use and secure diagrams and whiteboards. Top rated Confluence diagramming solution since 2013";

    const installButton = document.createElement("button");
    installButton.innerHTML = "Install";
    installButton.addEventListener("click", () =>
      alert("Installation started")
    );

    container.append(title);
    container.append(description);
    container.append(installButton);

    shadowRoot.append(container);
  }
}

customElements.define("install-app-banner", InstallAppBanner);
