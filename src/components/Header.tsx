import { JSX } from "react";
import "../styles/Header.css";

function Header(): JSX.Element {
  return (
    <header className="header">
      <h1 className="header-title">Task Manager</h1>
    </header>
  );
}

export default Header;
