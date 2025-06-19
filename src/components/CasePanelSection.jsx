import React from "react";

const CasePanelSection = ({ title, subtitle, description, children }) => {
  return (
    <div className="case-panel-section">
      <h3>{title}</h3>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {description && <p className="description">{description}</p>}
      {children}
    </div>
  );
};

export default CasePanelSection;
