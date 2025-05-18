import React from 'react';

const OverviewHeader = ({ title, subtitle, image }) => {
  return (
    <div className="header">
      <img src={image} alt="Banner" className="header-image" />
      <div className="header-text">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </div>
  );
};

export default OverviewHeader;