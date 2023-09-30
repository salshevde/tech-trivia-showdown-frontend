// Routing imports
import { Link } from "react-router-dom";

// MAIN
export default function Home() {
  return (
    <>
      <nav>
        <div className="a">
          <Link to="/Admin">
            <h1>Admin</h1>
          </Link>
        </div>
        <div className="par">
          <Link to="/Participant">
            <h1>Participant</h1>
          </Link>
        </div>
        <div className="par">
          <Link to="/Team-client">
            <h1>Participant Client</h1>
          </Link>
        </div>
        <div className="pres">
          <Link to="/Presenter">
            <h1>Presenter</h1>
          </Link>
        </div>
      </nav>
    </>
  );
}
