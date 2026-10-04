const ApiService = {
  BASE_PATH: "./data",
  ORDER_ENDPOINT: "",

  async request(file) {
    try {
      const response = await fetch(`${this.BASE_PATH}/${file}`);
      if (!response.ok) {
        throw new Error(
          `HTTP Error ${response.status}: ${response.statusText}`,
        );
      }
      return await response.json();
    } catch (err) {
      console.error("[API Network Error]:", err);
      throw err;
    }
  },

  getProfile() {
    return this.request("profile.json");
  },
  getProjects() {
    return this.request("projects.json");
  },
  getServices() {
    return this.request("services.json");
  },

  async submitServiceOrder(payload) {
    if (!this.ORDER_ENDPOINT) {
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      return { ok: true, simulated: true, payload };
    }

    const response = await fetch(this.ORDER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  },
};
