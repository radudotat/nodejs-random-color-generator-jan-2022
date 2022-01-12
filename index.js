import { Chalk } from 'chalk';
import prompts from 'prompts';
import randomColor from 'random-color';

const MIN_WIDTH = 31;
const MIN_LINES = 9;
const COLUMN_SIZE = 5;

const args = process.argv.slice(2);
const customChalk = new Chalk({ level: 3 });
const colorRandom = randomColor();
let hexColorCode = colorRandom.hexString().toLowerCase();
let outputString;

let generateLine = function (width = 31, column, text) {
  String.prototype.replaceAt = function (index, replacement) {
    return (
      this.substr(0, index) +
      replacement +
      this.substr(index + replacement.length)
    );
  };

  let normalLine = '#'.repeat(width);
  let lineSplitted = normalLine.split('');

  let hasColumn = typeof column !== 'undefined';
  let hasText = typeof text !== 'undefined';

  // console.log(arguments, hasColumn, hasText, lineSplitted);

  if (!hasColumn) {
    return normalLine;
  }

  let arrayMiddle = Math.floor(lineSplitted.length / 2);

  lineSplitted.forEach((val, index, lineSplitted) => {
    if (hasColumn) {
      //is line with columns
      if (index >= column && index <= lineSplitted.length - column - 1) {
        lineSplitted[index] = ' ';
      }
    }
    // if(index == arrayMiddle){
    //     lineSplitted[index] = '!'
    // }
  });

  let newLine = lineSplitted.join('');

  if (hasText) {
    //is line with text inside
    let textMiddle = Math.floor(text.length / 2);
    newLine = newLine.replaceAt(arrayMiddle - textMiddle, text);
  }

  return newLine;
};

let generateBox = (width = 31, height = 9, color) => {
  // let width = Number(width)
  // let height = Number(height)
  let verticalMiddle = Math.floor(height / 2);
  let horizontalMiddle = Math.floor(width / 2);

  //check if dimensions are odd/even
  if (width % 2 === 0) {
    // is even, add one for symmetry
    width += 1;
  }

  if (height % 2 === 0) {
    // is even, add one more row for symmetry
    height += 1;
  }

  let numChunks = Math.ceil(height / 3);
  let normalLine = generateLine(width);

  let lines = [];
  let counter = 0;

  while (counter <= height) {
    if (counter >= numChunks && numChunks <= height - counter) {
      let specialLine = generateLine(width, 5);
      if (counter === verticalMiddle) {
        //verticalMiddle
        specialLine = generateLine(width, 5, color);
      }
      lines.push(specialLine);
    } else {
      lines.push(normalLine);
    }

    counter++;
  }
  return lines.join('\n');
};

let generateUserColor = function (color, luminosity) {
  console.log('generateUserColor', arguments);
};

switch (args.length) {
  case 0:
    outputString = generateBox(hexColorCode);
    break;
  case 1:
  case 3:
    //check if first argument is 'ask' or 'dimentions'
    let found = args[0].match(/(ask)|((\d+)x(\d+))/);

    if (found && found[0] === 'ask') {
      console.log('Ask user questions', found);
    } else if (found && found[3] && found[4]) {
      //expand box for pretty print
      let inputWidth = found[3];
      if (inputWidth < 31) {
        inputWidth = 31;
      }

      let inputHeight = found[4];
      if (inputHeight < 9) {
        inputHeight = 9;
      }

      outputString = generateBox(inputWidth, inputHeight, hexColorCode);
    } else {
      console.error('Malformed request!');
    }
    break;
  case 2:
    let color = args[1];
    let luminosity = args[2];
    let userColor = generateUserColor(color, luminosity);
    outputString = generateBox(inputWidth, inputHeight, userColor);
    break;

  default:
    console.error('Malformed request!');
}
if (args.length === 0) {
  outputString = generateBox();
} else if (args.length === 1) {
  let found = args[0].match(/(ask)|((\d+)x(\d+))/);

  if (found && isNaN(found[0]) && found[0] === 'ask') {
    console.log('Ask user questions', found);
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
    (async () => {
      const response = await prompts(questions)
        .then((response, inputWidth, inputHeight) => {
          console.log(response);
          let userColor = generateUserColor(
            response.color,
            response.luminosity,
          );
          outputString = generateBox(inputWidth, inputHeight, userColor);

          console.log(customChalk[response.color](outputString));
        })
        .catch((e) => {
          console.error(e);
        });
    })();
  } else if (found && found[3] && found[4]) {
    let inputWidth = found[3];
    if (inputWidth < 31) {
      inputWidth = 31;
    }

    let inputHeight = found[4];
    if (inputHeight < 9) {
      inputHeight = 9;
    }

    outputString = generateBox(inputWidth, inputHeight, hexColorCode);
  } else {
    console.error('Malformed request!');
  }
} else {
  console.info(args);
}

console.log(customChalk.hex(hexColorCode)(outputString));
