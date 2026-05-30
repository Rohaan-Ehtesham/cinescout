import { NavLink } from 'react-router-dom';

export default function NavBar({ city, onOpenCityModal, navOpen, setNavOpen }) {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        <div className="logo-dot" />
        CINE<span>SCOUT</span>
      </NavLink>

      <div className={navOpen ? 'nav-links open' : 'nav-links'}>
        <NavLink to="/" end onClick={() => setNavOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/now-showing" onClick={() => setNavOpen(false)}>
          Now Showing
        </NavLink>
        <NavLink to="/venues" onClick={() => setNavOpen(false)}>
          Venues
        </NavLink>
        <NavLink to="/coming-soon" onClick={() => setNavOpen(false)}>
          Coming Soon
        </NavLink>
        <NavLink to="/about" onClick={() => setNavOpen(false)}>
          About
        </NavLink>
      </div>

      <div className="nav-city">
        <button className="city-badge" onClick={onOpenCityModal}>
          {city}
        </button>
      </div>
      <button className="nav-hamburger" aria-label="Menu" onClick={() => setNavOpen((open) => !open)}>
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
