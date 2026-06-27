(function() {
    var dot  = document.createElement('div');
    var ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function(e) {
        mx = e.clientX; my = e.clientY;
        dot.style.left  = mx + 'px';
        dot.style.top   = my + 'px';
    });
    function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener('mouseleave', function() {
        dot.style.opacity  = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function() {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
    });
})();
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}
var navbar = document.getElementById('navbar');
var sections = document.querySelectorAll('section[id]');
var navLinksAll = document.querySelectorAll('.nav-links a');
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
    navLinksAll.forEach(function(link) {
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
    var ring = document.getElementById('scrollRing');
    if (ring) {
        var circumference = 263.89;
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        var dashOffset = circumference - (scrollPercent / 100) * circumference;
        ring.style.strokeDashoffset = dashOffset;
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
var contactForm  = document.getElementById('contactForm');
var formFeedback = document.getElementById('formFeedback');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        var name    = document.getElementById('name').value.trim();
        var email   = document.getElementById('email').value.trim();
        var msg     = document.getElementById('msg').value.trim();
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !email || !msg) {
            e.preventDefault();
            formFeedback.textContent = '❌ Please fill in all fields.';
            formFeedback.style.color = '#dc2626';
            return;
        }
        if (!emailOk) {
            e.preventDefault();
            formFeedback.textContent = '❌ Please enter a valid email address.';
            formFeedback.style.color = '#dc2626';
            return;
        }
        formFeedback.textContent = '✅ Message sent! I will reply within 48 hours.';
        formFeedback.style.color = '#166534';
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
var symbolsContainer = document.getElementById('floatingSymbols');
if (symbolsContainer) {
    var symbols = ['{ }', '< >', ';', '( )', '=>', '#', '&&', '++', '//', '', '/* */'];
    var totalSymbols = 14;
    for (var i = 0; i < totalSymbols; i++) {
        var span = document.createElement('span');
        span.className = 'floating-symbol';
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = Math.random() * 100 + '%';
        var size = 14 + Math.random() * 18;
        span.style.fontSize = size + 'px';
        var duration = 12 + Math.random() * 10;
        var delay = Math.random() * 10;
        span.style.animationDuration = duration + 's';
        span.style.animationDelay = delay + 's';
        symbolsContainer.appendChild(span);
    }
}
var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-section').forEach(function(section) {
    observer.observe(section);
});
var staggerObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.project.stagger').forEach(function(card) {
    staggerObserver.observe(card);
});
var statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.edu-stat-num[data-target]').forEach(function(el) {
                var target = parseInt(el.getAttribute('data-target'), 10);
                var start  = 0;
                var duration = 1000;
                var step = target / (duration / 16);
                var current = start;
                var timer = setInterval(function() {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current);
                }, 16);
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

var eduCard = document.querySelector('.edu-card');
if (eduCard) statObserver.observe(eduCard);

window.dispatchEvent(new Event('scroll'));