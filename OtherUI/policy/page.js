"use client"
import Head from 'next/head';

export default function PrivacyPolicy() {
  const policySections = [
    {
      title: "Data We Collect",
      description:
        "We collect personal information you voluntarily provide when you register, request information, or otherwise contact us, including your name, email address, wallet address, and learning progress.",
    },
    {
      title: "How We Use Your Information",
      description:
        "We use your data to power the Web3Thrive platform—enabling authentication, learning module tracking, freelance matching, on‑chain reputation issuance, and to communicate platform updates and offers.",
    },
    {
      title: "Information Sharing & Disclosure",
      description:
        "We never sell your personal data. We only share it with service providers when necessary to run the platform (e.g. analytics, payment processors) or if required by law to protect our rights.",
    },
    {
      title: "Data Security",
      description:
        "We implement industry‑standard technical and organizational measures—encryption, secure key management, and regular audits—to protect your data from unauthorized access or disclosure.",
    },
    {
      title: "Your Rights",
      description:
        "You have the right to access, correct, delete, or port your personal information. You can also object to processing or withdraw consent at any time by contacting us.",
    },
    {
      title: "Changes to This Policy",
      description:
        "We may update this Privacy Policy to reflect changes in our practices. When we do, we’ll update the “Last Updated” date below and notify you through the platform.",
    },
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy | Web3Thrive</title>
      </Head>

      <main className="container">
        <p className="intro">
          Welcome to Web3Thrive’s Privacy Policy. This explains how we collect,
          use, and protect your personal information when you use our
          Pan‑African, Web3‑native freelance platform.
        </p>

        <p className="last-updated">Last Updated: April 12, 2025</p>

        {policySections.map((section, idx) => (
          <section className="policy-section" key={idx}>
            <h2 className="section-title">{section.title}</h2>
            <p className="section-description">{section.description}</p>
          </section>
        ))}

        <section className="contact">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please email
            us at{' '}
            <a href="mailto:privacy@web3thrive.com">
              privacy@web3thrive.com
            </a>
            .
          </p>
        </section>
      </main>

      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
          background: #0a1f44;
          color: white;
        }
        .back-link {
          display: flex;
          align-items: center;
          color: #a0c4ff;
          text-decoration: none;
          margin-right: 1rem;
          font-size: 0.9rem;
        }
        .back-link:hover {
          color: #d0e6ff;
        }
        .header h1 {
          margin: 0;
          font-size: 1.5rem;
        }
        .container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .intro {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .last-updated {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 2rem;
        }
        .policy-section {
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #0a1f44;
        }
        .section-description {
          font-size: 1rem;
          line-height: 1.6;
        }
        .contact h2 {
          font-size: 1.25rem;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }
        .contact a {
          color: #0a1f44;
          text-decoration: underline;
        }
        .contact a:hover {
          color: #023650;
        }
      `}</style>
    </>
  );
}