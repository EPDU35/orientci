// filters.js — filtres et recherche catalogue

const FILTERS_BY_TAB = {
    metiers:  ['tous', 'Tech', 'Finance', 'Santé', 'BTP', 'Commerce'],
    ecoles:   ['tous', 'Publique', 'Privée', 'Grande école'],
    filieres: ['tous', '2 ans', '3 ans', '5 ans']
};

const Filters = {
    activeFilter: 'tous',
    searchTerm: '',

    init() {
        this.renderChips();
        this.bindSearch();
    },

    renderChips() {
        const container = document.getElementById('filterChips');
        const tab = Catalogue.currentTab;
        const list = FILTERS_BY_TAB[tab] || [];

        container.innerHTML = list.map(f => `
            <button class="chip ${f === this.activeFilter ? 'active' : ''}" data-filter="${f}">${f === 'tous' ? 'Tous' : f}</button>
        `).join('');

        container.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.activeFilter = chip.dataset.filter;
                this.renderChips();
                Catalogue.renderList(this.searchTerm, this.activeFilter);
            });
        });
    },

    bindSearch() {
        const input = document.getElementById('searchInput');
        let debounce;

        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                this.searchTerm = input.value.trim();
                Catalogue.renderList(this.searchTerm, this.activeFilter);
            }, 250);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // init après catalogue
    setTimeout(() => Filters.init(), 50);
});