# Node.js Random color generator

Generate random colors based on user input

## Requirements for this project:

- [x] Create an application that will return a random color in the command line.

- [x] When somebody enters a specific command in the command line, a block of approximately 31x9 # characters and of a random color (using hex code, e.g. #ff0000) should be generated.

It should be able to not only accept the command itself, but also the request for a:

- [x] hue (e.g. green or red or blue)
- [x] luminosity (e.g. light or dark)

...and then generate random colors that match those choices.

### Stretch goals

- [x] If a user types "ask" instead of a color name, print questions to ask the user for the name of the color and the luminosity
- [ ] If a user types a size in the format of `WWxHH` (eg. `31x9`) **before** the color and luminosity, it will use this as the size of the box

### HowTo use it:

on CLI type:

`node index.js red light`

or

`node index.js ask`

on [replit.com](https://replit.com/@radudotat/random-color-generator) go to **Shell** tab and run the same commands.

`node index red light`

or

`node index ask`
