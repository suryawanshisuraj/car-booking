// Fleet and Route data for Jay Bhavani Tours and Travels
export const fleetData = {
  sedan: [
    {
      id: "dzire",
      name: "Swift Dzire",
      category: "Sedan",
      tag: "Sedan",
      image: "/image/cars/Dzire.jpg",
      description: "Comfortable and economical sedan for local, airport and outstation travel.",
      seats: "4 seats",
      bags: "2 bags",
      ac: true,
      ratePerKm: "₹12/km",
      startingFare: "₹1,200",
      features: ["Pushback Seats", "Music System", "Bottled Water", "Spacious Boot"]
    },
    {
      id: "aura",
      name: "Hyundai Aura",
      category: "Sedan",
      tag: "Sedan",
      image: "/image/cars/Aura.jpg",
      description: "Modern sedan with exceptional ride comfort and generous legroom for families.",
      seats: "4 seats",
      bags: "2 bags",
      ac: true,
      ratePerKm: "₹12/km",
      startingFare: "₹1,200",
      features: ["Premium Audio", "Smooth Suspension", "Fast USB Charging", "Clean Interior"]
    }
  ],
  suv: [
    {
      id: "ertiga",
      name: "Maruti Ertiga",
      category: "SUV",
      tag: "SUV",
      image: "/image/cars/Ertiga.jpg",
      description: "Spacious 6-7 seater MPV ideal for family vacations, weekend getaways, and outstation trips.",
      seats: "6-7 seats",
      bags: "3 bags",
      ac: true,
      ratePerKm: "₹15/km",
      startingFare: "₹2,200",
      features: ["Reclining Rear Seats", "Roof AC Vents", "Large Luggage Space", "High Safety Rating"]
    },
    {
      id: "carens",
      name: "Kia Carens",
      category: "SUV",
      tag: "SUV",
      image: "/image/cars/Ertiga.jpg",
      description: "Premium stylish family carrier with plush captain seats and extra comfort.",
      seats: "6-7 seats",
      bags: "3 bags",
      ac: true,
      ratePerKm: "₹16/km",
      startingFare: "₹2,400",
      features: ["Dual-zone AC", "Captain Chairs", "Sunshades", "Quiet Cabin"]
    }
  ],
  suv_plus: [
    {
      id: "innova-crysta",
      name: "Toyota Innova Crysta",
      category: "SUV Plus",
      tag: "SUV Plus",
      image: "/image/cars/Crysta.jpg",
      description: "The gold standard of long-distance comfort, executive travel, and wedding transfers.",
      seats: "7 seats",
      bags: "4 bags",
      ac: true,
      ratePerKm: "₹19/km",
      startingFare: "₹2,800",
      features: ["Leather Seats", "Independent AC", "Ultra Plush Ride", "Executive Space"]
    },
    {
      id: "innova-hycross",
      name: "Toyota Innova",
      category: "SUV Plus",
      tag: "SUV Plus",
      image: "/image/cars/Innova.jpg",
      description: "Spacious and reliable companion for all intercity Maharashtra & Gujarat road journeys.",
      seats: "7-8 seats",
      bags: "4 bags",
      ac: true,
      ratePerKm: "₹18/km",
      startingFare: "₹2,600",
      features: ["High Reliability", "Ample Cargo Space", "Experienced Driver", "Smooth Highway Ride"]
    }
  ]
};

export const popularRoutes = [
  {
    from: "Mumbai",
    to: "Pune",
    distance: "150 km",
    duration: "3 hrs",
    sedanFare: "₹2,200",
    suvFare: "₹3,200",
    popular: true
  },
  {
    from: "Mumbai",
    to: "Shirdi",
    distance: "245 km",
    duration: "5 hrs",
    sedanFare: "₹3,800",
    suvFare: "₹5,200",
    popular: true
  },
  {
    from: "Mumbai",
    to: "Nashik",
    distance: "165 km",
    duration: "3.5 hrs",
    sedanFare: "₹3,000",
    suvFare: "₹4,200",
    popular: true
  },
  {
    from: "Mumbai",
    to: "Lonavala",
    distance: "85 km",
    duration: "2 hrs",
    sedanFare: "₹2,000",
    suvFare: "₹2,800",
    popular: false
  },
  {
    from: "Mumbai",
    to: "Mahabaleshwar",
    distance: "260 km",
    duration: "5.5 hrs",
    sedanFare: "₹4,500",
    suvFare: "₹6,000",
    popular: true
  },
  {
    from: "Mumbai / Navi Mumbai",
    to: "Airport (CSMI / NMIA)",
    distance: "Direct Transfer",
    duration: "On-time drop",
    sedanFare: "₹1,200",
    suvFare: "₹1,800",
    popular: true
  }
];
