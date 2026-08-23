document.addEventListener("DOMContentLoaded", () => {
    const rootHtml = document.documentElement;

    setTimeout(() => document.body.classList.add('transitions-enabled'), 100);

    const safeSetItem = (key, val) => { try { localStorage.setItem(key, val); } catch (e) { } };
    const safeGetItem = (key) => { try { return localStorage.getItem(key); } catch (e) { return null; } };

    // ZARZĄDZANIE TEMATEM (LIGHT / DARK)
    const themeToggleBtn = document.getElementById('themeToggle');
    let currentTheme = safeGetItem('theme') || 'dark';
    rootHtml.setAttribute('data-theme', currentTheme);

    const updateThemeToggleText = () => {
        const isDark = rootHtml.getAttribute('data-theme') === 'dark';
        if (currentLang === 'en') {
            themeToggleBtn.innerHTML = isDark ? '☀️ Light' : '🌙 Dark';
        } else {
            themeToggleBtn.innerHTML = isDark ? '☀️ Jasny' : '🌙 Ciemny';
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        const isDark = rootHtml.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        rootHtml.setAttribute('data-theme', newTheme);
        safeSetItem('theme', newTheme);
        updateThemeToggleText();
    });

    // ZARZĄDZANIE JĘZYKIEM / LANGUAGE SWITCHER
    const langToggleBtn = document.getElementById('langToggle');
    const translations = {
        'nav-about': 'About Me',
        'nav-portfolio': 'Portfolio',
        'nav-prints': 'Prints',
        'nav-contact': 'Contact',
        'style-text': 'Style',
        'style-drawing': '✏️ Drawing',
        'hero-subtitle': 'Welcome :) to my site',
        'about-title': 'About Me',
        'about-p1': "Hi! My name is Tymofii, and my design journey didn't start with big business plans, but with a simple need of the heart and... an empty closet.",
        'about-p2': "It all started in 2023. I was 15 at the time and simply wanted to wear cool, Christian t-shirts that I couldn't find anywhere – so I started making them myself.",
        'about-p3': "Today my mission is for you to be able to wear clothes that are well made, look good, and carry a real message. I believe the Gospel doesn't only need to be spoken – it can also be shown through what we wear.",
        'about-p4': 'To ensure the highest quality, I buy proven brands such as <strong>Outhorn</strong> and <strong>4F</strong>, but I\'m not limited to them. I don\'t do the printing myself – the prints are made by specialists at a local print shop in <strong>Zielona Góra</strong>, who use modern, extremely durable <strong>DTF</strong> technology.',
        'about-disclaimer': 'Important information: My designs are an independent creative initiative. I use the clothing of the above brands as a base for my own modifications. This website and the products offered are not affiliated with, endorsed by, or an official collaboration with Outhorn or 4F.',
        'portfolio-title': 'Portfolio',
        'portfolio-desc': 'The graphics and designs below are not for sale. They were made for personal use and serve only as a showcase of my skills.',
        'alt-green-1': 'Green collection 1',
        'alt-green-2': 'Green collection 2',
        'alt-green-3': 'Green collection 3',
        'alt-purple-1': 'Purple collection 1',
        'alt-purple-2': 'Purple collection 2',
        'alt-purple-3': 'Purple collection 3',
        'alt-blue-1': 'Blue collection 1',
        'alt-blue-2': 'Blue collection 2',
        'alt-blue-3': 'Blue collection 3',
        'attr-sun': 'Sun: Magnific',
        'prints-title': 'Available Prints',
        'prints-desc': 'Below are the available prints that can be ordered on a t-shirt or hoodie.<br> I also create custom designs on request.<br><br><strong>My collection of designs keeps growing, and new designs will appear here over time – be sure to check back regularly!</strong>',
        'prints-graffiti-title': 'Graffiti Collection',
        'prints-beach-title': 'Beach Collection',
        'alt-graffiti-1': 'Graffiti print 1',
        'alt-graffiti-2': 'Graffiti print 2',
        'alt-graffiti-3': 'Graffiti print 3',
        'alt-beach-1': 'Beach collection print 1',
        'alt-beach-2': 'Beach collection print 2',
        'alt-beach-3': 'Beach collection print 3',
        'contact-title': 'Contact',
        'contact-intro': "Like my designs? Want to order something similar for yourself, or just have a question for me? I'd be happy to talk with you.",
        'contact-order-heading': 'To start an order, please include in your message:',
        'contact-li1': '<strong>Quantity, size, and color</strong> of the garment (hoodie or t-shirt).',
        'contact-li2': "<strong>Link to the chosen garment</strong> (any brand works, but I'd prefer the material to contain as much cotton as possible).",
        'contact-li3': '<strong>Verse and design idea</strong> – describe exactly what should be on the graphic and in what style it should be made.',
        'contact-shipping-heading': 'Shipping',
        'contact-shipping-text': "All orders are shipped via <strong>InPost Parcel Lockers</strong>. Delivery details (choice of locker and contact info) will be arranged while processing your order, so you don't need to include them in your first message.",
        'cta-contact': 'Write to me!',
        'footer-email-label': 'Email:',
        'footer-phone-label': 'Phone:',
        'footer-privacy': 'Privacy and Returns Policy',
        'mail-title': 'Choose your email',
        'mail-android': 'Mail App',
        'mail-cancel': 'Cancel',
        'href-privacy': 'https://docs.google.com/document/d/e/2PACX-1vQUFHwPECwGUn5DRrVb6zGImlGCb1BEyJf8QDl-GDHms55NytOBdwRn5LBKRDEX5CFjAVNxjKmqEfRg/pub',
        'cookie-title': 'Cookies & Analytics',
        'cookie-text': 'This website uses cookies to analyze traffic and optimize user experience via Google Analytics. By using this website, you agree to their use.',
        'cookie-accept': 'Got it',
        'cookie-policy-link': 'Privacy Policy'
    };
    const ariaTranslations = {
        'aria-changestyle': 'Change style',
        'cookie-btn-aria': 'Cookie information'
    };
    const pageMeta = {
        title: { pl: document.title, en: 'Tymofii Pryimak - Christian Clothing with a Message' },
        description: {
            pl: document.querySelector('meta[name="description"]')?.getAttribute('content') || "Poznaj projekty Tymofii Pryimaka. Unikalne, chrześcijańskie ubrania tworzone z pasją.",
            en: "Discover Tymofii Pryimak's designs. Unique, Christian clothing made with passion. See a portfolio of hoodies with gospel messages and DTF prints."
        }
    };

    // Zapisz oryginalne (polskie) wartości
    const i18nEls = document.querySelectorAll('[data-i18n]');
    const i18nOriginal = new Map();
    i18nEls.forEach(el => i18nOriginal.set(el, el.innerHTML));

    const i18nAltEls = document.querySelectorAll('[data-i18n-alt]');
    const i18nAltOriginal = new Map();
    i18nAltEls.forEach(el => i18nAltOriginal.set(el, el.getAttribute('alt')));

    const i18nAriaEls = document.querySelectorAll('[data-i18n-aria]');
    const i18nAriaOriginal = new Map();
    i18nAriaEls.forEach(el => i18nAriaOriginal.set(el, el.getAttribute('aria-label')));

    const i18nHrefEls = document.querySelectorAll('[data-i18n-href]');
    const i18nHrefOriginal = new Map();
    i18nHrefEls.forEach(el => i18nHrefOriginal.set(el, el.getAttribute('href')));

    let currentLang = safeGetItem('lang') || 'pl';

    const applyLanguage = (lang) => {
        currentLang = lang;
        rootHtml.setAttribute('lang', lang);

        i18nEls.forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = (lang === 'en' && translations[key]) ? translations[key] : i18nOriginal.get(el);
        });
        i18nAltEls.forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            el.setAttribute('alt', (lang === 'en' && translations[key]) ? translations[key] : i18nAltOriginal.get(el));
        });
        i18nAriaEls.forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            el.setAttribute('aria-label', (lang === 'en' && ariaTranslations[key]) ? ariaTranslations[key] : i18nAriaOriginal.get(el));
        });
        i18nHrefEls.forEach(el => {
            const key = el.getAttribute('data-i18n-href');
            el.setAttribute('href', (lang === 'en' && translations[key]) ? translations[key] : i18nHrefOriginal.get(el));
        });

        document.title = pageMeta.title[lang] || pageMeta.title.pl;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', pageMeta.description[lang] || pageMeta.description.pl);

        langToggleBtn.innerHTML = lang === 'en' ? '🇬🇧 EN' : '🇵🇱 PL';
        langToggleBtn.setAttribute('aria-label', lang === 'en' ? 'Zmień język na polski' : 'Change language to English');

        updateThemeToggleText();
    };

    applyLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'pl' : 'en';
        safeSetItem('lang', newLang);
        applyLanguage(newLang);
    });

    // ZARZĄDZANIE STYLEM
    const styleSwitcherToggle = document.getElementById('styleSwitcherToggle');
    const styleSwitcherMenu = document.getElementById('styleSwitcherMenu');
    const styleBtns = document.querySelectorAll('.style-btn');

    const currentStyle = safeGetItem('site-style') || 'minimalist';
    rootHtml.setAttribute('data-style', currentStyle);

    styleSwitcherToggle.addEventListener('click', () => {
        styleSwitcherMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.style-switcher')) {
            styleSwitcherMenu.classList.remove('active');
        }
    });

    styleBtns.forEach(btn => {
        if (btn.dataset.setStyle === currentStyle) btn.classList.add('active');
        btn.addEventListener('click', () => {
            const newStyle = btn.dataset.setStyle;
            rootHtml.setAttribute('data-style', newStyle);
            safeSetItem('site-style', newStyle);
            styleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            styleSwitcherMenu.classList.remove('active');
        });
    });

    // LINKI EMAIL
    const email = "tymofii.pryimak@gmail.com";
    const subject = "Zamówienie";
    const mailUrls = {
        gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`,
        outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodeURIComponent(subject)}`,
        yahoo: `https://compose.mail.yahoo.com/?to=${email}&subject=${encodeURIComponent(subject)}`,
        apple: `mailto:${email}?subject=${encodeURIComponent(subject)}`,
        android: `mailto:${email}?subject=${encodeURIComponent(subject)}`
    };

    const mailModal = document.getElementById('mailModal');
    document.getElementById('btn-gmail').href = mailUrls.gmail;
    document.getElementById('btn-outlook').href = mailUrls.outlook;
    document.getElementById('btn-yahoo').href = mailUrls.yahoo;
    document.getElementById('btn-apple').href = mailUrls.apple;
    document.getElementById('btn-android').href = mailUrls.android;

    document.querySelectorAll('.js-email-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mailModal.classList.add('active');
        });
    });

    document.getElementById('mailClose').addEventListener('click', () => mailModal.classList.remove('active'));
    mailModal.addEventListener('click', (e) => { if (e.target === mailModal) mailModal.classList.remove('active'); });
    document.querySelectorAll('.mail-btn').forEach(btn => btn.addEventListener('click', () => mailModal.classList.remove('active')));

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const targetRect = target.getBoundingClientRect();
                    const nav = document.querySelector('.top-nav');
                    const navHeight = nav ? nav.offsetHeight : 0;
                    const offset = navHeight + 20;
                    const targetPosition = targetRect.top + window.scrollY - offset;
                    window.scrollTo({ top: targetPosition, behavior: "smooth" });
                }
            }
        });
    });

    // ANIMACJE SCROLLA I PARALAKSA MYSZKI
    const headerContent = document.querySelector('.header-content');
    const topBtn = document.getElementById('scrollTopBtn');
    let scrollTicking = false;

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 992) {
            const mx = (e.clientX / window.innerWidth - 0.5) * 30;
            const my = (e.clientY / window.innerHeight - 0.5) * 30;
            rootHtml.style.setProperty('--mx', `${mx}px`);
            rootHtml.style.setProperty('--my', `${my}px`);
        }
    });

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                const scroll = window.scrollY;
                if (headerContent && window.innerWidth > 992) {
                    const isDrawing = rootHtml.getAttribute('data-style') === 'drawing';
                    if (isDrawing) {
                        headerContent.style.transform = `translateY(${scroll * 0.4}px) rotate(${-2 + scroll * 0.01}deg)`;
                    } else {
                        headerContent.style.transform = `translateY(${scroll * 0.4}px)`;
                    }
                }
                if (scroll > 300) {
                    if (!topBtn.classList.contains('visible')) topBtn.classList.add('visible');
                } else {
                    if (topBtn.classList.contains('visible')) topBtn.classList.remove('visible');
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // INTERSECTION OBSERVER
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('visible'); }, index * 50);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));

    // LIGHTBOX
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.portfolio-card img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ZARZĄDZANIE WIDŻETEM COOKIES (RODO / ANALYTICS)
    const cookieModal = document.getElementById('cookieModal');
    const cookieWidgetBtn = document.getElementById('cookieWidgetBtn');
    const cookieCloseBtn = document.getElementById('cookieCloseBtn');
    const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');

    const cookieConsent = safeGetItem('cookie_consent');
    if (!cookieConsent && cookieModal) {
        setTimeout(() => {
            cookieModal.classList.add('active');
        }, 800);
    }

    const closeCookieModal = () => {
        if (cookieModal) cookieModal.classList.remove('active');
    };

    if (cookieWidgetBtn) {
        cookieWidgetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (cookieModal) cookieModal.classList.toggle('active');
        });
    }

    if (cookieCloseBtn) {
        cookieCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCookieModal();
        });
    }

    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            safeSetItem('cookie_consent', 'accepted');
            closeCookieModal();
        });
    }

    document.addEventListener('click', (e) => {
        if (cookieModal && cookieModal.classList.contains('active')) {
            if (!cookieModal.contains(e.target) && !cookieWidgetBtn.contains(e.target)) {
                closeCookieModal();
            }
        }
    });
});
