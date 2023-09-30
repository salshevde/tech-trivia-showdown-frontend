// Logo Images
import logo from "../images/logo.png";
import logoBottom from "../images/logoBottom.png"
// MAIN
export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
        <img src={logoBottom} alt="" />
      </div>
    </div>
  );
}
