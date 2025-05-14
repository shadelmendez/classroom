import React from 'react';

const OverviewTaskCard = ({ icon, title, date, description }) => {
  return (
    <div className="task-card">
      <div className="task-icon">{icon}</div>
      <div className="task-content">
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default OverviewTaskCard;