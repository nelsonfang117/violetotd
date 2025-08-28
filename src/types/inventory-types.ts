// Contract for our car data structures
// Each item has to have these things, follow the format
export interface InventoryItem {
    id: string;
    brand: string;
    modelKey: string;
    year: string;
    trim: string;
    vin: string;
    stockNumber: string;
    color: string;
    interior: string;
    mileage: number;
    status: "available" | "reserved" | "sold" | "in-transit";
    price: number;
    features: string[];
    images: string[];
    arrivalDate: string;
    location: string;
    notes?: string;
}

// This is the search parameters, defines all possible ways to search/filter cars
// Automatically converts URL query parameters like ?brand=kia&minPrice=30000 into types filters
export interface InventoryFilters {
    brand?: string;
    model?: string;
    year?: string;
    trim?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: "available";
}