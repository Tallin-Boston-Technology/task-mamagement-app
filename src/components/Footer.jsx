import "../styles/Footer.css";

export default function Footer({ renderCount }) {
  return (
    <footer className="footer">
      <p>
        Page Renders: <strong>{renderCount}</strong>
      </p>
    </footer>
  );
}
