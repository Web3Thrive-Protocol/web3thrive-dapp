"use client";
import { useRef, useEffect } from "react";
import Typed from "typed.js";
import {
  BrainCog,
  Briefcase,
  GraduationCap,
  Shield,
  ChevronRight,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";


export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Freelance.", "Earn.", "Learn.", "Thrive."],
      typeSpeed: 100,
      backSpeed: 30,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const howItWorks = [
    {
      id: 1,
      title: "Get a wallet",
      description:
        "Connect a wallet and create a profile.",
    },
    {
      id: 2,
      title: "Explore learning paths",
      description:
        "Browse learning paths for African web3.",
    },
    {
      id: 3,
      title: "Learn to earn",
      description:
        "Learn and receive rewards upon completion.",
    },
    {
      id: 4,
      title: "Unlock freelance opportunities",
      description:
        "Gain access to freelance opportunities that align with your expertise.",
    },
  ];

  return (
    <>
      <div className="relative min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <section className="max-w-4xl w-full text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            <span ref={el} className="text-indigo-600" />
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            <span className="font-bold text-black">Web3Thrive</span> helps you
            start or grow your freelance career in Web3 —<br />
            learn with curated courses, earn by working, and thrive in the
            crypto economy.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full border-none text-lg font-medium hover:bg-indigo-700 transition duration-300">
            Get Started
          </button>
        </section>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Active Freelancers", value: "2,000+" },
              {
                icon: Briefcase,
                label: "Projects Completed",
                value: "10,000+",
              },
              { icon: Star, label: "Client Satisfaction", value: "4.8/5" },
              { icon: Wallet, label: "Paid to Freelancers", value: "$1M+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 text-center border-1 border-gray-300 rounded-lg backdrop-blur-sm hover:border-gray-900 0.1"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* courses section */}
      <section className="py-24 flex flex-col items-center px-4 md:px-8 bg-white">
        {/* Section Tag */}
        <div className="flex justify-center text-center rounded-full p-2 bg-gray-100 w-[120px] mb-4">
          <h2 className="uppercase text-xs font-semibold text-indigo-600 tracking-wide">
            Courses
          </h2>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 leading-snug">
          Learn & Earn NFTs that Prove Your Skills
        </h1>

        {/* Subtitle */}
        <p className="text-md md:text-sm text-center text-gray-600 max-w-2xl mb-12">
          Web3Thrive courses help you build real-world skills and earn NFTs that
          validate your growth and enhance your reputation as a Web3 freelancer.
        </p>

        {/* NFT Course Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl w-full">
          {/* Card 1 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
          <Image
                src="/solidity.png" 
                alt="Solidity Badge"
                width={100}
                height={100}
                className="object-cover rounded-xl mb-30"
              />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Solidity Basics
            </h3>
            <p className="text-sm text-gray-600">
              Learn smart contract fundamentals and earn your first NFT badge.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
          <Image
                src="/ux.png" 
                alt="UX Badge"
                width={100}
                height={100}
                className="object-cover rounded-xl mb-30"
              />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Crypto UX Design
            </h3>
            <p className="text-sm text-gray-600">
              Explore the art of user experience in dApps and get rewarded.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
          <Image
                src="/defi.png" 
                alt="Defi Badge"
                width={100}
                height={100}
                className="object-cover rounded-xl mb-30"
              />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              DeFi Mastery
            </h3>
            <p className="text-sm text-gray-600">
              Dive into decentralized finance, protocols, and practical use
              cases.
            </p>
          </div>
        </div>
      </section>

      {/* how it works section */}
      <section className="py-24 px-4 bg-gray-50 flex flex-col md:px-24">
        {/* Section Tag */}
        <div className="flex mx-auto flex-col justify-center text-center items-center rounded-full p-2 bg-gray-100 w-[120px] mb-4">
          <h2 className="uppercase text-xs font-semibold text-indigo-600 tracking-wide">
            How it works
          </h2>
        </div>

        <div className="grid px-8 gap-8 sm:grid-cols-2 md:grid-cols-2 md:px-12 lg:px-24">
          <div className="flex flex-col justify-between max-w-full items-center md:justify-center md:items-start">
            <h1 className="text-3xl font-font-semibold mb-0.5 text-center md:text-left">
              How it works
            </h1>
            <p className="text-gray-600 text-sm text-center mb-2 md:text-left">
              The more you learn and freelance, the more street credit you earn,
              the more earning opportunities you unlock.
            </p>
            <button className="border-1 p-2 border-gray-400 rounded-4xl text-gray-700 text-sm hover:border-black hover:text-black cursor-pointer">
              Read our FAQ
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-5 sm:mt-0">
            {howItWorks.map((how) => (
              <div className="px-4 flex flex-start gap-12" key={how.id}>
                <div className="flex flex-col items-center justify-center gap-5 pt-1">
                  <div className="w-1 h-1 rounded-full bg-indigo-600"></div>
                  <div className="w-1 h-1 rounded-full bg-indigo-600"></div>
                  <div className="w-1 h-1 rounded-full bg-indigo-600"></div>
                  <div className="w-1 h-1 rounded-full bg-indigo-600 opacity-20"></div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xl tracking-tight text-black font-semibold">
                    {how.title}
                  </p>
                  <p className="text-sm tracking-tight text-black/50 sm:max-w-xs">
                    {how.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* our vision */}
      <section className="relative py-24 px-4 flex flex-col justify-between item-center">

        {/* Background PNG Pattern */}
        <div
          className="absolute inset-0 bg-center bg-contain opacity-10"
          style={{ backgroundImage: "url('/hollowed-boxes.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent z-0" />
        {/* Section Tag */}
        <div className="flex mx-auto flex-col justify-center text-center items-center rounded-full p-2 bg-gray-100 w-[120px] mb-4">
          <h2 className="uppercase text-xs font-semibold text-indigo-600 tracking-wide">
            Our Vision
          </h2>
        </div>


        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-3 md:px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-snug">
            A world where your{" "}
            <span className="text-indigo-600">contribution</span> means more
            than your capital.
          </h1>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            At Web3Thrive, we believe the future of work lies in borderless
            opportunities. Our mission is to empower people regardless of
            background or location with the skills, reputation, and tools to
            thrive in the Web3 economy.
          </p>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 bg-background">
        {/* Section Tag */}
        <div className="flex mx-auto flex-col justify-center text-center items-center rounded-full p-2 bg-gray-100 w-[120px] mb-4">
          <h2 className="uppercase text-xs font-semibold text-indigo-600 tracking-wide">
            Features
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-indigo-600">Web3Thrive</span>?
            </h2>
            <p className="text-sm text-muted-foreground text-black/50">
              Built for Africa's next generation of digital talent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Trust-Based System",
                description: "Blockchain-powered escrow and reputation system for secure transactions",
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-primary" />,
                title: "Learn & Earn",
                description: "Free learning modules to help you start your freelancing journey",
              },
              {
                icon: <Briefcase className="h-8 w-8 text-primary" />,
                title: "Quality Projects",
                description: "Curated opportunities from vetted businesses and startups",
              },
              {
                icon: <BrainCog className="h-8 w-8 text-primary" />,
                title: "Web3 Native",
                description: "Built on ApeChain for transparency and reduced fees",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 border-indigo-400 border-b-1 shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    {feature.icon}
                    <h3 className="mt-4 text-xl font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-black/50 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 sm:py-32 md:py-48 bg-gradient-to-r from-gray-100 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col justify-center items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of African freelancers building their careers on Web3
            </p>
            <button size="lg" className="bg-white p-2 rounded-full text-sm shadow-sm cursor-pointer hover:opacity-90 transition-all hover:bg-primary/90 flex justify-center items-center gap-0.5">
              Create Your Account
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
