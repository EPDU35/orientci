// chat.js — interface de conversation assistant

const Chat = {
    messages: [],

    init() {
        this.setWelcomeTime();
        this.loadContext();
        this.personalizeWelcome();
        this.bindInput();
        this.bindQuickReplies();
    },

    personalizeWelcome() {
        const user = Storage.loadUser();
        const results = Storage.loadResults();
        const msgEl = document.getElementById('welcomeMsg');
        if (!msgEl) return;

        const prenom = user && user.username ? user.username : null;
        const topId = results && results[0] ? results[0].id : null;

        const labels = {
            info_miage: 'Informatique & MIAGE', genie_civil: 'Génie Civil / BTP',
            finance_compta: 'Finance & Comptabilité', medecine: 'Médecine & Santé',
            marketing: 'Marketing & Commerce', droit: 'Droit & Sciences Juridiques',
            telecom: 'Télécommunications', agronomie: 'Agronomie',
            lettres_shes: 'Lettres & SHS', gestion_rh: 'Gestion RH',
            architecture: 'Architecture', pharmacie: 'Pharmacie',
            eco_dev: 'Économie du Développement', transport_logistique: 'Transport & Logistique',
            journalisme: 'Journalisme'
        };

        if (prenom && topId) {
            msgEl.textContent = `Salut ${prenom} ! Je connais ton profil. Ta filière top est ${labels[topId] || topId}. Pose-moi tes questions sur les débouchés, les écoles ou les salaires en CI.`;
        } else if (prenom) {
            msgEl.textContent = `Salut ${prenom} ! Complète le quiz d'abord pour que je puisse t'orienter avec ton profil.`;
        } else {
            msgEl.textContent = `Bonjour ! Je suis l'assistant OrientCI. Je connais le marché ivoirien et je peux t'aider à mieux comprendre ta filière recommandée.`;
        }
    },

    setWelcomeTime() {
        const now = new Date();
        const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
        const el = document.getElementById('welcomeTime');
        if (el) el.textContent = time;
    },

    loadContext() {
        const results = Storage.loadResults();
        const banner = document.getElementById('contextText');
        if (!banner) return;

        if (results && results.length > 0) {
            const top = results[0];
            const labels = {
                info_miage: 'Informatique & MIAGE', genie_civil: 'Génie Civil / BTP',
                finance_compta: 'Finance & Comptabilité', medecine: 'Médecine & Santé',
                marketing: 'Marketing & Commerce', droit: 'Droit & Sciences Juridiques',
                telecom: 'Télécommunications', agronomie: 'Agronomie', lettres_shes: 'Lettres & SHS',
                gestion_rh: 'Gestion RH', architecture: 'Architecture', pharmacie: 'Pharmacie',
                eco_dev: 'Économie du Développement', transport_logistique: 'Transport & Logistique',
                journalisme: 'Journalisme'
            };
            banner.textContent = `Contexte : Filière recommandée → ${labels[top.id] || top.id} (${top.score}%)`;
        } else {
            banner.textContent = 'Contexte : Complète le quiz pour un appui personnalisé';
        }
    },

    bindQuickReplies() {
        const results = Storage.loadResults();
        const topId = results && results[0] ? results[0].id : null;
        const container = document.getElementById('quickReplies');
        if (!container) return;

        const SECTOR_QUESTIONS = {
            info_miage:           ['Débouchés informatique en CI ?', 'Meilleure école tech CI ?', 'Salaire développeur CI ?'],
            genie_civil:          ['Débouchés BTP en CI ?', 'Salaire ingénieur civil CI ?', 'Quelle école pour le génie civil ?'],
            finance_compta:       ['Débouchés finance en CI ?', 'Salaire comptable CI ?', 'Banques qui recrutent en CI ?'],
            medecine:             ['Durée études médecine CI ?', 'Débouchés santé en CI ?', 'CHU ou clinique privée ?'],
            marketing:            ['Débouchés marketing en CI ?', 'Salaire commercial CI ?', 'Entreprises qui recrutent ?'],
            telecom:              ['Orange CI ou MTN, laquelle recrute plus ?', 'Salaire ingénieur télécoms CI ?', 'ESATIC bonne école ?'],
            droit:                ['Débouchés droit en CI ?', 'Salaire juriste CI ?', 'Avocat ou magistrat ?'],
            default:              ['Débouchés en CI ?', 'Quelle école choisir ?', 'Salaire moyen ?']
        };

        const questions = SECTOR_QUESTIONS[topId] || SECTOR_QUESTIONS.default;

        container.innerHTML = questions.map(q =>
            `<button class="quick-reply" data-msg="${q}">${q}</button>`
        ).join('');

        container.addEventListener('click', e => {
            const btn = e.target.closest('.quick-reply');
            if (!btn) return;
            this.sendMessage(btn.dataset.msg);
            container.style.display = 'none';
        });
    },

    bindInput() {
        const input = document.getElementById('chatInput');
        const btn = document.getElementById('sendBtn');

        btn.addEventListener('click', () => this.handleSend());
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.92)');
        btn.addEventListener('mouseup', () => btn.style.transform = 'scale(1)');
    },

    handleSend() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        this.sendMessage(text);
    },

    sendMessage(text) {
        this.appendMessage('user', text);
        this.showTyping();
        API.ask(text, Storage.loadResults()).then(reply => {
            this.hideTyping();
            this.appendMessage('bot', reply);
        }).catch(err => {
            this.hideTyping();
            if (err.message === 'SERVER_DOWN') {
                this.appendMessage('bot', 'Backend non accessible. Lance node server.js dans le dossier backend puis réessaie.');
            } else {
                this.appendMessage('bot', 'Désolé, une erreur est survenue. Les autres fonctionnalités restent disponibles.');
            }
        });
    },

    appendMessage(role, text) {
        const area = document.getElementById('messagesArea');
        const time = new Date();
        const timeStr = time.getHours().toString().padStart(2,'0') + ':' + time.getMinutes().toString().padStart(2,'0');
        const isUser = role === 'user';

        const wrap = document.createElement('div');
        wrap.style.cssText = `display:flex; flex-direction:column; gap:4px; ${isUser ? 'align-items:flex-end;' : 'align-items:flex-start;'}`;

        wrap.innerHTML = `
            <div class="chat-bubble ${role}" style="animation: fadeInUp 0.25s ease both;">
                ${text}
            </div>
            <span class="chat-time" style="${isUser ? 'text-align:right; padding-right:4px;' : 'padding-left:4px;'}">${timeStr}</span>
        `;

        area.appendChild(wrap);
        area.scrollTop = area.scrollHeight;
        document.getElementById('chatContainer').scrollTop = 9999;
    },

    showTyping() {
        const area = document.getElementById('messagesArea');
        const div = document.createElement('div');
        div.id = 'typingIndicator';
        div.style.cssText = 'display:flex; align-items:flex-start; margin-bottom:4px;';
        div.innerHTML = `
            <div class="chat-bubble bot" style="padding: 14px 16px;">
                <div class="typing-dots">
                    <span class="dot-1"></span>
                    <span class="dot-2"></span>
                    <span class="dot-3"></span>
                </div>
            </div>
        `;
        area.appendChild(div);
        document.getElementById('chatContainer').scrollTop = 9999;
    },

    hideTyping() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }
};

document.addEventListener('DOMContentLoaded', () => Chat.init());