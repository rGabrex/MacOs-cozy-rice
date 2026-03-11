export const refreshFrequency = 1000

export const className = `
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
  font-family: 'Monaspace Krypton', monospace;

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

const pad = n => String(n).padStart(2, '0')

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export const render = () => {
  const now = new Date()
  const h = pad(now.getHours())
  const m = pad(now.getMinutes())
  const day = days[now.getDay()]
  const date = now.getDate()
  const month = months[now.getMonth()]

  return (
    <div>
      <div className="time">{h}:{m}</div>
      <div className="date">{day} · {date} {month}</div>
    </div>
  )
}