export const refreshFrequency = 60000

export const className = `
  position: fixed;
  top: 170px;
  left: 360px;
  z-index: 10;
  font-family: 'Monaspace Krypton', monospace;

  .container {
    background: rgba(26, 22, 18, 0.65);
    border: 1px solid #3d3828;
    border-radius: 12px;
    padding: 16px 20px;
    backdrop-filter: blur(10px);
    width: 260px;
  }

  .title {
    font-size: 20px;
    color: #8aab6e;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .day {
    margin-bottom: 12px;
  }

  .day-name {
    font-size: 15px;
    color: #847a69;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  .day-name.today {
    color: #8aab6e;
    font-weight: 700;
  }

  .lesson {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 4px;
    padding: 6px 8px;
    border-radius: 6px;
    background: rgba(61, 56, 40, 0.4);
    border-left: 2px solid #3d3828;
  }

  .lesson.active {
    border-left: 2px solid #8aab6e;
    background: rgba(138, 171, 110, 0.1);
  }

  .lesson.done {
    opacity: 0.4;
  }

  .time {
    font-size: 9px;
    color: #c8b49a;
    min-width: 50px;
    padding-top: 1px;
  }

  .time.active {
    color: #8aab6e;
  }

  .name {
    font-size: 11px;
    color: #c8b49a;
    line-height: 1.3;
  }

  .name.active {
    color: #e8dcc8;
  }
`

const SCHEDULE = {
  1: [ // Lunedi
    { time: '10:30–12:30', name: 'Interazione Uomo-Macchina' },
  ],
  2: [ // Martedi
    { time: '10:30–12:30', name: 'Sistemi Operativi' },
    { time: '13:30–15:30', name: 'Interazione Uomo-Macchina' },
  ],
  3: [ // Mercoledi
    { time: '10:30–12:30', name: 'Matematica 2' },
    { time: '13:30–15:30', name: 'Sistemi Operativi' },
  ],
  4: [ // Giovedi
    { time: '08:30–10:30', name: 'Matematica 2' },
    { time: '10:30–14:30', name: 'Diritto dei Prodotti Digitali' },
  ],
  5: [ // Venerdi
    { time: '10:30–12:30', name: 'Matematica 2' },
  ],
}

const DAYS = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
const DAYS_FULL = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']

const parseHour = (str) => {
  const [h, m] = str.split(':').map(Number)
  return h * 60 + m
}

const isActive = (timeRange) => {
  const now = new Date()
  const current = now.getHours() * 60 + now.getMinutes()
  const [start, end] = timeRange.split('–')
  return current >= parseHour(start) && current <= parseHour(end)
}

const isDone = (timeRange) => {
  const now = new Date()
  const current = now.getHours() * 60 + now.getMinutes()
  const end = timeRange.split('–')[1]
  return current > parseHour(end)
}

export const render = () => {
  const today = new Date().getDay()

  // Mostra da oggi a domenica, max 4 giorni
  const daysToShow = []
  for (let i = 0; i < 5; i++) {
    const d = (today + i) % 7
    if (SCHEDULE[d]) daysToShow.push(d)
    if (daysToShow.length >= 3) break
  }

  return (
    <div className="container">
      <div className="title">◈ orario lezioni</div>
      {daysToShow.map(d => (
        <div className="day" key={d}>
          <div className={`day-name ${d === today ? 'today' : ''}`}>
            {d === today ? `▸ ${DAYS_FULL[d]}` : DAYS_FULL[d]}
          </div>
          {SCHEDULE[d].map((l, i) => (
            <div
              key={i}
              className={`lesson ${d === today && isActive(l.time) ? 'active' : ''} ${d === today && isDone(l.time) ? 'done' : ''}`}
            >
              <div className={`time ${d === today && isActive(l.time) ? 'active' : ''}`}>{l.time}</div>
              <div className={`name ${d === today && isActive(l.time) ? 'active' : ''}`}>{l.name}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}