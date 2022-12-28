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
  public get toJoinedString(): string {
    return Array.from(this.toArray).join(" => ");
  }

  /**
   * Converts current linked list to an array.
   */
  public get toArray(): string[] {
    let currentNode: LinkedListNode = this;
    let result = [currentNode.value];

    while (currentNode.next) {
      result.push(currentNode.next.value);
      currentNode = currentNode.next;
    }

    return result;
    // T(n) = O(n), S(n) = O(n)
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
  let result: string[] = []; //TODO do this with S(n) = O(1)?

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
    fastPointer = fastPointer?.next;
  }

  return new LinkedListNode(result);
}

/**
 * [CTCI-P94-2.1]
 * Remove duplicates from an unsorted linked list.
 * Do this without a temporary buffer.
 */
export function removeDuplicatesFrom(list: LinkedListNode): LinkedListNode {
  return new LinkedListNode([...new Set(list.toArray)]);
  // T(n) = O(n), S(n) = O(n)
}

/**
 * [CTCI-P94-2.2]
 * Return k-th to last element.
 */
export function returnKthToLast(list: LinkedListNode, k: number): string {
  const array: string[] = list.toArray;
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

  return slowPointer.value;
  // T(n) = O(n), S(n) = O(1)
}
