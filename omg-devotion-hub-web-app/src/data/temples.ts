export interface Temple {
  id: string;
  name: string;
  deity: string;
  address: string;
  distance: number; // in km
  rating: number;
  image: string;
  timings: {
    morning: string;
    evening: string;
  };
  darshanStatus: "available" | "crowded" | "closed";
  waitTime: number; // in minutes
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}

export const temples: Temple[] = [
  {
    id: "1",
    name: "Siddhivinayak Temple",
    deity: "Lord Ganesha",
    address: "SK Bole Marg, Prabhadevi, Mumbai",
    distance: 0.5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop",
    timings: { morning: "5:30 AM - 12:00 PM", evening: "4:00 PM - 9:30 PM" },
    darshanStatus: "available",
    waitTime: 15,
    coordinates: { lat: 19.0168, lng: 72.8299 },
    features: ["Free Parking", "Wheelchair Access", "Prasad Available"],
  },
  {
    id: "2",
    name: "ISKCON Temple",
    deity: "Lord Krishna",
    address: "Hare Krishna Land, Juhu, Mumbai",
    distance: 2.3,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1b1b1b1?w=400&h=300&fit=crop",
    timings: { morning: "4:30 AM - 1:00 PM", evening: "4:00 PM - 9:00 PM" },
    darshanStatus: "crowded",
    waitTime: 45,
    coordinates: { lat: 19.1075, lng: 72.8263 },
    features: ["Restaurant", "Gift Shop", "Guided Tours"],
  },
  {
    id: "3",
    name: "Mahalakshmi Temple",
    deity: "Goddess Lakshmi",
    address: "Bhulabhai Desai Rd, Mumbai",
    distance: 1.8,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1567591414240-e9c1e2e0e3f0?w=400&h=300&fit=crop",
    timings: { morning: "6:00 AM - 12:30 PM", evening: "3:00 PM - 9:00 PM" },
    darshanStatus: "available",
    waitTime: 20,
    coordinates: { lat: 18.9751, lng: 72.8113 },
    features: ["Parking", "Shoe Storage", "Special Pooja"],
  },
  {
    id: "4",
    name: "Shree Swaminarayan Mandir",
    deity: "Lord Swaminarayan",
    address: "Dadar West, Mumbai",
    distance: 3.5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?w=400&h=300&fit=crop",
    timings: { morning: "7:00 AM - 12:00 PM", evening: "4:00 PM - 8:00 PM" },
    darshanStatus: "available",
    waitTime: 10,
    coordinates: { lat: 19.0178, lng: 72.8478 },
    features: ["Exhibition", "Meditation Hall", "Cafeteria"],
  },
  {
    id: "5",
    name: "Mumbadevi Temple",
    deity: "Goddess Mumbadevi",
    address: "Mumba Devi Marg, Zaveri Bazaar, Mumbai",
    distance: 4.2,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    timings: { morning: "6:00 AM - 11:00 AM", evening: "4:00 PM - 8:30 PM" },
    darshanStatus: "closed",
    waitTime: 0,
    coordinates: { lat: 18.9473, lng: 72.8328 },
    features: ["Heritage Site", "Historical Tours"],
  },
  {
    id: "6",
    name: "Babulnath Temple",
    deity: "Lord Shiva",
    address: "Babulnath Road, Girgaon, Mumbai",
    distance: 2.1,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1600379889954-97e18f3f58c1?w=400&h=300&fit=crop",
    timings: { morning: "5:00 AM - 12:00 PM", evening: "4:00 PM - 9:00 PM" },
    darshanStatus: "available",
    waitTime: 25,
    coordinates: { lat: 18.9553, lng: 72.8102 },
    features: ["Hill View", "Ancient Temple", "Peaceful"],
  },
];
