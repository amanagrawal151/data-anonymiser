import React from "react";

const Guide = () => (
  <div className="container py-5">
    <h1 className="mb-4 text-center fw-bold" style={{ fontSize: '2.5rem', letterSpacing: 1 }}>🚀 Data Anonymizer User Guide</h1>
    <p className="lead text-center mb-5">Welcome to your all-in-one data anonymization platform! This guide will help you get started, explore features, and master secure, privacy-first data workflows.</p>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">1. Getting Started</h2>
      <ul className="fs-5">
        <li>Sign up or log in to your account. Your dashboard will greet you with a personalized welcome and your latest notifications.</li>
        <li>All your actions are secure and tracked. Your data is never stored in plain text.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">2. Uploading Files</h2>
      <ol className="fs-5">
        <li>Click <b>Upload</b> or drag-and-drop your file into the uploader area.</li>
        <li>Supported file types: CSV, XLSX, and more. File size and type are auto-detected.</li>
        <li>On upload, a secure pre-signed S3 URL is generated. Your file is sent directly to the cloud—fast and safe!</li>
        <li>Track upload progress and status in real time. Upload multiple files without leaving the page.</li>
      </ol>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">3. Data Anonymization & Encryption</h2>
      <ul className="fs-5">
        <li>Choose <b>encryption</b> or <b>decryption</b> for your files. We use strong cryptography (bcrypt, digital signatures, public/private keys).</li>
        <li>Each file is linked to your user account. Only you can decrypt your files.</li>
        <li>Verify file authenticity and encryption status at any time.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">4. Dashboard & Stats</h2>
      <ul className="fs-5">
        <li>See a summary of your uploads, anonymization actions, and stats—per user and per file.</li>
        <li>Filter, search, and sort your files. Use the sidebar for quick access to your profile and stats.</li>
        <li>All actions are logged for transparency and compliance.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">5. Notifications</h2>
      <ul className="fs-5">
        <li>Stay updated with real-time notifications: upload status, anonymization results, and system alerts.</li>
        <li>Notifications are personalized and stored per user. Never miss an important update!</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">6. Security & Privacy</h2>
      <ul className="fs-5">
        <li>All data is encrypted in transit and at rest. We use S3, MongoDB, and strong cryptography.</li>
        <li>Only you can access your files and stats. Admins cannot see your decrypted data.</li>
        <li>Audit logs and stats help you track every action for compliance.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">7. API & Integrations</h2>
      <ul className="fs-5">
        <li>Explore our <b>Swagger API docs</b> for all endpoints: users, files, stats, notifications, and cryptography.</li>
        <li>Integrate with your own tools using RESTful APIs and pre-signed S3 uploads.</li>
      </ul>
    </section>

    <section className="mb-5">
      <h2 className="fw-semibold mb-3">8. Tips & Innovations</h2>
      <ul className="fs-5">
        <li>Use filters and search to quickly find files and stats.</li>
        <li>Check notifications for instant feedback on your actions.</li>
        <li>Enjoy a modern, responsive UI built with React, Zustand, and Bootstrap.</li>
        <li>All features are modular—easy to extend and customize for your needs.</li>
      </ul>
    </section>

    <div className="text-center mt-5">
      <h3 className="fw-bold">Ready to anonymize your data? <span style={{ color: '#007bff' }}>Get started now!</span></h3>
      <p className="text-secondary">For help, check the API docs or contact support.</p>
    </div>
  </div>
);

export default Guide;
