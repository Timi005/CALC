class Calculator {
  constructor(prevOpText, currentOpText) {
    this.prevOpText = prevOpText;
    this.currentOpText = currentOpText;
    this.clear();
  }
  clear() {
    this.currentOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOp.includes(".")) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOp === "") return;
    if (this.currentOp !== "") {
      this.commpute();
    }
    this.operation = operation;
    this.prevOp = this.currentOp;
    this.currentOp = "";
  }
  commpute() {
    let computation;
    const prev = parseFloat(this.prevOp);
    const current = parseFloat(this.currentOp);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOp = computation;
    this.operation = undefined;
    this.prevOp = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOpText.innerText = this.getDisplayNumber(this.currentOp);
    this.prevOpText.innerText = this.prevOp;
    if (this.operation != null) {
      this.prevOpText.innerText = `${this.prevOp} ${this.operation}`;
    } else {
      this.prevOpText.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const prevOpText = document.querySelector("[data-prev]");
const currentOpText = document.querySelector("[data-current]");

const calculator = new Calculator(prevOpText, currentOpText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//prettier.ignore
equalsButton.addEventListener("click", (button) => {
  calculator.commpute();
  calculator.updateDisplay();
});
clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
