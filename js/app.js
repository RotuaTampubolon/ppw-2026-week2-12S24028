const App = {
  state: { projects: [] },

  async init() {
    try {
      this.state.projects = await ApiService.getProjects();
      this.renderProjects(this.state.projects);
    } catch (err) {
      console.error('[App init]:', err);
    }
  },

  createEl(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  },

  renderProjects(list) {
    const grid = document.getElementById('projectGrid');
    grid.replaceChildren();
    list.forEach((p) => grid.appendChild(this.buildProjectCard(p)));
  },

  buildProjectCard(p) {
    const col = this.createEl('div', 'col');
    const card = this.createEl('div', 'card project-card h-100');

    const img = this.createEl('img', 'card-img-top project-thumb');
    img.src = p.thumbnail;
    img.alt = p.title;
    img.loading = 'lazy';

    const body = this.createEl('div', 'card-body d-flex flex-column');

    const tags = this.createEl('div', 'mb-2');
    p.tags.forEach((t) => tags.appendChild(this.createEl('span', 'badge badge-tech', t)));

    const title = this.createEl('h3', 'h5 card-title', p.title);
    const desc = this.createEl('p', 'card-text text-muted small flex-grow-1', p.description);

    const btn = this.createEl('button', 'btn btn-accent mt-2', 'Detail Proyek');
    btn.type = 'button';
    btn.dataset.projectId = p.id;

    body.append(tags, title, desc, btn);
    card.append(img, body);
    col.appendChild(card);
    return col;
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());