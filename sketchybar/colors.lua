return {
  black      = 0xff1a1612,
  white      = 0xffe8dcc8,
  red        = 0xffd4956a,
  green      = 0xff8aab6e,
  blue       = 0xffb5c9a1,
  yellow     = 0xffc8b49a,
  orange     = 0xffd4956a,
  magenta    = 0xff9ab88a,
  grey       = 0xff6b6355,
  transparent = 0x00000000,

  bar = {
    bg     = 0xff242018,
    border = 0xff2e2a20,
  },
  popup = {
    bg     = 0xc0242018,
    border = 0xff3d3828,
  },

  bg1 = 0xff2e2a20,
  bg2 = 0xff3d3828,

  matcha  = 0xff8aab6e,
  sage    = 0xffb5c9a1,
  latte   = 0xffc8b49a,
  cream   = 0xffe8dcc8,
  peach   = 0xffd4956a,
  crust   = 0xff1a1612,
  mantle  = 0xff2e2a20,
  surface = 0xff3d3828,

  with_alpha = function(color, alpha)
    if alpha > 1.0 or alpha < 0.0 then return color end
    return (color & 0x00ffffff) | (math.floor(alpha * 255.0) << 24)
  end,
}