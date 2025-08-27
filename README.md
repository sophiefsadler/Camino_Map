# My Camino Francés - An Interactive Map 🗺️

![Camino Project GIF](https://github.com/sophiefsadler/Camino_Map/blob/main/assets/Camino_Map.gif)

### **Live Demo:** [**https://sophiefsadler.github.io/Camino_Map/**](https://sophiefsadler.github.io/Camino_Map/)

---

## About The Project

This project is a visual and interactive diary of my 31-day, 800km walk along the Camino Francés in Spain. I wanted to create a data-driven map that tells the story of the journey day by day, combining geographical data with personal diary entries, photos, and videos.

It was built from scratch to practice and showcase my skills with modern web development techniques, with a focus on data and map-based visualization.

The project is fully responsive and works independently for desktop and mobile.

---

## Key Features

* **Interactive Leaflet Map:** An interactive map showing the full 31-day route across Spain.
* **Day-by-Day Story Panel:** A narrative panel that updates with photos, diary entries, and distance information for each day of the walk.
* **Dynamic Elevation Profiles:** For each walking day, a D3.js-powered elevation chart is drawn, with an indicator that syncs with the user's cursor position on the map path.
* **Clickable Points of Interest:** Custom markers highlight interesting spots, which can be clicked to display more information in the story panel (on desktop) or in a modal (on mobile).
* **Interactive Timeline:** A scrollable timeline allows for quick navigation between all 31 stages of the journey.
* **Fully Responsive Design:** A custom UI for both desktop and mobile, ensuring a great experience on any device. The mobile view features a compact navigation bar and slide-out panels.

---

## Built With

* **JavaScript (ES6 Modules):** The entire application is built with modern, modular vanilla JavaScript.
* **D3.js:** Used for all data handling (loading GeoJSON/CSV), color scaling, and drawing the dynamic elevation profiles.
* **Leaflet.js:** Powers the core interactive map, including path rendering, custom markers, and camera movement.
* **Tailwind CSS:** For all styling and creating the responsive layout.
* **HTML5**

---
---

## Acknowledgments
* Map tiles by [Mapbox](https://www.mapbox.com/) and [OpenStreetMap](http://www.openstreetmap.org/copyright).
* Inspired by my incredible journey on the Camino de Santiago.
