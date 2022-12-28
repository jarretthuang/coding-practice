import {
  LinkedListNode,
  removeDuplicatesFrom,
  returnKthToLast,
  returnKthToLastFast,
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

    expect(wovenList.toArray).toEqual(["a1", "b1", "a2", "b2", "a3", "b3"]);
  });

  it("removeDuplicatesFrom", () => {
    const testArray: string[] = ["a1", "a2", "a3", "a1", "a2", "a4"];
    const testList: LinkedListNode = new LinkedListNode(testArray);
    const result: LinkedListNode = removeDuplicatesFrom(testList);

    expect(result.toArray).toEqual(["a1", "a2", "a3", "a4"]);
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
});
