export type ViewType = 'home' | 'builder-detail' | 'project-detail';

export interface Builder {
  id: string;
  name: string;
  logo: string;
  rating: number;
  projects: number;
  callbackTime: string;
  description: string;
  established: string;
  headquarters: string;
  totalProjects: number;
  projectsList: Project[];
  image: string;
}

export interface Project {
  id: string;
  name: string;
  builder: string;
  builderId: string;
  location: string;
  price: string;
  type: string;
  image: string;
  rating: number;
  callbackTime: string;
  description: string;
  area: string;
  possession: string;
  emiStarts: string;
  views: number;
  likes: number;
  amenities: string[];
  gallery: string[];
  nearbyLocations: Array<{
    name: string;
    distance: string;
    time: string;
  }>;
}


export const topBuilders: Builder[] = [
  {
    id: 'dlf',
    name: 'DLF Limited',
    logo: '🏢',
    rating: 4.8,
    projects: 45,
    callbackTime: '15 mins',
    description:
      "DLF Limited is India's largest real estate developer with over 75 years of track record of sustained growth, customer satisfaction, and innovation. The company has developed over 153 real estate projects spanning approximately 334 million square feet.",
    established: '1946',
    headquarters: 'Gurgaon, Haryana',
    totalProjects: 153,
    projectsList: [],
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'godrej',
    name: 'Godrej Properties',
    logo: '🌟',
    rating: 4.7,
    projects: 38,
    callbackTime: '20 mins',
    description:
      "Godrej Properties is one of India's leading real estate developers, known for creating sustainable and innovative spaces. The company has a strong presence across residential, commercial and township development.",
    established: '1990',
    headquarters: 'Mumbai, Maharashtra',
    totalProjects: 89,
    projectsList: [],
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'prestige',
    name: 'Prestige Group',
    logo: '👑',
    rating: 4.6,
    projects: 32,
    callbackTime: '25 mins',
    description:
      'The Prestige Group is a leading real estate developer in South India with over 35 years of experience. Known for luxury residential projects, commercial complexes, and retail destinations.',
    established: '1986',
    headquarters: 'Bangalore, Karnataka',
    totalProjects: 275,
    projectsList: [],
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'brigade',
    name: 'Brigade Group',
    logo: '🏗️',
    rating: 4.5,
    projects: 28,
    callbackTime: '30 mins',
    description:
      'Brigade Group is a leading property developer in South India with over three decades of expertise in real estate development. The company has delivered over 200 projects across residential, commercial, retail, hospitality and educational sectors.',
    established: '1986',
    headquarters: 'Bangalore, Karnataka',
    totalProjects: 200,
    projectsList: [],
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'sobha',
    name: 'Sobha Limited',
    logo: '🏠',
    rating: 4.7,
    projects: 24,
    callbackTime: '18 mins',
    description:
      'Sobha Limited is one of the fastest growing and foremost backward integrated real estate players in the country. Founded in 1995, the company is headquartered in Bangalore and has expanded its operations to major cities.',
    established: '1995',
    headquarters: 'Bangalore, Karnataka',
    totalProjects: 108,
    projectsList: [],
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'puravankara',
    name: 'Puravankara',
    logo: '🏘️',
    rating: 4.4,
    projects: 22,
    callbackTime: '22 mins',
    description:
      "Puravankara Limited is one of India's leading real estate developers with over 47 years of experience. The company has successfully delivered over 75 projects across Bangalore, Kochi, Chennai, Coimbatore, Hyderabad, Pune and Mumbai.",
    established: '1975',
    headquarters: 'Bangalore, Karnataka',
    totalProjects: 75,
    projectsList: [],
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const topProjects: Project[] = [
  {
    id: 'dlf-camelias',
    name: 'DLF Camelias',
    builder: 'DLF Limited',
    builderId: 'dlf',
    location: 'Sector 42, Gurgaon',
    price: '₹2.8 - 4.2 Cr',
    type: '3-4 BHK',
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    callbackTime: '15 mins',
    description:
      'DLF Camelias is a premium residential project offering luxurious 3 and 4 BHK apartments in the heart of Gurgaon. The project features world-class amenities and is strategically located with excellent connectivity to major business hubs.',
    area: '1800-2500 sq.ft',
    possession: 'Ready to Move',
    emiStarts: '₹1.2L per month',
    views: 1250,
    likes: 89,
    amenities: [
      'Swimming Pool',
      'Gym',
      'Club House',
      'Kids Play Area',
      'Landscaped Gardens',
      'Security',
      'Power Backup',
      'Parking',
    ],
    gallery: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    nearbyLocations: [
      { name: 'Metro Station', distance: '2km', time: '< 5 min' },
      { name: 'Cyber City', distance: '5km', time: '< 10 min' },
      { name: 'Schools', distance: '1km', time: '< 5 min' },
      { name: 'Shopping Mall', distance: '3km', time: '< 8 min' },
    ],
  },
  {
    id: 'godrej-avenues',
    name: 'Godrej Avenues',
    builder: 'Godrej Properties',
    builderId: 'godrej',
    location: 'Sector 108, Gurgaon',
    price: '₹1.2 - 2.1 Cr',
    type: '2-3 BHK',
    image:
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    callbackTime: '20 mins',
    description:
      'Godrej Avenues offers modern 2 and 3 BHK apartments with contemporary design and premium amenities. Located in the rapidly developing Sector 108, it provides excellent connectivity and investment potential.',
    area: '1200-1800 sq.ft',
    possession: 'Dec 2025',
    emiStarts: '₹65K per month',
    views: 980,
    likes: 67,
    amenities: [
      'Swimming Pool',
      'Gym',
      'Jogging Track',
      'Kids Play Area',
      'Community Hall',
      '24/7 Security',
      'Power Backup',
      'Parking',
    ],
    gallery: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    nearbyLocations: [
      { name: 'Metro Station', distance: '3km', time: '< 8 min' },
      { name: 'Hospital', distance: '2km', time: '< 5 min' },
      { name: 'Schools', distance: '1.5km', time: '< 4 min' },
      { name: 'Market', distance: '2.5km', time: '< 6 min' },
    ],
  },
  {
    id: 'prestige-lakeside',
    name: 'Prestige Lakeside Habitat',
    builder: 'Prestige Group',
    builderId: 'prestige',
    location: 'Varthur, Bangalore',
    price: '₹1.8 - 3.5 Cr',
    type: '2-4 BHK',
    image:
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    callbackTime: '25 mins',
    description:
      'Prestige Lakeside Habitat is a sprawling residential township offering 2, 3 and 4 BHK apartments with stunning lake views. The project features extensive amenities and is located in the IT corridor of Bangalore.',
    area: '1400-2800 sq.ft',
    possession: 'Ready to Move',
    emiStarts: '₹85K per month',
    views: 1450,
    likes: 102,
    amenities: [
      'Swimming Pool',
      'Gym',
      'Tennis Court',
      'Kids Play Area',
      'Lake View',
      'Club House',
      'Jogging Track',
      'Parking',
    ],
    gallery: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    nearbyLocations: [
      { name: 'IT Parks', distance: '4km', time: '< 10 min' },
      { name: 'Metro Station', distance: '6km', time: '< 15 min' },
      { name: 'Schools', distance: '2km', time: '< 5 min' },
      { name: 'Hospital', distance: '3km', time: '< 8 min' },
    ],
  },
  {
    id: 'brigade-cornerstone',
    name: 'Brigade Cornerstone Utopia',
    builder: 'Brigade Group',
    builderId: 'brigade',
    location: 'Whitefield, Bangalore',
    price: '₹1.5 - 2.8 Cr',
    type: '2-3 BHK',
    image:
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    callbackTime: '30 mins',
    description:
      'Brigade Cornerstone Utopia offers contemporary 2 and 3 BHK apartments in the prime location of Whitefield. The project is designed with modern architecture and premium amenities for comfortable living.',
    area: '1300-2200 sq.ft',
    possession: 'Mar 2026',
    emiStarts: '₹72K per month',
    views: 876,
    likes: 54,
    amenities: [
      'Swimming Pool',
      'Gym',
      'Badminton Court',
      'Kids Play Area',
      'Garden',
      'Security',
      'Power Backup',
      'Parking',
    ],
    gallery: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    nearbyLocations: [
      { name: 'IT Companies', distance: '2km', time: '< 5 min' },
      { name: 'Metro Station', distance: '4km', time: '< 10 min' },
      { name: 'Schools', distance: '1km', time: '< 3 min' },
      { name: 'Shopping Mall', distance: '3km', time: '< 8 min' },
    ],
  },
];