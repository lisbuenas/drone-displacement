import {describe, test,expect  } from "@jest/globals";
import * as ToBeTested from "./findRoute";

describe("Routing algorihtm", () =>{
    test("Check if there's missing params", () =>{
        const response = ToBeTested.findRoute('', 'C2', 'H8');
        console.log({response})
        expect(response.length).toBe(0); 
    });

    test("Check if there's valid route", () =>{
        const response = ToBeTested.findRoute("A1", "B2" , "H7");
        console.log(response)
        expect(response).toBeDefined(); 
    });

    test("Check if there's invalid route", () =>{
        const response = ToBeTested.findRoute("A91", "B2" , "H7");
        expect(response.length).toBe(0);
    }); 
})