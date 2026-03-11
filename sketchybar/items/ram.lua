local colors = require("colors")
local settings = require("settings")

local ram = sbar.add("item", "ram", {
  position = "right",
  update_freq = 10,
  icon = {
    string = "󰍛",
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

ram:subscribe({"routine", "forced", "system_woke"}, function()
  sbar.exec("ps -caxm -orss= | awk '{ sum += $1 } END { printf \"%.0f\", sum/1024 }' ", function(used)
  sbar.exec("sysctl -n hw.memsize", function(total)
    local total_mb = math.floor(tonumber(total) / 1024 / 1024)
    local used_mb = tonumber(used) or 0
    local percent = math.floor((used_mb / total_mb) * 100)
    local color = percent > 70 and colors.peach or colors.matcha
    ram:set({
      icon = { color = color },
      label = { string = "ram " .. percent .. "%" },
    })
  end)
end)
end)