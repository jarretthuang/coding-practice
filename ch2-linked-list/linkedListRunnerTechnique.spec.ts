import { LinkedListNode, weave } from "./linkedListRunnerTechnique";


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

    it("weave function should rearrange items correctly", () => {
        const testArray: string[] = ["a1", "a2", "a3", "b1", "b2", "b3"];
        const testList: LinkedListNode = new LinkedListNode(testArray);
        const wovenList: LinkedListNode = weave(testList);

        expect(wovenList.getJoinedString()).toEqual("a1 => b1 => a2 => b2 => a3 => b3");
    });
});
