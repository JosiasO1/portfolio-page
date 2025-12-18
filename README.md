# Personal Portfolio Website

A modern, responsive personal portfolio website showcasing professional experience, skills, and projects. The site features a sleek design with interactive elements and smooth animations, providing an engaging user experience across all devices.

This portfolio is hosted via **GitHub Pages** and serves as a digital resume and professional online presence.

---

## Features

### Responsive Design
- Fully responsive layout optimized for desktop, tablet, and mobile devices
- Fluid grid system and flexible media queries ensure optimal viewing on any screen size
- Touch-friendly navigation and interactive elements for mobile users

### Multi-Page Structure
The portfolio consists of multiple dedicated pages:
- **Startseite** (Home): Landing page with animated background and introduction
- **Über mich** (About): Personal introduction, hobbies carousel, and Spotify integration
- **Werdegang** (Career): Interactive timeline showcasing professional and educational journey
- **Kontakt** (Contact): Contact form with social media links and direct communication options

### Language Switch (DE / EN)
- Bilingual support with seamless switching between German and English
- Language preference is saved in local storage for consistent user experience
- All content, navigation, and interactive elements are fully translated

### Interactive Elements
- **Animated Timeline**: Visual representation of career milestones with smooth scroll animations
- **Hobby Carousel**: Image slider showcasing personal interests with automatic rotation
- **Skills Visualization**: Interactive chart displaying technical skills and proficiency levels
- **Weather Widget**: Real-time weather information integrated into the header
- **Quote of the Day**: Dynamic inspirational quotes that update daily
- **Smooth Animations**: Page transitions, scroll effects, and hover states for enhanced UX

### Contact Form
- Integrated contact form powered by **FormSubmit**
- Server-side form handling without backend setup
- Form validation and user feedback
- Automatic redirect to thank-you page after successful submission

---

## Technologies Used

- **HTML5**: Semantic markup for improved accessibility and SEO
- **CSS3**: Modern styling with flexbox, grid, custom properties, and animations
- **JavaScript (Vanilla JS)**: Client-side interactivity without framework dependencies
- **GitHub Pages**: Free hosting platform for static websites
- **FormSubmit**: Third-party service for contact form handling
- **Chart.js**: Skills visualization library
- **External APIs**: Weather data and Spotify integration

---

## Project Structure

```
portfolio-page/
├── index.html              # Home page (Startseite)
├── ueber-mich.html         # About page (Über mich)
├── werdegang.html          # Career page (Werdegang)
├── kontakt.html            # Contact page (Kontakt)
├── thank-you.html          # Form submission confirmation page
├── style.css               # Main stylesheet
├── assets/                 # Documents and downloadable files
│   └── CV.pdf              # Resume/CV file
├── images/                 # Image assets and media files
│   ├── Porträt-min.JPG     # Profile photo
│   ├── Volleyball.jpg      # Hobby images
│   ├── Kochen.jpeg
│   ├── gym.webp
│   └── ...                 # Social media icons and other images
├── js/                     # JavaScript modules
│   ├── animations.js       # Page animations and transitions
│   ├── hobby-carousel.js   # Hobby image slider functionality
│   ├── i18n.js             # Internationalization and language switching
│   ├── init.js             # Initialization and page setup
│   ├── navigation.js       # Navigation menu behavior
│   ├── quote-of-day.js     # Daily quote feature
│   ├── skills.js           # Skills section logic
│   ├── skills-chart.js     # Chart.js visualization
│   ├── spotify-player.js   # Spotify widget integration
│   ├── timeline-i18n.js    # Timeline translations
│   └── weather.js          # Weather widget functionality
└── lang/                   # Language files for translations
```

---

## Setup & Usage

### View the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JosiasO1/portfolio-page.git
   cd portfolio-page
   ```

2. **Open with a local server**:
   - Use a local development server (e.g., Live Server extension)
   - Open `index.html` in your browser via the server
   - Navigate through the pages using the menu

   **Note**: Opening `index.html` directly in a browser may cause issues with JavaScript modules and API requests due to CORS restrictions.

### Access the Live Version

Visit the live portfolio hosted on GitHub Pages:
```
https://JosiasO1.github.io/portfolio-page/
```

---

## Accessibility & Responsiveness

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab navigation follows logical order through the page
- Menu toggle and form inputs support keyboard interaction
- Skip links and ARIA labels for screen reader users

### Responsive Layout
- Mobile-first design approach with progressive enhancement
- CSS media queries adapt layout for different screen sizes
- Flexible typography and spacing for optimal readability
- Touch-optimized buttons and navigation for mobile devices

### Focus States & Semantic HTML
- Clear focus indicators for keyboard navigation
- Semantic HTML5 elements (nav, header, main, section, article)
- Proper heading hierarchy for document structure
- Alt text for images and descriptive link text
- Form labels and accessible error messages

---

## Contact

For inquiries or collaboration opportunities, please visit the [Contact page](kontakt.html) or reach out via email.

---

**© 2025 Josias Odermatt. All rights reserved.**
