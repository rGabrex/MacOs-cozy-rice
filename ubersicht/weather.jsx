export const refreshFrequency = 1800000 // 30 minuti

export const className = `
  position: fixed;
  top: 345px;
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

  .city {
    font-size: 20px;
    color: #8aab6e;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .main {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .temp {
    font-size: 42px;
    font-weight: 800;
    color: #e8dcc8;
    line-height: 1;
  }

  .unit {
    font-size: 20px;
    color: #6b6355;
  }

  .icon {
    font-size: 36px;
    color: #e8dcc8;
    line-height: 1;
    margin-right: 10px;
    font-family: 'JetBrainsMono Nerd Font';
  }

  .desc {
    font-size: 11px;
    color: #b5c9a1;
    text-transform: capitalize;
    margin-bottom: 10px;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-top: 1px solid #3d3828;
    padding-top: 10px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #6b6355;
  }

  .detail-value {
    color: #c8b49a;
  }
`

export const command = `curl -s "wttr.in/Milano?format=j1"`

export const render = ({ output, error }) => {
  if (error || !output) return (
    <div className="container">
      <div className="city">◌ milano</div>
      <div className="temp">--</div>
    </div>
  )

  let data
  try {
    data = JSON.parse(output)
  } catch(e) {
    return <div className="container"><div className="city">error</div></div>
  }

  const current = data.current_condition?.[0]
  if (!current) return null

  const temp = current.temp_C
  const feels = current.FeelsLikeC
  const humidity = current.humidity
  const wind = current.windspeedKmph
  const desc = current.weatherDesc?.[0]?.value || ''
  const icon = current.weatherIconUrl ? getIcon(current.weatherCode) : '🌤'

  function getIcon(code) {
    const c = parseInt(code)
    if (c === 113) return '󰖙'
    if (c === 116) return '󰖕'
    if (c === 119 || c === 122) return '󰖐'
    if ([176,263,266,293,296].includes(c)) return '󰖗'
    if ([299,302,305,308].includes(c)) return '󰖖'
    if ([329,332,335,338].includes(c)) return '󰖘'
    if ([386,389,392,395].includes(c)) return '󰙾'
    return '󰖐'
}

  return (
    <div className="container">
      <div className="city">◌ milano</div>
      <div className="main">
        <div className="icon">{icon}</div>
        <div className="temp">{temp}<span className="unit">°C</span></div>
      </div>
      <div className="desc">{desc.toLowerCase()}</div>
      <div className="details">
        <div className="detail-row">
          <span>feels like</span>
          <span className="detail-value">{feels}°C</span>
        </div>
        <div className="detail-row">
          <span>humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-row">
          <span>wind</span>
          <span className="detail-value">{wind} km/h</span>
        </div>
      </div>
    </div>
  )
}