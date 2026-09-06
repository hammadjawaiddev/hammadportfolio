# Assets

| File | Used for |
|---|---|
| `profile.jpg` | About card photo (your provided picture — local, required) |
| `favicon-16/32/64/192.png` | Browser tab icons — gold "hj." on ink |
| `apple-touch-icon.png` | iOS home-screen icon |
| `og-cover.jpg` | 1200×630 share card for WhatsApp/LinkedIn previews |

## Project cards
The 4 project cards use **full-bleed screenshots** loaded from
`https://hammad-developer.vercel.app/images/screenshots/image-{1,3,5,7}.png`
(the original design). They show on hover zoom / reduced opacity as designed.

> If you later want to self-host them (more reliable), download each image into
> `assets/projects/` and swap the `src` in `index.html` — original files of the
> logos you tried are also still in the workspace `uploads/` folder if you ever
> want to reuse them.

## Before deploying
1. `og:image` + JSON-LD `url` in `index.html` should point at your real deployed
   domain (absolute URL) once you know it.
2. Bump the `?v=` numbers on `css/style.css` / `js/*.js` whenever you edit them.
