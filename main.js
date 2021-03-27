const screen = document.querySelector('.screen');
let buffer = '0'; // safe user's input
let totalResult = 0; // accumulate result of calculations
let operator; // store the last clicked operator
let showResultFlag = 0; // flag to clear input after '='

//main program
document.querySelector('.buttons').addEventListener('click', function (event) {
  let element = event.target.closest('.button');
  let number = element.innerText;
  let symbol = element.dataset.operator;

  if (symbol) {
    handleSymbol(symbol);
  } else {
    handleNumber(number);
  }

  //show on screen
  screen.textContent = buffer;
});

// update buffer
function handleNumber(number) {
  if (buffer === '0') {
    buffer = number;
  } else if (showResultFlag === 1) {
    buffer = number;
    showResultFlag = 0;
  } else {
    buffer += number;
  }
}

// symbols processing
function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      break;

    case 'eq':
      showResultFlag = 1;
      count();

      buffer = totalResult; // buffer holds the result of calculations
      totalResult = 0; // reset
      break;

    case 'back':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;

    default:
      getData(symbol);
  }
}

function getData(symbol) {
  if (totalResult === 0) {
    totalResult = +buffer;
  } else {
    count();
  }

  buffer = '0'; // ready to receive new input
  operator = symbol; // operator is saved in global scope
}

function count() {
  switch (operator) {
    case '+':
      totalResult += +buffer;
      break;

    case '-':
      totalResult -= +buffer;
      break;

    case '/':
      totalResult /= +buffer;
      break;

    case 'x':
      totalResult *= +buffer;
      break;
  }
}
