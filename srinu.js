const countDisplay = document.getElementById('count');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const clearButton = document.getElementById('clear');
const errorMessage = document.getElementById('error');

let count = 0;

incrementButton.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
    errorMessage.style.visibility = 'hidden';

    if (count > 0) {
        clearButton.style.display = 'block';
    }
});

decrementButton.addEventListener('click', () => {
    if (count > 0) {
        count--;
        countDisplay.textContent = count;
        errorMessage.style.visibility = 'hidden';

        if (count === 0) {
            clearButton.style.display = 'none';
        }
    } else {
        errorMessage.style.visibility = 'visible';
    }
});

clearButton.addEventListener('click', () => {
    count = 0;
    countDisplay.textContent = count;
    clearButton.style.display = 'none';
    errorMessage.style.visibility = 'hidden';
});
