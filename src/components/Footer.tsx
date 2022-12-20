import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-neutral-content min-h-[14rem]">
      <div>
        <span className="footer-title">Services</span>
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/discover" className="link link-hover">
          Discover
        </Link>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a
          className="link link-hover"
          href="https://www.kailon.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}

export default Footer;
