# Jerry Portfolio Website

## Introduction

This is my personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

The website is designed to present my background, resume, projects, travel records, music taste, and drama/movie/anime collections. It is not only a resume-style website, but also a personal digital space for recording interests, experiences, and side projects.

## Live Demo

Website:  
https://liangchatwork.github.io/jerry-portfolio/

---

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-292524?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-292524?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-292524?style=for-the-badge&logo=vite&logoColor=646CFF)

### Styling

![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-292524?style=for-the-badge&logo=tailwindcss&logoColor=38B2AC)

### Routing

![React Router](https://img.shields.io/badge/React_Router-292524?style=for-the-badge&logo=reactrouter&logoColor=CA4245)

### Map

![Leaflet](https://img.shields.io/badge/Leaflet-292524?style=for-the-badge&logo=leaflet&logoColor=199900)
![React Leaflet](https://img.shields.io/badge/React_Leaflet-292524?style=for-the-badge&logo=leaflet&logoColor=199900)

### Deployment

![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-292524?style=for-the-badge&logo=github&logoColor=white)

---

## Features

### Responsive Portfolio Website

The website supports both desktop and mobile layouts, including a customized header, mobile menu, responsive page sections, and interactive page components.

### About Page

A personal introduction page that presents my background, current interests, and learning direction.

### Resume Page

A resume-style page for education, skills, experience, and personal profile.

### Travel Page

An interactive travel map built with Leaflet and React Leaflet.

The Travel page includes:

- Travel location markers
- Region filtering
- Multiple map points for each place
- YouTube video embeds
- Text and image content blocks
- Mobile-friendly travel point panel

### Music Page

A personal music archive for selected songs, artists, and listening preferences.

### Drama / Anime / Movie Page

A collection page for anime, dramas, movies, superhero films, action blockbusters, and personal favorite films.

### Projects Page

Currently under development.

This section will be used to present selected programming projects, side projects, and GitHub repositories.

---

## Project Structure

```txt
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PageBackground.tsx
│   └── SlideshowContext.tsx
│
├── data/
│   └── travelPlaces.ts
│
├── pages/
│   ├── About.tsx
│   ├── Resume.tsx
│   ├── Travel.tsx
│   ├── Music.tsx
│   ├── Drama.tsx
│   └── Projects.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Future Improvements

* Refactor Music and Drama content into separate data files
* Convert Travel records into Markdown or MDX articles
* Add a Blog page
* Complete the Projects page
* Improve mobile layout details
* Add more travel records and images
* Add more project case studies
* Consider migrating deployment to Vercel or Netlify

---

## Local Development

Clone the repository:

```bash
git clone https://github.com/liangchatwork/jerry-portfolio.git
```

Enter the project folder:

```bash
cd jerry-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

---

## Author

Chen-Hsun Jerry Liang

* GitHub: [https://github.com/liangchatwork](https://github.com/liangchatwork)
* Portfolio: [https://liangchatwork.github.io/jerry-portfolio/](https://liangchatwork.github.io/jerry-portfolio/)
* YouTube: [https://www.youtube.com/@A-HsunJerry](https://www.youtube.com/@A-HsunJerry)
* Instagram: [https://www.instagram.com/hsunjerry_liang](https://www.instagram.com/hsunjerry_liang)
* LinkedIn: [https://www.linkedin.com/in/hsunjerry-liang/](https://www.linkedin.com/in/hsunjerry-liang/)
* Email: [liangchatwork@gmail.com](mailto:liangchatwork@gmail.com)

---

## License

This project is for personal portfolio and learning purposes only.

Unauthorized use, deployment, redistribution, or modification of this project is not permitted.