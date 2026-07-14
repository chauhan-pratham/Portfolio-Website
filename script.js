/**
 * Pratham Chauhan - Portfolio Website Script
 * Interactive features: Theme Manager, Typing Animation, Terminal Simulator, Scroll Observer
 */

document.addEventListener('DOMContentLoaded', () => {
    // =============================================
    //               THEME MANAGEMENT
    // =============================================
    const themeToggle = document.getElementById('theme-toggle-btn');
    const root = document.documentElement;
    const darkThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    const lightThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

    // Available themes: 'dark', 'light'
    let storedTheme = localStorage.getItem('theme');
    if (storedTheme !== 'dark' && storedTheme !== 'light') {
        storedTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    let currentTheme = storedTheme;

    function updateThemeToggle(theme) {
        if (!themeToggle) {
            return;
        }

        const labelMap = {
            light: 'Switch to dark theme',
            dark: 'Switch to light theme'
        };

        const iconMap = {
            light: lightThemeIcon,
            dark: darkThemeIcon
        };

        themeToggle.innerHTML = iconMap[theme];
        themeToggle.setAttribute('aria-label', labelMap[theme]);
        themeToggle.setAttribute('title', labelMap[theme]);
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
        } else {
            root.setAttribute('data-theme', 'light');
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }

        updateThemeToggle(theme);
        currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    // Toggle click sequence: dark <-> light
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (currentTheme === 'dark') {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        });
    }

    // Initial load
    applyTheme(currentTheme);

    // =============================================
    //               TYPING ANIMATION
    // =============================================
    const typeTarget = document.getElementById('typing-text');
    if (typeTarget) {
        const phrases = [
            "Founding Systems Engineer",
            "Cybersecurity Enthusiast",
            "Backend Developer",
            "Automation Architect"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Deleting is faster
            } else {
                typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Phrase complete, pause before deleting
                isDeleting = true;
                typingSpeed = 2000; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Small pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }
        
        // Start typing
        setTimeout(type, 1000);
    }

    // =============================================
    //             TERMINAL SIMULATOR
    // =============================================
    const terminalBody = document.getElementById('terminal-logs');
    if (terminalBody) {
        const logs = [
            { type: 'info', text: 'Initializing secure node connection...' },
            { type: 'ok', text: 'Solana Logging Node: CONNECTED' },
            { type: 'info', text: 'Spawning Webhook Ingestion API backend...' },
            { type: 'ok', text: 'FastAPI worker running on port 8000 (PID 4821)' },
            { type: 'info', text: 'Enforcing HMAC-SHA256 signature verification...' },
            { type: 'ok', text: 'Secure Webhook: HMAC verification PASSED' },
            { type: 'warn', text: 'Incoming request deduplication check initiated' },
            { type: 'ok', text: 'Idempotency validation: Unique key confirmed' },
            { type: 'info', text: 'UrbanLock DB synchronization: PENDING' },
            { type: 'ok', text: 'MERN Stack booking database sync: SUCCESS' },
            { type: 'info', text: 'Configuring Node-Cron scheduled background runners...' },
            { type: 'ok', text: 'Tasks initialized: Expiration monitor active' },
            { type: 'warn', text: 'Kiosk API traffic interception check: Bettercap active' },
            { type: 'ok', text: 'Transport-layer security scan: 0 vulnerabilities found' },
            { type: 'info', text: 'Parsing system event buffer via MacroDroid regex...' },
            { type: 'ok', text: 'Transaction event forwarded: Broadcasted successfully' }
        ];

        let logIndex = 0;
        let terminalTimerId = null;

        function addTerminalLog() {
            const log = logs[logIndex];
            const logLine = document.createElement('div');
            logLine.className = 'log-line';
            logLine.dataset.generated = 'true';
            
            const timestamp = new Date().toLocaleTimeString([], { hour12: false });

            const timeNode = document.createElement('span');
            timeNode.className = 'log-time';
            timeNode.textContent = timestamp;

            const statusNode = document.createElement('span');
            statusNode.className = log.type === 'ok'
                ? 'status-ok'
                : log.type === 'warn'
                    ? 'status-warn'
                    : 'status-info';
            statusNode.textContent = log.type === 'ok'
                ? '[SUCCESS]'
                : log.type === 'warn'
                    ? '[PENDING]'
                    : '[INFO]';

            const textNode = document.createElement('span');
            textNode.className = 'log-text';
            textNode.textContent = log.text;

            logLine.append(timeNode, document.createTextNode(' '), statusNode, document.createTextNode(' '), textNode);
            
            terminalBody.appendChild(logLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            const generatedLogs = terminalBody.querySelectorAll('[data-generated="true"]');
            if (generatedLogs.length > 9) {
                generatedLogs[0].remove();
            }

            logIndex = (logIndex + 1) % logs.length;
            
            // Random interval for more realistic logging
            const nextInterval = Math.floor(Math.random() * 2000) + 1500;
            terminalTimerId = window.setTimeout(addTerminalLog, nextInterval);
        }

        terminalTimerId = window.setTimeout(addTerminalLog, 500);

        window.addEventListener('beforeunload', () => {
            if (terminalTimerId !== null) {
                window.clearTimeout(terminalTimerId);
            }
        }, { once: true });
    }

    // =============================================
    //               SCROLL OBSERVER
    // =============================================
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    // Smooth scroll for in-page navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle logic
    const menuToggle = document.getElementById('menu-toggle-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        const openIcon = menuToggle.querySelector('.menu-icon-open');
        const closeIcon = menuToggle.querySelector('.menu-icon-close');
        
        function toggleMenu() {
            const isOpen = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isOpen);
            
            if (isOpen) {
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            } else {
                openIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            }
        }
        
        function closeMenu() {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            openIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
        
        menuToggle.addEventListener('click', toggleMenu);
        
        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        function syncBackToTopVisibility() {
            backToTop.classList.toggle('is-visible', window.scrollY > 500);
        }

        syncBackToTopVisibility();
        window.addEventListener('scroll', syncBackToTopVisibility, { passive: true });
    }
});
