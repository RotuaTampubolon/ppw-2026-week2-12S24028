const ApiService = {
  BASE_PATH: './data',

  async request(file) {
    try {
      const response = await fetch(`${this.BASE_PATH}/${file}`);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      console.error('[API Network Error]:', err);
      throw err;
    }
  },

  getProfile() { return this.request('profile.json'); },
  getProjects() { return this.request('projects.json'); },
  getServices() { return this.request('services.json'); }
};