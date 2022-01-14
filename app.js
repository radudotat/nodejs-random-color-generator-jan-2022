import { Chalk } from 'chalk';
import prompts from 'prompts';
import randomColor from 'randomcolor';

// const MIN_WIDTH = 31;
// const MIN_LINES = 9;
// const COLUMN_SIZE = 5;
// const STAMP_CHAR = '#';

const args = process.argv.slice(2);
const customChalk = new Chalk();
let hexColorCode;

switch (args.length) {
  case 0:
    hexColorCode = randomColor();
    break;
  case 1:
    const colors = ['red', 'green', 'blue'];
    const luminosities = ['light', 'dark'];
    const questions = [
      {
        type: 'text',
        name: 'color',
        message: 'Please insert a color (' + colors.join(', ') + ')',
      },
      {
        type: 'text',
        name: 'luminosity',
        message:
          'Please insert the luminosity (' + luminosities.join(', ') + ')',
      },
    ];
    const waitPrompt = async function () {
      await prompts(questions)
        .then((response) => {
          hexColorCode = randomColor({
            hue: response.color,
            luminosity: response.luminosity,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    };

    await waitPrompt();
    break;
  case 2:
    hexColorCode = randomColor({
      hue: args[0],
      luminosity: args[1],
    });
    break;
  case 3:
    hexColorCode = randomColor({
      hue: args[1],
      luminosity: args[2],
    });
    break;

  default:
    console.error('Malformed request!');
    break;
}

const template = `
###############################
###############################
###############################
#####                     #####
#####       ${hexColorCode}       #####
#####                     #####
###############################
###############################
###############################
`;

const runApp = () => {
  console.log(customChalk.hex(hexColorCode)(template));
};

export default runApp;
