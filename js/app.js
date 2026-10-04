const App = {
  state: { projects: [] },

  async init() {
    this.renderProjectState("loading");
    try {
      this.state.projects = await ApiService.getProjects();
      this.renderProjectState(this.state.projects.length ? "success" : "empty");
      if (this.state.projects.length) this.renderProjects(this.state.projects);
    } catch (err) {
      console.error("[App init]:", err);
      this.renderProjectState("error");
    }
  },

  createEl(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  },

  renderProjects(list) {
    const grid = document.getElementById("projectGrid");
    grid.replaceChildren();
    list.forEach((p) => grid.appendChild(this.buildProjectCard(p)));
  },

  renderProjectState(state) {
    const grid = document.getElementById("projectGrid");
    grid.replaceChildren();

    if (state === "loading") {
      const wrapper = this.createEl("div", "col-12 text-center py-5");
      const spinner = this.createEl("div", "spinner-border text-primary");
      spinner.setAttribute("role", "status");
      spinner.appendChild(
        this.createEl("span", "visually-hidden", "Memuat proyek..."),
      );
      wrapper.append(
        spinner,
        this.createEl("p", "text-muted mt-3 mb-0", "Memuat proyek..."),
      );
      grid.appendChild(wrapper);
      return;
    }

    if (state === "empty") {
      grid.appendChild(
        this.createEl(
          "div",
          "col-12 alert alert-info mb-0",
          "Belum ada proyek untuk ditampilkan.",
        ),
      );
      return;
    }

    if (state === "error") {
      const wrapper = this.createEl("div", "col-12");
      const alert = this.createEl(
        "div",
        "alert alert-danger d-flex justify-content-between align-items-center gap-3 mb-0",
      );
      alert.setAttribute("role", "alert");
      alert.appendChild(
        this.createEl(
          "span",
          "",
          "Data proyek gagal dimuat. Silakan coba lagi.",
        ),
      );
      const retry = this.createEl(
        "button",
        "btn btn-outline-danger",
        "Coba Lagi",
      );
      retry.type = "button";
      retry.addEventListener("click", () => this.init());
      alert.appendChild(retry);
      wrapper.appendChild(alert);
      grid.appendChild(wrapper);
    }
  },

  buildProjectCard(p) {
    const col = this.createEl("div", "col");
    const card = this.createEl("div", "card project-card h-100");

    const img = this.createEl("img", "card-img-top project-thumb");
    img.src = p.thumbnail;
    img.alt = p.title;
    img.loading = "lazy";

    const body = this.createEl("div", "card-body d-flex flex-column");

    const tags = this.createEl("div", "mb-2");
    p.tags.forEach((t) =>
      tags.appendChild(this.createEl("span", "badge badge-tech", t)),
    );

    const title = this.createEl("h3", "h5 card-title", p.title);
    const desc = this.createEl(
      "p",
      "card-text text-muted small flex-grow-1",
      p.description,
    );

    const btn = this.createEl("button", "btn btn-accent mt-2", "Detail Proyek");
    btn.type = "button";
    btn.dataset.projectId = p.id;

    body.append(tags, title, desc, btn);
    card.append(img, body);
    col.appendChild(card);
    return col;
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
