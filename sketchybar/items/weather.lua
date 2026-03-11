local colors = require("colors")
local settings = require("settings")

local weather = sbar.add("item", "weather", {
  position = "right",
  update_freq = 1800,
  icon = {
    font = {
      family = "JetBrainsMono Nerd Font",
      style = "Regular",
      size = 14.0,
    },
    color = colors.sage,
    padding_left = 8,
  },
  label = {
    color = colors.cream,
    padding_right = 8,
    font = {
      family = settings.font.text,
      style = settings.font.style_map["Regular"],
      size = 12.0,
    },
  },
  background = {
    color = colors.bg1,
    border_color = colors.surface,
    border_width = 1,
    height = 26,
    corner_radius = 9,
  },
  padding_left = 1,
  padding_right = 1,
})

weather:subscribe({"routine", "forced", "system_woke"}, function()
  sbar.exec("curl -s 'wttr.in/?format=+%t+%C'", function(result)
    local temp = result:match("%+?(-?%d+)") or "?"
    weather:set({
      icon = { string = "󰖐" },
      label = { string = temp .. "°C" },
    })
  end)
end)

weather:subscribe("mouse.clicked", function()
  sbar.exec("open 'https://wttr.in'")
end)