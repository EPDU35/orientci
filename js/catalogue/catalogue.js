// catalogue.js — affichage données catalogue

const Catalogue = {
    currentTab: 'metiers',
    metiers: [],
    ecoles: [],
    filieres: [],

    async init() {
        await this.loadData();
        this.renderList();
    },

    async loadData() {
        try {
            const [m, e, f] = await Promise.all([
                fetch('data/metiers.json').then(r => r.json()),
                fetch('data/ecoles.json').then(r => r.json()),
                fetch('data/filieres.json').then(r => r.json())
            ]);
            this.metiers  = m;
            this.ecoles   = e;
            this.filieres = f;
        } catch (err) {
            document.getElementById('catalogueList').innerHTML = `
                <div class="empty-state">
                    <p>Impossible de charger les données. Vérifie ta connexion.</p>
                </div>`;
        }
    },

    getActive() {
        if (this.currentTab === 'metiers')  return this.metiers;
        if (this.currentTab === 'ecoles')   return this.ecoles;
        return this.filieres;
    },

    renderList(search = '', filter = 'tous') {
        const list = document.getElementById('catalogueList');
        const empty = document.getElementById('emptyState');
        let items = this.getActive();

        if (search) {
            const q = search.toLowerCase();
            items = items.filter(item => {
                const text = JSON.stringify(item).toLowerCase();
                return text.includes(q);
            });
        }

        if (filter && filter !== 'tous') {
            items = items.filter(item => {
                const secteur = (item.secteur || item.domaine || '').toLowerCase();
                return secteur.includes(filter.toLowerCase());
            });
        }

        if (items.length === 0) {
            list.innerHTML = '';
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';

        if (this.currentTab === 'metiers') {
            list.innerHTML = items.map(m => this.renderMetier(m)).join('');
        } else if (this.currentTab === 'ecoles') {
            list.innerHTML = items.map(e => this.renderEcole(e)).join('');
        } else {
            list.innerHTML = items.map(f => this.renderFiliere(f)).join('');
        }
    },

    renderMetier(m) {
        const badgeClass = m.marche === 'porteur' ? 'porteur' : (m.marche === 'emergent' ? 'emergent' : 'stable');
        const badgeLabel = m.marche === 'porteur' ? 'Porteur' : (m.marche === 'emergent' ? 'Émergent' : 'Stable');
        return `
            <div class="metier-card">
                <div class="metier-header">
                    <h3 class="metier-titre">${m.titre}</h3>
                    <span class="metier-badge ${badgeClass}">${badgeLabel}</span>
                </div>
                <div class="metier-meta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    ${m.secteur}
                </div>
                <div class="metier-salaire">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8600a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/></svg>
                    ${m.salaire_min.toLocaleString()} – ${m.salaire_max.toLocaleString()} XOF/mois
                </div>
            </div>
        `;
    },

    renderEcole(e) {
        return `
            <div class="ecole-card">
                <h3 class="ecole-nom">${e.nom}</h3>
                <p class="ecole-meta">${e.ville} · ${e.type}</p>
                ${e.frais ? `<p class="ecole-meta" style="margin-top: 3px;">Frais : ${e.frais}</p>` : ''}
                <div class="ecole-filieres">
                    ${(e.filieres || []).slice(0, 4).map(f => `<span class="ecole-filiere-tag">${f}</span>`).join('')}
                </div>
            </div>
        `;
    },

    renderFiliere(f) {
        return `
            <div class="filiere-card">
                <h3 class="filiere-nom">${f.nom}</h3>
                <p class="filiere-meta">${f.description}</p>
                <span class="filiere-duree">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    ${f.duree}
                </span>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Catalogue.init();

    document.getElementById('tabBar').addEventListener('click', e => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        Catalogue.currentTab = btn.dataset.tab;

        document.getElementById('searchInput').value = '';
        Filters.activeFilter = 'tous';
        Filters.renderChips();
        Catalogue.renderList();
    });
});