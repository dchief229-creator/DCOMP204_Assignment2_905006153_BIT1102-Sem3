# StudentStay SL

A static, front-end-only website that helps students in Sierra Leone find accommodation near their campus. It lets visitors browse sample listings in and around Freetown, filter and sort them, save favourites, and send an enquiry.

> **Note:** All listings, prices and availability are sample data. Confirm everything with the provider before paying.

## Features
- **Home page** with a hero search box, featured listings, popular areas and a call to action
<img width="1240" height="3207" alt="Screenshot_9-11-2026_104956_" src="https://github.com/user-attachments/assets/34ca21a1-2b06-496b-93ec-a4ab832e772a" />

**About Page**
<img width="1240" height="1554" alt="Screenshot_9-11-2026_10537_" src="https://github.com/user-attachments/assets/e632d616-c05c-4888-8d20-ffb92620bda8" />

- **Accommodation and Search pages** with a live filter panel:
  - keyword search
  - area/location
  - minimum and maximum monthly rent
  - room type (Single, Shared, Self-contained)
  - facilities (Water, Electricity, Internet)
  - sorting by price, low to high or high to low
  - a "results found" counter and an empty state
  - 
**Service Page**
<img width="1240" height="1228" alt="Screenshot_9-11-2026_105711_" src="https://github.com/user-attachments/assets/db094e42-403a-4ec1-b906-e8e44c6532db" />
 
**Contact Page**
<img width="1240" height="1493" alt="Screenshot_9-11-2026_10594_" src="https://github.com/user-attachments/assets/ad2b6b18-712f-446c-9b8a-372c521c9ae5" />

**Login/Register Page**
<img width="1240" height="1329" alt="Screenshot_9-11-2026_11031_" src="https://github.com/user-attachments/assets/357027c3-0875-4f4d-8f23-d4e6d5f2c59c" />


- **Listing details dialog** with a photo gallery, price, room type, facilities, availability badge and a "Send enquiry" button that pre-fills the contact form's subject
- **Save listing** heart toggle on each card
- **Deep links** such as `search.html?loc=Lumley`, `?q=...`, `?max=...` and `?room=...`
- **Contact, Login/Register and Services/About pages**; the forms validate required fields and show a success message
- **Responsive design** with automatic dark mode (`prefers-color-scheme`)
- **Photo placeholders:** if an image is missing, a drawn scene and an "Add photo" hint show instead

## Project structure

```
studentstay-sl/
├── index.html           Home
├── accommodation.html   Browse all accommodation
├── search.html          Search with filters
├── services.html        What StudentStay SL offers
├── about.html           Mission, vision and audience
├── contact.html         Enquiry form and contact details
├── login.html           Login / Register forms
├── style.css            All styling (theme variables at the top)
├── script.js            Listing data, filtering, dialog, forms
└── images/              Banners, area photos, listing photos
```

## Getting started

No build step or dependencies are needed.

1. open the project.
2. Open `studentstay-sl/index.html` in a browser.

To serve it locally instead (recommended, so query-string links behave like a real site):

```bash
cd studentstay-sl
python3 -m http.server 8000
# then visit http://localhost:8000
```

Any static host works for deployment (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Customising

### Edit or add listings

Listings are the `L` array at the top of `script.js`:

```js
{id:1, t:"Hill Station Student Lodge", loc:"Hill Station", p:1200,
 r:"Single", f:["Water","Electricity","Internet"], a:"Available"}
```

| Key | Meaning |
|-----|---------|
| `id` | Unique number, starting at 1 and sequential |
| `t`  | Listing title |
| `loc`| Area, which must match an option in the location filter |
| `p`  | Monthly rent in NLe |
| `r`  | Room type: `Single`, `Shared` or `Self-contained` |
| `f`  | Facilities: `Water`, `Electricity`, `Internet` |
| `a`  | Availability: `Available`, `Few rooms left` or `Waitlist` |

Keep `id` values sequential, because the details dialog looks listings up by `id - 1`. If you add a listing or a new area, also add the matching photos and the new area to the location `<select>` in `search.html` and `accommodation.html`.

### Photos

Images follow a naming pattern in `images/`:

- `listing-{id}.jpg` is the main photo
- `listing-{id}-2.jpg` and `listing-{id}-3.jpg` are gallery thumbnails
- `area-*.jpg`, `banner-*.jpg`, `hero.jpg`, `about.jpg` and `home-*.jpg` are used on the pages

### Theme

Colours and fonts are CSS variables at the top of `style.css` (`--sea`, `--palm`, `--sun`, and others). Dark-mode values are in the `prefers-color-scheme: dark` block. Fonts are Fraunces and Public Sans, loaded from Google Fonts.

## Limitations

- **No backend.** The contact and login/register forms only validate in the browser and show a success message. Nothing is sent or stored, and no accounts are created.
- **Saved listings** (the heart button) are not persisted and reset on page reload.
- **Listing data** is hard-coded in `script.js`.
- Some footer and social links point to `#`.

## Ideas for next steps

- Connect the forms to a service or API (for example Formspree, Netlify Forms or your own server)
- Move listings to a database or JSON file and add provider accounts
- Persist saved listings with `localStorage`
- Add a map view and real photos and contact details for each listing

## Tech stack

HTML5, CSS3 (custom properties, grid, flexbox) and vanilla JavaScript (ES5 style). No frameworks or build tools.
