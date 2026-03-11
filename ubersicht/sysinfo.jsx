export const refreshFrequency = 5000

export const className = `
  position: fixed;
  top: 80px;
  right: 160px;
  z-index: 10;
  font-family: 'Monaspace Krypton', monospace;

  .container {
    background: rgba(26, 22, 18, 0.75);
    border: 1px solid #3d3828;
    border-radius: 12px;
    padding: 16px 20px;
    backdrop-filter: blur(10px);
    min-width: 200px;
  }

  .title {
    font-size: 10px;
    color: #8aab6e;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    gap: 16px;
  }

  .label {
    font-size: 10px;
    color: #6b6355;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .value {
    font-size: 11px;
    color: #c8b49a;
  }

  .bar-wrap {
    width: 100%;
    height: 3px;
    background: #2e2a20;
    border-radius: 2px;
    margin-bottom: 10px;
  }

  .bar {
    height: 3px;
    border-radius: 2px;
    transition: width 0.5s ease;
  }

  .bar.green { background: linear-gradient(90deg, #8aab6e, #b5c9a1); }
  .bar.peach { background: linear-gradient(90deg, #d4956a, #e8b088); }

  .divider {
    height: 1px;
    background: #3d3828;
    margin: 10px 0;
  }

  .hostname {
    font-size: 11px;
    color: #e8dcc8;
    margin-bottom: 4px;
  }

  .uptime {
    font-size: 10px;
    color: #6b6355;
  }
`

export const command = `
  echo "cpu:$(top -l 1 | grep "CPU usage" | awk '{print $3}' | tr -d '%')"
  echo "ram:$(ps -caxm -orss= | awk '{sum+=$1} END {printf "%.0f", sum/1024}')"
  echo "ramtotal:$(sysctl -n hw.memsize | awk '{printf "%.0f", $1/1024/1024}')"
  echo "disk:$(df -h / | awk 'NR==2{print $3"/"$2}')"
  echo "diskpct:$(df / | awk 'NR==2{print $5}' | tr -d '%')"
  echo "host:$(scutil --get ComputerName)"
  echo "uptime:$(uptime | awk '{print $3, $4}' | tr -d ',')"
  echo "os:$(sw_vers -productVersion)"
`

export const render = ({ output, error }) => {
  if (!output || error) return null

  const lines = {}
  output.trim().split('\n').forEach(l => {
    const [k, ...v] = l.split(':')
    lines[k] = v.join(':').trim()
  })

  const cpu = parseFloat(lines.cpu) || 0
  const ram = parseInt(lines.ram) || 0
  const ramTotal = parseInt(lines.ramtotal) || 1
  const ramPct = Math.min(Math.round((ram / ramTotal) * 100), 100)
  const diskPct = parseInt(lines.diskpct) || 0
  const cpuColor = cpu > 70 ? 'peach' : 'green'
  const ramColor = ramPct > 70 ? 'peach' : 'green'

  return (
    <div className="container">
      <div className="title">◈ system</div>

      <div className="hostname">{lines.host}</div>
      <div className="uptime">up {lines.uptime} · macOS {lines.os}</div>

      <div className="divider" />

      <div className="row">
        <span className="label">cpu</span>
        <span className="value">{cpu}%</span>
      </div>
      <div className="bar-wrap">
        <div className={`bar ${cpuColor}`} style={{ width: `${cpu}%` }} />
      </div>

      <div className="row">
        <span className="label">ram</span>
        <span className="value">{ram} mb / {ramTotal} mb</span>
      </div>
      <div className="bar-wrap">
        <div className={`bar ${ramColor}`} style={{ width: `${ramPct}%` }} />
      </div>

      <div className="row">
        <span className="label">disk</span>
        <span className="value">{lines.disk}</span>
      </div>
      <div className="bar-wrap">
        <div className="bar green" style={{ width: `${diskPct}%` }} />
      </div>
    </div>
  )
}