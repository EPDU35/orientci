// storage.js — gestion du profil utilisateur via localStorage

const Storage = {
    KEY_PROFILE: 'orientci_profile',
    KEY_ANSWERS: 'orientci_answers',
    KEY_RESULTS: 'orientci_results',
    KEY_USER:    'orientci_user',

    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn('Storage write failed:', e);
        }
    },

    load(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    saveAnswers(answers) {
        this.save(this.KEY_ANSWERS, answers);
    },

    loadAnswers() {
        return this.load(this.KEY_ANSWERS) || {};
    },

    saveResults(results) {
        this.save(this.KEY_RESULTS, results);
    },

    loadResults() {
        return this.load(this.KEY_RESULTS) || null;
    },

    saveUser(user) {
        this.save(this.KEY_USER, user);
    },

    loadUser() {
        return this.load(this.KEY_USER) || null;
    },

    clearAll() {
        [this.KEY_PROFILE, this.KEY_ANSWERS, this.KEY_RESULTS].forEach(k => this.remove(k));
    }
};