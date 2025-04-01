class InstallAppBanner extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

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
