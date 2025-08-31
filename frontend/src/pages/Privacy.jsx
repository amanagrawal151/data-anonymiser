import React from "react";

const Privacy = () => (
  <div className="container py-5">
    <h1 className="mb-4 text-center fw-bold" style={{ fontSize: '2.5rem', letterSpacing: 1 }}>🔒 Privacy Policy</h1>
    <p className="lead text-center mb-5">Your privacy and data security are our top priorities. This policy explains how we collect, use, and protect your information on the Data Anonymizer platform.</p>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">1. Data Collection</h2>
      <ul className="fs-5">
        <li>We collect only the minimum information required to provide our services: your name, email, department, and files you upload.</li>
        <li>All uploads are encrypted and stored securely. We never access your file contents without your consent.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">2. Data Usage</h2>
      <ul className="fs-5">
        <li>Your data is used solely for anonymization, encryption, and providing you with analytics and notifications.</li>
        <li>We do not sell, rent, or share your personal data with third parties.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">3. Data Security</h2>
      <ul className="fs-5">
        <li>All data is encrypted in transit (HTTPS) and at rest (S3, MongoDB).</li>
        <li>Access to your files and stats is restricted to your account only.</li>
        <li>We use strong cryptography and regular security audits to protect your information.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">4. User Control</h2>
      <ul className="fs-5">
        <li>You can view, download, or delete your files and stats at any time from your dashboard.</li>
        <li>Contact us to request data export or account deletion.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">5. Cookies & Tracking</h2>
      <ul className="fs-5">
        <li>We use cookies only for authentication and session management. No tracking or advertising cookies are used.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">6. Changes to Policy</h2>
      <ul className="fs-5">
        <li>We may update this policy to reflect new features or legal requirements. You will be notified of any major changes.</li>
      </ul>
    </section>

    <div className="text-center mt-5">
      <h3 className="fw-bold">Questions? <span style={{ color: '#007bff' }}>Contact our team for more information.</span></h3>
      <p className="text-secondary">Your trust is our responsibility.</p>
    </div>
  </div>
);

export default Privacy;
