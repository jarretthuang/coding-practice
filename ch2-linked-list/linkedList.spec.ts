import {
  LinkedListNode,
  deleteMiddleNode,
  isPalindrome,
  removeDuplicatesFrom,
  returnKthToLast,
  returnKthToLastFast,
  sumLists,
  weave,
} from "./linkedList";

describe("Linked list", () => {
  it("should properly implement linked list", () => {
    const firstItem: string = "a";
    const secondItem: string = "b";
    const thirdItem: string = "c";

    const testArray: string[] = [firstItem, secondItem, thirdItem];
    const testList: LinkedListNode = new LinkedListNode(testArray);

    expect(testList.value).toEqual(firstItem);
    expect(testList.next?.value).toEqual(secondItem);
    expect(testList.next?.next?.value).toEqual(thirdItem);
  });

  it("weave", () => {
    const testArray: string[] = ["a1", "a2", "a3", "b1", "b2", "b3"];
    const testList: LinkedListNode = new LinkedListNode(testArray);
    const wovenList: LinkedListNode = weave(testList);

    expect(wovenList.toStringArray).toEqual([
      "a1",
      "b1",
      "a2",
      "b2",
      "a3",
      "b3",
    ]);
  });

  it("removeDuplicatesFrom", () => {
    const testArray: string[] = ["a1", "a2", "a3", "a1", "a2", "a4"];
    const testList: LinkedListNode = new LinkedListNode(testArray);
    const result: LinkedListNode = removeDuplicatesFrom(testList);

    expect(result.toStringArray).toEqual(["a1", "a2", "a3", "a4"]);
  });

  it("returnKthToLast", () => {
    const testArray: string[] = ["a1", "a2", "a3"];
    const testList: LinkedListNode = new LinkedListNode(testArray);

    expect(returnKthToLast(testList, 1)).toEqual("a3");
    expect(returnKthToLast(testList, 2)).toEqual("a2");
    expect(returnKthToLast(testList, 3)).toEqual("a1");

    expect(returnKthToLastFast(testList, 1)).toEqual("a3");
    expect(returnKthToLastFast(testList, 2)).toEqual("a2");
    expect(returnKthToLastFast(testList, 3)).toEqual("a1");
  });

  it("deleteMiddleNode", () => {
    const testArray: string[] = ["a1", "a2", "a3"];
    const testList: LinkedListNode = new LinkedListNode(testArray);
    const nodeA2: LinkedListNode = testList.next;
    deleteMiddleNode(nodeA2);
    expect(testList.toStringArray).toEqual(["a1", "a3"]);
  });

  it("sumLists", () => {
    expect(
      sumLists(new LinkedListNode([7, 1, 6]), new LinkedListNode([5, 9, 2]))
        .toNumberArray
    ).toEqual([2, 1, 9]);

    expect(
      sumLists(new LinkedListNode([1, 1, 1]), new LinkedListNode([1]))
        .toNumberArray
    ).toEqual([2, 1, 1]);

    expect(
      sumLists(new LinkedListNode([9, 2]), new LinkedListNode([2, 3, 2]))
        .toNumberArray
    ).toEqual([1, 6, 2]);
  });

  it("isPalindrome", () => {
    expect(isPalindrome(new LinkedListNode([1, 2, 1]))).toBe(true);
    expect(isPalindrome(new LinkedListNode([1, 2, 2, 1]))).toBe(true);
    expect(isPalindrome(new LinkedListNode([1, 2, 3, 4]))).toBe(false);
    expect(isPalindrome(new LinkedListNode([1]))).toBe(true);
  });
});
