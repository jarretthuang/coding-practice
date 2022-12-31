/**
 * Represents a linked list.
 */
export class LinkedListNode {
  /**
   * Value of current node
   */
  public value: string | number;

  /**
   * Reference of next node. This could be undefined.
   */
  public next?: LinkedListNode;

  /**
   * Builds a linked list from an array of strings.
   * This is helpful for our testing later.
   */
  constructor(arr: (string | number)[] = []) {
    if (arr.length === 1) {
      this.value = arr[0];
    } else if (arr.length > 1) {
      this.value = arr[0];
      this.next = new LinkedListNode(arr.slice(1));
    }
  }

  /**
   * Returns the list as an easily readable string.
   */
  public get toJoinedString(): string {
    return Array.from(this.toStringArray).join(" => ");
  }

  /**
   * Converts current linked list to an array.
   */
  public get toArray(): (string | number)[] {
    let currentNode: LinkedListNode = this;
    let result = [currentNode.value];

    while (currentNode.next) {
      result.push(currentNode.next.value);
      currentNode = currentNode.next;
    }

    return result;
    // T(n) = O(n), S(n) = O(n)
  }

  public get toNumberArray(): number[] {
    return this.toArray.map((value) => Number(value));
  }

  public get toStringArray(): string[] {
    return this.toArray.map((value) => value.toString());
  }
}

/**
 * [CTCI-P93]
 * Rearrange a1 -> a2 -> a3...-> an -> b1 -> b2 -> b3...-> bn into
 * a1 -> b1 -> a2 -> b2...an -> bn
 * The input array has an arbitrary EVEN length.
 */
export function weave(list: LinkedListNode): LinkedListNode {
  let slowPointer: LinkedListNode | undefined = list;
  let fastPointer: LinkedListNode | undefined = list.next;
  const result: LinkedListNode = new LinkedListNode();
  let currentResultNode: LinkedListNode = result;

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
      currentResultNode.value = fastPointer?.value;
      const nextNode: LinkedListNode = new LinkedListNode([slowPointer.value]);
      if (slowPointer.next) {
        // this HAS TO BE slowPointer.next because fastPointer will enter the 2nd half of the array and still be defined
        nextNode.next = new LinkedListNode();
      }
      currentResultNode.next = nextNode;
      currentResultNode = nextNode.next;
    }
    slowPointer = slowPointer.next;
    fastPointer = fastPointer?.next;
  }

  return result;
  // T(n) = O(n), S(n) = O(1)
}

/**
 * [CTCI-P94-2.1]
 * Remove duplicates from an unsorted linked list.
 * Do this without a temporary buffer.
 */
export function removeDuplicatesFrom(list: LinkedListNode): LinkedListNode {
  return new LinkedListNode([...new Set(list.toStringArray)]);
  // T(n) = O(n), S(n) = O(n)
}

/**
 * [CTCI-P94-2.2]
 * Return k-th to last element.
 */
export function returnKthToLast(list: LinkedListNode, k: number): string {
  const array: string[] = list.toStringArray;
  if (k > array.length) {
    throw new Error("Linked list has less than k elements!");
  } else if (k < 1) {
    throw new Error("K needs to be a positive number!");
  } else {
    return array.slice(-k)[0];
  }
  // T(n) = O(n), S(n) = O(n)
}

/**
 * [CTCI-P94-2.2] Optimal solution using pointers instead of arrays.
 * Return k-th to last element.
 */
export function returnKthToLastFast(list: LinkedListNode, k: number): string {
  let slowPointer: LinkedListNode = list;
  let fastPointer: LinkedListNode = list;

  for (let i = 0; i < k; i++) {
    if (!fastPointer) {
      throw new Error("Linked list has less than k elements!");
    }
    fastPointer = fastPointer.next;
  }

  while (fastPointer) {
    fastPointer = fastPointer.next;
    slowPointer = slowPointer.next;
  }

  return slowPointer.value.toString();
  // T(n) = O(n), S(n) = O(1)
}

/**
 * [CTCI-P94-2.3]
 * Delete middle node given only access to that node.
 * e.g.
 * input: node c from a -> b -> c -> d -> e -> f
 * output: returns nothing. linked list becomes a -> b -> d -> e -> f
 */
export function deleteMiddleNode(node: LinkedListNode): void {
  if (node === undefined || node.next === undefined) {
    throw new Error(
      "Cannot delete node because remaining nodes are undefined."
    );
  } else {
    const nextNode: LinkedListNode = node.next;
    node.value = nextNode.value;
    node.next = nextNode.next;
  }
}

/**
 * [CTCI-P94-2.5]
 * Sum lists that each represents a number in reverse order.
 * e.g.
 * input: (7 -> 1 -> 6) + (5 -> 9 -> 2), i.e. 617 + 295
 * output: 2 -> 1 -> 9, i.e. 912
 */
export function sumLists(a: LinkedListNode, b: LinkedListNode): LinkedListNode {
  const result: LinkedListNode = new LinkedListNode();
  let currentNode: LinkedListNode = result;
  let carry: number = 0;
  while (a || b) {
    const currentSum: number =
      Number(a?.value ?? 0) + Number(b?.value ?? 0) + carry;
    carry = 0;
    if (currentSum > 9) {
      carry = 1;
    }
    currentNode.value = currentSum % 10;
    a = a?.next;
    b = b?.next;
    if (a || b) {
      currentNode.next = new LinkedListNode();
      currentNode = currentNode.next;
    }
  }
  return result;
  // T(n) = O(n), S(n) = O(1)
}
