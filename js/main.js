// Russell, Evans & Thompson, PLLC — shared site behavior

document.addEventListener('DOMContentLoaded', function () {

  // =========================================================
  // 1. UPDATE CAREER OPPORTUNITIES BUTTONS (Runs on careers.html)
  // =========================================================
  const openingRows = document.querySelectorAll('.opening-row');

  openingRows.forEach(row => {
    const heading = row.querySelector('h4');
    const link = row.querySelector('a');

    if (heading && link) {
      // Get and trim the job position title
      const positionTitle = heading.textContent.trim();

      // Encode parameters safely for the URL
      const params = new URLSearchParams({
        interest: 'careers',
        position: positionTitle
      });

      // Update the href attribute
      link.href = `contact.html?${params.toString()}`;
    }
  });


  // =========================================================
  // 2. CONTACT FORM PRE-FILL & UPLOAD VISIBILITY (Runs on contact.html)
  // =========================================================
  var interestSelect = document.getElementById('interest');
  var resumeWrapper = document.getElementById('resume-upload-wrapper');
  var resumeInput = document.getElementById('resume');
  var filePreview = document.getElementById('file-preview');

  // Helper function to smoothly animate the resume upload wrapper
  function toggleResumeUpload() {
    if (interestSelect && resumeWrapper) {
      if (interestSelect.value === 'careers') {
        resumeWrapper.classList.add('is-visible');
      } else {
        resumeWrapper.classList.remove('is-visible');
        // Reset file input if user switches away from 'careers'
        if (resumeInput) resumeInput.value = '';
        if (filePreview) filePreview.style.display = 'none';
      }
    }
  }

  // Parse URL Parameters when arriving at contact.html
  var urlParams = new URLSearchParams(window.location.search);
  var interestParam = urlParams.get('interest');
  var positionParam = urlParams.get('position');

  if (interestParam && interestSelect) {
    interestSelect.value = interestParam;
  }

  if (positionParam) {
    var messageTextarea = document.getElementById('message');
    if (messageTextarea) {
      messageTextarea.value = "Position of Interest: " + positionParam + "\n\n";
      messageTextarea.focus();
      messageTextarea.setSelectionRange(messageTextarea.value.length, messageTextarea.value.length);
    }
  }

  // Check visibility on initial page load
  toggleResumeUpload();

  // Listen for dropdown changes to animate the upload box dynamically
  if (interestSelect) {
    interestSelect.addEventListener('change', toggleResumeUpload);
  }


  // =========================================================
  // 3. NAVIGATION & MOBILE MENU
  // =========================================================
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

  // Resume File Upload & Preview Handler
  var fileNameSpan = document.getElementById('file-name');
  var fileRemoveBtn = document.getElementById('file-remove');

  if (resumeInput && filePreview && fileNameSpan && fileRemoveBtn) {
    // Show file name when selected
    resumeInput.addEventListener('change', function () {
      if (this.files && this.files.length > 0) {
        fileNameSpan.textContent = this.files[0].name;
        filePreview.style.display = 'flex';
      } else {
        filePreview.style.display = 'none';
      }
    });

    // Clear selected file when clicking delete (x)
    fileRemoveBtn.addEventListener('click', function () {
      resumeInput.value = '';
      filePreview.style.display = 'none';
    });
  }

  // Show success message if redirected back after form submission
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('submitted') === 'true') {
    var success = document.getElementById('form-success');
    if (success) {
      success.classList.add('visible');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

});