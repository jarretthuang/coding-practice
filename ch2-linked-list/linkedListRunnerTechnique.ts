// Bible P93


/**
 * Represents a linked list.
 */
export class LinkedListNode {

    /**
     * Value of current node
     */
    public value: string;

    /**
     * Reference of next node. This could be undefined.
     */
    public next?: LinkedListNode;

    /**
     * Builds a linked list from an array of strings.
     * This is helpful for our testing later.
     */
    constructor(arr: string[]) {
        if (arr.length === 1) {
            this.value = arr[0];
        } else if (arr.length > 1) {
            this.value = arr[0];
            this.next = new LinkedListNode(arr.slice(1));
        } else {
            throw new Error("Cannot initiate a linked list with 0 element.");
        }
    }

    /**
     * Returns the list as an easily readable string.
     */
    public getJoinedString(): string {
        let currentNode: LinkedListNode = this;
        let result = currentNode.value;

        while (currentNode.next) {
            result += " => ";
            result += currentNode.next.value;
            currentNode = currentNode.next;
        }

        return result;
    }

}

/**
 * 
 * Rearrange a1 -> a2 -> a3...-> an -> b1 -> b2 -> b3...-> bn into
 * a1 -> b1 -> a2 -> b2...an -> bn
 * The input array has an arbitrary EVEN length.
 */
export function weave(list: LinkedListNode): LinkedListNode {
    let slowPointer: LinkedListNode | undefined = list;
    let fastPointer: LinkedListNode | undefined = list.next;
    let result: string[] = [];

    while (fastPointer) {
        slowPointer = slowPointer?.next;
        fastPointer = fastPointer.next?.next;
        // Fast pointer goes 2 steps at a time so that by the time fast pointer is at the end of the array (bn),
        // slow pointer is just in the middle (an).
    }

    fastPointer = list; // reset the fast pointer at the front of the array
    
    while (slowPointer) {
        if (fastPointer?.value && slowPointer.value) {
            // start weaving
            result.push(fastPointer?.value);
            result.push(slowPointer.value);
        }
        slowPointer = slowPointer.next;
        fastPointer = fastPointer?.next
    }
    
    return new LinkedListNode(result);
}
