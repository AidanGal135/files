// Russell, Evans & Thompson, PLLC — shared site behavior

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Mobile dropdown (Services) toggle
  var dropdownParent = document.querySelector('.has-dropdown');
  if (dropdownParent) {
    var dropdownLink = dropdownParent.querySelector('a.nav-link');
    dropdownLink.addEventListener('click', function (e) {
      if (window.innerWidth <= 760) {
        e.preventDefault();
        dropdownParent.classList.toggle('open');
      }
    });
  }

  // Highlight active nav link based on current page
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
      var parentDropdown = link.closest('.has-dropdown');
      if (parentDropdown) {
        parentDropdown.querySelector('a.nav-link').classList.add('active');
      }
    }
  });

  // Contact form — static demo submission
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('form-success');
      if (success) {
        success.classList.add('visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

});
