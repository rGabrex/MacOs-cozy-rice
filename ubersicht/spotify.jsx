export const refreshFrequency = 5000

export const className = `
  position: fixed;
  bottom: 40px;
  right: 160px;
  z-index: 10;
  font-family: 'Monaspace Krypton', monospace;

  .container {
    background: rgba(26, 22, 18, 0.75);
    border: 1px solid #3d3828;
    border-radius: 12px;
    padding: 14px 18px;
    backdrop-filter: blur(10px);
    max-width: 260px;
    min-width: 220px;
  }

  .title {
    font-size: 10px;
    color: #8aab6e;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .track {
    font-size: 13px;
    font-weight: 700;
    color: #e8dcc8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
  }

  .artist {
    font-size: 11px;
    color: #b5c9a1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }

  .bar-container {
    width: 100%;
    height: 3px;
    background: #3d3828;
    border-radius: 2px;
  }

  .bar {
    height: 3px;
    background: linear-gradient(90deg, #8aab6e, #b5c9a1);
    border-radius: 2px;
    transition: width 1s linear;
  }

  .status {
    font-size: 10px;
    color: #6b6355;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  }

  .playing {
    color: #8aab6e;
  }

  .paused {
    color: #6b6355;
  }

  .nothing {
    font-size: 12px;
    color: #6b6355;
    font-style: italic;
  }
`

export const command = `osascript -e '
tell application "System Events"
  if exists process "Spotify" then
    tell application "Spotify"
      set trackName to name of current track
      set artistName to artist of current track
      set trackDuration to duration of current track
      set trackPosition to player position
      set playerState to player state as string
      return trackName & "|" & artistName & "|" & trackDuration & "|" & trackPosition & "|" & playerState
    end tell
  else
    return "none"
  end if
end tell'`

export const render = ({ output, error }) => {
  if (!output || output.trim() === 'none' || error) {
    return (
      <div className="container">
        <div className="title">♪ spotify</div>
        <div className="nothing">nothing playing</div>
      </div>
    )
  }

  const parts = output.trim().split('|')
  if (parts.length < 5) return null

  const [track, artist, duration, position, state] = parts
  const progress = Math.min((parseFloat(position) / (parseFloat(duration) / 1000)) * 100, 100)
  const isPlaying = state === 'playing'

  return (
    <div className="container">
      <div className="title">♪ spotify</div>
      <div className="track">{track}</div>
      <div className="artist">{artist}</div>
      <div className="bar-container">
        <div className="bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="status">
        <span className={isPlaying ? 'playing' : 'paused'}>
          {isPlaying ? '▶ playing' : '⏸ paused'}
        </span>
      </div>
    </div>
  )
}