class InstallAppBanner extends HTMLElement {
  constructor() {
    super();

    const that = this;

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

    installButton.addEventListener("click", (e) => {
      const event = new CustomEvent("install", { detail: e });
      that.dispatchEvent(event);
    });

    container.append(title);
    container.append(description);
    container.append(installButton);

    shadowRoot.append(container);
  }

  // connectedCallback() {
  //   console.log("data-title -->", this.getAttribute("data-title"));
  //   console.log("data-description -->", this.getAttribute("data-description"));

  // source: https://stackoverflow.com/questions/42719914/custom-element-class-this-getattributedata-returns-null
  // }
}

customElements.define("install-app-banner", InstallAppBanner);
