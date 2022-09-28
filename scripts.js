class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); //clear all the inputs as soon as we create a new calculator
    }
    //remove all values
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined; //don't have any operation seleted if we clear the screen.
    }
    //clear a single number
    delete() {
        //transform float og current operand into a string and use slice to keep it from the 1st to the before last number.
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    //when you click the number and it appears at the output
    appendNumber(number) {
        // check to not let . appear more than once
        if (number === '.' && this.currentOperand.includes('.')){
            return //if added . and includes another . return and back and don't attach.
        }
        // attach numbers | to string is to prevent they add themselves before showing at the output.
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //choose one of the operands 
    chooseOperation(operation) {
        if(this.currentOperand === ''){  //this don't let the operand clear the screen without a previousOperation value
            return;
        }
        if (this.previousOperand !== ''){//if the previousOperand is not clear, it will attach the operator next to it
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand; //we are done with the number, send it to be the previousOperand at the top
        this.currentOperand = ''; //cleans the screen from the last value

    }
    //take all values and computeit to a single value at the output
    compute() {
        let computation; //result of compute function
        const prev = parseFloat(this.previousOperand); //transform the strings into float numbers
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return //if no value prev or current don't run the function

        switch (this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return; 
        }
        this.currentOperand = computation; //show the result of the computation
        this.operation = undefined;
        this.previousOperand = '';

        
    }
    //get the number delimitation with commas and make it work with the decimal period spliting the number into 2 string arrays
    getDisplayNumber(number){
        const stringNumber = number.toString();

        //turn string into an array 1st number before period and second after the period
        const integerDigits = parseFloat(stringNumber.split('.')[0]); 
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay
            if(isNaN(integerDigits)) { //if nothing on the screen 
                integerDisplay = '';
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0 })
                }
                if(decimalDigits != null){ //user entered a . and has something after it
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }

        // const floatNumber = parseFloat(number);
        // if(isNaN(floatNumber)) return ''; //if not a number cancel
        // return floatNumber.toLocaleString('en'); //format the number to english language, so it will use commas
        }
        

    //updade values inside output
    //we needs no know the previous operand, the user entered. 
    //The current operand that they are working on. And the operantion they selected if any.
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null){ //show the previous operand on the top if not null
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else { //clear previous if used AC
            this.previousOperandTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
})

//click = button to call the compute() and then updade the display
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})