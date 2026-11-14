# Esha Singh | Developer Portfolio

My personal portfolio website, built with React and Vite. It shows my projects, skills, education and certifications, with a downloadable résumé and ways to contact me.


## Features

- Responsive layout that works on desktop, tablet and mobile
- Light and dark mode toggle
- Project cards with screenshots you can flip through, plus links to each GitHub repo
- Smooth scroll animations and an animated hero
- Résumé download and contact links (email, LinkedIn, GitHub)

## Tech stack

- React 
- Vite
- Plain CSS (no UI framework)

## Run it locally

```bash
git clone https://github.com/esha2303/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open the local address shown in the terminal (usually http://localhost:5173).

To create a production build:

```bash
npm run build
```

## Project structure

```
public/
  projects/        project screenshots
  EshaResume.pdf   résumé file
  favicon.svg      tab icon
src/
  App.jsx          page layout and components
  data.js          all text content (profile, projects, skills, education)
  index.css        all styles
  main.jsx         app entry point
index.html         page title and meta tags
```

## Updating the content

Almost everything on the site comes from `src/data.js`:

- **Profile, about text and links:** `profile` and `about`
- **Projects:** the `projects` list (title, description, tags, GitHub link, screenshots)
- **Skills:** `skillGroups`
- **Education and certificates:** `education` and `certifications`

Add new screenshots to `public/projects/` and reference them as `/projects/folder/image.png`.

## Deployment

The site is deployed on Vercel and redeploys automatically on every push to the `main` branch.

## Contact

- Email: eshaofficial003@gmail.com
- GitHub: [esha2303](https://github.com/esha2303)
- LinkedIn: [esha2003](https://www.linkedin.com/in/esha2003/)