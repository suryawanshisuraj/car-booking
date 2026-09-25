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
    id: "mumbai-pune",
    from: "Mumbai",
    to: "Pune",
    via: "Mumbai-Pune Expressway (YCEW)",
    category: "intercity",
    distance: "150 km",
    duration: "3 hrs",
    sedanFare: "₹2,200",
    suvFare: "₹3,200",
    sedanModel: "Dzire / Aura",
    suvModel: "Ertiga / Crysta",
    stops: "Khalapur • Lonavala Food Mall",
    popular: true
  },
  {
    id: "mumbai-shirdi",
    from: "Mumbai",
    to: "Shirdi",
    via: "Samruddhi Mahamarg (Expressway)",
    category: "pilgrimage",
    distance: "245 km",
    duration: "4.5 hrs",
    sedanFare: "₹3,800",
    suvFare: "₹5,200",
    sedanModel: "Dzire / Aura",
    suvModel: "Ertiga / Crysta",
    stops: "Igatpuri • Sinnar Bypass",
    popular: true
  },
  {
    id: "mumbai-airport",
    from: "Mumbai / Navi Mumbai",
    to: "CSMI Airport (T1 / T2) & NMIA",
    via: "Freeway & Coastal Express Connector",
    category: "airport",
    distance: "Direct Transfer",
    duration: "On-Time Drop",
    sedanFare: "₹1,200",
    suvFare: "₹1,800",
    sedanModel: "Dzire / Aura",
    suvModel: "Ertiga / Crysta",
    stops: "Flight Tracking • Luggage Assist",
    popular: true
  },
  {
    id: "mumbai-nashik",
    from: "Mumbai",
    to: "Nashik",
    via: "NH 160 (Kasara Ghat Highway)",
    category: "intercity",
    distance: "165 km",
    duration: "3.5 hrs",
    sedanFare: "₹3,000",
    suvFare: "₹4,200",
    sedanModel: "Dzire / Aura",
    suvModel: "Ertiga / Crysta",
    stops: "Shahapur • Kasara Rest Area",
    popular: true
  },
  {
    id: "mumbai-lonavala",
    from: "Mumbai",
    to: "Lonavala & Khandala",
    via: "Mumbai-Pune Expressway",
    category: "weekend",
    distance: "85 km",
    duration: "2 hrs",
    sedanFare: "₹2,000",
    suvFare: "₹2,800",
    sedanModel: "Dzire / Aura",
    suvModel: "Ertiga / Crysta",
    stops: "Tiger Point • Bhushi Dam drop",
    popular: false
  },
  {
    id: "mumbai-mahabaleshwar",
    from: "Mumbai",
    to: "Mahabaleshwar & Panchgani",
    via: "NH 48 (Surur Ghat Expressway)",
    category: "weekend",
    distance: "260 km",
    duration: "5.5 hrs",
    sedanFare: "₹4,500",
    suvFare: "₹6,000",
    sedanModel: "Dzire / Aura",
    suvModel: "Ertiga / Crysta",
    stops: "Wai • Mapro Garden Stop",
    popular: true
  },
  {
    id: "mumbai-alibaug",
    from: "Mumbai / Navi Mumbai",
    to: "Alibaug & Mandwa",
    via: "Mumbai-Goa NH 66 Coastal Highway",
    category: "weekend",
    distance: "95 km",
    duration: "2.5 hrs",
    sedanFare: "₹2,400",
    suvFare: "₹3,400",
    sedanModel: "Dzire / Aura",
    suvModel: "Ertiga / Crysta",
    stops: "Pen • Vadkhal Naka",
    popular: false
  },
  {
    id: "pune-mumbai-airport",
    from: "Pune (Hinjawadi / City)",
    to: "Mumbai CSMI Airport (T2)",
    via: "Expressway Direct Airport Corridor",
    category: "airport",
    distance: "160 km",
    duration: "3 hrs",
    sedanFare: "₹2,400",
    suvFare: "₹3,500",
    sedanModel: "Dzire / Aura",
    suvModel: "Ertiga / Crysta",
    stops: "Terminal Drop • Toll Assist",
    popular: true
  }
];

