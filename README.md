# UDI Global — Website (VS Code Project)

A clean, framework-free **HTML / CSS / JavaScript** conversion of the UDI Global
(Universal Digital Innovators) marketing site, ready to open and edit in VS Code.

## 📁 Project structure

```
udi-global/
├── index.html              # Full single-page site (header, hero, services, portfolio, contact, footer…)
├── css/
│   └── style.css           # All styling — CSS variables for colors/gradients live at the top
├── js/
│   └── main.js             # Mobile menu, scroll reveal, testimonial carousel, FAQ accordion,
│                            # progress bars, back-to-top, contact + newsletter form handling
└── assets/
    └── images/             # Placeholder images (see "Replacing images" below)
```

## 🚀 Running it

No build step, no dependencies. Just open `index.html` in a browser, or for the
best experience (so relative image paths and the contact form behave correctly)
serve it with a simple local server:

- **VS Code**: install the "Live Server" extension → right-click `index.html` → "Open with Live Server"
- **Or** from the project folder: `npx serve .` or `python3 -m http.server`

## 🖼️ Replacing images

The original site (exported from a Lovable/React preview) pointed at image
files hosted on Lovable's CDN — those weren't included in your export, so this
project ships with **generated placeholder images** in `assets/images/` (clearly
labeled, correct dimensions) so the layout renders correctly out of the box.

To use your real images, just replace these files **keeping the same filenames**
(or update the `src=""` paths in `index.html` if you rename them):

| Filename | Used for |
|---|---|
| `udi-logo.png` | Header & footer logo |
| `hero-illustration.png` | Hero section graphic |
| `about-office.jpg` | About section photo |
| `business-solutions.jpg` | Capabilities section photo |
| `portfolio-software.jpg` … `portfolio-manufacturing.jpg` | 6 portfolio cards |
| `blog-1.jpg` … `blog-3.jpg` | 3 blog cards |
| `testimonial-1.jpg` … `testimonial-3.jpg` | Testimonial avatars |
| `contact-illustration.png` | Contact section graphic |

## ✉️ Contact form

The form posts to **FormSubmit.co** (`https://formsubmit.co/developer.udi@gmail.com`),
matching the original site's setup. On first submission FormSubmit will send a
confirmation email to that address that must be approved once before submissions
start arriving — this is standard FormSubmit behavior, not a bug.

To point it at a different inbox, change the `action` attribute on the `<form id="contactForm">`
in `index.html`.

## 🗺️ Map embed

The contact section uses a generic Google Maps embed centered on Gandhipuram,
Coimbatore (matching the office address in the footer). Swap the `src` on the
`<iframe>` in the Contact section for an exact embed URL from Google Maps if
you'd like the pin placed precisely on your building.

## 🎨 Customizing colors / fonts

All design tokens (colors, gradients, shadows, fonts) are defined as CSS
variables at the top of `css/style.css` under `:root { ... }` — change them
once and they cascade through the whole site.

## ✅ What's included

- Fully responsive layout (mobile menu, responsive grids down to small phones)
- Scroll-reveal animations on section entry
- Animated capability progress bars
- Auto-playing testimonial carousel with dot navigation
- Single-open FAQ accordion
- Sticky header, back-to-top button
- Working contact form (FormSubmit) with inline success/error state
- Newsletter signup field in the footer
