const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function SeatMap({ layout, selectedSeats, onToggleSeat }) {
  const { rows, cols, takenSeats, premiumRows } = layout;

  return (
    <div className="seat-map-wrap">
      <div className="screen-label">
        <div className="screen-bar" />
        <span>SCREEN</span>
      </div>
      <div className="seat-grid">
        {Array.from({ length: rows }, (_, rowIndex) => {
          const rowLabel = rowLabels[rowIndex];
          return (
            <div key={rowLabel} className="seat-row">
              <div className="row-label">{rowLabel}</div>
              {Array.from({ length: cols }, (_, colIndex) => {
                if (colIndex === Math.floor(cols / 2)) {
                  return <div key={`aisle-${colIndex}`} className="seat aisle" />;
                }

                const seatId = `${rowLabel}${colIndex + 1}`;
                const isTaken = takenSeats.includes(seatId);
                const isPremium = premiumRows.includes(rowIndex);
                const isSelected = selectedSeats.has(seatId);
                const classes = ['seat', isTaken ? 'taken' : 'available', isPremium && !isTaken ? 'premium' : '', isSelected ? 'selected' : '']
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={seatId}
                    type="button"
                    className={classes}
                    disabled={isTaken}
                    onClick={() => onToggleSeat(seatId)}
                  >
                    {seatId}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-dot available" />Available
        </div>
        <div className="legend-item">
          <div className="legend-dot taken" />Taken
        </div>
        <div className="legend-item">
          <div className="legend-dot selected" />Your Selection
        </div>
        <div className="legend-item">
          <div className="legend-dot premium" />Premium
        </div>
      </div>
    </div>
  );
}
