import React from "react";

const footerStyle = {
  backgroundColor: "black",
  color: "#fff",
  padding: "40px 0",
  textAlign: "center",
};

const footerColumnsStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
};

const footerSectionColumnsStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px",
};

const footerSectionColumnItemsStyle = {
  fontSize: "14px",
  margin: "5px 0",
};

function Footer() {
  return (
    <div style={footerStyle}>
      <div className="footer-section-two" style={footerColumnsStyle}>
        <div className="footer-section-columns" style={footerSectionColumnsStyle}>
          <span style={footerSectionColumnItemsStyle}>Quality</span>
          <span style={footerSectionColumnItemsStyle}>Help</span>
          <span style={footerSectionColumnItemsStyle}>Share</span>
        </div>
        <div className="footer-section-columns" style={footerSectionColumnsStyle}>
          <span style={footerSectionColumnItemsStyle}>Careers</span>
          <span style={footerSectionColumnItemsStyle}>Testimonials</span>
          <span style={footerSectionColumnItemsStyle}>Work</span>
        </div>
        <div className="footer-section-columns" style={footerSectionColumnsStyle}>
          <span style={footerSectionColumnItemsStyle}>244-5333-7783</span>
          <span style={footerSectionColumnItemsStyle}>contact@zipkart.com</span>
        </div>
        <div className="footer-section-columns" style={footerSectionColumnsStyle}>
          <span style={footerSectionColumnItemsStyle}>Terms &amp; Conditions</span>
          <span style={footerSectionColumnItemsStyle}>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
