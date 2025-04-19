"use client"
import React, { useEffect, useState } from 'react';
import { Search, Filter, Star, MapPin, Briefcase, Award, ExternalLink, User } from 'lucide-react';

const ExplorePage = () => {
  const [talentList, setTalentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        setTimeout(() => {
          setTalentList(sampleTalentData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Failed to fetch talent', err);
        setLoading(false);
      }
    };
    fetchTalent();
  }, []);


  const filteredTalent = talentList.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          talent.skillset.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          talent.location.toLowerCase().includes(searchTerm.toLowerCase());
    

    const matchesCategory = activeFilter === 'all' || talent.category === activeFilter;

    return matchesSearch && matchesCategory;
  });


  const allSkills = Array.from(new Set(talentList.flatMap(talent => talent.skillset))).sort();

  const toggleSkillFilter = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Discovering talent on the blockchain...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Web3 Talent</h1>
        <p className="text-gray-600">Discover skilled freelancers with verified on-chain credentials</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, skills or location"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition ${activeFilter === 'developer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('developer')}
            >
              Developers
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition ${activeFilter === 'designer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('designer')}
            >
              Designers
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center text-sm font-medium text-gray-700 mr-2">
            <Filter size={16} className="mr-1" /> Skills:
          </div>
          {allSkills.slice(0, 8).map(skill => (
            <button
              key={skill}
              onClick={() => toggleSkillFilter(skill)}
              className={`text-sm px-3 py-1 rounded-full transition ${
                selectedSkills.includes(skill) 
                  ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          ))}
          {allSkills.length > 8 && (
            <button className="text-sm px-3 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200">
              +{allSkills.length - 8} more
            </button>
          )}
        </div>
      </div>
      
      
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">{filteredTalent.length} freelancers found</p>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Sort by:</span>
          <select className="bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>Reputation Score</option>
            <option>Projects Completed</option>
            <option>Recently Active</option>
          </select>
        </div>
      </div>
      
      {/* Talent Grid */}
      {filteredTalent.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-3">
            <Filter size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No matches found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              setSearchTerm('');
              setSelectedSkills([]);
              setActiveFilter('all');
            }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalent.map((talent) => (
            <div key={talent.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={32} className="text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{talent.name}</h3>
                    <p className="text-gray-600 mb-1">{talent.title}</p>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-amber-500 mr-2">
                        <Star size={16} fill="currentColor" />
                        <span className="ml-1 text-sm font-medium">{talent.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">{talent.completedProjects} projects</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin size={14} className="mr-1" />
                      {talent.location}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <Award size={16} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Top Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.skillset.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                        {skill}
                      </span>
                    ))}
                    {talent.skillset.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        +{talent.skillset.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center mb-1">
                          <Briefcase size={14} className="text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">Available for work</span>
                        </div>
                        <p className="text-sm font-medium">${talent.hourlyRate}/hr</p>
                      </div>
                      <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition flex items-center">
                        View Profile
                        <ExternalLink size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">12</button>
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </main>
  );
};

// Sample data
const sampleTalentData = [
  {
    id: "0x1a2b3c4d5e",
    name: "Michael Okechukwu",
    title: "Blockchain Developer",
    category: "developer",
    avatar: "/api/placeholder/150/150",
    location: "Lagos, Nigeria",
    skillset: ["Solidity", "React", "Smart Contracts", "Web3.js", "DApp Development"],
    rating: 4.9,
    completedProjects: 23,
    hourlyRate: 45,
    onChainCerts: ["Ethereum Developer L2", "Solidity Expert"],
    availability: "Available",
    bio: "Full-stack blockchain developer specializing in DeFi applications with 3+ years experience."
  },
  {
    id: "0x2b3c4d5e6f",
    name: "Kwame Mensah",
    title: "Smart Contract Auditor",
    category: "developer",
    avatar: "/api/placeholder/150/150",
    location: "Accra, Ghana",
    skillset: ["Security Auditing", "Solidity", "Rust", "ZK Proofs"],
    rating: 4.8,
    completedProjects: 17,
    hourlyRate: 60,
    onChainCerts: ["Security Auditor", "ZK Developer"],
    availability: "Available",
    bio: "Specialized in auditing smart contracts for vulnerabilities and optimizing gas efficiency."
  },
  {
    id: "0x3c4d5e6f7g",
    name: "Alfred Dakari",
    title: "UI/UX Designer for Web3",
    category: "designer",
    avatar: "/api/placeholder/150/150",
    location: "Dakar, Senegal",
    skillset: ["UI/UX", "Figma", "Web Design", "Branding", "User Research"],
    rating: 4.7,
    completedProjects: 31,
    hourlyRate: 40,
    onChainCerts: ["Web3 UX Certificate", "Design Thinking"],
    availability: "Booked until June",
    bio: "Creating intuitive interfaces for blockchain applications with focus on user experience."
  },
  {
    id: "0x4d5e6f7g8h",
    name: "Stephen Uhura",
    title: "Full Stack Web3 Developer",
    category: "developer",
    avatar: "/api/placeholder/150/150",
    location: "Harare, Zimbabwe",
    skillset: ["React", "Node.js", "Solidity", "IPFS", "TypeScript"],
    rating: 4.6,
    completedProjects: 14,
    hourlyRate: 38,
    onChainCerts: ["Full Stack Developer", "IPFS Data Structures"],
    availability: "Limited Availability",
    bio: "Building bridges between traditional web development and blockchain technologies."
  },
  {
    id: "0x5e6f7g8h9i",
    name: "Nala Adesina",
    title: "NFT Artist & Designer",
    category: "designer",
    avatar: "/api/placeholder/150/150",
    location: "Nairobi, Kenya",
    skillset: ["Digital Art", "NFT Creation", "3D Modeling", "Animation"],
    rating: 4.9,
    completedProjects: 42,
    hourlyRate: 50,
    onChainCerts: ["NFT Creator", "Digital Asset Design"],
    availability: "Available",
    bio: "Award-winning digital artist creating unique NFT collections with cultural significance."
  },
  {
    id: "0x6f7g8h9i0j",
    name: "Collins Amewugah",
    title: "Blockchain Architect",
    category: "developer",
    avatar: "/api/placeholder/150/150",
    location: "Kumasi, Ghana",
    skillset: ["Architecture Design", "Consensus Mechanisms", "Layer 2 Solutions", "Tokenomics"],
    rating: 4.8,
    completedProjects: 8,
    hourlyRate: 75,
    onChainCerts: ["Blockchain Architecture", "Tokenomics Expert"],
    availability: "Available",
    bio: "Designing scalable blockchain infrastructures for enterprises and startups alike."
  },
  {
    id: "0x7g8h9i0j1k",
    name: "Zainab Hassan",
    title: "Content Writer & Strategist",
    category: "marketing",
    avatar: "/api/placeholder/150/150",
    location: "Cairo, Egypt",
    skillset: ["Technical Writing", "Documentation", "Content Strategy", "Copywriting"],
    rating: 4.7,
    completedProjects: 27,
    hourlyRate: 35,
    onChainCerts: ["Web3 Content", "Technical Documentation"],
    availability: "Available",
    bio: "Translating complex blockchain concepts into clear, engaging content for diverse audiences."
  },
  {
    id: "0x8h9i0j1k2l",
    name: "Chibuike Nnamdi",
    title: "DeFi Developer",
    category: "developer",
    avatar: "/api/placeholder/150/150",
    location: "Port Harcourt, Nigeria",
    skillset: ["DeFi Protocols", "Yield Farming", "AMMs", "Solidity", "Vyper"],
    rating: 4.9,
    completedProjects: 19,
    hourlyRate: 55,
    onChainCerts: ["DeFi Architecture", "Liquidity Pool Specialist"],
    availability: "Available",
    bio: "Specialized in developing secure and efficient decentralized finance applications."
  },
  {
    id: "0x9i0j1k2l3m",
    name: "Aisha Mohamed",
    title: "Product Manager",
    category: "management",
    avatar: "/api/placeholder/150/150",
    location: "Kigali, Rwanda",
    skillset: ["Product Strategy", "Agile", "Blockchain Products", "User Testing"],
    rating: 4.8,
    completedProjects: 12,
    hourlyRate: 60,
    onChainCerts: ["Web3 Product Management", "Agile Leadership"],
    availability: "Limited Availability",
    bio: "Guiding Web3 products from concept to market with focus on user adoption."
  }
];

export default ExplorePage;