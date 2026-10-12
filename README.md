# Partner in Crimes · website

Static marketing site for the Partner in Crimes iPhone app, in the Riso Duotone design language. Plain HTML, CSS and JS, served by GitHub Pages from `main`.

- Edit `index.src.html`, then run `python3 build.py` to inline the SVG art from `_sprites.html` into `index.html`.
- Preview locally: `python3 -m http.server` and open http://localhost:8000
- Launch day: set `APP_STORE_URL` at the top of `main.js`; the store buttons go live.
- Screens in `img/` come from the Riso Duotone design mocks until real app captures replace them.
