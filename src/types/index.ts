export interface User {
  id: string;
  email: string;
  password: string; // In real app, this would be hashed
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  province: string;
  images: string[];
  tags?: string[]; // Optional tags for categorization
  mapLocation?: {
    lat: number;
    lng: number;
  };
  userId: string; // Owner of the trip
  createdAt: string;
  updatedAt: string;
}

