export const refreshFrequency = 3600000 // aggiorna ogni ora

export const className = `
  position: fixed;
  bottom: 40px;
  left: 160px;
  z-index: 10;
  font-family: 'Monaspace Krypton', monospace;

  .container {
    background: rgba(26, 22, 18, 0.75);
    border: 1px solid #3d3828;
    border-radius: 12px;
    padding: 16px 20px;
    backdrop-filter: blur(10px);
  }

  .title {
    font-size: 11px;
    color: #8aab6e;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .grid {
    display: flex;
    gap: 3px;
  }

  .week {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .day {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: #2e2a20;
  }

  .level-1 { background: #4a6a38; }
  .level-2 { background: #6a8a52; }
  .level-3 { background: #8aab6e; }
  .level-4 { background: #a0c080; }

  .footer {
    margin-top: 10px;
    font-size: 10px;
    color: #6b6355;
    display: flex;
    justify-content: space-between;
  }

  .total {
    color: #b5c9a1;
    font-size: 11px;
  }
`

export const command = `curl -s "https://github-contributions-api.jogruber.de/v4/rgabrex?y=last"`;

export const render = ({ output, error }) => {
  if (error || !output) return <div className="container"><div className="title">⌀ github</div></div>

  let data
  try {
    data = JSON.parse(output)
  } catch(e) {
    return <div className="container"><div className="title">⌀ github</div></div>
  }

  const contributions = data.contributions || []
  const total = data.total?.lastYear || 0

  // Raggruppa per settimane (ultime 26 settimane)
  const weeks = []
  const last182 = contributions.slice(-182)
  for (let i = 0; i < last182.length; i += 7) {
    weeks.push(last182.slice(i, i + 7))
  }

  const getLevel = (count) => {
    if (count === 0) return ''
    if (count <= 2) return 'level-1'
    if (count <= 5) return 'level-2'
    if (count <= 9) return 'level-3'
    return 'level-4'
  }

  return (
    <div className="container">
      <div className="title">
        ⬡ github activity
      </div>
      <div className="grid">
        {weeks.map((week, wi) => (
          <div className="week" key={wi}>
            {week.map((day, di) => (
              <div
                key={di}
                className={`day ${getLevel(day.count)}`}
                title={`${day.date}: ${day.count}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="footer">
        <span>26 weeks</span>
        <span className="total">{total} contributions</span>
      </div>
    </div>
  )
}