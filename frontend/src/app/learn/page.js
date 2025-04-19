"use client";

import React, { useEffect, useState } from "react";
import { Search, Tag, Clock, BookOpen } from "lucide-react";

const categories = [
  "All",
  "Blockchain Basics",
  "Smart Contracts",
  "DeFi",
  "NFTs",
  "Security",
];

export default function LearnPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setTimeout(() => {
      setCourses(sampleCourseData);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading courses...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn Web3</h1>
        <p className="text-gray-600">
          Browse tutorials and courses to level up your blockchain skills.
        </p>
      </header>

      {/* Search & Categories */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute top-3 left-3 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No courses found
          </h2>
          <p className="text-gray-500">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <BookOpen size={24} className="text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {course.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{course.duration} hrs</span>
                  </div>
                  <button className="text-blue-600 font-medium hover:underline">
                    Start Learning →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// Sample data
const sampleCourseData = [
  {
    id: "c1",
    title: "Blockchain Fundamentals",
    description:
      "Learn how blockchain works, its core concepts, and practical applications in Web3.",
    category: "Blockchain Basics",
    tags: ["Blockchain", "Basics"],
    duration: 2.5,
  },
  {
    id: "c2",
    title: "Solidity Smart Contracts",
    description:
      "Hands-on course on writing, testing, and deploying smart contracts using Solidity.",
    category: "Smart Contracts",
    tags: ["Solidity", "Smart Contracts"],
    duration: 4,
  },
  {
    id: "c3",
    title: "DeFi Protocols Explained",
    description:
      "Deep dive into decentralized finance protocols, AMMs, lending platforms, and yield farming.",
    category: "DeFi",
    tags: ["DeFi", "AMM", "Yield Farming"],
    duration: 3,
  },
  {
    id: "c4",
    title: "NFT Creation & Markets",
    description:
      "Create your own NFTs, understand marketplaces, royalties, and smart contract standards.",
    category: "NFTs",
    tags: ["NFT", "ERC-721"],
    duration: 2,
  },
  {
    id: "c5",
    title: "Web3 Security Best Practices",
    description:
      "Learn to audit smart contracts, avoid common vulnerabilities, and secure your dApps.",
    category: "Security",
    tags: ["Audit", "Vulnerabilities"],
    duration: 3.5,
  },
];
