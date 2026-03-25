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

//              To save contact ifnormation to your google sheet
/*document.querySelector('#contact-form').onsubmit = (e) => {
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Full Name"]').value;
  const email = document.querySelector('input[placeholder="Email"]').value;
  const mobile = document.querySelector('input[placeholder="Mobile Number"]').value;
  const subject = document.querySelector('input[placeholder="Subject For"]').value;
  const message = document.querySelector('#message-box').value;

  const formUrl = `https://docs.google.com/forms/d/e/"YOUR_FORM_ID_HERE"/formResponse?entry.111=${name}&entry.222=${email}&entry.333=${mobile}&entry.444=${subject}&entry.555=${message}`;

  fetch(formUrl, { method: 'POST', mode: 'no-cors' });

  alert('Message sent!');
  e.target.reset();
}*/