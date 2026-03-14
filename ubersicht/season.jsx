export const refreshFrequency = 3600000

export const className = `
  position: fixed;
  bottom: 300px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-family: 'Monaspace Krypton', monospace;

  .container {
    background: rgba(26, 22, 18, 0.65);
    border: 1px solid #3d3828;
    border-radius: 12px;
    padding: 16px 20px;
    backdrop-filter: blur(10px);
    min-width: 220px;
  }

  .season-title {
    font-size: 20px;
    color: #8aab6e;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .main {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
  }

  .season-icon {
    font-size: 42px;
    line-height: 1;
  }

  .season-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .season-name {
    font-size: 22px;
    font-weight: 800;
    line-height: 1;
  }

  .season-dates {
    font-size: 10px;
    color: #b5c9a1;
    letter-spacing: 1px;
  }

  .divider {
    border-top: 1px solid #3d3828;
    margin-bottom: 10px;
  }

  .countdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .countdown-label {
    font-size: 10px;
    color: #b2a797;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .countdown-days {
    font-size: 20px;
    font-weight: 800;
    color: #e8dcc8;
  }

  .countdown-unit {
    font-size: 10px;
    color: #b2a797;
    margin-left: 3px;
  }

  .progress-wrap {
    margin-top: 10px;
    height: 3px;
    background: #2e2a20;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-bar {
    height: 3px;
    border-radius: 2px;
  }
`

const SEASONS = [
  {
    name: 'Winter',
    icon: '❄️',
    color: '#a8c8e8',
    start: (y) => new Date(y, 11, 21),
    end: (y) => new Date(y + 1, 2, 20),
    dates: 'Dec 21 – Mar 20',
    next: 'Spring',
  },
  {
    name: 'Spring',
    icon: '🌸',
    color: '#f0a8c0',
    start: (y) => new Date(y, 2, 21),
    end: (y) => new Date(y, 5, 20),
    dates: 'Mar 21 – Jun 20',
    next: 'Summer',
  },
  {
    name: 'Summer',
    icon: '☀️',
    color: '#f5c97a',
    start: (y) => new Date(y, 5, 21),
    end: (y) => new Date(y, 8, 22),
    dates: 'Jun 21 – Sep 22',
    next: 'Autumn',
  },
  {
    name: 'Autumn',
    icon: '🍂',
    color: '#d4956a',
    start: (y) => new Date(y, 8, 23),
    end: (y) => new Date(y, 11, 20),
    dates: 'Sep 23 – Dec 20',
    next: 'Winter',
  },
]

const getSeason = () => {
  const now = new Date()
  const y = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()

  let current, seasonStart, seasonEnd

  if ((month === 2 && day >= 21) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
    current = SEASONS[1] // Spring
    seasonStart = new Date(y, 2, 21)
    seasonEnd = new Date(y, 5, 20)
  } else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) {
    current = SEASONS[2] // Summer
    seasonStart = new Date(y, 5, 21)
    seasonEnd = new Date(y, 8, 22)
  } else if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
    current = SEASONS[3] // Autumn
    seasonStart = new Date(y, 8, 23)
    seasonEnd = new Date(y, 11, 20)
  } else {
    current = SEASONS[0] // Winter
    seasonStart = month === 11 ? new Date(y, 11, 21) : new Date(y - 1, 11, 21)
    seasonEnd = new Date(y, 2, 20)
  }

  const daysLeft = Math.ceil((seasonEnd - now) / (1000 * 60 * 60 * 24))
  const totalDays = Math.ceil((seasonEnd - seasonStart) / (1000 * 60 * 60 * 24))
  const daysPassed = totalDays - daysLeft
  const progress = Math.round((daysPassed / totalDays) * 100)

  return { ...current, daysLeft, progress }
}

export const render = () => {
  const season = getSeason()

  return (
    <div className="container">
      <div className="season-title">◈ season</div>
      <div className="main">
        <div className="season-icon">{season.icon}</div>
        <div className="season-info">
          <div className="season-name" style={{ color: season.color }}>
            {season.name}
          </div>
          <div className="season-dates">{season.dates}</div>
        </div>
      </div>
      <div className="divider" />
      <div className="countdown">
        <div className="countdown-label">days until {season.next}</div>
        <div>
          <span className="countdown-days">{season.daysLeft}</span>
          <span className="countdown-unit">days</span>
        </div>
      </div>
      <div className="progress-wrap">
        <div
          className="progress-bar"
          style={{
            width: `${season.progress}%`,
            background: `linear-gradient(90deg, ${season.color}88, ${season.color})`,
          }}
        />
      </div>
    </div>
  )
}