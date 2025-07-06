const form = document.getElementById('numberForm');
const input = document.getElementById('numbersInput');
const resultDiv = document.querySelector('.result');
const bubbleBtn = document.getElementById('bubble');
const selectBtn = document.getElementById('select');

let numbers = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    numbers = parseInput();
    if (numbers.length === 0) {
        alert('Please enter valid numbers separated by commas.');
        return;
    }
    renderBars(numbers);
});

bubbleBtn.addEventListener('click', async function() {
    numbers = parseInput();
    if (numbers.length === 0) {
        alert('Please enter valid numbers separated by commas.');
        return;
    }
    renderBars(numbers);
    await bubbleSortVisual(numbers.slice());
});

selectBtn.addEventListener('click', async function() {
    numbers = parseInput();
    if (numbers.length === 0) {
        alert('Please enter valid numbers separated by commas.');
        return;
    }
    renderBars(numbers);
    await selectionSortVisual(numbers.slice());
});

function parseInput() {
    return input.value.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
}

function renderBars(arr, highlight = []) {
    resultDiv.innerHTML = '';
    const max = Math.max(...arr, 1);
    arr.forEach((num, idx) => {
        const bar = document.createElement('div');
        bar.style.height = `${(num / max) * 100}%`;
        bar.style.width = '30px';
        bar.style.display = 'inline-block';
        bar.style.margin = '0 2px';
        bar.style.background = highlight.includes(idx) ? '#F76600' : '#0074D9';
        bar.style.verticalAlign = 'bottom';
        bar.textContent = num;
        bar.style.color = 'white';
        bar.style.textAlign = 'center';
        bar.style.fontSize = '1rem';
        resultDiv.appendChild(bar);
    });
}

async function selectionSortVisual(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let min = i;
        for(let j = i + 1; j < n; j++){
            renderBars(arr, [j, min]);
            await sleep(200);
            if(arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
            renderBars(arr, [i, min]);
            await sleep(400);
        }
    }
    renderBars(arr);
}

async function bubbleSortVisual(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            renderBars(arr, [j, j + 1]);
            await sleep(100);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                renderBars(arr, [j, j + 1]);
                await sleep(100);
            }
        }
    }
    renderBars(arr);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}