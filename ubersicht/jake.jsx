export const refreshFrequency = false

export const className = `
  position: fixed;
  bottom: 295px;
  right: 420px;
  z-index: 10;

  .container {
    background: rgba(26, 22, 18, 0.65);
    border: 1px solid #3d3828;
    border-radius: 12px;
    padding: 10px;
    backdrop-filter: blur(10px);
    display: inline-block;
  }

  img {
    height: 195px;
    width: 220px;
    display: block;
    image-rendering: pixelated;
    border-radius: 6px;
  }
`

export const render = () => (
    <div className="container">
        <img src="data:image/gif;base64,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" />
    </div>
)
