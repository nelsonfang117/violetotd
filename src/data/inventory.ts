export const inventory = [
  {
    id: "KS-2025-001",
    brand: "kia",
    modelKey: "sorento",
    year: "2025",
    trim: "SX-Prestige",
    vin: "KNDPMCAC5R7123456",
    stockNumber: "KIA25001",
    color: "Wolf Gray",
    interior: "Black",
    mileage: 15,
    status: "available", // "available", "reserved", "sold", "in-transit"
    price: 42990,
    features: [
      "Panoramic Sunroof",
      "Premium Audio",
      "Heated/Ventilated Seats"
    ],
    images: [
      "/inventory/KS-2025-001-1.jpg",
      "/inventory/KS-2025-001-2.jpg"
    ],
    arrivalDate: "2024-05-15",
    location: "Showroom A"
  },
  {
    id: "KS-2025-002",
    brand: "kia",
    modelKey: "sorento",
    year: "2025",
    trim: "X-Line",
    vin: "KNDPMCAC5R7123457",
    stockNumber: "KIA25002",
    color: "Everlasting Silver",
    interior: "Terracotta",
    mileage: 8,
    status: "available",
    price: 39990,
    features: [
      "AWD",
      "Towing Package",
      "Wireless Charging"
    ],
    images: [
      "/inventory/KS-2025-002-1.jpg",
      "/inventory/KS-2025-002-2.jpg"
    ],
    arrivalDate: "2024-05-20",
    location: "Lot 3B"
  },
  // Add more vehicles...
];