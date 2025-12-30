

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# The following lines have been added by Docker Desktop to enable Docker CLI completions.
fpath=(/Users/ah/.docker/completions $fpath)
autoload -Uz compinit
compinit
# End of Docker CLI completions

export PATH="/usr/local/mongodb/bin:$PATH"


# Load Angular CLI autocompletion.
source <(ng completion script)


export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
