document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});



var navbar = document.getElementById('navbar');
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {

    
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    
    var currentSection = '';
    sections.forEach(function(section) {
        if (window.scrollY >= section.offsetTop - 120) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        var href = link.getAttribute('href').replace('#', '');
        if (href === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    
    var backToTop = document.getElementById('backToTop');
    if (window.scrollY > 400) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }

    
    document.querySelectorAll('.fade-section').forEach(function(el) {
        var position = el.getBoundingClientRect().top;
        if (position < window.innerHeight * 0.88) {
            el.classList.add('fade-in');
        }
    });

});



var backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}



document.querySelectorAll('section').forEach(function(section) {
    section.classList.add('fade-section');
});



var contactForm = document.getElementById('contactForm');
var formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var name  = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var msg   = document.getElementById('msg').value.trim();

        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !email || !msg) {
            formFeedback.textContent = '❌ Please fill in all fields.';
            formFeedback.style.color = '#dc2626';
            return;
        }

        if (!emailOk) {
            formFeedback.textContent = '❌ Please enter a valid email address.';
            formFeedback.style.color = '#dc2626';
            return;
        }

        formFeedback.textContent = '✅ Thank you, ' + name + '! I will reply within 48 hours.';
        formFeedback.style.color = '#166534';
        contactForm.reset();

        setTimeout(function() {
            formFeedback.textContent = '';
        }, 5000);
    });
}



window.dispatchEvent(new Event('scroll'));