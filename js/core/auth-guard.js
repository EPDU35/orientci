// auth-guard.js — vérifie la session avant d'afficher une page protégée

const AuthGuard = {
    check() {
        const user = Storage.loadUser();
        if (!user || !user.username) {
            const current = encodeURIComponent(window.location.pathname.split('/').pop());
            window.location.href = 'auth.html?redirect=' + current;
            return false;
        }
        return true;
    },

    getUser() {
        return Storage.loadUser();
    },

    logout() {
        Storage.remove(Storage.KEY_USER);
        window.location.href = 'index.html';
    }
};

document.addEventListener('DOMContentLoaded', () => AuthGuard.check());