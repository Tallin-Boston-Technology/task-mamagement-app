import { JSX } from "react";
import "../styles/Footer.css";

interface FooterProps {
  renderCount: number;
}

function Footer({ renderCount }: FooterProps): JSX.Element {
  return (
    <footer className="footer">
      <p>
        Page Renders: <strong>{renderCount}</strong>
      </p>
    </footer>
  );
}

export default Footer;
