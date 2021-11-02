import {rebase} from "../src/utils/rebase";

describe("Testing indexPageRenderer", () => {
    test("rebase Value for i% epocs of value i%", () => {
        const sum = 2 + 3;
        const expectedResult = 5;
        expect(sum).toEqual(expectedResult);
    });

    // Jest also allows a test to run multiple
    // times using different values
    test.each([[1, 100, 1, 2], [2, 50, 50, 75], [1, 1.81, 8300, 7262.84]])(
        'rebase value for i% epocs of value i% and start value of i% equals i%',
        (numberOfEpocs, epocValue, initialValue, expectedResult) => {
            expect(rebase(numberOfEpocs, epocValue, initialValue)).toBe(expectedResult);
        });
});