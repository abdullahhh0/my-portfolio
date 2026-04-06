const navToggle = document.querySelector('#nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.onclick = () => {
  navToggle.classList.toggle('bx-x');
  navMenu.classList.toggle('active');
}

const allSections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  allSections.forEach(sec => {
    let scrollTop = window.scrollY;
    let sectionOffset = sec.offsetTop - 400;
    let sectionHeight = sec.offsetHeight;
    let sectionId = sec.getAttribute('id');

    if (scrollTop > sectionOffset && scrollTop < sectionOffset + sectionHeight) {
      sec.classList.add('start-animation');
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('header nav a[href*=' + sectionId + ']').classList.add('active');
      });
    }
  });

  const siteHeader = document.querySelector('.site-header');
  siteHeader.classList.toggle('sticky', window.scrollY > 100);

  navToggle.classList.remove('bx-x');
  navMenu.classList.remove('active');
}

// Contact form
document.querySelector('#contact-form').onsubmit = (e) => {
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Full Name"]').value;
  const email = document.querySelector('input[placeholder="Email"]').value;
  const mobile = document.querySelector('input[placeholder="Mobile Number"]').value;
  const subject = document.querySelector('input[placeholder="Subject For"]').value;
  const message = document.querySelector('#message-box').value;

  const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfXsYcREDkUr54E3kSdn6qc5zHjMNlr1spvjZru8v5r0cwykA/formResponse?entry.265854754=${name}&entry.655673856=${email}&entry.1592644372=${mobile}&entry.180140175=${subject}&entry.610631378=${message}`;

  fetch(formUrl, { method: 'POST', mode: 'no-cors' });
  alert('Message sent!');
  e.target.reset();
}

// Chat popup toggle ← YEH NAYA HAI
const chatBtn = document.querySelector('.chat-btn');
const chatPopup = document.querySelector('.chat-popup');
const chatClose = document.querySelector('.chat-close');

chatBtn.onclick = () => chatPopup.style.display = 'flex';
chatClose.onclick = () => chatPopup.style.display = 'none';

// Chatbot
const sendBtn = document.querySelector('.chat-input button');
const chatInput = document.querySelector('.chat-input input');
const chatMessages = document.querySelector('.chat-messages');

async function sendMessage() {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  chatMessages.innerHTML += `<div style="text-align:right; margin:1rem 0; color: var(--accent)">${userMsg}</div>`;
  chatInput.value = '';

  chatMessages.innerHTML += `<div id="bot-loading" style="text-align:left; margin:1rem 0; opacity:0.5">Typing...</div>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMsg })
  });

  const data = await response.json();
  document.getElementById('bot-loading').remove();

  chatMessages.innerHTML += `<div style="text-align:left; margin:1rem 0">${data.reply}</div>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.onclick = sendMessage;
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});