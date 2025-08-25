import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '🎓',
      title: 'Role-Based Access',
      description: 'Students, teachers, and administrators each have tailored interfaces and permissions.'
    },
    {
      icon: '📹',
      title: 'Video Management',
      description: 'Teachers can upload, manage, and organize educational video content with ease.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Students can track their learning progress and receive personalized recommendations.'
    },
    {
      icon: '💬',
      title: 'Interactive Learning',
      description: 'Engage with instructors and peers through discussions and Q&A sessions.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access your courses from any device, anywhere, anytime.'
    },
    {
      icon: '🏆',
      title: 'Certification',
      description: 'Earn certificates upon course completion to showcase your skills.'
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2>Why Choose PAPIRA?</h2>
        <p className="features-subtitle">
          Discover the features that make our virtual campus the perfect learning environment
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;