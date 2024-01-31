export default class Heap {
    maxHeight: number;

    /**
     * Creates a new Heap sorter with a specified maximum height
     * to prevent overflow.
     * 
     * @param maxHeight - The maximum height a node in the tree can be.
     */
    constructor(maxHeight: number) {
        this.maxHeight = maxHeight;
    }

    /**
     * Returns the left child of a specified node.
     *
     * @param height - The height of the input node.
     * @param pos - The position of the input node on its row.
     * @returns - The HTML element of its left child.
     */
    getLeftChild(height: number, pos: number): HTMLElement {
        return document.getElementById(height + 1 + "-" + (2 * pos - 1));
    }

    /**
     * Returns the right child of a specified node.
     *
     * @param height - The height of the input node.
     * @param pos - The position of the input node on its row.
     * @returns - The HTML element of its right child.
     */
    getRightChild(height: number, pos: number): HTMLElement {
        return document.getElementById(height + 1 + "-" + (2 * pos));
    }

    /**
     * Fetches the current value stored in a Node in its `h1` element.
     * 
     * @param element - The node to fetch from.
     * @returns - The integer value stored in the node.
     */
    getValue(element: HTMLElement): number {
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
    swapElementValues(one: HTMLElement, two: HTMLElement): void {
        let temp = this.getValue(one);
        one.getElementsByTagName("h1")[0].innerHTML = two.getElementsByTagName("h1")[0].innerHTML;
        two.getElementsByTagName("h1")[0].innerHTML = temp.toString();
    }

     /**
     * Swaps the two colors of two nodes.
     * 
     * @param one - The first node to swap.
     * @param two - The second node to swap.
     */
    swapColors(one: HTMLElement, two: HTMLElement): void {
        let temp = one.style.backgroundColor;
        one.style.backgroundColor = two.style.backgroundColor;
        two.style.backgroundColor = temp;
    }

    /**
     * Heapifies a node and its children by placing the node with the 
     * largest value on top. Used recursively in order to properly
     * construct a heap out of the input tree.
     * 
     * @param height - The height of the node.
     * @param pos - The position of the node in its respective row.
     */
    heapify(height: number, pos: number): void {
        if (height == this.maxHeight) return;
    
        let elem = document.getElementById(height + "-" + pos);
        let value = this.getValue(elem);
        
        let left = this.getLeftChild(height, pos);
        let leftValue = this.getValue(left);
    
        let right = this.getRightChild(height, pos);
        let rightValue = this.getValue(right);
        
        let largest = value;
    
        if (leftValue > largest) largest = leftValue;
        if (rightValue > largest) largest = rightValue
    
        if (largest != value) {
            if (largest == leftValue) {
                this.swapElementValues(left, elem);
                this.swapColors(left, elem);
                this.heapify(
                    parseInt(left.id.substring(0, left.id.indexOf("-"))),
                    parseInt(left.id.substring(left.id.indexOf("-") + 1))
                )
            } else if (largest == rightValue) {
                this.swapElementValues(right, elem);
                this.swapColors(left, elem);
                this.heapify(
                    parseInt(right.id.substring(0, left.id.indexOf("-"))),
                    parseInt(right.id.substring(left.id.indexOf("-") + 1))
                )
            }
        }
    }
}