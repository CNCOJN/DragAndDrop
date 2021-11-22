const container = document.querySelector('.container');
const headerInstructions = document.querySelector('.header__instructions');
const backdrop = document.querySelector('.backdrop');
const instructions = document.querySelector('.instructions');
const numberContainer = document.querySelector('.numberContainer');
const numbers = document.querySelectorAll('.numberContainer__number');
const boxContainer = document.querySelector('.boxContainer');
const boxes = document.querySelectorAll('.boxContainer__box');
let tempNumberBox;

//backdrop and instructions
headerInstructions.addEventListener('click', BackdropAndInstructionsHandler);
backdrop.addEventListener('click', BackdropAndInstructionsHandler);
instructions.addEventListener('click', BackdropAndInstructionsHandler);

function BackdropAndInstructionsHandler() {
    backdrop.classList.toggle('show');
    instructions.classList.toggle('show');
}

//numbers
numbers.forEach(number => {
    number.addEventListener('dragstart', e => {
        tempNumberBox = e.target;
    });

    number.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.currentTarget.classList.remove('boxContainer__box--dropStyle');
        numberContainer.appendChild(e.currentTarget);
        const currentNumbers = document.querySelector('.numberContainer').children;
        const numberArray = Array.from(currentNumbers).sort((c, p) => +c.innerHTML - +p.innerHTML);
        numberArray.forEach(number => numberContainer.appendChild(number));
    });
});

//boxes
boxes.forEach(box => {
    box.addEventListener('dragenter', e => {
        e.currentTarget.classList.toggle('border');
    });

    box.addEventListener('dragover', e => {
        e.preventDefault();
    });

    box.addEventListener('dragleave', e => {
        e.currentTarget.classList.toggle('border');
    });

    box.addEventListener('drop', e => {
        // console.log(e.currentTarget.children)
        if ((Array.from(e.currentTarget.children).length > 0)) {
            e.currentTarget.classList.remove('border');
            return;
        }
        e.currentTarget.classList.remove('border');
        tempNumberBox.classList.add('boxContainer__box--dropStyle');
        e.currentTarget.appendChild(tempNumberBox);
    });
});

//container drop events
container.addEventListener('dragover', e => {
    e.preventDefault();
});

container.addEventListener('drop', e => {
    if (e.target.tagName !== 'MAIN') return
    tempNumberBox.classList.remove('boxContainer__box--dropStyle');
    numberContainer.appendChild(tempNumberBox);
    const currentNumbers = document.querySelector('.numberContainer').children;
    const numberArray = Array.from(currentNumbers).sort((c, p) => +c.innerHTML - +p.innerHTML);
    numberArray.forEach(number => numberContainer.appendChild(number));
});