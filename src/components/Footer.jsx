import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">CINE<span>SCOUT</span></div>
            <p>Pakistan's smartest cinema companion for Karachi and Lahore.</p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/now-showing">Now Showing</Link>
              </li>
              <li>
                <Link to="/venues">Venues</Link>
              </li>
              <li>
                <Link to="/coming-soon">Coming Soon</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Cities</h4>
            <ul>
              <li>
                <Link to="/venues">Karachi Venues</Link>
              </li>
              <li>
                <Link to="/venues">Lahore Venues</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CineScout. Interface Design Course Project.</p>
          <div className="mono">KARACHI • LAHORE</div>
        </div>
      </div>
    </footer>
  );
}
