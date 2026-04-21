# OrientCI — VORTEXON

Application web d'aide à l'orientation scolaire et professionnelle — Côte d'Ivoire.

## Stack
- Frontend : HTML / CSS / JS natif (sans framework)
- Backend : Node.js + Express (proxy API uniquement)
- IA : Anthropic Claude (appui secondaire)
- Données : JSON statiques côté client

## Lancer le projet

### Frontend seul (sans IA)
Ouvre `index.html` directement dans le navigateur.
Le quiz, les résultats et le catalogue fonctionnent sans serveur.

### Avec backend (assistant IA)
```bash
cd backend
npm install
ANTHROPIC_API_KEY=sk-... node server.js
```
Ouvre http://localhost:3000

## Structure
```
orientci/
├── index.html        Landing page
├── quiz.html         Quiz 15 questions
├── results.html      Top 5 filières
├── catalogue.html    Métiers / Écoles / Filières
├── assistant.html    Chat IA
├── auth.html         Connexion / Inscription
├── css/              Style global + composants + responsive
├── js/               Logique quiz, scoring, affichage, chat
├── data/             metiers.json / ecoles.json / filieres.json
└── backend/          Proxy Node.js (optionnel)
```

## Équipe VORTEXON
- **AGUIA Paul Eliel** — Lead Frontend & Design
- **DJEGBA Esmel** — Lead Data & Moteur
- **YAO Christ** — Lead Backend & IA