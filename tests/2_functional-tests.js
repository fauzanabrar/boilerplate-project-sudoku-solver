const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const {puzzlesAndSolutions} = require('../controllers/puzzle-strings')
let puzzleString = [...puzzlesAndSolutions]
suite('Functional Tests', () => {
    test("POST /api/solve valid puzzle",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0]
        }
        chai.request(server).post('/api/solve').type('form').send(ps).end((err,res)=>{
            assert.equal(res.body.solution, puzzleString[0][1], "puzzle string 1")
            done()
        })
    });
    test("POST /api/solve missing string puzzle",(done)=>{
        let ps = {
        }
        chai.request(server).post('/api/solve').type('form').send(ps).end((err,res)=>{
            assert.equal(res.body.error, "Required field missing", "error missing")
            done()
        })
    });
    test("POST /api/solve invalid character puzzle",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0]
        }
        ps.puzzle = Array.from(ps.puzzle)
        ps.puzzle[10] = "h"
        ps.puzzle = ps.puzzle.join('')

        chai.request(server).post('/api/solve').type('form').send(ps).end((err,res)=>{
            assert.equal(res.body.error, "Invalid characters in puzzle", "error invalid character")
            done()
        })
    });
    test("POST /api/solve invalid character puzzle",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0]
        }
        ps.puzzle = Array.from(ps.puzzle)
        ps.puzzle.length = 80
        ps.puzzle = ps.puzzle.join('')

        chai.request(server).post('/api/solve').type('form').send(ps).end((err,res)=>{
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long", "error invalid length")
            done()
        })
    });
    test("POST /api/solve invalid string puzzle",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0]
        }
        ps.puzzle = Array.from(ps.puzzle)
        ps.puzzle[10] = 9
        ps.puzzle = ps.puzzle.join('')

        chai.request(server).post('/api/solve').type('form').send(ps).end((err,res)=>{
            assert.equal(res.body.error, "Puzzle cannot be solved", "error invalid puzzle")
            done()
        })
    });
    test("POST /api/check valid placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "F7",
            value: "1"
        }

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'valid', 'valid should be property')
            assert.equal(res.body.valid, true, "should be valid")
            done()
        })
    });
    test("POST /api/check single conflict placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "A7",
            value: "1"
        }

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'valid', 'valid should be property')
            assert.property(res.body, 'conflict', 'conflict should be property')
            assert.equal(res.body.valid, false, "valid should be false")
            assert.deepEqual(res.body.conflict, ['row'], "should be conflict")
            done()
        })
    });
    test("POST /api/check multi conflict placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "A2",
            value: "1"
        }

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'valid', 'valid should be property')
            assert.property(res.body, 'conflict', 'conflict should be property')
            assert.equal(res.body.valid, false, "valid should be false")
            assert.deepEqual(res.body.conflict, ["row", "region"], "should be conflict")
            done()
        })
    });
    test("POST /api/check all conflict placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "G6",
            value: "1"
        }

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'valid', 'valid should be property')
            assert.property(res.body, 'conflict', 'conflict should be property')
            assert.equal(res.body.valid, false, "valid should be false")
            assert.deepEqual(res.body.conflict, ["row", "column", "region"], "should be conflict")
            done()
        })
    });
    test("POST /api/check missing field placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "G6",
            
        }

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'error', 'error should be property')
            assert.equal(res.body.error, "Required field(s) missing", "error field missing")
            done()
        })
    });
    test("POST /api/check invalid puzzle placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "G6",
            value: '1'
        }
        ps.puzzle = Array.from(ps.puzzle)
        ps.puzzle[10] = "h"
        ps.puzzle = ps.puzzle.join('')

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'error', 'error should be property')
            assert.equal(res.body.error, "Invalid characters in puzzle", "error invalid character")
            done()
        })
    });
    test("POST /api/check invalid length puzzle placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "G6",
            value: '1'
        }
        ps.puzzle = Array.from(ps.puzzle)
        ps.puzzle.length = 80
        ps.puzzle = ps.puzzle.join('')

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'error', 'error should be property')
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long", "error invalid puzzle length")
            done()
        })
    });
    test("POST /api/check invalid coordinate placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "J6",
            value: '1'
        }

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'error', 'error should be property')
            assert.equal(res.body.error, "Invalid coordinate", "error invalid coordinate")
            done()
        })
    });
    test("POST /api/check invalid value placement",(done)=>{
        let ps = {
            puzzle: puzzleString[0][0],
            coordinate: "G6",
            value: '10'
        }

        chai.request(server).post('/api/check').type('form').send(ps).end((err,res)=>{
            assert.property(res.body, 'error', 'error should be property')
            assert.equal(res.body.error, "Invalid value", "error invalid value")
            done()
        })
    });
    
    
});

