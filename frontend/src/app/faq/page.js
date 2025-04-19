'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    title: 'What is Web3Thrive?',
    description:
      'Web3Thrive is a Pan‑African freelance platform that integrates Web3 tooling to help you learn in‑demand skills, earn crypto for your work, and build a verifiable on‑chain reputation.',
  },
  {
    title: 'How does on‑chain reputation work?',
    description:
      'Every completed gig, client rating, and skill badge is recorded on‑chain via decentralized identifiers (DIDs) and verifiable credentials—so your reputation travels with you across the Web3 ecosystem.',
  },
  {
    title: 'Do I need a crypto wallet to join?',
    description:
      'Yes. You’ll connect a WalletConnect‑compatible wallet (e.g. MetaMask) to sign in, receive payments, and store your on‑chain credentials securely.',
  },
  {
    title: 'How can I earn on Web3Thrive?',
    description:
      'You earn by completing freelance jobs, participating in community bounties, or contributing to open‑source initiatives—payments settle in stablecoins or native tokens instantly on‑chain.',
  },
  {
    title: 'What learning modules are available?',
    description:
      'Our curriculum covers Web3 development, smart‑contract auditing, UI/UX for decentralized apps, DAO governance, and more—tailored specifically for the African tech market.',
  },
  {
    title: 'Is there a fee to use the platform?',
    description:
      'Signing up and accessing learning content is 100% free. We charge a small 2% platform fee only on successful freelance transactions to keep Web3Thrive running and community‑driven.',
  },
];

export default function FAQ() {
  const [openStates, setOpenStates] = useState(() =>
    faqItems.map(() => false)
  );

  const toggle = (idx) => {
    setOpenStates((prev) =>
      prev.map((isOpen, i) => (i === idx ? !isOpen : isOpen))
    );
  };

  return (
    <section className="container">
      <h2>Frequently Asked Questions</h2>
      {faqItems.map((item, idx) => (
        <div className="item" key={idx}>
          <button
            className="question"
            onClick={() => toggle(idx)}
            aria-expanded={openStates[idx]}
          >
            <span>{item.title}</span>
            {openStates[idx] ? (
              <ChevronUp size={24} />
            ) : (
              <ChevronDown size={24} />
            )}
          </button>
          {openStates[idx] && (
            <div className="answer">
              <p>{item.description}</p>
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 3rem auto;
          padding: 2rem 1rem;
        }
        h2 {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
        }
        .item {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 1rem;
          overflow: hidden;
        }
        .question {
          width: 100%;
          background: #fafafa;
          border: none;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.125rem;
          cursor: pointer;
        }
        .question:hover {
          background: #f0f0f0;
        }
        .answer {
          background: #fff;
          padding: 1rem 1.5rem;
          line-height: 1.6;
          font-size: 1rem;
        }
      `}</style>
    </section>
  );
}