// app.js — initialisation globale OrientCI

const App = {
    init() {
        this.hideSplash();
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