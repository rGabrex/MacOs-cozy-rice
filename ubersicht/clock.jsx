export const refreshFrequency = 1000

export const command = "date '+%H|%M|%A|%d|%b'"

export const className = `
  position: fixed;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
  font-family: 'Monaspace Krypton', monospace;

  .container {
    background: rgba(26, 22, 18, 0.65);
    border: 1px solid #3d3828;
    border-radius: 12px;
    padding: 16px 20px;
    backdrop-filter: blur(10px);
    width: 220px;
  }

  .time {
    font-size: 72px;
    font-weight: 800;
    color: #e8dcc8;
    text-shadow: 0 0 30px #8aab6e44, 2px 2px 0px #1a1612;
    letter-spacing: -2px;
    line-height: 1;
  }

  .date {
    font-size: 18px;
    color: #b5c9a1;
    margin-top: 6px;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-shadow: 1px 1px 0px #1a1612;
  }
`

export const render = ({ output }) => {
  if (!output) return null
  const [h, m, day, date, month] = output.trim().split('|')

  return (
    <div className="container">
      <div className="time">{h}:{m}</div>
      <div className="date">{day} · {date} {month}</div>
    </div>
  )
}