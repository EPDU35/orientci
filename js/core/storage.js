const Storage = {
  KEYS: {
    PROFILE: 'orientci_profile',
    ANSWERS: 'orientci_answers',
    RESULTS: 'orientci_results',
    USER: 'orientci_user',
    SESSION: 'orientci_session'
  },

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  },

  load(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  remove(key) { localStorage.removeItem(key); },

  clear() {
    Object.values(this.KEYS).forEach(k => localStorage.removeItem(k));
  },

  saveProfile(profile) { this.save(this.KEYS.PROFILE, profile); },
  loadProfile() { return this.load(this.KEYS.PROFILE); },

  saveAnswers(answers) { this.save(this.KEYS.ANSWERS, answers); },
  loadAnswers() { return this.load(this.KEYS.ANSWERS) || {}; },

  saveResults(results) { this.save(this.KEYS.RESULTS, results); },
  loadResults() { return this.load(this.KEYS.RESULTS); },

  saveUser(user) { this.save(this.KEYS.USER, user); },
  loadUser() { return this.load(this.KEYS.USER); },

  isLoggedIn() {
    const session = this.load(this.KEYS.SESSION);
    return !!(session && session.loggedIn);
  },

  hasUsername() {
    const user = this.loadUser();
    return !!(user && user.username && user.username.trim().length > 0);
  },

  login(userData) {
    this.save(this.KEYS.SESSION, { loggedIn: true, ts: Date.now() });
    this.saveUser(userData);
  },

  logout() {
    this.remove(this.KEYS.SESSION);
    this.remove(this.KEYS.USER);
  },

  guard(redirectTo) {
    if (!this.isLoggedIn()) {
      const dest = redirectTo || 'auth.html';
      window.location.replace(dest);
      return false;
    }
    return true;
  }
};