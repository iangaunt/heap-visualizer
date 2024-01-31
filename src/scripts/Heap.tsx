
export default class Heap {
    /**
     * Returns the parent element of a specified node.
     * 
     * @param height - The height of the input node.
     * @param pos - The position of the input node on its row.
     * @returns - The HTML element of its parent.
     */
    static getParent(height: number, pos: number) {
        const parentHeight = height - 1;
        const parentPos = Math.ceil((pos / Math.pow(2, height)) * Math.pow(2, height - 1))
        return document.getElementById(parentHeight + "-" + parentPos);
    }

    /**
     * Returns the left child of a specified node.
     *
     * @param height - The height of the input node.
     * @param pos - The position of the input node on its row.
     * @returns - The HTML element of its left child.
     */
    static getLeftChild(height: number, pos: number): HTMLElement {
        return document.getElementById(height + 1 + "-" + (2 * pos - 1));
    }

    /**
     * Returns the right child of a specified node.
     *
     * @param height - The height of the input node.
     * @param pos - The position of the input node on its row.
     * @returns - The HTML element of its right child.
     */
    static getRightChild(height: number, pos: number): HTMLElement {
        return document.getElementById(height + 1 + "-" + (2 * pos));
    }

    /**
     * Fetches the current value stored in a Node in its `h1` element.
     * 
     * @param element - The node to fetch from.
     * @returns - The integer value stored in the node.
     */
    static getValue(element: HTMLElement): number {
        return parseInt(
            element.getElementsByTagName("h1")[0].innerHTML
        );
    }

    /**
     * Swaps the two values stored in two nodes.
     * 
     * @param one - The first node to swap.
     * @param two - The second node to swap.
     */
    static swapElementValues(one: HTMLElement, two: HTMLElement): void {
        const temp = this.getValue(one);
        one.getElementsByTagName("h1")[0].innerHTML = two.getElementsByTagName("h1")[0].innerHTML;
        two.getElementsByTagName("h1")[0].innerHTML = temp.toString();
    }

     /**
     * Swaps the two colors of two nodes.
     * 
     * @param one - The first node to swap.
     * @param two - The second node to swap.
     */
    static swapColors(one: HTMLElement, two: HTMLElement): void {
        const temp = one.style.backgroundColor;
        one.style.backgroundColor = two.style.backgroundColor;
        two.style.backgroundColor = temp;
    }

    /**
     * Highlights the parent element and child element of a passed in 
     * node. This allows for easy traversal of the heap in a visual way,
     * as lines are difficult to add between nodes without canvas lines.
     * 
     * @param height - The height of the input node.
     * @param pos - The position of the input node in its respective node.
     * @param maxHeight - The maximum height of the tree.
     * @param pCol - The color to highlight the parent of the input node.
     * @param cCol - The color to highlight the children of the input node.
     */
    static highlightFamily(height: number, pos: number, maxHeight: number, pCol: string, cCol: string) {
        if (height != 1) {
            const parent = this.getParent(height, pos)
            parent.style.backgroundColor = pCol;
        }
    
        if (height != maxHeight) {
            const leftChild = this.getLeftChild(height, pos);
            const rightChild = this.getRightChild(height, pos);
            leftChild.style.backgroundColor = cCol;
            rightChild.style.backgroundColor = cCol;
        }
    }

    /**
     * Heaps down dependng on the `downElem` node. This will help the tree
     * be sorted properly in the `heapify` function.
     * 
     * @param downElem - The element to heap down.
     * @param currElem - The current element being observed. Will not be heaped further.
     * @param maxHeight - The maximum height of the tree.
     */
    static heapDown(downElem: HTMLElement, currElem: HTMLElement, maxHeight: number): void {
        this.swapElementValues(downElem, currElem);
        this.swapColors(downElem, currElem);
        this.heapify(
            parseInt(downElem.id.substring(0, downElem.id.indexOf("-"))),
            parseInt(downElem.id.substring(downElem.id.indexOf("-") + 1)),
            maxHeight
        )
    }

    /**
     * Heapifies a node and its children by placing the node with the 
     * largest value on top. Used recursively in order to properly
     * construct a heap out of the input tree.
     * 
     * @param height - The height of the node.
     * @param pos - The position of the node in its respective row.
     */
    static heapify(height: number, pos: number, maxHeight: number): void {
        if (height == maxHeight) return;
    
        const elem = document.getElementById(height + "-" + pos);
        const value = this.getValue(elem);
        
        const left = this.getLeftChild(height, pos);
        const leftValue = this.getValue(left);
    
        const right = this.getRightChild(height, pos);
        const rightValue = this.getValue(right);
        
        let largest = value;
    
        if (leftValue > largest) largest = leftValue;
        if (rightValue > largest) largest = rightValue
    
        if (largest != value) {
            if (largest == leftValue) {
                this.heapDown(left, elem, maxHeight);
            } else if (largest == rightValue) {
                this.heapDown(right, elem, maxHeight);
            }
        }
    }

    /**
     * Constructs a heap out of the currently rendered tree.
     * 
     * @param maxHeight - The maximum height of the heap.
     */
    static buildHeap(height: number, delay: number): void {
        const startingHeight = height - 1;
        let f = 10;
        
        for (let i = startingHeight; i > 0; i--) {
            for (let j = Math.pow(2, i - 1); j > 0; j--) {
                setTimeout(() => {
                    Heap.heapify(i, j, height);
                }, delay * f)
                f++;
            }
        }
    }
}