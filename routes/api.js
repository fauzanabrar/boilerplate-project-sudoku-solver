'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();


  app.route('/api/check')
    .post((req, res) => {
      const coordinate = req.body.coordinate
      const puzzleString = req.body.puzzle
      const value = req.body.value

      for(let i of [coordinate, puzzleString, value]){
        if(i == undefined ){
          res.json({
            error: "Required field(s) missing"
          })
        }
      }

      const validatePuzzle = solver.validate(puzzleString)

      if(!validatePuzzle.valid){
        return res.json(validatePuzzle)
      }

      if(coordinate.length != 2){
        return res.json({
          error: "Invalid coordinate"
        })
      }

      if(!(/^[1-9]$/.test(value))){
        return res.json({
          error: "Invalid value"
        })
      }

      let conflict = []
      const row = coordinate[0].toUpperCase()
      const col = coordinate[1]

      if(!/[A-I]/.test(row) || !/[1-9]/.test(col)){
        return res.json({
          error: "Invalid coordinate"
        })
      }

      if(!solver.checkRowPlacement(puzzleString, row, col, value)){
        conflict.push('row')
      }
  
      if(!solver.checkColPlacement(puzzleString, row, col, value)){
        conflict.push('column')
      }
  
      if(!solver.checkRegionPlacement(puzzleString, row, col, value)){
        conflict.push('region')
      }

      if(conflict.length == 0){
        return res.json({
          valid: true
        })
      }

      return res.json({
        valid: false,
        conflict
      })

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzleString = req.body.puzzle 

      const validatePuzzle = solver.validate(puzzleString)

      if(validatePuzzle.valid){
        let result = solver.solve(puzzleString)
        if(result.hasOwnProperty('solution')) return res.json(result)
        return res.json({
          error: "Puzzle cannot be solved"
        })
      }
      
      res.json(validatePuzzle)
    });
};
