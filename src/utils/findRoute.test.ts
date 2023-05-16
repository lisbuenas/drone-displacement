import {describe, test,xtest,expect  } from "@jest/globals";
import * as ToBeTested from "./findRoute";

describe("Routing algorihtm", () =>{

    xtest("Create chessboard", () =>{
        const test = ToBeTested.createChessboard();
       // console.log(JSON.stringify(test));
        expect(test).toBe("1")
    })

    xtest("Check if there's missing params", () =>{
        const response = ToBeTested.findRoute('', 'C2', 'H8');
        console.log({response})
        expect(response).toBe(0); 
    });

    test("Check if there's valid route", () =>{
        const response = ToBeTested.findRoute("A1", "B2" , "H7");
        console.log(response)
        expect(response).toBeDefined(); 
    });


    test("Check if there's valid route (check the path)", () =>{
        const response = ToBeTested.findRoute("A1", "B2" , "H7");
        console.log(response)
        expect(response).toBeDefined(); 
    });

    test("Check if there's invalid route", () =>{
        const response = ToBeTested.findRoute("A1", "B2" , "H7");
        expect(response).toBe(0);
    }); 
})