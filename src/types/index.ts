export interface Property {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    location: string;
    bedrooms: number;
    amenities: string[];
  }
  
  export interface Booking {
    property: Property;
    startDate: string;
    endDate: string;
    totalCost: number;
  }
  