import { useState } from 'react';
import {
  Search,
  Phone,
  Clock,
  Star,
  MapPin,
  Users,
  CheckCircle,
  Award,
  Shield,
  ArrowLeft,
  Heart,
  Eye,
  Home,
  Car,
  Dumbbell,
  Waves,
  TreePine,
  ShoppingBag,
} from 'lucide-react';
import Logo from './assets/Logo';

type ViewType = 'home' | 'builder-detail' | 'project-detail';

interface Builder {
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

interface Project {
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

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const topBuilders: Builder[] = [
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

  const featuredProjects: Project[] = [
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

  // Populate builders with their projects
  topBuilders.forEach((builder) => {
    builder.projectsList = featuredProjects.filter(
      (project) => project.builderId === builder.id
    );
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = () => {
    if (phoneNumber.trim()) {
      alert(
        `Lead submitted! You'll get a callback in ${
          selectedProject?.callbackTime ||
          selectedBuilder?.callbackTime ||
          '20 mins'
        }`
      );
      setShowLeadForm(false);
      setPhoneNumber('');
      setSearchQuery('');
    }
  };

  const handleBuilderClick = (builder: Builder) => {
    setSelectedBuilder(builder);
    setCurrentView('builder-detail');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedBuilder(null);
    setSelectedProject(null);
  };

  const handleBackToBuilder = () => {
    setCurrentView('builder-detail');
    setSelectedProject(null);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'swimming pool':
        return <Waves className='h-4 w-4' />;
      case 'gym':
        return <Dumbbell className='h-4 w-4' />;
      case 'parking':
        return <Car className='h-4 w-4' />;
      case 'kids play area':
        return <Users className='h-4 w-4' />;
      case 'landscaped gardens':
      case 'garden':
        return <TreePine className='h-4 w-4' />;
      case 'shopping mall':
      case 'market':
        return <ShoppingBag className='h-4 w-4' />;
      default:
        return <Home className='h-4 w-4' />;
    }
  };

  // Project Detail Page
  if (currentView === 'project-detail' && selectedProject) {
    return (
      <div className='min-h-screen bg-white'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center'>
                <button
                  onClick={
                    selectedBuilder ? handleBackToBuilder : handleBackToHome
                  }
                  className='mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors'
                >
                  <ArrowLeft className='h-5 w-5 text-gray-600' />
                </button>
                <Logo />
                <span className='text-2xl font-bold text-gray-900'>
                  TrueBuilders
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Project Gallery */}
        <div className='relative'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-4 max-w-7xl mx-auto'>
            {selectedProject.gallery.map((image, index) => (
              <div
                key={index}
                className={`relative ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${selectedProject.name} ${index + 1}`}
                  className={`w-full object-cover rounded-lg ${
                    index === 0 ? 'h-96' : 'h-48'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              <div className='flex items-start justify-between mb-6'>
                <div>
                  <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                    {selectedProject.name}
                  </h1>
                  <p className='text-lg text-gray-600 mb-2'>
                    by {selectedProject.builder}
                  </p>
                  <div className='flex items-center space-x-4 text-sm text-gray-500 mb-4'>
                    <div className='flex items-center space-x-1'>
                      <MapPin className='h-4 w-4' />
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Eye className='h-4 w-4' />
                      <span>{selectedProject.views}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Heart className='h-4 w-4' />
                      <span>{selectedProject.likes}</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-1 mb-4'>
                    <Star className='h-5 w-5 text-yellow-400 fill-current' />
                    <span className='font-semibold'>
                      {selectedProject.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>About</h2>
                <p className='text-gray-600 leading-relaxed'>
                  {selectedProject.description}
                </p>
              </div>

              {/* Amenities */}
              <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Amenities
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {selectedProject.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className='flex items-center space-x-2 p-3 bg-gray-50 rounded-lg'
                    >
                      {getAmenityIcon(amenity)}
                      <span className='text-sm text-gray-700'>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Locations */}
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                  Nearby Locations
                </h2>
                <div className='space-y-3'>
                  {selectedProject.nearbyLocations.map((location, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                    >
                      <span className='text-gray-700'>{location.name}</span>
                      <div className='text-right'>
                        <div className='text-sm font-semibold text-gray-900'>
                          {location.distance}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {location.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <div className='bg-white border border-gray-200 rounded-xl p-6 sticky top-24'>
                <div className='mb-6'>
                  <div className='text-3xl font-bold text-gray-900 mb-2'>
                    {selectedProject.price}
                  </div>
                  <div className='text-gray-600 mb-1'>
                    onwards ({selectedProject.area})
                  </div>
                  <div className='text-sm text-gray-500'>
                    EMI starts from {selectedProject.emiStarts}
                  </div>
                </div>

                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Configuration</span>
                    <span className='font-semibold'>
                      {selectedProject.type}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Possession</span>
                    <span className='font-semibold'>
                      {selectedProject.possession}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>
                      Callback Time(Working Hours)
                    </span>
                    <span className='font-semibold text-green-600'>
                      {selectedProject.callbackTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Builder Detail Page
  if (currentView === 'builder-detail' && selectedBuilder) {
    return (
      <div className='min-h-screen bg-white'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b border-gray-100'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center'>
                <button
                  onClick={handleBackToHome}
                  className='mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors'
                >
                  <ArrowLeft className='h-5 w-5 text-gray-600' />
                </button>
                <Logo />
                <span className='text-2xl font-bold text-gray-900'>
                  TrueBuilders
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Builder Info */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='bg-white rounded-xl shadow-lg p-8 mb-8'>
            <div className='flex items-start space-x-6'>
              <div className='text-6xl'>{selectedBuilder.logo}</div>
              <div className='flex-1'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  {selectedBuilder.name}
                </h1>
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='flex items-center space-x-1'>
                    <Star className='h-5 w-5 text-yellow-400 fill-current' />
                    <span className='font-semibold'>
                      {selectedBuilder.rating}
                    </span>
                  </div>
                  <span className='text-gray-400'>•</span>
                  <span className='text-gray-600'>
                    Est. {selectedBuilder.established}
                  </span>
                  <span className='text-gray-400'>•</span>
                  <span className='text-gray-600'>
                    {selectedBuilder.headquarters}
                  </span>
                </div>
                <p className='text-gray-600 leading-relaxed mb-6'>
                  {selectedBuilder.description}
                </p>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div className='text-center p-4 bg-blue-50 rounded-lg'>
                    <div className='text-2xl font-bold text-blue-600'>
                      {selectedBuilder.totalProjects}
                    </div>
                    <div className='text-sm text-gray-600'>Total Projects</div>
                  </div>
                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <div className='text-2xl font-bold text-green-600'>
                      {selectedBuilder.callbackTime}
                    </div>
                    <div className='text-sm text-gray-600'>
                      Callback Time(Working Hours)
                    </div>
                  </div>
                  <div className='text-center p-4 bg-yellow-50 rounded-lg'>
                    <div className='text-2xl font-bold text-yellow-600'>
                      {selectedBuilder.rating}/5
                    </div>
                    <div className='text-sm text-gray-600'>Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects by this Builder */}
          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Projects by {selectedBuilder.name}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {selectedBuilder.projectsList.map((project, index) => (
                <div
                  key={index}
                  className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer'
                  onClick={() => handleProjectClick(project)}
                >
                  <div className='relative'>
                    <img
                      src={project.image}
                      alt={project.name}
                      className='w-full h-48 object-cover'
                    />
                    <div className='absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                      {project.callbackTime}
                    </div>
                  </div>

                  <div className='p-6'>
                    <h3 className='font-bold text-gray-900 mb-2'>
                      {project.name}
                    </h3>

                    <div className='flex items-center space-x-1 mb-3'>
                      <MapPin className='h-4 w-4 text-gray-400' />
                      <span className='text-sm text-gray-600'>
                        {project.location}
                      </span>
                    </div>

                    <div className='space-y-2 mb-4'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600 text-sm'>
                          Price Range
                        </span>
                        <span className='font-semibold text-sm'>
                          {project.price}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600 text-sm'>
                          Configuration
                        </span>
                        <span className='font-semibold text-sm'>
                          {project.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home Page (existing code)
  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <Logo />
              <span className='text-2xl font-bold text-gray-900'>
                TrueBuilders
              </span>
            </div>
            <nav className='hidden md:flex space-x-8'>
              <a
                href='#builders'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                Builders
              </a>
              <a
                href='#projects'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                Projects
              </a>
              <a
                href='#about'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                About
              </a>
              <a
                href='#contact'
                className='text-gray-700 hover:text-blue-600 transition-colors'
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 pt-16 pb-24 min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 leading-tight'>
              Connect Directly with
              <span className='text-yellow-300'> Builders</span>
              <br />
              <span className='text-white'>for Best Rates</span>
            </h1>
            <p className='text-xl text-blue-100 mb-8 max-w-3xl mx-auto'>
              Skip the middlemen. Get instant callbacks from top real estate
              developers in India within 30 minutes. Find your dream home with
              exclusive deals and transparent pricing.
            </p>

            {/* Search Bar */}
            <div className='max-w-4xl mx-auto mb-12'>
              <div className='bg-white rounded-2xl shadow-xl p-6 border border-gray-100'>
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1 relative'>
                    <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Search for builders or projects (e.g., DLF Camelias, Godrej Properties)'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className='w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  >
                    Get Instant Callback
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
              <div className='flex items-center justify-center space-x-3'>
                <Clock className='h-8 w-8 text-green-400' />
                <div className='text-left'>
                  <div className='font-bold text-white'>30 Minutes</div>
                  <div className='text-blue-100'>Callback Guarantee</div>
                </div>
              </div>
              <div className='flex items-center justify-center space-x-3'>
                <Shield className='h-8 w-8 text-blue-200' />
                <div className='text-left'>
                  <div className='font-bold text-white'>100% Direct</div>
                  <div className='text-blue-100'>No Middlemen</div>
                </div>
              </div>
              <div className='flex items-center justify-center space-x-3'>
                <Award className='h-8 w-8 text-yellow-400' />
                <div className='text-left'>
                  <div className='font-bold text-white'>Best Rates</div>
                  <div className='text-blue-100'>Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl p-8 max-w-md w-full'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              Get Instant Callback
            </h3>
            <p className='text-gray-600 mb-6'>
              Enter your phone number to connect with builders for "
              {searchQuery}"
            </p>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Phone Number
                </label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder='+91 98765 43210'
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>
              <div className='flex space-x-3'>
                <button
                  onClick={() => setShowLeadForm(false)}
                  className='flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleLeadSubmit}
                  className='flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors'
                >
                  Submit Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Builders Section */}
      <section id='builders' className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Top Builders in India
            </h2>
            <p className='text-xl text-gray-600'>
              Connect directly with India's most trusted real estate developers
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {topBuilders.map((builder, index) => (
              <div
                key={index}
                className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer'
                onClick={() => handleBuilderClick(builder)}
              >
                <div className='relative'>
                  <img
                    src={builder.image}
                    alt={builder.name}
                    className='w-full h-48 object-cover rounded-t-xl'
                  />
                </div>

                <div className='space-y-2 mb-4 p-6'>
                  <span className='font-semibold'>{builder.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id='projects' className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Top Projects
            </h2>
            <p className='text-xl text-gray-600'>
              Premium residential projects with instant builder connection
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer'
                onClick={() => handleProjectClick(project)}
              >
                <div className='relative'>
                  <img
                    src={project.image}
                    alt={project.name}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
                    {project.callbackTime}
                  </div>
                </div>

                <div className='p-6'>
                  <h3 className='font-bold text-gray-900 mb-2'>
                    {project.name}
                  </h3>
                  <p className='text-sm text-gray-600 mb-2'>
                    by {project.builder}
                  </p>

                  <div className='flex items-center space-x-1 mb-3'>
                    <MapPin className='h-4 w-4 text-gray-400' />
                    <span className='text-sm text-gray-600'>
                      {project.location}
                    </span>
                  </div>

                  <div className='space-y-2 mb-4'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600 text-sm'>Price Range</span>
                      <span className='font-semibold text-sm'>
                        {project.price}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600 text-sm'>
                        Configuration
                      </span>
                      <span className='font-semibold text-sm'>
                        {project.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='py-16 bg-blue-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Why Choose TrueBuilders?
            </h2>
            <p className='text-xl text-gray-600'>
              Direct access to builders means better deals for you
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                icon: Shield,
                title: 'No Hidden Fees',
                desc: 'Direct builder rates with complete transparency',
              },
              {
                icon: Clock,
                title: 'Instant Response',
                desc: 'Get callbacks within 30 minutes guaranteed',
              },
              {
                icon: Users,
                title: 'Expert Support',
                desc: 'Dedicated relationship managers for each deal',
              },
              {
                icon: CheckCircle,
                title: 'Verified Projects',
                desc: 'All projects verified and RERA approved',
              },
            ].map((feature, index) => (
              <div key={index} className='text-center'>
                <div className='bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-lg'>
                  <feature.icon className='h-8 w-8 text-blue-600 mx-auto' />
                </div>
                <h3 className='font-bold text-gray-900 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Ready to Find Your Dream Home?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Connect with India's top builders and get exclusive deals with
            guaranteed callbacks in 30 minutes
          </p>
          <button
            onClick={() => setShowLeadForm(true)}
            className='bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg'
          >
            Start Your Search Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center mb-4'>
                <Logo />
                <span className='text-2xl font-bold'>TrueBuilders</span>
              </div>
              <p className='text-gray-400'>
                Connecting homebuyers directly with India's top real estate
                developers for transparent and best-rate deals.
              </p>
            </div>
            <div>
              <h4 className='font-bold mb-4'>Quick Links</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white'>
                    Home
                  </a>
                </li>
                <li>
                  <a href='#builders' className='hover:text-white'>
                    Builders
                  </a>
                </li>
                <li>
                  <a href='#projects' className='hover:text-white'>
                    Projects
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-bold mb-4'>Top Cities</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white'>
                    Mumbai
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Delhi NCR
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Bangalore
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Pune
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-bold mb-4'>Contact Info</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>📧 hello@TrueBuilders.com</li>
                <li>📞 +91 98765 43210</li>
                <li>📍 Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-400'>
            <p>&copy; 2025 TrueBuilders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
