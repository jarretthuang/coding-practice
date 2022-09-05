
export class LinkedListNode {

    public value: string;

    public next?: LinkedListNode;

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

    public print(): void {
        let currentNode: LinkedListNode = this;
        let result = currentNode.value;

        while (currentNode.next) {
            result += " => ";
            result += currentNode.next.value;
            currentNode = currentNode.next;
        }

        console.log(result);

    }

}

// rearrange a1 -> a2 -> a3...-> an -> b1 -> b2 -> b3...-> bn into
// a1 -> b1 -> a2 -> b2...an -> bn
export function weave(list: LinkedListNode): LinkedListNode {
    let slowPointer: LinkedListNode | undefined = list;
    let fastPointer: LinkedListNode | undefined = list.next;
    let result: string[] = [];

    while (fastPointer) {
        slowPointer = slowPointer?.next;
        fastPointer = fastPointer.next?.next;
    }

    fastPointer = list;
    
    while (slowPointer) {
        if (fastPointer?.value && slowPointer.value) {
            result.push(fastPointer?.value);
            result.push(slowPointer.value);
        }
        slowPointer = slowPointer.next;
        fastPointer = fastPointer?.next
    }
    
    return new LinkedListNode(result);
}
