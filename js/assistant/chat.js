document.addEventListener('DOMContentLoaded', function () {
  const messagesArea = document.getElementById('messagesArea');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const quickReplies = document.getElementById('quickReplies');
  const contextText = document.getElementById('contextText');
  const chatContainer = document.getElementById('chatContainer');

  const user = Storage.loadUser();
  const results = Storage.loadResults();

  if (results && results[0]) {
    contextText.textContent = `Contexte : Filière recommandée → ${results[0].nom} (${results[0].score}%)`;
  }

  const welcomeTime = document.getElementById('welcomeTime');
  if (welcomeTime) welcomeTime.textContent = getTime();

  function getTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }

  function appendMessage(text, role) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex; flex-direction:column; gap:4px; align-items:' + (role === 'user' ? 'flex-end' : 'flex-start') + ';';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + role;
    bubble.textContent = text;

    const time = document.createElement('span');
    time.className = 'chat-time';
    time.style.cssText = role === 'user' ? 'padding-right:4px;' : 'padding-left:4px;';
    time.textContent = getTime();

    wrapper.appendChild(bubble);
    wrapper.appendChild(time);
    messagesArea.appendChild(wrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.id = 'typingIndicator';
    div.className = 'chat-bubble bot';
    div.style.padding = '10px 14px';
    div.innerHTML = '<div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
    messagesArea.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typingIndicator');
    if (t) t.remove();
  }

  async function sendMessage(text) {
    if (!text.trim()) return;
    if (quickReplies) quickReplies.style.display = 'none';
    appendMessage(text, 'user');
    chatInput.value = '';
    showTyping();

    try {
      const profile = Storage.loadProfile();
      const top = results && results[0] ? results[0] : null;

      const response = await fetch('backend/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, profile, topFiliere: top })
      });

      removeTyping();
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      appendMessage(data.reply, 'bot');
    } catch (err) {
      removeTyping();
      appendMessage('Je ne suis pas disponible pour le moment. Explore le catalogue en attendant.', 'bot');
    }
  }

  sendBtn.addEventListener('click', function () { sendMessage(chatInput.value); });

  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(chatInput.value);
    }
  });

  chatInput.addEventListener('focus', function () { this.style.borderColor = 'var(--orange)'; });
  chatInput.addEventListener('blur', function () { this.style.borderColor = 'var(--gris-light)'; });

  document.querySelectorAll('.quick-reply').forEach(function (btn) {
    btn.addEventListener('click', function () { sendMessage(btn.dataset.msg); });
  });
});