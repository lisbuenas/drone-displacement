import {describe, test,expect  } from "@jest/globals";
import * as ToBeTested from "./calculateTime";

describe("Calculate time algorihtm", () =>{
    test("Calculate the time from a calculateStep", async() =>{
        const test = await ToBeTested.calculateStep(["A1", "B2"]);
    });

    test("Calculate a time from a entire path", () =>{
        
    });

    test("Check if there's invalid route", () =>{
        const response = ToBeTested.findRoute("A91", "B2" , "H7");
        expect(response.length).toBe(0);
    }); 
})