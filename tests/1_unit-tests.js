const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const {puzzlesAndSolutions} = require('../controllers/puzzle-strings')

suite('Unit Tests', () => {
    let row = "A"
    let column = "2"
    let value = "3"
    test("Test validate valid puzzle string", (done)=>{
        assert.equal(solver.validate(puzzlesAndSolutions[0][0]).valid, true, "validate puzzle string 1")
        assert.equal(solver.validate(puzzlesAndSolutions[1][0]).valid, true, "validate puzzle string 2")
        assert.equal(solver.validate(puzzlesAndSolutions[2][0]).valid, true, "validate puzzle string 3")
        assert.equal(solver.validate(puzzlesAndSolutions[3][0]).valid, true, "validate puzzle string 4")
        done()
    });
    test("Test validate invalid puzzle string", (done)=>{
        assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.a...9..1..+.8.2.3674.3.7.2..9.47.e.8..1..16.8..926914.37.').error, "Invalid characters in puzzle", "validate invalid character")
        assert.equal(solver.validate('').error, "Required field missing", "validate invalid empty puzzle string")
        done()
    });
    test("Test validate invalid length puzzle string", (done)=>{
        assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16..').error, "Expected puzzle to be 81 characters long", "validate invalid length of string")
        done()
    });
    test("Test valid row placement", (done)=>{
        assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[0][0], row, column, value), true, "validate row placement 1")
        done()
    });
    test("Test invalid row placement", (done)=>{
        assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[0][0], row, column, "1"), false, "invalid duplicate number 1")
        done()
    });
    test("Test valid column placement", (done)=>{
        assert.equal(solver.checkColPlacement(puzzlesAndSolutions[0][0], row, column, value), true, "validate column placement 1")
        done()
    });
    test("Test invalid column placement", (done)=>{
        assert.equal(solver.checkColPlacement(puzzlesAndSolutions[0][0], row, column, "2"), false, "invalid duplicate number 1")
        done()
    });
    test("Test valid region placement", (done)=>{
        assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], row, column, value), true, "validate region placement 1")
        done()
    });
    test("Test invalid region placement", (done)=>{
        assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], row, column, "1"), false, "invalid duplicate number 1")
        done()
    });
    test("Test solve valid puzzle string", (done)=>{
        assert.equal(solver.solve(puzzlesAndSolutions[0][0]).solution, puzzlesAndSolutions[0][1], "solve puzzle string 1")
        assert.equal(solver.solve(puzzlesAndSolutions[1][0]).solution, puzzlesAndSolutions[1][1], "solve puzzle string 2")
        assert.equal(solver.solve(puzzlesAndSolutions[2][0]).solution, puzzlesAndSolutions[2][1], "solve puzzle string 3")
        assert.equal(solver.solve(puzzlesAndSolutions[3][0]).solution, puzzlesAndSolutions[3][1], "solve puzzle string 4")
        done()
    });
    test("Test solve invalid puzzle string", (done)=>{
        assert.equal(solver.solve('115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), false, "solve invalid character")
        done()
    });
    test("Test solve valid puzzle string and return the solutions", (done)=>{
        assert.equal(solver.solve(puzzlesAndSolutions[0][0]).solution, puzzlesAndSolutions[0][1], "solve puzzle string 1")
        assert.equal(solver.solve(puzzlesAndSolutions[1][0]).solution, puzzlesAndSolutions[1][1], "solve puzzle string 2")
        assert.equal(solver.solve(puzzlesAndSolutions[2][0]).solution, puzzlesAndSolutions[2][1], "solve puzzle string 3")
        assert.equal(solver.solve(puzzlesAndSolutions[3][0]).solution, puzzlesAndSolutions[3][1], "solve puzzle string 4")
        done()
    });
});
