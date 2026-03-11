local colors = require("colors")

sbar.bar({
  height        = 44,
  color         = colors.bar.bg,
  border_width  = 1,
  border_color  = colors.bar.border,
  padding_right = 12,
  padding_left  = 12,
  blur_radius   = 30,
  topmost       = "on",
  y_offset      = 0,
})