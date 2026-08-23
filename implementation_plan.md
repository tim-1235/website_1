# Plan Refaktoryzacji, Optymalizacji SEO i Wdrożenia GitHub Pages

Przeprowadzenie kompleksowej refaktoryzacji monopliku `index24.html`, wdrożenie modularnej architektury (`index.html`, `css/style.css`, `js/main.js`, `images/`), optymalizacji Technical SEO (meta tagi, Open Graph, Twitter Cards, JSON-LD Schema, Canonical, `robots.txt`, `sitemap.xml`), integracji Google Analytics 4 oraz wdrożenia responsywnego, spójnego graficznie widżetu RODO/Cookies w 4 motywach stylistycznych.

## User Review Required

> [!IMPORTANT]
> **Identyfikator Google Analytics 4 (GA4)**: Zostanie wdrożony oficjalny skrypt Google Analytics z placeholderem `G-MEASUREMENT_ID` w sekcji `<head>` pliku `index.html`. Wskażemy dokładny numer linii do podmiany.
> 
> **Zachowanie 100% spójności wizualnej i funkcjonalnej**: Cały układ strony, 4 style (Minimalist, Drawing, Neon, Retro), 2 motywy (Dark, Light), przełącznik językowy (PL, EN), lightbox, modal e-mail oraz animacje scrollowania pozostają nienaruszone.

---

## Proponowane Zmiany

### 1. Architektura Projektu (GitHub Pages Ready)
Utworzenie czystej, modularnej struktury plików z relatywnymi ścieżkami (`./`, `css/...`, `js/...`):
- `index.html` – semantyczny szkielet HTML z pełnymi tagami SEO i GA4
- `css/style.css` – kompletne style CSS przeniesione z `index24.html` + dedykowane style widżetu cookies dla 4 motywów i trybów dark/light
- `js/main.js` – czysty kod Vanilla JS (zarządzanie motywami, stylami, językiem, lightboxem, modalem mailowym oraz nowym widżetem cookies)
- `images/` – katalog na zasoby graficzne i ikony
- `sitemap.xml` – plik mapy witryny XML dla robotów indeksujących
- `robots.txt` – reguły indeksacji i wskaźnik mapy strony

---

### 2. Audyt SEO i Optymalizacja Indeksacji (`index.html`)

#### [NEW] [index.html](file:///c:/Users/tymof/OneDrive/Desktop/github_strona/index.html)
- Pełny zestaw metatagów:
  - `<title>`, `<meta name="description">`
  - `<meta name="robots" content="index, follow">`, `<meta name="googlebot" content="...">`
  - Canonical link: `<link rel="canonical" href="https://tim-1235.github.io/">`
  - Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, `og:site_name`)
  - Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
  - Theme Color: `<meta name="theme-color" content="#18191c">`
  - Structured Data JSON-LD (`schema.org/Person`, `schema.org/WebSite`, `schema.org/VisualArtist`)
- Poprawa semantyki i drobnych błędów znaczników (domknięcia SVG, właściwa hierarchia nagłówków).

---

### 3. Moduł Stylów CSS (`css/style.css`)

#### [NEW] [css/style.css](file:///c:/Users/tymof/OneDrive/Desktop/github_strona/css/style.css)
- Wyodrębnienie wszystkich reguł stylów z linii 20–3780
- Dodanie dedykowanych stylów dla pływającego przycisku ciasteczek i modalu powiadomienia o cookies:
  - Pozycja: `fixed; bottom: 20px; right: 20px; z-index: 9999;`
  - Korekta pozycji przycisku `scroll-to-top` na `bottom: 85px; right: 20px;`, aby elementy na siebie nie nachodziły
  - Płynne animacje wejścia/wyjścia i style dopasowane do każdego z 4 stylów witryny (Minimalistyczny, Rysunkowy, Neon, Retro) w wersjach jasnej i ciemnej.

---

### 4. Moduł Skryptów JavaScript (`js/main.js`)

#### [NEW] [js/main.js](file:///c:/Users/tymof/OneDrive/Desktop/github_strona/js/main.js)
- Wyodrębnienie logiki Vanilla JS z zachowaniem wszystkich funkcji
- Dodanie obsługi ciasteczek:
  - Sprawdzenie stanu `localStorage.getItem('cookie_consent')`
  - Automatyczne wywołanie baneru przy pierwszej wizycie (z lekkim opóźnieniem)
  - Przycisk "Rozumiem" / "Akceptuj" zapisujący zgodę w `localStorage`
  - Możliwość ponownego otwarcia okna informacyjnego w dowolnym momencie po kliknięciu pływającego kółka
  - Pełna integracja z systemem dwujęzyczności (`translations` PL/EN)

---

### 5. Pliki Techniczne SEO (`sitemap.xml`, `robots.txt`)

#### [NEW] [sitemap.xml](file:///c:/Users/tymof/OneDrive/Desktop/github_strona/sitemap.xml)
- Struktura XML z deklaracją przestrzeni nazw `http://www.sitemaps.org/schemas/sitemap/0.9`
- Wpisy URL z priorytetem, częstotliwością zmian i aktualną datą modyfikacji

#### [NEW] [robots.txt](file:///c:/Users/tymof/OneDrive/Desktop/github_strona/robots.txt)
- Dyrektywy `User-agent: *`, `Allow: /`
- Wskazanie `Sitemap: https://tim-1235.github.io/sitemap.xml`

---

## Plan Weryfikacji

### Testy Automatyczne i Integralności
1. Sprawdzenie poprawności składni plików HTML, CSS i JS.
2. Sprawdzenie integralności ścieżek relatywnych (`./css/style.css`, `./js/main.js`, zewnętrzne zasoby graficzne).
3. Walidacja zgodności struktury XML w `sitemap.xml`.

### Weryfikacja Ręczna i w Przeglądarce
1. Uruchomienie lokalnego serwera lub podglądu strony.
2. Przetestowanie działania:
   - Zmiany motywu (Dark / Light)
   - Zmiany stylu (Minimalist, Drawing, Neon, Retro)
   - Zmiany języka (PL / EN) wraz z tekstami baneru cookies
   - Działania widżetu cookies (kliknięcie kółka, akceptacja, zapis w `localStorage`, brak ponownego wyskakiwania po odświeżeniu)
   - Lightboxa i modalu wyboru poczty e-mail
   - Przewijania do góry (`scrollTopBtn`)
