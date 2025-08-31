import React from "react";
import avatar1 from '../assets/avatars/avatar-16-svgrepo-com.svg';
import avatar2 from '../assets/avatars/avatar-17-svgrepo-com.svg';
import avatar3 from '../assets/avatars/avatar-2-svgrepo-com.svg';
import avatar4 from '../assets/avatars/avatar-4-svgrepo-com.svg';
import avatar5 from '../assets/avatars/avatar-5-svgrepo-com.svg';
const team = [
  {
    name: "Aman Agrawal",
    email: "aman.agrawal@socgen.com",
    specialization: "Full Stack Development, Security",
    department: "GSCIN-GCO-CFT-RRR PRITEC",
    github: "https://sgithub.fr.world.socgen/aman-agrawal",
    avatar: avatar2
  },
  {
    name: "Vishal Sharma",
    email: "vishal.sharma@socgen.com",
    specialization: "Backend, Cloud & DevOps",
    department: "GSCIN GCO-CFT-PFX PRITEC",
    github: "https://sgithub.fr.world.socgen/vishal-sharma",
    avatar: avatar3
  },
  {
    name: "Priyanshu Mandil",
    email: "priyanshu.mandil@socgen.com",
    specialization: "Frontend, UI/UX",
    department: "GSCIN-GCO-CFT-CRL PRITEC",
    github: "https://sgithub.fr.world.socgen/priyanshu-mandil",
    avatar: avatar4
  },
  {
    name: "Sejal Sanap",
    email: "sejal.sanap@socgen.com",
    specialization: "Data Science, Analytics",
    department: "GSCIN-GCO-CFT-CRL PRITEC",
    github: "https://sgithub.fr.world.socgen/sejal-sanap",
    avatar: avatar1
  },
  {
    name: "Ritika Kumari",
    email: "ritika.kumari@socgen.com",
    specialization: "Product, Documentation",
    department: "GSCIN-GCO-CFT-TSR PRITEC",
    github: "https://sgithub.fr.world.socgen/ritika-kumari",
    avatar: avatar5
  }
];

const About = () => (
  <div className="container py-5">
    <h1 className="mb-4 text-center fw-bold" style={{ fontSize: '2.5rem', letterSpacing: 1 }}>👥 About Us</h1>
    <p className="lead text-center mb-5">We are a passionate team of engineers, designers, and data scientists building secure, innovative data anonymization solutions for the future.</p>
    <div className="row justify-content-center">
      {team.map((member, idx) => (
        <div className="col-md-6 col-lg-4 mb-4" key={idx}>
          <div className="card shadow h-100 border-0">
            <div className="card-body text-center">
              <img
                src={member.avatar}
                alt={member.name + ' avatar'}
                style={{ width: 90, height: 90, borderRadius: '50%', marginBottom: 16, border: '3px solid #eee', background: '#f8f9fa' }}
              />
              <h4 className="card-title fw-semibold mb-2">{member.name}</h4>
              <p className="mb-1"><b>Specialization:</b> {member.specialization}</p>
              <p className="mb-1"><b>Department:</b> {member.department}</p>
              <p className="mb-1"><b>Email:</b> <a href={`mailto:${member.email}`}>{member.email}</a></p>
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark mt-2">
                <i className="icon icon-github me-2"></i>GitHub
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-5">
      <h3 className="fw-bold">Let's build a safer data future together!</h3>
    </div>
  </div>
);

export default About;
