document.addEventListener("DOMContentLoaded", () => {
    const rootHtml = document.documentElement;

    setTimeout(() => document.body.classList.add('transitions-enabled'), 100);

    const safeSetItem = (key, val) => { try { localStorage.setItem(key, val); } catch (e) { } };
    const safeGetItem = (key) => { try { return localStorage.getItem(key); } catch (e) { return null; } };

    // ZARZĄDZANIE TEMATEM (LIGHT / DARK)
    // Light mode temporarily disabled — site is hard-locked to dark mode for now.
    const themeToggleBtn = document.getElementById('themeToggle');
    const mobileThemeToggleBtn = document.getElementById('mobileThemeToggle');
    let currentTheme = 'dark';
    rootHtml.setAttribute('data-theme', currentTheme);

    const updateThemeToggleText = () => {
        const isDark = rootHtml.getAttribute('data-theme') === 'dark';
        const desktopText = currentLang === 'en'
            ? (isDark ? '☀️ Light' : '🌙 Dark')
            : (isDark ? '☀️ Jasny' : '🌙 Ciemny');
        const mobileText = currentLang === 'en'
            ? (isDark ? '☀️ Light mode' : '🌙 Dark mode')
            : (isDark ? '☀️ Jasny tryb' : '🌙 Ciemny tryb');

        if (themeToggleBtn) themeToggleBtn.innerHTML = desktopText;
        if (mobileThemeToggleBtn) {
            const icon = mobileThemeToggleBtn.querySelector('.mobile-theme-icon');
            const text = mobileThemeToggleBtn.querySelector('.mobile-theme-text');
            if (icon) icon.textContent = isDark ? '☀️' : '🌙';
            if (text) text.textContent = mobileText;
        }
    };

    const toggleTheme = () => {
        // Disabled for now — remove this early return to restore light/dark switching.
        return;
    };

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);


    // ZARZĄDZANIE JĘZYKIEM / LANGUAGE SWITCHER
    const langToggleBtn = document.getElementById('langToggle');
    const translations = {
        'nav-about': 'About Me',
        'nav-prints': 'Prints',
        'nav-portfolio': 'Past Work',
        'nav-contact': 'Contact',
        'style-text': 'Theme',
        'style-label': 'Theme:',
        'style-drawing': '✏️ Drawing',
        'appearance-label': 'Appearance:',
        'theme-light-label': '☀️ Light mode',
        'hero-subtitle': 'Christian graphic designer – I design the print, you choose the garment',
        'hero-cta': 'Order Now →',
        'trust-design': 'Graphics designed by me',
        'trust-garment': 'Garment chosen by you',
        'trust-dtf': 'DTF print via independent print shop',
        'trust-shipping': 'InPost shipping',
        'about-title': 'About Me',
        'about-p1': "Hi! I'm Tymofii. My design journey didn't start with big business plans, but with a simple need of the heart and… an empty wardrobe.",
        'about-p2': "It all started in 2023. I was 15 and couldn't find Christian t-shirts I actually wanted to wear – so I started designing and printing them myself.",
        'about-p3': "Today I design Christian graphics on commission – I put together every print myself, from idea to final file. I believe the Gospel doesn't only need to be spoken – it can also be shown through what we wear.",
        'about-p4': 'I offer graphic design and DTF print ordering on a t-shirt or hoodie that <strong>you choose</strong> (any brand). I don\'t manufacture clothing or run a brand store – printing is handled by an independent local print shop in <strong>Zielona Góra</strong>. Brands visible in my portfolio photos are shown only as examples of the garment base; I am not affiliated with them.',
        'about-disclaimer': "Legal notice: I am an independent graphic designer. I handle the design and composition of the prints – I'm not always the creator of every graphic element I use. I do not officially collaborate with any clothing brand (including but not limited to Outhorn, 4F, or others). Brand names, logos, and products visible in photos belong to their owners and are used for informational purposes only to show an example of a print on customer-chosen garments.",
        'alt-about-img': 'Tymofii Pryimak – Christian graphic designer at work with graphics tablet',
        'portfolio-title': 'Past Work',
        'portfolio-desc': 'Photos of my designs on finished garments – click to enlarge.',
        'portfolio-personal-notice': "Note: at the moment, all past works shown here were made for my own personal use – these aren't customer order photos yet.",
        'portfolio-disclaimer': 'Photos show print designs I have designed, on customer-chosen garments. Brands visible on clothing are not partners or sponsors of this website.',
        'portfolio-attribution': 'Sun element in selected designs: <a href="https://www.magnific.com" target="_blank" rel="noopener noreferrer">Magnific</a>',
        'alt-realizacja-1': 'Beige hoodie with I Put My Faith In Jesus rose print – project by Tymofii Pryimak',
        'alt-realizacja-2': 'Purple hoodie with Glory Of God dove print – project by Tymofii Pryimak',
        'alt-realizacja-3': 'Blue hoodie with Living For Jesus Mt 6:33 print – project by Tymofii Pryimak',
        'prints-title': 'Available Prints',
        'prints-desc': 'Below are print designs I have designed, which you can order on a t-shirt or hoodie of your choice.<br> I also create fully custom graphics on request.<br><br><strong>My collection keeps growing – check back regularly for new designs!</strong>',
        'prints-polish-title': 'Polish Designs',
        'prints-english-title': 'English Designs',
        'alt-print-pl-1': 'Christian print design Jesus Is My Lord – graphic design for apparel',
        'alt-print-pl-2': 'Christian print design Jesus Master of Masters – garment graphic design',
        'alt-print-pl-3': 'Christian print design Jesus Is My Salvation – graphic design for t-shirts and hoodies',
        'alt-print-en-1': 'Christian print design Jesus Is King – custom graphic for hoodies and shirts',
        'alt-print-en-2': 'Christian print design Jesus Saves – apparel graphic design',
        'alt-print-en-3': 'Christian print design Jesus Won – graphic design for Christian apparel',
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
        'mail-title': 'Write to me',
        'mail-subtitle': 'Copy the email address or open your favorite mail app:',
        'mail-copy': 'Copy email',
        'mail-copied': 'Copied!',
        'mail-or': 'or choose an app:',
        'mail-android': 'Mail App',
        'mail-cancel': 'Close',
        'href-privacy': 'https://docs.google.com/document/d/e/2PACX-1vQUFHwPECwGUn5DRrVb6zGImlGCb1BEyJf8QDl-GDHms55NytOBdwRn5LBKRDEX5CFjAVNxjKmqEfRg/pub',
        'cookie-title': 'Cookies & Analytics',
        'cookie-text': 'This website uses cookies to analyze traffic and optimize user experience via Google Analytics. By using this website, you agree to their use.',
        'cookie-accept': 'Got it',
        'cookie-policy-link': 'Privacy Policy',
        'alt-lightbox': 'Enlarged photo',
        'filter-all': 'All',
        'filter-polish': 'Polish',
        'filter-english': 'English',
        'sort-label': 'Sort:',
        'sort-newest': 'Newest',
        'sort-oldest': 'Oldest',
        'lightbox-order': 'Order this print →',
        'lightbox-title-fallback': 'Print'
    };
    const ariaTranslations = {
        'aria-changestyle': 'Change style',
        'aria-theme': 'Toggle light/dark mode',
        'aria-menu-open': 'Open menu',
        'aria-menu-close': 'Close menu',
        'aria-lightbox-close': 'Close enlarged photo',
        'aria-lightbox-prev': 'Previous photo',
        'aria-lightbox-next': 'Next photo',
        'aria-scroll-top': 'Scroll to top',
        'aria-cookie-aside': 'Cookie consent management',
        'aria-cookie-close': 'Close notification',
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

    const buildFlagSvg = (lang) => {
        const flagSvg = {
            pl: `
                <svg class="lang-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 12" aria-hidden="true">
                    <rect width="20" height="6" fill="#fff"/>
                    <rect y="6" width="20" height="6" fill="#DC143C"/>
                </svg>
            `,
            en: `
                <svg class="lang-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" aria-hidden="true">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0 0L60 30M60 0L0 30" stroke="#fff" stroke-width="6"/>
                    <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" stroke-width="3"/>
                    <path d="M0 15H60M30 0V30" stroke="#fff" stroke-width="10"/>
                    <path d="M0 15H60M30 0V30" stroke="#C8102E" stroke-width="6"/>
                </svg>
            `
        };

        return flagSvg[lang] || flagSvg.pl;
    };

    const renderLanguageToggle = (lang) => {
        const label = lang === 'en' ? 'EN' : 'PL';
        langToggleBtn.innerHTML = `${buildFlagSvg(lang)}<span class="lang-toggle-label">${label}</span>`;
        langToggleBtn.setAttribute('aria-label', lang === 'en' ? 'Zmień język na polski' : 'Change language to English');
    };

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

        // Dynamicznie wyrenderowane elementy (z atrybutami data-alt-en / data-alt-pl)
        document.querySelectorAll('.portfolio-card img[data-alt-en]').forEach(img => {
            const alt = lang === 'en' ? img.getAttribute('data-alt-en') : img.getAttribute('data-alt-pl');
            const title = lang === 'en' ? img.getAttribute('data-title-en') : img.getAttribute('data-title-pl');
            if (alt) img.setAttribute('alt', alt);
            if (title) img.setAttribute('title', title);
        });

        document.querySelectorAll('.portfolio-card').forEach(card => {
            const name = card.querySelector('.portfolio-card-name');
            const tag = card.querySelector('.portfolio-card-tag');
            const title = lang === 'en' ? card.getAttribute('data-title-en') : card.getAttribute('data-title-pl');
            if (name && title) name.textContent = title;
            if (tag) {
                const category = card.dataset.category;
                tag.textContent = category === 'english'
                    ? (lang === 'en' ? 'English' : 'Angielski')
                    : category === 'polish'
                        ? (lang === 'en' ? 'Polish' : 'Polski')
                        : (lang === 'en' ? 'Work' : 'Realizacja');
            }
        });

        document.title = pageMeta.title[lang] || pageMeta.title.pl;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', pageMeta.description[lang] || pageMeta.description.pl);

        renderLanguageToggle(lang);
        updateThemeToggleText();
        if (typeof updateMailLinks === 'function') updateMailLinks(pendingMailSubject || getDefaultSubject());
        if (typeof updateLightboxCaption === 'function') updateLightboxCaption();
    };

    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'pl' : 'en';
        safeSetItem('lang', newLang);
        applyLanguage(newLang);
    });

    // ZARZĄDZANIE STYLEM
    const styleSwitcherToggle = document.getElementById('styleSwitcherToggle');
    const styleSwitcherMenu = document.getElementById('styleSwitcherMenu');
    const styleBtns = document.querySelectorAll('[data-set-style]');

    const currentStyle = safeGetItem('site-style') || 'minimalist';
    rootHtml.setAttribute('data-style', currentStyle);

    const updateStyleButtons = (style) => {
        styleBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.setStyle === style));
    };

    const setSiteStyle = (style) => {
        rootHtml.setAttribute('data-style', style);
        safeSetItem('site-style', style);
        updateStyleButtons(style);
        if (styleSwitcherMenu) styleSwitcherMenu.classList.remove('active');
    };

    if (styleSwitcherToggle && styleSwitcherMenu) {
        styleSwitcherToggle.addEventListener('click', () => {
            styleSwitcherMenu.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (styleSwitcherMenu && !e.target.closest('.style-switcher')) {
            styleSwitcherMenu.classList.remove('active');
        }
    });

    styleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setSiteStyle(btn.dataset.setStyle);
        });
    });
    updateStyleButtons(currentStyle);

    // MOBILNE MENU
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    const setMobileMenuOpen = (isOpen) => {
        if (!mobileMenuToggle || !mobileNavDrawer || !mobileNavOverlay) return;
        mobileMenuToggle.classList.toggle('active', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileNavDrawer.classList.toggle('active', isOpen);
        mobileNavDrawer.setAttribute('aria-hidden', String(!isOpen));
        mobileNavOverlay.classList.toggle('active', isOpen);
        mobileNavOverlay.setAttribute('aria-hidden', String(!isOpen));
        document.body.classList.toggle('mobile-menu-open', isOpen);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else if (!document.querySelector('.mail-modal.active') && !document.querySelector('.lightbox.active')) {
            document.body.style.overflow = '';
        }
    };

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', () => setMobileMenuOpen(true));
    if (mobileNavClose) mobileNavClose.addEventListener('click', () => setMobileMenuOpen(false));
    if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', () => setMobileMenuOpen(false));
    document.querySelectorAll('.mobile-nav-link, .mobile-order-btn').forEach(link => {
        link.addEventListener('click', () => setMobileMenuOpen(false));
    });

    // LINKI EMAIL
    const email = "tymofii.pryimak@gmail.com";
    const mailModal = document.getElementById('mailModal');
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyEmailText = copyEmailBtn?.querySelector('.copy-btn-text');
    let pendingMailSubject = '';

    const getDefaultSubject = () => currentLang === 'en' ? 'Order' : 'Zamówienie';
    const getPrintSubject = (title) => currentLang === 'en'
        ? `Order: ${title}`
        : `Zamówienie: ${title}`;

    const updateMailLinks = (subject = getDefaultSubject()) => {
        const encodedSubject = encodeURIComponent(subject);
        const urls = {
            gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}`,
            outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodedSubject}`,
            yahoo: `https://compose.mail.yahoo.com/?to=${email}&subject=${encodedSubject}`,
            apple: `mailto:${email}?subject=${encodedSubject}`,
            android: `mailto:${email}?subject=${encodedSubject}`
        };

        const setHref = (id, href) => {
            const el = document.getElementById(id);
            if (el) el.href = href;
        };

        setHref('btn-gmail', urls.gmail);
        setHref('btn-outlook', urls.outlook);
        setHref('btn-yahoo', urls.yahoo);
        setHref('btn-apple', urls.apple);
        setHref('btn-android', urls.android);
    };

    const openMailModal = (subject = getDefaultSubject()) => {
        pendingMailSubject = subject;
        updateMailLinks(subject);
        if (mailModal) {
            mailModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeMailModal = () => {
        if (mailModal) mailModal.classList.remove('active');
        pendingMailSubject = '';
        if (!document.querySelector('.lightbox.active') && !document.querySelector('.mobile-nav-drawer.active')) {
            document.body.style.overflow = '';
        }
    };

    updateMailLinks();

    document.querySelectorAll('.js-email-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openMailModal();
        });
    });

    document.getElementById('mailClose')?.addEventListener('click', closeMailModal);
    if (mailModal) {
        mailModal.addEventListener('click', (e) => {
            if (e.target === mailModal) closeMailModal();
        });
    }
    document.querySelectorAll('.mail-btn').forEach(btn => btn.addEventListener('click', closeMailModal));

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const originalText = currentLang === 'en' ? translations['mail-copy'] : 'Kopiuj e-mail';
            const copiedText = currentLang === 'en' ? translations['mail-copied'] : 'Skopiowano!';
            try {
                await navigator.clipboard.writeText(email);
            } catch (e) {
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                tempInput.remove();
            }
            if (copyEmailText) {
                copyEmailText.textContent = copiedText;
                copyEmailBtn.classList.add('copied');
                window.setTimeout(() => {
                    copyEmailText.textContent = originalText;
                    copyEmailBtn.classList.remove('copied');
                }, 1800);
            }
        });
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            if (targetId === '#top') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            if (targetId.startsWith('#') && targetId.length > 1) {
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

    // AKTYWNA SEKCJA W NAWIGACJI
    const navSectionIds = ['o-mnie', 'dostepne-nadruki', 'portfolio', 'kontakt'];
    const navSectionEls = navSectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);
    const topNavEl = document.querySelector('.top-nav');
    let navLinksEls = null;
    let currentActiveId = '';
    let cachedSectionTops = [];

    const updateSectionTops = () => {
        const navOffset = (topNavEl?.offsetHeight || 0) + 90;
        cachedSectionTops = navSectionEls.map(section => {
            let top = 0;
            let el = section;
            while (el) {
                top += el.offsetTop;
                el = el.offsetParent;
            }
            return {
                id: section.id,
                top: top - navOffset
            };
        });
    };

    window.addEventListener('resize', updateSectionTops, { passive: true });
    window.addEventListener('orientationchange', updateSectionTops, { passive: true });
    updateSectionTops();

    const updateActiveNavigation = () => {
        const scrollPosition = window.scrollY;
        let activeId = cachedSectionTops[0]?.id || '';

        for (let i = 0; i < cachedSectionTops.length; i++) {
            if (scrollPosition >= cachedSectionTops[i].top) {
                activeId = cachedSectionTops[i].id;
            }
        }

        if (activeId !== currentActiveId) {
            currentActiveId = activeId;
            if (!navLinksEls) {
                navLinksEls = document.querySelectorAll('.nav-links a, .mobile-nav-link');
            }
            navLinksEls.forEach(link => {
                const href = link.getAttribute('href') || '';
                link.classList.toggle('active', href === `#${activeId}`);
            });
        }
    };

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
                updateActiveNavigation();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
    updateActiveNavigation();

    // INTERSECTION OBSERVER
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('visible'); }, index * 30);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));

    // LIGHTBOX
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxOrderBtn = document.getElementById('lightboxOrderBtn');
    let lightboxItems = [];
    let currentLightboxIndex = -1;
    let touchStartX = 0;
    let touchStartY = 0;

    const refreshLightboxItems = (scope = document) => {
        lightboxItems = Array.from(scope.querySelectorAll('.portfolio-card img'));
    };

    const getImageTitle = (img) => {
        if (!img) return currentLang === 'en' ? 'Print' : 'Wzór';
        return (currentLang === 'en'
            ? img.getAttribute('data-title-en')
            : img.getAttribute('data-title-pl')) || img.getAttribute('title') || (currentLang === 'en' ? 'Print' : 'Wzór');
    };

    function updateLightboxCaption() {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        const activeImg = lightboxItems[currentLightboxIndex];
        const title = getImageTitle(activeImg);
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCounter) lightboxCounter.textContent = lightboxItems.length > 1 ? `${currentLightboxIndex + 1} / ${lightboxItems.length}` : '';
        if (lightboxOrderBtn) lightboxOrderBtn.textContent = currentLang === 'en' ? translations['lightbox-order'] : 'Zamów ten wzór →';
    }

    const showLightboxImage = (index) => {
        if (!lightboxImg || lightboxItems.length === 0) return;
        currentLightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
        const img = lightboxItems[currentLightboxIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = currentLang === 'en'
            ? (img.getAttribute('data-alt-en') || img.alt)
            : (img.getAttribute('data-alt-pl') || img.alt);
        updateLightboxCaption();
    };

    const openLightbox = (img) => {
        if (!lightbox || !img) return;
        refreshLightboxItems(img.closest('.portfolio-grid') || document);
        const index = Math.max(0, lightboxItems.indexOf(img));
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        showLightboxImage(index);
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        if (!document.querySelector('.mail-modal.active') && !document.querySelector('.mobile-nav-drawer.active')) {
            document.body.style.overflow = '';
        }
    };

    const bindLightboxListeners = () => {
        refreshLightboxItems();
        lightboxItems.forEach(img => {
            if (!img._lightboxBound) {
                img._lightboxBound = true;
                img.addEventListener('click', () => openLightbox(img));
            }
        });
    };
    bindLightboxListeners();

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });
        lightbox.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
                showLightboxImage(currentLightboxIndex + (dx < 0 ? 1 : -1));
            }
        }, { passive: true });
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxImage(currentLightboxIndex - 1);
    });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxImage(currentLightboxIndex + 1);
    });
    if (lightboxOrderBtn) {
        lightboxOrderBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = getImageTitle(lightboxItems[currentLightboxIndex]);
            closeLightbox();
            openMailModal(getPrintSubject(title));
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mailModal?.classList.contains('active')) {
                closeMailModal();
                return;
            }
            if (lightbox?.classList.contains('active')) {
                closeLightbox();
                return;
            }
            setMobileMenuOpen(false);
        }

        if (!lightbox?.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') showLightboxImage(currentLightboxIndex - 1);
        if (e.key === 'ArrowRight') showLightboxImage(currentLightboxIndex + 1);
    });

    // DYNAMICZNE ŁADOWANIE GALERII (site_photos/gallery.json)
    const initDynamicGallery = async () => {
        try {
            const res = await fetch(`./site_photos/gallery.json?t=${Date.now()}`);
            if (!res.ok) return;
            const data = await res.json();

            // Store all prints data for filtering and sorting
            let allPrints = [];
            if (data.prints?.polish) {
                allPrints = allPrints.concat(data.prints.polish.map(item => ({...item, category: 'polish'})));
            }
            if (data.prints?.english) {
                allPrints = allPrints.concat(data.prints.english.map(item => ({...item, category: 'english'})));
            }
            
            const renderGrid = (gridId, items) => {
                const grid = document.getElementById(gridId);
                if (!grid) return;

                if (!Array.isArray(items) || items.length === 0) {
                    grid.innerHTML = '<div class="no-results visible">No results found</div>';
                    return;
                }

                grid.innerHTML = items.map(item => {
                    const altPl = item.alt_pl || item.title_pl || 'Chrześcijański projekt graficzny';
                    const altEn = item.alt_en || item.title_en || 'Christian graphic design';
                    const title = (currentLang === 'en' ? item.title_en : item.title_pl) || '';
                    const initialAlt = currentLang === 'en' ? altEn : altPl;
                    const categoryLabel = item.category === 'english'
                        ? (currentLang === 'en' ? 'English' : 'Angielski')
                        : item.category === 'polish'
                            ? (currentLang === 'en' ? 'Polish' : 'Polski')
                            : (currentLang === 'en' ? 'Work' : 'Realizacja');

                    return `
                        <div class="portfolio-card scroll-anim visible" data-category="${item.category || ''}"
                            data-title-pl="${item.title_pl || ''}"
                            data-title-en="${item.title_en || ''}">
                            <img decoding="async" loading="lazy"
                                src="${item.src}"
                                alt="${initialAlt}"
                                title="${title}"
                                data-alt-pl="${altPl}"
                                data-alt-en="${altEn}"
                                data-title-pl="${item.title_pl || ''}"
                                data-title-en="${item.title_en || ''}">
                            <div class="portfolio-card-title">
                                <span class="portfolio-card-name">${title}</span>
                                <span class="portfolio-card-tag">${categoryLabel}</span>
                            </div>
                        </div>
                    `;
                }).join('');

                grid.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));
            };

            // Combined grid for all prints with filtering
            const combinedGrid = document.getElementById('prints-combined-grid');
            if (combinedGrid) {
                renderGrid('prints-combined-grid', allPrints);
            }

            // Portfolio grid for past work
            if (data.past_work && data.past_work.length > 0) {
                renderGrid('portfolio-grid', data.past_work);
            }

            // Store-like navigation functionality
            const filterButtons = document.querySelectorAll('.filter-btn');
            const sortSelect = document.getElementById('sortSelect');

            const updateFilterCounts = () => {
                const counts = {
                    all: allPrints.length,
                    polish: allPrints.filter(item => item.category === 'polish').length,
                    english: allPrints.filter(item => item.category === 'english').length
                };
                document.querySelectorAll('.filter-count').forEach(countEl => {
                    const key = countEl.dataset.countFor;
                    countEl.textContent = counts[key] ?? 0;
                });
            };

            let currentFilter = 'all';
            let currentSort = 'newest';
            updateFilterCounts();

            const filterAndSortPrints = () => {
                let filteredPrints = [...allPrints];

                // Apply category filter
                if (currentFilter !== 'all') {
                    filteredPrints = filteredPrints.filter(item => item.category === currentFilter);
                }

                // Apply sorting
                switch (currentSort) {
                    case 'newest':
                        // Keep original order (assumed to be newest first)
                        break;
                    case 'oldest':
                        filteredPrints.reverse();
                        break;
                }

                renderGrid('prints-combined-grid', filteredPrints);
                bindLightboxListeners();
                if (typeof updateSectionTops === 'function') updateSectionTops();
            };

            // Filter button click handlers
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    filterAndSortPrints();
                });
            });

            // Sort functionality
            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => {
                    currentSort = e.target.value;
                    filterAndSortPrints();
                });
            }

            bindLightboxListeners();
        } catch (e) {
            // Cichy fallback - statyczne HTML karty działają w 100%
        }
    };
    initDynamicGallery();

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

    applyLanguage(currentLang);
});
