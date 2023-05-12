import {describe, test,expect  } from "@jest/globals";
import * as ToBeTested from "./calculateTime";

describe("Calculate time algorihtm", () =>{
    test("Calculate the time from a calculateStep", async() =>{
        const test = await ToBeTested.calculateStep("A1","B1");
        console.log(test)
        expect(test).toBe(10.46);
    });

    test("Calculate the time from a calculateStep (undefined)", async() =>{
        const test2 = await ToBeTested.calculateStep("A1","B2");
        console.log(test2)
        expect(test2).toBeUndefined();
    });

    test("Calculate a time from a entire path", async() =>{
        const test = await ToBeTested.calculateTime(["A1","B1"]);
        expect(test).toBe(10.46);
    });
  
})