import "./index.scss";

const root = document.getElementById("root");

class Page {
  constructor() {
    this.render();
  }
  render() {
    const div = document.createElement("div");
    const attributes = {
      class: "test-div_wrapper",
      innerHTML: `
        <h1 class="page-title">Hello world!</h1>
        `,
    };
    Object.assign(div, attributes);
    root.appendChild(div);
  }
}

new Page();
