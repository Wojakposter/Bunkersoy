# Wojakificator
Wojak generator that supports multiple chans

# Build instructions
Requires npm
```bash
#Download all required dependencies
npm i
#Run the build task
npm run build
```
# Examples

| Input | Output | Settings |
| ----- | ------ | -------- |
| ![Post](examples/exampleinput.png) | ![Generated wojak](examples/exampleoutput.png) | Seethe mode, text mode|

# Building for other platforms
In order to build for platforms other than bunkerchan, set an environment variable with name 'TARGET_PLATFORM' to the name of the desired platform.
To view avaliable platforms, see src/platform directory.
