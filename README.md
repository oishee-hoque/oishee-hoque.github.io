# oishee-hoque.github.io

Personal academic site, built with Jekyll and served by GitHub Pages. Pushing to `master` redeploys the site within a minute or two.

## Updating content

Almost everything you will want to change lives in `_data/`:

| File | What it holds |
| --- | --- |
| `_data/news.yml` | News items, newest first. The home page shows the first six and hides the rest behind "Show all". |
| `_data/publications.yml` | Every paper: title, venue, authors, links, tags. Entries tagged `selected` also appear on the home page. Put a `720x480` thumbnail at `images/pubs/<key>.webp`, or set `thumb: none` for a text tile. |
| `_data/experience.yml` | Positions, teaching/mentoring, and education for the Experience page. |
| `_data/activities.yml` | Awards, grants, talks, competitions and service for the Awards & Activities page. |

The bio, research areas and core-skills chips are in `index.html`; the short affiliations list on the home page comes from the `affiliations:` block in `_data/experience.yml`. Contact links, the CV link, and the navigation are in `_config.yml` under `author:` and `nav:`.

Publication tags: `first-author`, `dataset`, `journal`, `selected`. Mark yourself with `me: true` and co-first authors with `equal: true`.

### Adding a paper

1. Add an entry at the top of `_data/publications.yml` (copy an existing one).
2. Drop a thumbnail at `images/pubs/<key>.webp` (any image, ideally about 3:2; keep it under ~100 KB).
3. Add a line to `_data/news.yml`.
4. Commit and push.

## Previewing locally

```
bundle install          # once
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000. The font is Roboto, self-hosted in `assets/fonts/`; the link icons are Font Awesome Free SVGs in `_includes/icons/`.

## Structure

- `_layouts/default.html` — page shell
- `_includes/` — `head.html`, `nav.html`, `footer.html`, and `pub.html` (one publication entry)
- `_pages/` — publications, experience, activities, 404
- `assets/css/site.css`, `assets/js/site.js` — all styling and the small amount of JavaScript (news toggle, publication filters)
- `images/`, `files/` — images, PDFs

## Restoring the previous site

The AcademicPages-based site from before October 2026 is preserved on the `legacy-site` branch. To go back to it:

```
git checkout master
git reset --hard legacy-site
git push --force origin master
```

Or, to keep the history linear, `git revert` the redesign commit instead.
