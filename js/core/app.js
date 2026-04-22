// app.js — initialisation globale OrientCI

const App = {
    init() {
        this.checkAuth();
        this.hideSplash();
    },

    checkAuth() {
        const user = Storage.loadUser();
        if (user && user.username) {
            setTimeout(() => {
                window.location.href = 'results.html';
            }, 800);
        }
    },

    hideSplash() {
        const splash = document.getElementById('splash');
        if (!splash) return;

        setTimeout(() => {
            splash.classList.add('hidden');
            setTimeout(() => splash.remove(), 500);
        }, 1400);
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());