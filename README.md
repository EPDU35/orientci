# OrientCI — VORTEXON

## Lancer le projet en local

### 1. Backend (YAO)
```bash
cd backend
npm install
```
Ouvre le fichier `.env` et colle ta clé Anthropic :
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```
Lance le serveur :
```bash
node server.js
```
Le backend tourne sur → http://localhost:3001
Teste : http://localhost:3001/test → doit répondre `{ status: "ok ca fonctionne" }`

---

### 2. Frontend (Eliel)
Ouvre `index.html` avec **Live Server** (VS Code) sur le port **5500**.

Le frontend appelle le backend sur `http://localhost:3001/api/chat`.

---

### Structure backend (YAO)
```
backend/
├── server.js
├── .env                  ← clé API ici
├── config/env.js
├── routes/ai.routes.js
├── controllers/ai.controller.js
└── services/ai.service.js
```

### Structure frontend (Eliel)
```
orientci/
├── index.html
├── quiz.html
├── results.html
├── catalogue.html
├── assistant.html
├── auth.html
├── css/
├── js/
│   ├── core/
│   │   ├── storage.js
│   │   └── auth-guard.js
│   ├── quiz/
│   ├── scoring/
│   ├── results/
│   ├── catalogue/
│   └── assistant/
│       ├── chat.js       ← UI chat
│       └── api.js        ← appel backend
└── data/
```

---

## Équipe VORTEXON
- **AGUIA Paul Eliel** — Lead Frontend & Design
- **DJEGBA Esmel** — Lead Data & Moteur
- **YAO Christ** — Lead Backend & IA