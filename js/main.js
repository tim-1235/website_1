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
        'nav-prints': 'Prints',
        'nav-portfolio': 'Past Work',
        'nav-contact': 'Contact',
        'style-text': 'Style',
        'style-drawing': '✏️ Drawing',
        'hero-subtitle': 'Christian graphic designer – I design the print, you choose the garment',
        'hero-cta': 'Order a print →',
        'trust-design': 'Graphics designed by me',
        'trust-garment': 'Garment chosen by you',
        'trust-dtf': 'DTF print via independent print shop',
        'trust-shipping': 'InPost shipping',
        'about-title': 'About Me',
        'about-p1': "Hi! I'm Tymofii. My design journey didn't start with big business plans, but with a simple need of the heart and… an empty wardrobe.",
        'about-p2': "It all started in 2023. I was 15 and couldn't find Christian t-shirts I actually wanted to wear – so I started designing and printing them myself.",
        'about-p3': "Today I design Christian graphics on commission – every print is my own work, from sketch to final file. I believe the Gospel doesn't only need to be spoken – it can also be shown through what we wear.",
        'about-p4': 'I offer graphic design and DTF print ordering on a t-shirt or hoodie that <strong>you choose</strong> (any brand). I don\'t manufacture clothing or run a brand store – printing is handled by an independent local print shop in <strong>Zielona Góra</strong>. Brands visible in my portfolio photos are shown only as examples of the garment base; I am not affiliated with them.',
        'about-disclaimer': 'Legal notice: I am an independent graphic designer. All print designs are my original work. I do not officially collaborate with any clothing brand (including but not limited to Outhorn, 4F, or others). Brand names, logos, and products visible in photos belong to their owners and are used for informational purposes only to show an example of a print on customer-chosen garments.',
        'portfolio-title': 'Past Work',
        'portfolio-desc': 'Photos of my designs on finished garments – click to enlarge.',
        'portfolio-disclaimer': 'Photos show my original print designs on customer-chosen garments. Brands visible on clothing are not partners or sponsors of this website.',
        'portfolio-attribution': 'Sun element in selected designs: <a href="https://www.magnific.com" target="_blank" rel="noopener noreferrer">Magnific</a>',
        'alt-realizacja-1': 'Past work – green hoodie with print',
        'alt-realizacja-2': 'Past work – green t-shirt with print',
        'alt-realizacja-3': 'Past work – green t-shirt with print',
        'alt-realizacja-4': 'Past work – purple hoodie with print',
        'alt-realizacja-5': 'Past work – purple hoodie with print',
        'alt-realizacja-6': 'Past work – purple hoodie with print',
        'alt-realizacja-7': 'Past work – blue hoodie with print',
        'alt-realizacja-8': 'Past work – blue t-shirt with print',
        'alt-realizacja-9': 'Past work – t-shirt with sun print',
        'prints-title': 'Available Prints',
        'prints-desc': 'Below are my original print designs that you can order on a t-shirt or hoodie of your choice.<br> I also create fully custom graphics on request.<br><br><strong>My collection keeps growing – check back regularly for new designs!</strong>',
        'prints-graffiti-title': 'Graffiti Collection',
        'prints-beach-title': 'Beach Collection',
        'alt-graffiti-1': 'Graffiti print design 1',
        'alt-graffiti-2': 'Graffiti print design 2',
        'alt-graffiti-3': 'Graffiti print design 3',
        'alt-beach-1': 'Beach collection print design 1',
        'alt-beach-2': 'Beach collection print design 2',
        'alt-beach-3': 'Beach collection print design 3',
        'prints-cta-text': 'Don\'t see a design you like? I\'ll create a custom graphic for you.',
        'prints-cta-btn': 'Order a custom design →',
        'contact-title': 'Contact',
        'contact-intro': 'Like my graphics? Want to order a custom print on a garment of your choice, or have a question? Drop me a message – happy to chat.',
        'contact-order-heading': 'To start an order, please include in your message:',
        'contact-li1': '<strong>Quantity, size, and color</strong> of the garment (hoodie or t-shirt).',
        'contact-li2': "<strong>Link to the chosen garment</strong> (any brand – you decide what the print goes on; I prefer cotton in the fabric blend).",
        'contact-li3': '<strong>Theme and Bible verse</strong> – describe the message the graphic should carry and the style you want. I create the design – you provide the idea, not a finished file.',
        'contact-shipping-heading': 'Shipping',
        'contact-shipping-text': "All orders are shipped via <strong>InPost Parcel Lockers</strong>. Delivery details (choice of locker and contact info) will be arranged while processing your order, so you don't need to include them in your first message.",
        'cta-contact': 'Write to me!',
        'footer-email-label': 'Email:',
        'footer-phone-label': 'Phone:',
        'footer-privacy': 'Privacy and Returns Policy',
        'footer-disclaimer': 'Tymofii Pryimak – independent graphic designer. I offer graphic design and DTF print ordering on customer-chosen garments. I am not affiliated with, sponsored by, or authorized by any clothing brand. All trademarks belong to their respective owners.',
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
        title: { pl: document.title, en: 'Tymofii Pryimak – Christian Graphic Designer | Custom Prints for Apparel' },
        description: {
            pl: document.querySelector('meta[name="description"]')?.getAttribute('content') || 'Chrześcijański grafik projektujący własne nadruki na zamówienie.',
            en: 'Christian graphic designer creating custom print designs. DTF printing on customer-chosen garments via an independent print shop. Not affiliated with any clothing brands. Contact: tymofii.pryimak@gmail.com'
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
