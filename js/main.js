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

  // Contact form
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevents the browser from navigating away from the page

      // Automatically grab all field values from the form inputs
      var formData = new FormData(form);
      var object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      var json = JSON.stringify(object);

      // Send the AJAX request using FormSubmit's AJAX endpoint
      fetch("https://formsubmit.co/ajax/affinitytrinityttv@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Show the success message upon successful form submission
          var success = document.getElementById('form-success');
          if (success) {
            success.classList.add('visible');
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          form.reset();
        })
        .catch(function (error) {
          console.error('Error submitting form:', error);
          alert('There was a problem sending your message. Please try again.');
        });
    });
  }

});
