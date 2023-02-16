const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const puzzlesAndSolutions = require('../controllers/puzzle-strings')

suite('Unit Tests', () => {
    this.timeout(5000);
    
    test("Test validate valid puzzle string", (done)=>{
        assert.equal(solver.validate(puzzlesAndSolutions[0][0]), true, "validate puzzle string 1")
        assert.equal(solver.validate(puzzlesAndSolutions[1][0]), true, "validate puzzle string 2")
        assert.equal(solver.validate(puzzlesAndSolutions[2][0]), true, "validate puzzle string 3")
        assert.equal(solver.validate(puzzlesAndSolutions[3][0]), true, "validate puzzle string 4")
        done()
    });
    test("Test validate invalid puzzle string", (done)=>{
        assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.a...9..1..+.8.2.3674.3.7.2..9.47.e.8..1..16.8..926914.37.'), false, "validate invalid character")
        assert.equal(solver.validate('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16..'), false, "validate invalid length of string")
        assert.equal(solver.validate('jfldsajfaldksjf'), false, "validate invalid puzzle string 3")
        assert.equal(solver.validate(''), false, "validate invalid empty puzzle string")
        done()
    });
    test("Test valid row placement", (done)=>{
        assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[0][0]), true, "validate row placement 1")
        assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[1][0]), true, "validate row placement 2")
        assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[2][0]), true, "validate row placement 3")
        assert.equal(solver.checkRowPlacement(puzzlesAndSolutions[3][0]), true, "validate row placement 4")
        done()
    });
    test("Test invalid row placement", (done)=>{
        assert.equal(solver.checkRowPlacement('115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), false, "invalid duplicate number 1")
        assert.equal(solver.checkRowPlacement('1.5.52.84..63.12.7.2..5....99..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), false, "invalid duplicate number 2")
        assert.equal(solver.checkRowPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914337.'), false, "invalid duplicate number 3")
        done()
    });
    test("Test valid column placement", (done)=>{
        assert.equal(solver.checkColPlacement(puzzlesAndSolutions[0][0]), true, "validate column placement 1")
        assert.equal(solver.checkColPlacement(puzzlesAndSolutions[1][0]), true, "validate column placement 2")
        assert.equal(solver.checkColPlacement(puzzlesAndSolutions[2][0]), true, "validate column placement 3")
        assert.equal(solver.checkColPlacement(puzzlesAndSolutions[3][0]), true, "validate column placement 4")
        done()
    });
    test("Test invalid column placement", (done)=>{
        assert.equal(solver.checkColPlacement('1.5..2.841.63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), false, "invalid duplicate number 1")
        assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....916914.37.'), false, "invalid duplicate number 2")
        assert.equal(solver.checkColPlacement('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47.3.8..1..16....926914.37.'), false, "invalid duplicate number 3")
        done()
    });
    test("Test valid region placement", (done)=>{
        assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[0][0]), true, "validate region placement 1")
        assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[1][0]), true, "validate region placement 2")
        assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[2][0]), true, "validate region placement 3")
        assert.equal(solver.checkRegionPlacement(puzzlesAndSolutions[3][0]), true, "validate region placement 4")
        done()
    });
    test("Test invalid region placement", (done)=>{
        assert.equal(solver.checkRegionPlacement('1.5..2.84.263.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'), false, "invalid duplicate number 1")
        assert.equal(solver.checkRegionPlacement(''), false, "invalid duplicate number 2")
        assert.equal(solver.checkRegionPlacement(''), false, "invalid duplicate number 3")
        done()
    });
    test("Test solve valid puzzle string", (done)=>{
        assert.equal(solver.solve(puzzlesAndSolutions[0][0]), puzzlesAndSolutions[0][1], "solve puzzle string 1")
        assert.equal(solver.solve(puzzlesAndSolutions[1][0]), puzzlesAndSolutions[1][1], "solve puzzle string 2")
        assert.equal(solver.solve(puzzlesAndSolutions[2][0]), puzzlesAndSolutions[2][1], "solve puzzle string 3")
        assert.equal(solver.solve(puzzlesAndSolutions[3][0]), puzzlesAndSolutions[3][1], "solve puzzle string 4")
        done()
    });
    test("Test solve invalid puzzle string", (done)=>{
        assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.a...9..1..+.8.2.3674.3.7.2..9.47.e.8..1..16.8..926914.37.'), false, "solve invalid character")
        assert.equal(solver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16..'), false, "solve invalid length of string")
        assert.equal(solver.solve('jfldsajfaldksjf'), false, "solve invalid puzzle length of string 3")
        assert.equal(solver.solve(''), false, "solve invalid empty puzzle string")
        done()
    });
    test("Test solve valid puzzle string and return the solutions", (done)=>{
        assert.equal(solver.solve(puzzlesAndSolutions[0][0]), puzzlesAndSolutions[0][1], "solve puzzle string 1")
        assert.equal(solver.solve(puzzlesAndSolutions[1][0]), puzzlesAndSolutions[1][1], "solve puzzle string 2")
        assert.equal(solver.solve(puzzlesAndSolutions[2][0]), puzzlesAndSolutions[2][1], "solve puzzle string 3")
        assert.equal(solver.solve(puzzlesAndSolutions[3][0]), puzzlesAndSolutions[3][1], "solve puzzle string 4")
        done()
    });
});
