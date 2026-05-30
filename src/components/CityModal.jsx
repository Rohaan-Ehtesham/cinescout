export default function CityModal({ isOpen, onClose, city, onSelectCity }) {
  const cities = [
    { name: 'Karachi', icon: '🌊', venues: 12 },
    { name: 'Lahore', icon: '🏛️', venues: 8 },
  ];

  return (
    <div className={isOpen ? 'modal-overlay open' : 'modal-overlay'} onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-box">
        <h2>Choose Your City</h2>
        <p>We'll show you cinemas and showtimes near you.</p>
        <div className="city-options">
          {cities.map((option) => (
            <button key={option.name} className="city-option" onClick={() => { onSelectCity(option.name); onClose(); }}>
              <span className="city-icon">{option.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--white)' }}>{option.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{option.venues} active venues</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
