import { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { alerts, movies, seatLayout, upcomingMovies, venues } from './data.js';
import CityModal from './components/CityModal.jsx';
import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';
import SeatMap from './components/SeatMap.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

function Home({ city }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const featuredMovies = movies.filter((movie) => movie.city === city).slice(0, 5);
  const topVenues = venues.filter((venue) => venue.city === city && venue.featured).slice(0, 3);

  const handleSearch = () => {
    navigate(`/now-showing?search=${encodeURIComponent(query)}`);
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="hero-content">
          <div className="hero-text fade-in">
            <div className="tag">Your cinema companion</div>
            <h1>
              Find The <em>Perfect</em> Seat In <em>{city}</em>
            </h1>
            <p>
              Skip the hassle. Browse movies, pick your cinema, choose the best seat, and get real-time alerts before you leave home.
            </p>
            <div className="hero-actions">
              <Link to="/now-showing" className="btn btn-primary">
                🎬 Now Showing
              </Link>
              <Link to="/venues" className="btn btn-outline">
                🏟 Browse Venues
              </Link>
            </div>
            <div style={{ marginTop: 36, maxWidth: 480 }}>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search movies, cinemas, or genres…"
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>

          <div className="hero-features fade-in-2">
            <div className="feat-card">
              <div className="feat-icon">🪑</div>
              <div>
                <h4>Live Seat Availability</h4>
                <p>See exactly which seats are open before you commit.</p>
              </div>
            </div>
            <div className="feat-card">
              <div className="feat-icon">🔔</div>
              <div>
                <h4>Cancellation Alerts</h4>
                <p>Get notified instantly if a show changes or gets cancelled.</p>
              </div>
            </div>
            <div className="feat-card">
              <div className="feat-icon">🏙️</div>
              <div>
                <h4>Location-Aware</h4>
                <p>Cinemas ranked by distance from your neighbourhood.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--dark)', padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="section">
          <div className="section-header">
            <div>
              <div className="section-tag">On screens now</div>
              <h2>
                Now <span>Showing</span>
              </h2>
            </div>
            <Link to="/now-showing" className="btn btn-outline">
              View All →
            </Link>
          </div>

          <div className="movies-grid">
            {featuredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster">
                  <div className="movie-poster-placeholder" style={{ background: 'linear-gradient(135deg,#1a0a0a,#3d0000)' }}>
                    {movie.poster}
                  </div>
                  <div className={`movie-badge badge-${movie.badgeType}`}>{movie.badge}</div>
                  <div className="movie-rating-badge">⭐ {movie.rating}</div>
                  <div className="movie-overlay">
                    <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                      Get Tickets
                    </Link>
                  </div>
                </div>
                <div className="movie-info">
                  <div className="movie-genre">{movie.genre}</div>
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-meta">
                    <span>{movie.duration}</span>
                    <span>{movie.age}</span>
                    <span>{movie.director}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border)' }}>
        <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="section-header">
            <div>
              <div className="section-tag">Real-time</div>
              <h2>
                Show <span>Alerts</span>
              </h2>
            </div>
          </div>
          <div className="notif-list">
            {alerts.map((alert) => (
              <div key={alert.id} className={`notif-item ${alert.type}`}>
                <div className="notif-icon">{alert.type === 'danger' ? '🚨' : alert.type === 'warning' ? '⚠️' : '💡'}</div>
                <div className="notif-text">
                  <h4>{alert.title}</h4>
                  <p>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
        <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="section-header">
            <div>
              <div className="section-tag">Simple process</div>
              <h2>
                How <span>It Works</span>
              </h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
            {[
              { icon: '📍', title: 'Pick Your City', text: 'Select Karachi or Lahore and we’ll show every cinema near you.' },
              { icon: '🎬', title: 'Find Your Movie', text: 'Browse what’s playing, compare showtimes, and find the best screen.' },
              { icon: '🪑', title: 'Choose Your Seat', text: 'Live seat map shows availability so you can skip the bad rows.' },
              { icon: '🔔', title: 'Stay Informed', text: 'Instant alerts for cancellations, price drops, and new shows.' },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: 'var(--border)', marginBottom: 8 }}>01</div>
                <h3 style={{ fontSize: 16, color: 'var(--white)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="section-header">
            <div>
              <div className="section-tag">Top rated in {city}</div>
              <h2>
                Featured <span>Venues</span>
              </h2>
            </div>
            <Link to="/venues" className="btn btn-outline">
              All Venues →
            </Link>
          </div>

          <div className="venues-grid">
            {topVenues.map((venue) => (
              <div key={venue.id} className="venue-card">
                <div className="venue-header" style={{ background: 'linear-gradient(135deg,#0d001a,#1a0033)' }}>
                  🎭
                </div>
                <div className="venue-body">
                  <div className="venue-name">{venue.name}</div>
                  <div className="venue-location">📍 {venue.location}, {venue.city}</div>
                  <div className="venue-tags">
                    {venue.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={`venue-tag ${tag === 'gold' || tag === 'platinum' ? 'premium' : ''}`}>
                        {tag === 'gold' ? 'Gold Class' : tag === 'platinum' ? 'Platinum' : tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="venue-footer">
                  <div className="venue-screens">
                    <strong>{venue.screens}</strong> screens · <strong>{venue.seats}</strong> seats
                  </div>
                  <Link to={`/venue/${venue.id}`} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: 12 }}>
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function NowShowing({ city }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const [query, setQuery] = useState(initialSearch);
  const [genre, setGenre] = useState('all');

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) => {
        if (movie.city !== city) return false;
        const lowerQuery = query.toLowerCase();
        const isMatch =
          movie.title.toLowerCase().includes(lowerQuery) ||
          movie.genre.toLowerCase().includes(lowerQuery) ||
          movie.director.toLowerCase().includes(lowerQuery);
        const matchesGenre = genre === 'all' || movie.tags.includes(genre);
        return isMatch && matchesGenre;
      }),
    [query, genre, city]
  );

  return (
    <main>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg,#0a0a0a,#1a0505)' }}>
        <div className="page-hero-inner">
          <div className="tag">Live in cinemas</div>
          <h1>Now Showing in {city}</h1>
          <p>All films currently playing across every cinema in {city}.</p>
        </div>
      </div>

      <div className="section">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 28 }}>
          <div className="search-bar" style={{ maxWidth: 380, flex: 1 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search movies…"
              className="search-input"
            />
            <button>🔍</button>
          </div>
        </div>

        <div className="filter-bar">
          {['all', 'action', 'drama', 'comedy', 'horror', 'animation', 'local'].map((option) => (
            <button
              type="button"
              key={option}
              className={`filter-chip ${genre === option ? 'active' : ''}`}
              onClick={() => setGenre(option)}
            >
              {option === 'all' ? 'All' : option === 'local' ? '🇵🇰 Local' : option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        <div className="movies-grid" style={{ marginTop: 12 }}>
          {filteredMovies.length ? (
            filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster">
                  <div className="movie-poster-placeholder" style={{ background: 'linear-gradient(135deg,#0a0a0a,#3d0000)' }}>
                    {movie.poster}
                  </div>
                  <div className={`movie-badge badge-${movie.badgeType}`}>{movie.badge}</div>
                  <div className="movie-rating-badge">⭐ {movie.rating}</div>
                  <div className="movie-overlay">
                    <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                      Get Tickets
                    </Link>
                  </div>
                </div>
                <div className="movie-info">
                  <div className="movie-genre">{movie.genre}</div>
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-meta">
                    <span>{movie.duration}</span>
                    <span>{movie.age}</span>
                    <span>{movie.director}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: 'var(--muted)', textAlign: 'center', width: '100%', padding: '60px 0' }}>
              No movies found. Try another search or clear the filter.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Venues({ city, onCityChange }) {
  const [search, setSearch] = useState('');
  const [amenity, setAmenity] = useState('all');

  const visibleVenues = useMemo(
    () =>
      venues.filter((venue) => {
        if (venue.city !== city) return false;
        if (amenity !== 'all' && !venue.tags.includes(amenity)) return false;
        if (search && !venue.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [city, amenity, search]
  );

  return (
    <main>
      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="tag">All cities</div>
          <h1>Cinema <span style={{ color: 'var(--red)' }}>Venues</span></h1>
          <p>Every active cinema in Karachi and Lahore — with seating info, facilities, and ratings.</p>
        </div>
      </div>

      <div className="section">
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Karachi', 'Lahore'].map((candidate) => (
              <button
                key={candidate}
                type="button"
                className={city === candidate ? 'btn btn-primary' : 'btn btn-outline'}
                onClick={() => onCityChange(candidate)}
              >
                {candidate}
              </button>
            ))}
          </div>

          <div className="search-bar" style={{ maxWidth: 300 }}>
            <input
              type="text"
              placeholder="Search venues…"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>🔍</button>
          </div>
        </div>

        <div className="filter-bar" style={{ marginBottom: 24 }}>
          {['all', 'gold', 'imax', '4dx', '3d'].map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-chip ${amenity === filter ? 'active' : ''}`}
              onClick={() => setAmenity(filter)}
            >
              {filter === 'all' ? 'All' : filter.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="venues-grid">
          {visibleVenues.map((venue) => (
            <div key={venue.id} className="venue-card">
              <div className="venue-header" style={{ background: 'linear-gradient(135deg,#0d001a,#1a0033)' }}>
                🎭
              </div>
              <div className="venue-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="venue-name">{venue.name}</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--gold)' }}>⭐ {venue.rating}</div>
                </div>
                <div className="venue-location">📍 {venue.location}</div>
                <div className="venue-tags">
                  {venue.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className={`venue-tag ${tag === 'gold' || tag === 'platinum' ? 'premium' : ''}`}>
                      {tag === 'gold' ? 'Gold Class' : tag === 'platinum' ? 'Platinum' : tag.toUpperCase()}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{venue.description}</p>
              </div>
              <div className="venue-footer">
                <div className="venue-screens">
                  <strong>{venue.screens}</strong> screens · <strong>{venue.seats}</strong> seats
                </div>
                <Link to={`/venue/${venue.id}`} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: 12 }}>
                  View →
                </Link>
              </div>
            </div>
          ))}
          {!visibleVenues.length && (
            <div style={{ color: 'var(--muted)', width: '100%', textAlign: 'center', padding: 60 }}>
              No venues match your search. Try a different city or amenity.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function ComingSoon() {
  const [filter, setFilter] = useState('all');

  const filteredList = useMemo(
    () =>
      upcomingMovies.filter((movie) => {
        if (filter === 'all') return true;
        if (filter === 'local') return movie.tags.includes('local');
        return movie.tags.includes(filter);
      }),
    [filter]
  );

  return (
    <main>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg,var(--dark),#0d0d20)' }}>
        <div className="page-hero-inner">
          <div className="tag">On the horizon</div>
          <h1>
            Coming <span style={{ color: 'var(--red)' }}>Soon</span>
          </h1>
          <p>Upcoming releases to look forward to — set a reminder and never miss opening day.</p>
        </div>
      </div>

      <div className="section">
        <div className="filter-bar" style={{ marginBottom: 32 }}>
          {[
            { value: 'all', label: 'All Upcoming' },
            { value: 'june', label: 'June 2026' },
            { value: 'july', label: 'July 2026' },
            { value: 'august', label: 'August 2026' },
            { value: 'local', label: '🇵🇰 Pakistani' },
          ].map((option) => (
            <button
              type="button"
              key={option.value}
              className={`filter-chip ${filter === option.value ? 'active' : ''}`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="movies-grid">
          {filteredList.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                <div className="movie-poster-placeholder" style={{ background: 'linear-gradient(135deg,#1a0a00,#401e00)' }}>
                  {movie.poster}
                </div>
                <div className="movie-badge badge-soon">{movie.badge}</div>
                <div className="movie-overlay">
                  <button className="btn btn-primary" type="button">
                    🔔 Remind Me
                  </button>
                </div>
              </div>
              <div className="movie-info">
                <div className="movie-genre">{movie.genre}</div>
                <div className="movie-title">{movie.title}</div>
                <div className="movie-meta">
                  <span>{movie.release}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function About() {
  return (
    <main>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg,#0a0a0a,#1a0505)' }}>
        <div className="page-hero-inner">
          <div className="tag">Our story</div>
          <h1>
            About <span style={{ color: 'var(--red)' }}>CineScout</span>
          </h1>
          <p>Built for movie lovers who refuse to settle for a bad seat or a cancelled show.</p>
        </div>
      </div>

      <div className="section">
        <div className="about-grid" style={{ marginBottom: 64 }}>
          <div>
            <div className="section-tag">Why we built this</div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,5vw,56px)', color: 'var(--white)', letterSpacing: '0.03em', lineHeight: 1, marginBottom: 20 }}>
              Cinema Should Be <span style={{ color: 'var(--red)' }}>Hassle-Free</span>
            </h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
              We've all been there. You arrive at the cinema to find your show got cancelled without warning. You pick a seat that turns out to be right behind a pillar. You travel across the city to a sold-out screening you didn't know was almost full.
            </p>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
              CineScout was built to fix all of that. As a course project for Interface Design, we set out to create the one platform a cinema-goer in Karachi or Lahore would actually need.
            </p>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 24 }}>
              Real-time alerts for cancellations. Live seat availability. Venue ratings and facility info. All in one clean, fast interface that works on any device.
            </p>
            <Link to="/now-showing" className="btn btn-primary">
              🎬 Start Exploring
            </Link>
          </div>
          <div className="about-visual" style={{ minHeight: 320, display: 'grid', placeItems: 'center', background: 'rgba(232,0,28,0.08)', borderRadius: 24 }}>
            <span style={{ fontSize: 80 }}>🎬</span>
          </div>
        </div>

        <div className="stat-row" style={{ marginBottom: 64 }}>
          {[
            { value: '20', label: 'Active Venues' },
            { value: '2', label: 'Cities Covered' },
            { value: '100%', label: 'Free to Use' },
          ].map((item) => (
            <div key={item.label} className="stat-box">
              <div className="num">{item.value}</div>
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 64 }}>
          <div className="section-tag">The problems we solve</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4vw,48px)', color: 'var(--white)', letterSpacing: '0.03em', marginBottom: 32 }}>
            What Makes <span style={{ color: 'var(--red)' }}>CineScout</span> Different
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
            {[
              { icon: '🚨', title: 'Cancellation Alerts', text: 'We notify you instantly when a show is cancelled, rescheduled, or nearly full.' },
              { icon: '🪑', title: 'Live Seat Maps', text: 'See exactly which seats are taken and choose the best ones.' },
              { icon: '📍', title: 'Location-Smart', text: 'Cinemas sorted by distance from you. No more searching across multiple apps.' },
              { icon: '🏙️', title: 'Karachi & Lahore', text: 'Built specifically for Pakistan’s two biggest cinema markets.' },
              { icon: '🔔', title: 'Upcoming Reminders', text: 'Set a reminder for opening day and never miss a premiere.' },
              { icon: '🇵🇰', title: 'Supports Local Cinema', text: 'Pakistani films get equal billing and local runs are highlighted.' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 64 }}>
          <div className="section-tag">Interface Design — Course Project</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4vw,48px)', color: 'var(--white)', letterSpacing: '0.03em', marginBottom: 8 }}>
            The <span style={{ color: 'var(--red)' }}>Team</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32 }}>
            Built as a course project exploring UX design, information architecture, and frontend design principles.
          </p>
          <div className="team-grid">
            {[
              { icon: '👨‍🎨', title: 'Lead Designer', subtitle: 'UX / Concept' },
              { icon: '👩‍💻', title: 'Frontend Dev', subtitle: 'HTML / CSS / JS' },
              { icon: '👨‍🔬', title: 'UX Researcher', subtitle: 'User Testing' },
              { icon: '👩‍🎓', title: 'Content Strategist', subtitle: 'Copy / Data' },
            ].map((member) => (
              <div key={member.title} className="team-card">
                <div className="team-avatar">{member.icon}</div>
                <div className="team-name">{member.title}</div>
                <div className="team-role">{member.subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 64, background: 'linear-gradient(135deg,rgba(232,0,28,0.12),rgba(232,0,28,0.03))', border: '1px solid rgba(232,0,28,0.25)', borderRadius: 12, padding: 48, textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,4vw,48px)', color: 'var(--white)', letterSpacing: '0.03em', marginBottom: 12 }}>
            Got <span style={{ color: 'var(--red)' }}>Feedback?</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 480, margin: '0 auto 28px' }}>
            This is a student project — we'd love to hear how to make it better. What feature would make your cinema experience easier?
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-primary" onClick={() => window.alert('Thanks! Feedback flow will be added soon.') }>
              📬 Send Feedback
            </button>
            <Link to="/now-showing" className="btn btn-outline">
              🎬 Try the App
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function MovieDetail() {
  const { id } = useParams();
  const movie = movies.find((item) => item.id === id);
  const [selection, setSelection] = useState(movie ? movie.showtimes[0] : null);
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  useEffect(() => {
    if (movie) {
      setSelection(movie.showtimes[0] || null);
      setSelectedSeats(new Set());
    }
  }, [movie]);

  if (!movie) {
    return (
      <main style={{ padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
          <h2>Movie not found.</h2>
          <Link to="/now-showing" className="btn btn-outline" style={{ marginTop: 24 }}>
            Back to Now Showing
          </Link>
        </div>
      </main>
    );
  }

  const selectedPrice = selection ? selection.price : 0;
  const seatCount = selectedSeats.size;
  const totalPrice = seatCount * selectedPrice;

  const toggleSeat = (seatId) => {
    setSelectedSeats((current) => {
      const next = new Set(current);
      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        if (next.size < 6) next.add(seatId);
      }
      return next;
    });
  };

  return (
    <main>
      <div className="detail-hero" style={{ '--grad-color': 'linear-gradient(135deg,#1a0505,#0a0a0a)' }}>
        <div className="detail-hero-bg" />
        <div className="detail-hero-content" style={{ width: '100%' }}>
          <div className="detail-poster">{movie.poster}</div>
          <div className="detail-info">
            <div className="genre-tag">{movie.genre}</div>
            <h1>{movie.title}</h1>
            <div className="detail-meta">
              <div className="detail-meta-item">⭐ <strong>{movie.rating} / 10</strong></div>
              <div className="detail-meta-item">⏱ <strong>{movie.duration}</strong></div>
              <div className="detail-meta-item">🎬 <strong>{movie.director}</strong></div>
              <div className="detail-meta-item">🗓 <strong>May 2026</strong></div>
              <div className="detail-meta-item" style={{ background: 'var(--red)', color: 'white', padding: '3px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
                {movie.age}
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 500, lineHeight: 1.7 }}>{movie.description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              {['2D', '3D', 'IMAX'].map((format) => (
                <div key={format} style={{ background: 'rgba(255,255,255,0.07)', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>
                  {format}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(255,107,0,0.1)', borderTop: '2px solid rgba(255,107,0,0.5)', borderBottom: '1px solid var(--border)', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <span>
            High Demand: Friday & Saturday shows filling quickly. The 7:00 PM Nueplex show has only 18 seats remaining.
          </span>
        </div>
      </div>

      <div className="section">
        <div className="two-col">
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: 'var(--white)', marginBottom: 24, letterSpacing: '0.03em' }}>
              Select <span style={{ color: 'var(--red)' }}>Venue & Time</span>
            </h2>

            <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
              {['Thu 29', 'Fri 30', 'Sat 31', 'Sun 1 Jun', 'Mon 2 Jun'].map((date) => (
                <button
                  key={date}
                  type="button"
                  className="date-btn"
                  style={{
                    flexShrink: 0,
                    background: date === 'Thu 29' ? 'var(--red)' : 'var(--card)',
                    border: date === 'Thu 29' ? '1px solid var(--red)' : '1px solid var(--border)',
                    color: date === 'Thu 29' ? 'white' : 'var(--text)',
                  }}
                >
                  {date}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {movie.showtimes.map((showtime) => (
                <div key={showtime.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ padding: 16, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: 15 }}>{showtime.venue}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>Karachi · {showtime.format}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)', color: 'var(--gold)', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 3, textTransform: 'uppercase' }}>
                        {showtime.format}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div className="showtime-grid">
                      <button
                        type="button"
                        className={`showtime-pill ${selection?.id === showtime.id ? 'active' : ''} ${showtime.soldOut ? 'sold-out' : ''}`}
                        onClick={() => !showtime.soldOut && setSelection(showtime)}
                        disabled={showtime.soldOut}
                      >
                        {showtime.time}
                        <span className="format">{showtime.format}{showtime.label ? ` · ${showtime.label}` : ''}</span>
                        {showtime.soldOut && <span style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, display: 'block' }}>Sold out</span>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selection && (
              <div id="seatMapSection" style={{ marginTop: 32 }}>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: 'var(--white)', letterSpacing: '0.03em', marginBottom: 4 }}>
                  Choose Your <span style={{ color: 'var(--red)' }}>Seat</span>
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20 }}>
                  Showing for <strong style={{ color: 'var(--white)' }}>{selection.venue}</strong> at <strong style={{ color: 'var(--white)' }}>{selection.time}</strong>
                </p>
                <SeatMap layout={seatLayout} selectedSeats={selectedSeats} onToggleSeat={toggleSeat} />
              </div>
            )}
          </div>

          <div>
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-row">
                <span className="label">Film</span>
                <span className="value" style={{ textAlign: 'right', maxWidth: 180 }}>{movie.title}</span>
              </div>
              <div className="summary-row">
                <span className="label">Venue</span>
                <span className="value selected-showtime" style={{ textAlign: 'right', maxWidth: 180 }}>{selection?.venue || '—'}</span>
              </div>
              <div className="summary-row">
                <span className="label">Show</span>
                <span className="value" style={{ textAlign: 'right' }}>{selection?.time || '—'}</span>
              </div>
              <div className="summary-row">
                <span className="label">Seats (<span className="summary-seat-count">{seatCount}</span>)</span>
                <span className="value summary-seat-list" style={{ textAlign: 'right', maxWidth: 160 }}>{seatCount ? [...selectedSeats].join(', ') : '—'}</span>
              </div>
              <div className="summary-row">
                <span className="label">Price/seat</span>
                <span className="value">Rs. {selectedPrice.toLocaleString()}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span className="price summary-total-price">{seatCount ? `Rs. ${totalPrice.toLocaleString()}` : '—'}</span>
              </div>
              <button
                className="btn btn-primary proceed-btn"
                style={{ width: '100%', justifyContent: 'center', marginTop: 20, padding: 14, fontSize: 15, opacity: seatCount ? 1 : 0.5 }}
                disabled={!seatCount}
                type="button"
                onClick={() => window.alert(`Booking confirmed for ${[...selectedSeats].join(', ')} at ${selection.time}!`) }
              >
                Proceed to Payment →
              </button>
              <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>
                Tickets are non-refundable once booked.
              </p>
            </div>

            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 20, marginTop: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 12 }}>🎯 Seat Tips</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>🟡 Rows D–G are the sweet spot for most screens.</p>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>👑 Premium rows (A–C) have extra legroom.</p>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>🚪 Aisle seats are easier to exit if needed.</p>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>🔇 Back rows have less neck strain on big screens.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function VenueDetail() {
  const { id } = useParams();
  const venue = venues.find((item) => item.id === id);
  const [activeTab, setActiveTab] = useState('shows');

  if (!venue) {
    return (
      <main style={{ padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
          <h2>Venue not found.</h2>
          <Link to="/venues" className="btn btn-outline" style={{ marginTop: 24 }}>
            Back to Venues
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="detail-hero" style={{ minHeight: 380, '--grad-color': 'linear-gradient(135deg,#0d001a,#1a0033)' }}>
        <div className="detail-hero-bg" />
        <div className="detail-hero-content" style={{ width: '100%' }}>
          <div className="detail-poster" style={{ fontSize: 80, height: 160, width: 160 }}>
            🎭
          </div>
          <div className="detail-info">
            <div className="genre-tag">{venue.address}</div>
            <h1>{venue.name}</h1>
            <div className="detail-meta">
              <div className="detail-meta-item">⭐ <strong>{venue.rating} / 5</strong></div>
              <div className="detail-meta-item">🎬 <strong>{venue.screens} screens</strong></div>
              <div className="detail-meta-item">💺 <strong>{venue.seats} seats</strong></div>
              <div className="detail-meta-item">📞 <strong>{venue.phone}</strong></div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
              {venue.amenities.slice(0, 4).map((name) => (
                <span key={name} style={{ background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)', color: 'var(--gold)', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 4 }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="tabs" data-group="venue">
          {[
            { id: 'shows', title: 'Now Showing' },
            { id: 'screens', title: 'Our Screens' },
            { id: 'info', title: 'Info & Facilities' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              data-group="venue"
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className={`tab-content ${activeTab === 'shows' ? 'active' : ''}`}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: 'var(--white)', marginBottom: 20 }}>
            Playing at <span style={{ color: 'var(--red)' }}>{venue.name}</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {movies.filter((movie) => movie.showtimes.some((showtime) => showtime.venue === venue.id)).map((movie) => (
              <div key={movie.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 0 }}>
                  <div style={{ width: 72, background: 'linear-gradient(135deg,#1a0a0a,#3d0000)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                    {movie.poster}
                  </div>
                  <div>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: 15 }}>{movie.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{movie.genre} · {movie.duration} · {movie.age}</div>
                      </div>
                      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--gold)' }}>⭐ {movie.rating}</div>
                    </div>
                    <div style={{ padding: '14px 20px' }}>
                      <div className="showtime-grid">
                        {movie.showtimes.filter((showtime) => showtime.venue === venue.id).map((showtime) => (
                          <Link key={showtime.id} to={`/movie/${movie.id}`} className="showtime-pill" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                            {showtime.time}
                            <span className="format">{showtime.format}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`tab-content ${activeTab === 'screens' ? 'active' : ''}`}>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: 'var(--white)', marginBottom: 20 }}>
            Our <span style={{ color: 'var(--red)' }}>Screens</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
            {venue.screensInfo.map((screen) => (
              <div key={screen.name} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 20 }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: 'var(--white)', marginBottom: 4 }}>{screen.name}</div>
                <div style={{ fontSize: 13, color: 'var(--red)', fontWeight: 600, marginBottom: 10 }}>{screen.label}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{screen.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`tab-content ${activeTab === 'info' ? 'active' : ''}`}>
          <div className="about-grid" style={{ gap: 40 }}>
            <div>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: 'var(--white)', marginBottom: 20 }}>
                About <span style={{ color: 'var(--red)' }}>{venue.name}</span>
              </h3>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>{venue.description}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '📍', label: 'Address', text: venue.address },
                  { icon: '⏰', label: 'Opening Hours', text: venue.hours },
                  { icon: '📞', label: 'Phone', text: venue.phone },
                  { icon: '🌐', label: 'Ticket Range', text: venue.price || 'Rs. 750 – 1,200' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--white)' }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: 'var(--muted)' }}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--white)', marginBottom: 16 }}>Facilities</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {venue.amenities.map((amenity) => (
                  <div key={amenity} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, padding: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text)' }}>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <main style={{ padding: '120px 24px 80px', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--white)', marginBottom: 16 }}>Page not found</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </main>
  );
}

export default function App() {
  const [city, setCity] = useLocalStorage('cinescout_city', 'Karachi');
  const [modalOpen, setModalOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <HashRouter>
      <div className={mounted ? 'app mounted' : 'app'}>
        <NavBar city={city} onOpenCityModal={() => setModalOpen(true)} navOpen={navOpen} setNavOpen={setNavOpen} />
        <CityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} city={city} onSelectCity={(value) => setCity(value)} />
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home city={city} />} />
            <Route path="/now-showing" element={<NowShowing city={city} />} />
            <Route path="/venues" element={<Venues city={city} onCityChange={setCity} />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/about" element={<About />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/venue/:id" element={<VenueDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}
