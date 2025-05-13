let array = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createArray() {
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray(highlightedIndices = []) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = array[i] * 3 + "px";
        if (highlightedIndices.includes(i)) {
            bar.style.backgroundColor = 'red';
        } else {
            bar.style.backgroundColor = 'lightgreen';
        }
        container.appendChild(bar);
    }
}

async function heapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        displayArray([i, largest]);
        await sleep(300);
        await heapify(arr, n, largest);
    }
}

async function heapSort(arr) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        displayArray([0, i]);
        await sleep(300);
        await heapify(arr, i, 0);
    }
}

async function sortArray() {
    await heapSort(array);
}

// Create initial array
createArray();