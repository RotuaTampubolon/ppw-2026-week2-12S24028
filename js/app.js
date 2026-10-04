const App = {
  state: { projects: [], category: "all" },

  async init() {
    this.renderProjectState("loading");
    this.bindProjectEvents();
    try {
      this.state.projects = await ApiService.getProjects();
      this.populateCategoryFilter();
      this.renderFilteredProjects();
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

  populateCategoryFilter() {
    const filter = document.getElementById("projectCategoryFilter");
    const categories = [
      ...new Set(this.state.projects.map((project) => project.category)),
    ].sort();
    filter.replaceChildren(this.createEl("option", "", "Semua Kategori"));
    filter.firstElementChild.value = "all";
    categories.forEach((category) => {
      const option = this.createEl("option", "", category);
      option.value = category;
      filter.appendChild(option);
    });
    filter.value = this.state.category;
    filter.addEventListener("change", (event) => {
      this.state.category = event.target.value;
      this.renderFilteredProjects();
    });
  },

  renderFilteredProjects() {
    const filtered =
      this.state.category === "all"
        ? this.state.projects
        : this.state.projects.filter(
            (project) => project.category === this.state.category,
          );
    this.renderProjectState(filtered.length ? "success" : "empty");
    if (filtered.length) this.renderProjects(filtered);
  },

  bindProjectEvents() {
    const grid = document.getElementById("projectGrid");
    if (grid.dataset.eventsBound) return;
    grid.dataset.eventsBound = "true";
    grid.addEventListener("click", (event) => {
      const button = event.target.closest("[data-project-id]");
      if (button) this.openProjectModal(button.dataset.projectId);
    });
  },

  openProjectModal(projectId) {
    const project = this.state.projects.find((item) => item.id === projectId);
    if (!project) return;

    const title = document.getElementById("projectModalTitle");
    const body = document.getElementById("projectModalBody");
    title.textContent = project.title;
    body.replaceChildren();

    const image = this.createEl("img", "img-fluid rounded mb-3 w-100");
    image.src = project.thumbnail;
    image.alt = project.title;
    image.loading = "lazy";
    const description = this.createEl("p", "text-secondary", project.description);
    const category = this.createEl("span", "badge bg-primary px-3 py-2", project.category);
    const course = this.createEl("p", "text-muted small mt-3 mb-2", project.course);
    const metrics = this.createEl("div", "d-flex flex-wrap gap-2 mb-3");
    project.metrics.forEach((metric) => {
      metrics.appendChild(this.createEl("span", "badge text-bg-light", `${metric.label}: ${metric.value}`));
    });
    const link = this.createEl("a", "btn btn-outline-primary", "Lihat proyek");
    link.href = project.link;
    link.target = "_blank";
    link.rel = "noopener";
    body.append(image, description, category, course, metrics, link);

    const modal = document.getElementById("universalProjectModal");
    bootstrap.Modal.getOrCreateInstance(modal).show();
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
