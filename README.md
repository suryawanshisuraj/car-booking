# Jay Bhavani Tours and Travels

A modern, responsive, and performance-optimized cab booking website built for **Jay Bhavani Tours and Travels** (Mumbai, Navi Mumbai, and surrounding regions).

---

## 🚀 Features

- **Automated WhatsApp Booking Dispatch**:
  - Automatically formats passenger, route, date, time, and vehicle preference into a structured WhatsApp message sent to `+91 9529573880`.
- **Dynamic Hero Slideshow**:
  - Smooth cross-fading background carousel displaying high-resolution travel shots (Mumbai Sea Link, Airport Terminal, Expressway, and City Drive).
  - Includes progress dots and auto-pause on hover.
- **Interactive Fleet Showcase**:
  - Filterable fleet tabs (**Sedan**, **SUV**, **SUV Plus**).
  - High-definition showroom visuals of Swift Dzire, Hyundai Aura, Maruti Ertiga, and Toyota Innova Crysta.
  - One-click vehicle booking trigger.
- **Intercity Route Pricing**:
  - Direct routes covering Mumbai to Pune, Shirdi, Nashik, Lonavala, Mahabaleshwar, and Airport transfers.
- **Native Accessible Booking Modal**:
  - Built using HTML5 `<dialog closedby="any">` with light-dismiss backdrop support.
  - Trip type selection (One Way, Round Trip, Airport Transfer, Local 8hr/80km package).
- **Google Reviews & Map Embed**:
  - Integrated official Google Maps embed for Jay Bhavani Tours and Travels.
  - Direct links to Google Business profile, reviews, and star ratings.
- **Mobile First Design**:
  - Responsive hamburger drawer navigation.
  - Persistent bottom action bar for instant Phone Call, WhatsApp, and Booking access.

---

## 📁 Project Structure

```
jay-bhavani-tours-and-travels/
├── css/
│   └── styles.css          # Master stylesheet (Vanilla CSS, Custom Properties, Responsive)
├── js/
│   ├── app.js              # Application controller (Slider, Forms, Modal, Nav)
│   └── data.js             # Fleet and popular route pricing dataset
├── image/
│   ├── logo.svg            # Vector brand logo
│   ├── logo.png            # Brand mark
│   ├── taxi-1.jpg          # Mumbai coastal sea link hero background
│   ├── taxi-2.jpg          # Airport terminal departure hero background
│   ├── taxi-3.jpg          # Scenic Western Ghats expressway background
│   ├── taxi-4.jpg          # Night city drive hero background
│   └── cars/
│       ├── Dzire.jpg       # Maruti Suzuki Dzire sedan
│       ├── Aura.jpg        # Hyundai Aura sedan
│       ├── Ertiga.jpg      # Maruti Suzuki Ertiga MPV
│       ├── Innova.jpg      # Toyota Innova
│       └── Crysta.jpg      # Toyota Innova Crysta
├── index.html              # Main semantic entrypoint
├── package.json            # Vite configuration & scripts
└── README.md               # Documentation
```

---

## 🛠️ How to Run Locally

### Option 1: Using Vite (Recommended)

1. Open your terminal in this directory:
   ```bash
   cd C:\Users\athar\.gemini\antigravity-ide\scratch\jay-bhavani-tours-and-travels
   ```
2. Start the Vite local development server:
   ```bash
   npm run dev
   ```
3. Open the provided `localhost` URL in your browser (typically `http://localhost:5173`).

### Option 2: Open Directly

Simply double-click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari).
