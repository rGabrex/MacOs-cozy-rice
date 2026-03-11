eval "$(starship init zsh)"

# Zsh plugins
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Autosuggestions config
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#6b6355"
ZSH_AUTOSUGGEST_STRATEGY=(history completion)

# Accetta suggerimento con freccia destra
bindkey '→' autosuggest-accept

alias config="open ~/.config"
alias vconfig="cd ~/.config && code ."
