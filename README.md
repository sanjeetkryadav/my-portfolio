# 🚀 Developer Portfolio - Sanjeet Kumar Yadav

A modern, interactive developer portfolio website featuring a cyberpunk aesthetic with engaging games, typing speed test, and contact form integration.

## ✨ Features

### 🎮 Interactive Games & Tools

- **Tic Tac Toe** - Classic game with winning line highlighting and confetti celebration
- **Typing Speed Test** - Real-time WPM and accuracy calculation with color-coded feedback
- **Click Counter** - Interactive click game with floating "+1" animations
- **Rock Paper Scissors** - Animated multiplayer game against the computer

### 🎨 Design

- **Cyberpunk Theme** - Modern cyan, purple, and indigo color scheme
- **Responsive Layout** - Mobile-first design that works on all devices
- **Bento Card Layout** - Clean, organized grid-based card system
- **Smooth Animations** - Engaging hover effects and transitions

### 📋 Sections

- **Hero Section** - Introduction with social media links and resume download
- **About Me** - Professional background and experience highlights
- **Skills & Technologies** - 12+ technologies including JavaScript, React, Python, C++, TypeScript, HTML, CSS, Node.js, MongoDB, Tailwind, Selenium, and Playwright
- **Project Showcase** - Featured projects with tech stacks
- **Contact Form** - Netlify form integration with bot protection (honeypot)

## 🛠️ Tech Stack

### Frontend

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Interactive functionality and game logic
- **Font Awesome 6.0** - Icon library

### Libraries & Services

- **Canvas Confetti** - Celebration animations
- **Netlify Forms** - Form submission handling with honeypot bot protection

## 📁 Project Structure

```
portfolio/
├── index.html          # Main landing page
├── about.html          # About/About Me page
├── contact.html        # Contact page with form
├── success.html        # Form submission success page
├── script.js           # Game logic and interactive features
├── style.css           # Custom styles and animations
├── click.png           # Click counter game image
└── README.md           # This file
```

## 🎯 Pages

### Home (index.html)

- Hero section with profile image and introduction
- Skills & technologies grid
- Project showcase
- Interactive games (Tic Tac Toe, Typing Speed Test, Click Counter, Rock Paper Scissors)
- Contact form with Netlify integration

### About (about.html)

- Detailed background and experience
- Key achievements and statistics

### Contact (contact.html)

- Contact information (email, phone, location)
- Social media links
- Contact form with Netlify integration
- Message submission interface

### Success (success.html)

- Confirmation page after form submission

## 🎮 Game Details

### Tic Tac Toe

- Play against AI opponent
- Winning line highlighting with green gradient
- Confetti animation on win
- Reset button to start new game

### Typing Speed Test

- Color-coded feedback (green for correct, red for wrong)
- Real-time WPM calculation
- Accuracy percentage display
- Automatic finish at 60 seconds or text completion
- Confetti trigger: 50+ WPM AND 95%+ accuracy
- Reset button to try again

### Click Counter

- Click the image to increment counter
- Floating "+1" animations at random positions
- Persistent counter (stored locally)
- Score tracking

### Rock Paper Scissors

- Play against computer
- Score tracking
- Animated result messages
- Gradient-styled buttons with shine effect

## 🚀 Getting Started

### Prerequisites

- No build tools required - static HTML, CSS, and JavaScript
- Modern web browser

### Installation

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Or deploy to Netlify for live hosting

### Local Development

```bash
# If using Python 3
python -m http.server 8000

# If using Node.js
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 🌐 Deployment

### Deploy to Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop your portfolio folder or connect your Git repository
3. Forms will automatically work with Netlify's form handling

### Environment

The portfolio is fully static and can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📝 Customization

### Update Personal Information

Edit the following in `index.html`:

- Name: Line ~57 - Update "Sanjeet Kumar Yadav"
- Bio: Line ~63 - Update description
- Email: Line ~476 - Update contact email
- Social Links: Lines ~83-98 - Update GitHub, LinkedIn, Instagram URLs
- Resume: Line ~95 - Update Google Drive link

### Modify Skills

Edit the skills grid in `index.html` (Lines ~159-247) to add/remove technologies

### Update Projects

Edit the project cards in `index.html` (Lines ~249-334) with your own projects

### Change Colors

Edit `style.css` to modify the cyberpunk color scheme:

- Primary: Cyan (#00ffff)
- Secondary: Purple (#7c3aed)
- Tertiary: Indigo

## 🔒 Security Features

### Honeypot Bot Protection

Contact forms include a honeypot field to prevent bot submissions:

- Hidden input field (`bot-field`) that bots will fill
- Netlify automatically rejects submissions with honeypot data
- Transparent to legitimate users

## 📊 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 📱 Responsive Design

- **Mobile**: Single column layout, optimized font sizes
- **Tablet**: Two column layouts
- **Desktop**: Full multi-column grid with max-width constraint

## 🎯 Future Enhancements

Potential improvements:

- Dark/Light mode toggle
- Theme customization
- More interactive games
- Blog section
- Project detail pages
- Animation preferences (prefers-reduced-motion)

## 📧 Contact

- **Email**: sanjeety00@gmail.com
- **GitHub**: [sanjeetkryadav](https://github.com/sanjeetkryadav)
- **LinkedIn**: [sanjeet786](https://www.linkedin.com/in/sanjeet786/)

## 🙏 Credits

Built with:

- Tailwind CSS for styling
- Canvas Confetti for animations
- Font Awesome for icons
- Netlify for form handling

---

**Made with ❤️ by Sanjeet Kumar Yadav**
