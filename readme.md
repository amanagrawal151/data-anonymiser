# 🚀 Data Anonymizer

A full-stack, privacy-first data anonymization platform for secure file uploads, encryption, and analytics. Built with Express.js, MongoDB, S3, React, Zustand, and Bootstrap.

---

## 🌟 Features

- **Secure File Uploads**: Upload files directly to S3 using pre-signed URLs. All uploads are tracked and encrypted.
- **User Management**: Per-user file and stats tracking, with authentication and personalized dashboard.
- **Data Anonymization & Encryption**: Strong cryptography (bcrypt, digital signatures, public/private keys) for file protection.
- **Real-Time Notifications**: Stay updated on upload status, anonymization results, and system alerts.
- **Dashboard & Analytics**: Visualize your uploads, anonymization actions, and stats. Filter, search, and manage files easily.
- **Swagger API Docs**: Explore and test all backend endpoints with built-in Swagger UI.
- **Modern UI**: Responsive, beautiful frontend with React, Zustand, and Bootstrap.
- **Audit & Compliance**: All actions are logged for transparency and compliance.

---

## 🏗️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), AWS S3, Swagger
- **Frontend**: React, Zustand, Bootstrap, Chart.js
- **Other**: Multer, AWS SDK, bcrypt, digital signatures

---

## 🚦 Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/amanagrawal151/data-anonymiser.git
cd data-anonymiser
```

### 2. Backend Setup
```bash
cd backend
npm install
# Set up your .env file with MongoDB, AWS, and other secrets
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. API Docs
Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for Swagger UI.

---

## 📦 Folder Structure

```
backend/
  models/         # Mongoose schemas (User, File, Notification, Stats)
  routes/         # Express routes (user, file, s3, notification, stats, crypt)
  services/       # Business logic and S3 helpers
  ...
frontend/
  src/
    components/   # React components (navbar, sidebar, file-uploader, upload-status, etc.)
    pages/        # React pages (Home, Dashboard, Notification, Guide, About, Privacy, 404)
    assets/       # Local avatars and static assets
  ...
```

---

## 👥 Team
- Aman Agrawal (GSCIN-GCO-CFT-RRR PRITEC)
- Vishal Sharma (GSCIN GCO-CFT-PFX PRITEC)
- Priyanshu Mandil (GSCIN-GCO-CFT-CRL PRITEC)
- Sejal Sanap (GSCIN-GCO-CFT-CRL PRITEC)
- Ritika Kumari (GSCIN-GCO-CFT-TSR PRITEC)

---

## 🛡️ Security & Privacy
- All data is encrypted in transit and at rest.
- Only you can access your files and stats.
- No tracking or advertising cookies.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
MIT

---

## 💡 Inspiration
Built for privacy, compliance, and a seamless user experience. Empowering users to anonymize and control their data with confidence.

