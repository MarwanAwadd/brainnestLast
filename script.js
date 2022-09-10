class Calculator{
    constructor(previousOpText, currentOpText){
        this.previousOpText = previousOpText;
        this.currentOpText = currentOpText;
        this.clear();
    }

    clear(){
        this.currentOp = '';
        this.previousOp = '';
        this.operand = undefined;
    }
    delete(){
        this.currentOp = this.currentOp.toString().slice(0, -1);
    }
    addNum(number){
        if(this.currentOp.toString().includes('.') && number === '.'){
            return;
        }
        else{
            if(number === '0' && this.operand === '÷'){
                alert('Cannot divide by 0!');
                return;
            }
            this.currentOp = this.currentOp + number.toString();
        }
    }
    selectOp(operand){
        if(this.currentOp === '') return;
        if(this.previousOp != ''){
            this.calculate()
        }
        this.operand = operand;
        this.previousOp = this.currentOp;
        this.currentOp = '';
    }
    calculate(){
        let calc;
        const previous = parseFloat(this.previousOp);
        const current = parseFloat(this.currentOp);
        if(isNaN(previous) || isNaN(current)) return;

        switch(this.operand){
            case '+':
                calc = previous + current;
            break;
            case '-':
                calc = previous - current;
            break;
            case 'x':
                calc = previous * current;
            break;
            case '÷':
                calc = previous / current;
            break;
            default:
            break;
        }
        
        this.currentOp = calc;
        this.operand = undefined;
        this.previousOp = '';

        
    }
    updateScreen(){
        this.currentOpText.innerText = this.getDisplayNumber(this.currentOp);
        if(this.operand != null){
            this.previousOpText.innerText = `${this.previousOp} ${this.operand}`;
        }
        else{
            this.previousOpText.innerText = '';
        }
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${integerDigits}.${decimalDigits}`;
        }
        else{
            return integerDisplay;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-numbers]');
const operationButtons = document.querySelectorAll('[data-operators]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const ACButton = document.querySelector('[data-ac]');
const previousOpText = document.querySelector('[data-previousOp]');
const currentOpText = document.querySelector('[data-currentOp]');

const calculator = new Calculator(previousOpText, currentOpText)
numberButtons.forEach(number => {
    number.addEventListener('click', () => {
        calculator.addNum(number.innerText);
        calculator.updateScreen();
    });
});
operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.selectOp(operation.innerText);
        calculator.updateScreen()
    });
});
equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateScreen();
});
ACButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateScreen();
});
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateScreen();
})