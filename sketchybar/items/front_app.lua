local colors = require("colors")
local settings = require("settings")

local front_app = sbar.add("item", "front_app", {
  display = "active",
  icon = {
    drawing = true,
    string = "󱂬",
    color = colors.matcha,
    font = {
      family = settings.font.text,
      style = settings.font.style_map["Bold"],
      size = 13.0,
    },
    padding_right = 6,
  },
  label = {
    color = colors.cream,
    font = {
      style = settings.font.style_map["Black"],
      size = 12.0,
    },
  },
  background = {
    color = colors.bg1,
    border_color = colors.surface,
    border_width = 1,
    height = 26,
    corner_radius = 9,
    padding_left = 4,
    padding_right = 4,
  },
  updates = true,
})

front_app:subscribe("front_app_switched", function(env)
  front_app:set({ label = { string = env.INFO } })
end)

front_app:subscribe("mouse.clicked", function(env)
  sbar.trigger("swap_menus_and_spaces")
end)