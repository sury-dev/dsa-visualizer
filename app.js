function showArrayVisualizer() {
    const area = document.getElementById('visualizationArea');
    area.innerHTML = `
        <div class="menu-row1">
                <input type="number" id="arrayValue" placeholder="Enter Element">
                <button style="--color : aqua; --color2 : black" class="menu-btn" onclick="insertIntoArray()">Insert</button>
                <button style="--color : rgb(255, 115, 0); --color2 : white" class="menu-btn" onclick="deleteFromArray()">Delete</button>
            </div>
            <div class="menu-row2">
                <button style="--color : white; --color2 : black" class="menu-btn" onclick="autosort()">Bubble Sort</button>
                <button style="--color : white; --color2 : black" class="menu-btn" onclick="startMergeSort()">MergeSort</button>
                <button style="--color : white; --color2 : black" class="menu-btn" onclick="startSelectionSort()">Selection Sort</button>
                <button style="--color : white; --color2 : black" class="menu-btn" onclick="startInsertionSort()">Insertion Sort</button>
                <input type="number" id="searchValue" placeholder="Search Element">
                <button style="--color : white; --color2 : black" class="menu-btn" onclick="startBinarySearch()">Binary Search</button>
                <button style="--color : white; --color2 : black" class="menu-btn" onclick="startLinearSearch()">Linear Search</button>

            </div>
            <div id="arrayContainer" class="array-container"></div>
    `;

    let array = [4,2,47,38,26,14,10,69];
    let i = 0;
    let j = 0;

    function renderArray() {
        const container = document.getElementById('arrayContainer');
        container.innerHTML = '';
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = value;
            element.style.height = `${value * 5}px`;
            element.dataset.index = index;
            container.appendChild(element);
        });
    }

    window.insertIntoArray = function () {
        const value = parseInt(document.getElementById('arrayValue').value);
        if (!isNaN(value)) {
            array.push(value);
            resetSortState();
            renderArray();
            const container = document.getElementById('arrayContainer');
            const newElement = container.children[container.children.length - 1];
            newElement.classList.add('added');

            setTimeout(() => {
                newElement.classList.remove('added');
            }, 500);
        }
    };

    window.deleteFromArray = function () {
        array.pop();
        resetSortState();
        renderArray();
    };

    window.autosort = async function () {
        while (i < array.length - 1) {
            await performBubbleSortIteration();
        }
    };

    function resetSortState() {
        i = 0;
        j = 0;
    }

    window.performBubbleSortIteration = async function () {
        if (i < array.length - 1) {
            if (j < array.length - i - 1) {
                const container = document.getElementById('arrayContainer');
                const element1 = container.children[j];
                const element2 = container.children[j + 1];
                element1.style.background = 'linear-gradient(red,orange)';
                element2.style.background = 'linear-gradient(red,orange)';
                await sleep(500);

                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    renderArray();
                }

                element1.style.background = '';
                element2.style.background = '';
                await sleep(500);
                j++;
            } else {
                j = 0;
                i++;
            }
        } else {
            alert("Array is already sorted!");
        }
    };

    window.startMergeSort = async function () {
        await mergeSort(array, 0, array.length - 1);
        renderArray();
    };

    async function mergeSort(arr, left, right) {
        if (left >= right) {
            return;
        }

        const middle = Math.floor((left + right) / 2);
        await mergeSort(arr, left, middle);
        await mergeSort(arr, middle + 1, right);
        await merge(arr, left, middle, right);
    }

    async function merge(arr, left, middle, right) {
        const n1 = middle - left + 1;
        const n2 = right - middle;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) {
            L[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = arr[middle + 1 + j];
        }

        let i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            const container = document.getElementById('arrayContainer');
            const leftElement = container.children[left + i];
            const rightElement = container.children[middle + 1 + j];

            leftElement.style.background = 'linear-gradient(blue,aqua)';
            rightElement.style.background = 'linear-gradient(green,greenyellow)';
            await sleep(500);

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }

            renderArray();
            await sleep(500);

            leftElement.style.background = '';
            rightElement.style.background = '';
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            renderArray();
            await sleep(500);
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            renderArray();
            await sleep(500);
        }

        for (let x = left; x <= right; x++) {
            const container = document.getElementById('arrayContainer');
            container.children[x].style.background = 'linear-gradient(pink,yellow)';
        }

        await sleep(500);
    }

    window.startSelectionSort = async function () {
        await selectionSort(array);
        renderArray();
    };

    async function selectionSort(arr) {
        const container = document.getElementById('arrayContainer');

        for (let i = 0; i < arr.length; i++) {
            let minIdx = i;
            let resetminIndx = minIdx;
            container.children[resetminIndx].style.background = 'linear-gradient(blue,aqua)';

            for (let j = i + 1; j < arr.length; j++) {
                const element2 = container.children[j];
                element2.style.background = 'linear-gradient(green,greenyellow)';
                await sleep(500);

                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
                element2.style.background = '';

                await sleep(500);
            }

            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            }
            renderArray();
            await sleep(500);
        }
    }



    window.startInsertionSort = async function () {
        await insertionSort(array);
        renderArray();
    };

    async function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;

            const container = document.getElementById('arrayContainer');
            const currentElement = container.children[i];
            currentElement.style.background = 'linear-gradient(blue,aqua)';
            await sleep(500);

            while (j >= 0 && arr[j] > key) {
                const elementToCompare = container.children[j];
                elementToCompare.style.background = 'linear-gradient(green,greenyellow)';
                await sleep(500);

                arr[j + 1] = arr[j];
                renderArray();
                await sleep(500);

                elementToCompare.style.background = '';
                j = j - 1;
            }

            arr[j + 1] = key;
            renderArray();
            await sleep(500);

            for (let k = 0; k <= i; k++) {
                container.children[k].style.background = 'linear-gradient(pink,yellow)';
            }

            currentElement.style.background = '';
        }
    }


    window.startBinarySearch = function () {
        const searchValue = parseInt(document.getElementById('searchValue').value);
        if (!isNaN(searchValue)) {
            resetSearchVisuals();
            binarySearch(array, searchValue);
        } else {
            alert("Please enter a valid search value.");
        }
    };

    function resetSearchVisuals() {
        const container = document.getElementById('arrayContainer');
        for (let x = 0; x < array.length; x++) {
            container.children[x].style.background = '';
        }
    }

    async function binarySearch(arr, searchValue) {
        let low = 0;
        let high = arr.length - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            const container = document.getElementById('arrayContainer');
            const midElement = container.children[mid];
            midElement.style.background = 'linear-gradient(green,greenyellow)';
            await sleep(500);

            if (arr[mid] === searchValue) {
                midElement.style.background = 'linear-gradient(pink,yellow)';
                alert(`Element ${searchValue} found at index ${mid}.`);
                return;
            } else if (arr[mid] < searchValue) {
                for (let x = low; x <= mid; x++) {
                    const container = document.getElementById('arrayContainer');
                    container.children[x].style.background = 'linear-gradient(red,orange)';
                }
                await sleep(500);

                low = mid + 1;
            } else {
                for (let x = mid; x <= high; x++) {
                    const container = document.getElementById('arrayContainer');
                    container.children[x].style.background = 'linear-gradient(red,orange)';
                }
                await sleep(500);

                high = mid - 1;
            }

            for (let x = low; x <= high; x++) {
                const container = document.getElementById('arrayContainer');
                container.children[x].style.background = 'linear-gradient(green,greenyellow)';
            }

            await sleep(500);
        }

        alert(`Element ${searchValue} not found.`);
    }

    window.startLinearSearch = function () {
        const searchValue = parseInt(document.getElementById('searchValue').value);
        if (!isNaN(searchValue)) {
            resetSearchVisuals();
            linearSearch(array, searchValue);
        } else {
            alert("Please enter a valid search value.");
        }
    };

    async function linearSearch(arr, searchValue) {
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            const container = document.getElementById('arrayContainer');
            const currentElement = container.children[i];
            currentElement.style.background = 'linear-gradient(blue,aqua)';
            await sleep(500);

            if (arr[i] === searchValue) {
                currentElement.style.background = 'linear-gradient(pink,yellow)';
                alert(`Element ${searchValue} found at index ${i}.`);
                found = true;
                break;
            }

            currentElement.style.background = '';
            await sleep(500);
        }

        if (!found) {
            alert(`Element ${searchValue} not found.`);
        }
    }

    renderArray();
}

function showLinkedListVisualizer() {
    const area = document.getElementById('visualizationArea');
    area.innerHTML = `
        <div class="menu-row1">
            <input type="number" id="listValue" placeholder="Enter Element">
            <input type="number" id="positionValue" placeholder="Position (optional)">
            <button style="--color: aqua; --color2: black" class="menu-btn" onclick="insertAtHead()">Insert at Head</button>
            <button style="--color: aqua; --color2: black" class="menu-btn" onclick="insertAtTail()">Insert at Tail</button>
            <button style="--color: aqua; --color2: black" class="menu-btn" onclick="insertAtPosition()">Insert at Position</button>
            <button style="--color: rgb(255, 115, 0); --color2: white" class="menu-btn" onclick="deleteAtPosition()">Delete at Position</button>
        </div>
        <div id="linkedListContainer" class="linked-list-container"></div>
    `;

    class ListNode {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    }

    let head = null;
    let size = 0;

    function renderLinkedList() {
        const container = document.getElementById('linkedListContainer');
        container.innerHTML = '';
        let currentNode = head;
        while (currentNode !== null) {
            const element = document.createElement('div');
            element.className = 'list-node';
            element.textContent = currentNode.value;
            container.appendChild(element);

            if (currentNode.next !== null) {
                const arrow = document.createElement('div');
                arrow.className = 'arrow';
                container.appendChild(arrow);
            }

            currentNode = currentNode.next;
        }
    }

    window.insertAtHead = function () {
        const value = parseInt(document.getElementById('listValue').value);
        if (!isNaN(value)) {
            const newNode = new ListNode(value);
            newNode.next = head;
            head = newNode;
            size++;
            renderLinkedList();
        }
    };

    window.insertAtTail = async function () {
        const value = parseInt(document.getElementById('listValue').value);
        if (!isNaN(value)) {
            const newNode = new ListNode(value);
            if (head === null) {
                head = newNode;
            } else {
                let currentNode = head;
                let index = 0;
                while (currentNode.next !== null) {
                    const container = document.getElementById('linkedListContainer');
                    const currentElement = container.children[index * 2];
                    currentElement.style.background = 'linear-gradient(blue, aqua)';
                    await sleep(500);
                    currentElement.style.background = '';
                    currentNode = currentNode.next;
                    index++;
                }
                const lastElement = document.getElementById('linkedListContainer').children[index * 2];
                lastElement.style.background = 'linear-gradient(blue, aqua)';
                await sleep(500);
                lastElement.style.background = '';

                currentNode.next = newNode;
            }
            size++;
            renderLinkedList();
        }
    };

    window.insertAtPosition = async function () {
        const value = parseInt(document.getElementById('listValue').value);
        const position = parseInt(document.getElementById('positionValue').value) - 1;
        if (!isNaN(value) && !isNaN(position) && position >= 0) {
            const newNode = new ListNode(value);
            if (position === 0) {
                newNode.next = head;
                head = newNode;
            } else {
                let currentNode = head;
                let index = 0;
                while (index < position - 1 && currentNode !== null) {
                    const container = document.getElementById('linkedListContainer');
                    const currentElement = container.children[index * 2];

                    currentElement.style.background = 'linear-gradient(blue, aqua)';
                    await sleep(500);
                    currentElement.style.background = '';

                    currentNode = currentNode.next;
                    index++;
                }

                if (currentNode === null) return;

                const nextElement = currentNode.next;
                currentNode.next = newNode;
                newNode.next = nextElement;

                const insertedElement = document.getElementById('linkedListContainer').children[index * 2];
                insertedElement.style.background = 'linear-gradient(blue, aqua)';
                await sleep(500);
                insertedElement.style.background = '';
            }
            size++;
            renderLinkedList();
        }
    };


    window.deleteAtPosition = async function () {
        const position = parseInt(document.getElementById('positionValue').value);
        if (!isNaN(position) && position >= 0) {
            if (position === 0 && head !== null) {
                head = head.next;
            } else {
                let currentNode = head;
                let index = 0;
                while (index < position - 1 && currentNode !== null) {
                    const container = document.getElementById('linkedListContainer');
                    const currentElement = container.children[index * 2];

                    currentElement.style.background = 'linear-gradient(blue, aqua)';
                    await sleep(500);
                    currentElement.style.background = '';

                    currentNode = currentNode.next;
                    index++;
                }

                if (currentNode === null || currentNode.next === null) return;

                const insertedElement = document.getElementById('linkedListContainer').children[index * 2];
                insertedElement.style.background = 'linear-gradient(blue, aqua)';
                await sleep(500);
                insertedElement.style.background = '';

                // Create a bypass arrow div
                const container = document.getElementById('linkedListContainer');
                const bypassArrow = container.children[index * 2 + 1];
                bypassArrow.className = 'bypass-arrow';
                if (size > 2) {
                    const bypassArrow2 = container.children[index * 2 + 3];
                    bypassArrow2.className = 'bypass-arrow2';
                }

                await sleep(1000);

                // Remove the bypass arrow and delete the node
                container.removeChild(bypassArrow);
                currentNode.next = currentNode.next.next;
            }
            size--;
            renderLinkedList();
        }
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    renderLinkedList();
}

function showStackVisualizer() {
    const area = document.getElementById('visualizationArea');
    area.innerHTML = `
        <div class="menu-row1">
            <input type="number" id="stackValue" placeholder="Enter Element">
            <button style="--color: aqua; --color2: black" class="menu-btn" onclick="pushToStack()">Push</button>
            <button style="--color: rgb(255, 115, 0); --color2: white" class="menu-btn" onclick="popFromStack()">Pop</button>
            <button style="--color: green; --color2: white" class="menu-btn" onclick="isEmpty()">IsEmpty</button>
            <button style="--color: red; --color2: white" class="menu-btn" onclick="isFull()">IsFull</button>
            <button style="--color: blue; --color2: white" class="menu-btn" onclick="stackSize()">Size</button>
        </div>
        <div id="stackContainer" class="stack-container"></div>
    `;

    const stack = [];
    const maxSize = 10;
    let top = -1;

    function renderStack() {
        const container = document.getElementById('stackContainer');
        container.innerHTML = '';
        for (let i = top; i >= 0; i--) {
            const element = document.createElement('div');
            element.className = 'stack-element';
            element.textContent = stack[i];
            container.appendChild(element);
        }
    }

    window.pushToStack = function () {
        const value = parseInt(document.getElementById('stackValue').value);
        if (!isNaN(value)) {
            if (top < maxSize - 1) {
                top++;
                stack[top] = value;
                renderStack();
            } else {
                alert("Stack is full. Cannot push.");
            }
        }
    };

    window.popFromStack = function () {
        if (top >= 0) {
            top--;
            renderStack();
        } else {
            alert("Stack is empty. Cannot pop.");
        }
    };

    window.isEmpty = function () {
        alert(top === -1 ? "Stack is empty." : "Stack is not empty.");
    };

    window.isFull = function () {
        alert(top === maxSize - 1 ? "Stack is full." : "Stack is not full.");
    };

    window.stackSize = function () {
        alert("Stack size is " + (top + 1) + ".");
    };

    renderStack();
}





function showQueueVisualizer() {
    const area = document.getElementById('visualizationArea');
    area.innerHTML = `
        <div class="menu-row1">
            <input type="number" id="queueValue" placeholder="Enter Element">
            <button style="--color: aqua; --color2: black" class="menu-btn" onclick="enqueue()">Enqueue</button>
            <button style="--color: rgb(255, 115, 0); --color2: white" class="menu-btn" onclick="dequeue()">Dequeue</button>
            <button style="--color: green; --color2: white" class="menu-btn" onclick="isEmpty()">IsEmpty</button>
            <button style="--color: red; --color2: white" class="menu-btn" onclick="isFull()">IsFull</button>
            <button style="--color: blue; --color2: white" class="menu-btn" onclick="queueSize()">Size</button>
            <button style="--color: purple; --color2: white" class="menu-btn" onclick="highlightFront()">Highlight Front</button>
            <button style="--color: orange; --color2: white" class="menu-btn" onclick="highlightRear()">Highlight Rear</button>
        </div>
        <div id="queueContainer" class="queue-container"></div>
    `;

    const queue = [];
    const maxSize = 10;
    let front = 0;
    let rear = 0;
    let size = 0;

    function renderQueue() {
        const container = document.getElementById('queueContainer');
        container.innerHTML = '';
        for (let i = front; i < rear; i++) {
            const element = document.createElement('div');
            element.className = 'queue-element';
            element.textContent = queue[i % maxSize];
            container.appendChild(element);
        }
    }

    window.enqueue = function () {
        const value = parseInt(document.getElementById('queueValue').value);
        if (!isNaN(value)) {
            if (size < maxSize) {
                queue[rear % maxSize] = value;
                rear++;
                size++;
                renderQueue();
                const elements = document.getElementsByClassName('queue-element');
                const newElement = elements[elements.length - 1];
                newElement.classList.add('enqueue');
                setTimeout(() => newElement.classList.remove('enqueue'), 500);
            } else {
                alert("Queue is full. Cannot enqueue.");
            }
        }
    };

    window.dequeue = function () {
        if (size > 0) {
            const elements = document.getElementsByClassName('queue-element');
            const frontElement = elements[0];
            frontElement.classList.add('dequeue');
            setTimeout(() => {
                front++;
                size--;
                renderQueue();
            }, 500);
        } else {
            alert("Queue is empty. Cannot dequeue.");
        }
    };

    window.isEmpty = function () {
        alert(size === 0 ? "Queue is empty." : "Queue is not empty.");
    };

    window.isFull = function () {
        alert(size === maxSize ? "Queue is full." : "Queue is not full.");
    };

    window.queueSize = function () {
        alert("Queue size is " + size + ".");
    };

    window.highlightFront = async function () {
        if (size > 0) {
            const elements = document.getElementsByClassName('queue-element');
            const frontElement = elements[0];
            frontElement.style.background = 'greenyellow';
            await sleep(1000);
            frontElement.style.background = '';
        }
    };

    window.highlightRear = async function () {
        if (size > 0) {
            const elements = document.getElementsByClassName('queue-element');
            const rearElement = elements[elements.length - 1];
            rearElement.style.background = 'greenyellow';
            await sleep(1000);
            rearElement.style.background = '';
        }
    };

    renderQueue();
}


function showTreeVisualizer() {
    const area = document.getElementById('visualizationArea');
    area.innerHTML = `
    <div class="menu-row1">
    <input type="text" id="treeValue" placeholder="Enter Element or Null">
    <button style="--color: aqua; --color2: black" class="menu-btn" onclick="addElement()">Add Element</button>
            <button style="--color: aqua; --color2: black" class="menu-btn" onclick="preorderTraversal()">Preorder</button>
            <button style="--color: aqua; --color2: black" class="menu-btn" onclick="inorderTraversal()">Inorder</button>
            <button style="--color: aqua; --color2: black" class="menu-btn" onclick="postorderTraversal()">Postorder</button>
        </div>
        <div id="treeContainer" class="tree-container"></div>
    `;

    class TreeNode {
        constructor(value, level = 0, index = 0) {
            this.value = value;
            this.left = null;
            this.right = null;
            this.level = level;
            this.index = index;
        }
    }

    let root = null;
    let treeRows = [[null]]; // Initialize with a null root

    window.addElement = function () {
        const value = document.getElementById('treeValue').value.trim();
        let newNode;
        if (value.length == 0) {
            newNode = new TreeNode(null);
        }
        else {
            console.log(value);
            newNode = new TreeNode(value);
        }

        if (root === null) {
            if (newNode.value === null) return; // Do not set root to null
            root = newNode;
            treeRows[0][0] = root;
            updateTreeRows(0);
        } else {
            insert(newNode.value);
            insertNode(newNode);
        }

        renderTree();
    };

    function insert(value) {
        const newNode = new TreeNode(value);

        if (!root) {
            root = newNode;
            root.level = 0;
            root.index = 0;
            return;
        }

        const queue = [root];

        while (queue.length > 0) {
            const node = queue.shift();

            if (!node.left) {
                node.left = newNode;
                newNode.level = node.level + 1;
                newNode.index = node.index * 2; // Adjust index for left child
                return;
            } else {
                queue.push(node.left);
            }

            if (!node.right) {
                node.right = newNode;
                newNode.level = node.level + 1;
                newNode.index = node.index * 2 + 1; // Adjust index for right child
                return;
            } else {
                queue.push(node.right);
            }
        }
    }

    window.preorderTraversal = function () {
        let result = [];
        const nodes = [];
        performPreorderTraversal(root, result, nodes);
        visualizeTraversal(nodes);
        console.log('Preorder Traversal:', result.join(' '));
    };

    function performPreorderTraversal(node, result, nodes) {
        if (node !== null && node.value != null) {
            result.push(node.value);
            nodes.push(node);
            performPreorderTraversal(node.left, result, nodes);
            performPreorderTraversal(node.right, result, nodes);
        }
    }

    window.inorderTraversal = function () {
        let result = [];
        const nodes = [];
        performInorderTraversal(root, result, nodes);
        visualizeTraversal(nodes);
        console.log('Inorder Traversal:', result.join(' '));
    };

    function performInorderTraversal(node, result, nodes) {
        if (node !== null && node.value != null) {
            performInorderTraversal(node.left, result, nodes);
            result.push(node.value);
            nodes.push(node);
            performInorderTraversal(node.right, result, nodes);
        }
    }

    window.postorderTraversal = function () {
        let result = [];
        const nodes = [];
        performPostorderTraversal(root, result, nodes);
        visualizeTraversal(nodes);
        console.log('Preorder Traversal:', result.join(' '));
    };

    function performPostorderTraversal(node, result, nodes) {
        if (node !== null && node.value != null) {
            performPostorderTraversal(node.left, result, nodes);
            performPostorderTraversal(node.right, result, nodes);
            result.push(node.value);
            nodes.push(node);
        }
    }

    function visualizeTraversal(nodes) {
        nodes.forEach((node, index) => {
            setTimeout(() => {
                renderTree(); // Reset tree to default appearance
                highlightNode(node);
            }, index * 1000);
        });
    }

    function highlightNode(node) {
        const container = document.getElementById('treeContainer');
        const treerow = container.children[node.level];
        const nod = treerow.children[node.index];
        const pElement = nod.querySelector('p');
        pElement.style.background = 'linear-gradient(aqua, blue)';
    }

    function insertNode(newNode) {
        for (let level = 0; level < treeRows.length; level++) {
            for (let i = 0; i < treeRows[level].length; i++) {
                if (treeRows[level][i] === null) continue; // Skip null nodes

                if (treeRows[level][i] !== null) {
                    let leftChildIdx = 2 * i;
                    let rightChildIdx = 2 * i + 1;

                    if (treeRows[level][i].value === null) continue;

                    if (treeRows[level + 1][leftChildIdx] === null) {
                        treeRows[level + 1][leftChildIdx] = newNode;
                        if (level + 1 === treeRows.length - 1) {
                            updateTreeRows(level + 1);
                        }
                        return;
                    } else if (treeRows[level + 1][rightChildIdx] === null) {
                        treeRows[level + 1][rightChildIdx] = newNode;
                        if (level + 1 === treeRows.length - 1) {
                            updateTreeRows(level + 1);
                        }
                        return;
                    }
                }
            }
        }
    }

    function updateTreeRows(level) {
        const nextLevel = level + 1;
        treeRows[nextLevel] = new Array(Math.pow(2, nextLevel)).fill(null);
    }


    function renderTree() {
        const container = document.getElementById('treeContainer');
        container.innerHTML = '';
        for (let i = 0; i < treeRows.length - 1; i++) {
            const row = treeRows[i];
            const rowElement = document.createElement('div');
            rowElement.className = 'tree-row';
            container.appendChild(rowElement);
            for (let j = 0; j < row.length; j++) {
                const node = row[j];
                const element = document.createElement('div');
                element.className = 'tree-node';
                element.style.width = `${100 / Math.pow(2, i)}%`;
                if (node === null || node.value === null) {
                    element.textContent = 'n';
                    element.style.opacity = '0';
                }
                else {
                    element.innerHTML = `<p>${node.value}</p>`;
                    element.style.opacity = '1';
                }
                rowElement.appendChild(element);
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}