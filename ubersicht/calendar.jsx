export const refreshFrequency = 60000

export const className = `
  position: fixed;
  bottom: 180px;
  right: 160px;
  z-index: 10;
  font-family: 'Monaspace Krypton', monospace;

  .container {
    background: rgba(26, 22, 18, 0.75);
    border: 1px solid #3d3828;
    border-radius: 12px;
    padding: 16px 20px;
    backdrop-filter: blur(10px);
    width: 220px;
  }

  .title {
    font-size: 10px;
    color: #8aab6e;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
  }

  .month {
    color: #c8b49a;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .header {
    font-size: 9px;
    color: #6b6355;
    text-align: center;
    padding: 2px 0;
    text-transform: uppercase;
  }

  .day {
    font-size: 10px;
    color: #c8b49a;
    text-align: center;
    padding: 3px 0;
    border-radius: 4px;
  }

  .day.empty {
    color: transparent;
  }

  .day.today {
    background: #8aab6e;
    color: #1a1612;
    font-weight: 700;
    border-radius: 4px;
  }

  .day.weekend {
    color: #6b6355;
  }

  .day.has-lesson {
    color: #b5c9a1;
    position: relative;
  }

  .dot {
    width: 3px;
    height: 3px;
    background: #8aab6e;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 1px;
  }
`

const LESSON_DAYS = [1, 2, 3, 4, 5] // lun-ven

export const render = () => {
  const now = new Date()
  const today = now.getDate()
  const month = now.getMonth()
  const year = now.getFullYear()

  const monthNames = ['January','February','March','April','May','June',
    'July','August','September','October','November','December']
  const dayNames = ['Mo','Tu','We','Th','Fr','Sa','Su']

  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let i = 1; i <= daysInMonth; i++) cells.push(i)

  return (
    <div className="container">
      <div className="title">
        <span>◷ calendar</span>
        <span className="month">{monthNames[month]}</span>
      </div>
      <div className="grid">
        {dayNames.map(d => (
          <div className="header" key={d}>{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="day empty">·</div>
          const dayOfWeek = (i % 7) + 1
          const isToday = day === today
          const isWeekend = dayOfWeek === 6 || dayOfWeek === 7
          const hasLesson = LESSON_DAYS.includes(dayOfWeek)

          return (
            <div key={i} className={`day ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''} ${hasLesson && !isToday ? 'has-lesson' : ''}`}>
              {day}
              {hasLesson && !isToday && <div className="dot" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}