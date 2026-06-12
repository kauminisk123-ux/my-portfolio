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
var progressBar = document.getElementById('progressBar');


window.addEventListener('scroll', function() {


    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }


    
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

var projectCards = document.querySelectorAll('.project');
projectCards.forEach(function(card, index) {
    card.classList.add('stagger');
    card.style.transitionDelay = (index * 0.1) + 's';
});

function checkStagger() {
    projectCards.forEach(function(card) {
        var position = card.getBoundingClientRect().top;
        if (position < window.innerHeight * 0.9) {
            card.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkStagger);
checkStagger();



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

var terminalBody = document.getElementById('terminalBody');

var terminalLines = [
    { key: 'name',               value: '"Kaumini Samodhi"'    },
    { key: 'role',               value: '"Undergraduate Student"'          },
    { key: 'university',         value: '"USJ"'                 },
    { key: 'status',             value: '"open to internships"' },
    { key: 'currently_building', value: '"HarvestHub"'          },
    { key: 'fun_fact',           value: '"K-dramas > homework"' },
];

if (terminalBody) {
   
    var termCursor = document.createElement('span');
    termCursor.className = 'terminal-cursor';
    terminalBody.appendChild(termCursor);

    
    terminalLines.forEach(function(item, index) {
        setTimeout(function() {
            
            if (termCursor.parentNode) {
                terminalBody.removeChild(termCursor);
            }

            
            var line = document.createElement('div');
            line.className = 'terminal-line';
            line.style.animationDelay = '0s';
            line.innerHTML =
                '<span class="terminal-prompt">&gt;</span>' +
                '<span class="terminal-key">' + item.key + '</span>' +
                '<span class="terminal-colon">:&nbsp;</span>' +
                '<span class="terminal-value">' + item.value + '</span>';
            terminalBody.appendChild(line);

            
            terminalBody.appendChild(termCursor);

            
        }, 600 + index * 500);
    });
}



var logoEl = document.getElementById('navLogo');

if (logoEl) {
    var logoText = '< KSK />';
    var logoIndex = 0;


    var cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    logoEl.appendChild(cursor);

    function typeLogo() {
        if (logoIndex < logoText.length) {
            
            logoEl.insertBefore(
                document.createTextNode(logoText[logoIndex]),
                cursor
            );
            logoIndex++;
            setTimeout(typeLogo, 100);
        }
        
    }

    
    setTimeout(typeLogo, 500);
}


window.dispatchEvent(new Event('scroll'));