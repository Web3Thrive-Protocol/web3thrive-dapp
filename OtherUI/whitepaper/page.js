'use client';
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';


const Button = React.forwardRef(
  ({ asChild = false, className = '', children, ...props }, ref) => {
    const Comp = asChild ? 'div' : 'button';
    return (
      <Comp
        ref={ref}
        className={
          `inline-flex items-center justify-center px-6 py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`
        }
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ className = '', children, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default function WhitepaperPage() {
  const sections = [
    {
      title: 'Introduction',
      content:
        'Web3Thrive is a Pan-African, Web3-native freelance platform that empowers users to learn cutting-edge skills, earn crypto rewards, and build a verifiable on-chain reputation accessible across the decentralized ecosystem.',
    },
    {
      title: 'Market Opportunity',
      content:
        'Africa hosts one of the fastest-growing young populations globally, yet access to reliable freelance platforms and up-to-date Web3 education remains limited. Web3Thrive bridges this gap by combining learning with real earning opportunities.',
    },
    {
      title: 'Platform Architecture',
      content:
        'Built on a modular microservices backend, our platform uses IPFS for content delivery, Ethereum-compatible chains for reputation storage, and a React/Next.js front-end for seamless UX.',
    },
    {
      title: 'On-chain Reputation',
      content:
        'Every completed task, skill badge, and client rating is recorded via decentralized identifiers (DIDs) and verifiable credentials, ensuring tamper-proof reputation that travels with your wallet.',
    },
    {
      title: 'Learning & Earning',
      content:
        'Users progress through structured learning paths, earn tokens for completing modules, and unlock freelance gigs. Payments and bounties settle instantly in stablecoins or native tokens on-chain.',
    },
    {
      title: 'Roadmap & Tokenomics',
      content:
        "Q2 2025: Launch Beta | Q4 2025: Mainnet Release | Token Supply: 1B W3T tokens | 10% to platform rewards, 20% to team, 70% to community incentives.",
    },
  ];

  return (
    <>
      <Head>
        <title>Whitepaper | Web3Thrive</title>
      </Head>

      <section className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Web3Thrive Whitepaper
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A Pan-African, Web3-native freelance platform combining learning, earning, and verifiable on-chain reputation.
        </motion.p>
        <Button
          asChild
          className="mt-8 rounded-2xl shadow-lg bg-white text-blue-900"
        >
          <a href="/whitepaper.pdf" download>
            Download Full Whitepaper
          </a>
        </Button>
      </section>

      <main className="container mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((sec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card>
                <CardContent>
                  <h2 className="text-2xl font-bold mb-3 text-indigo-800">
                    {sec.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {sec.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}