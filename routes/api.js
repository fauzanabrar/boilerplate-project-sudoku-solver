'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();


  app.route('/api/check')
    .post((req, res) => {
      const coordinate = req.body.coordinate
      const puzzleString = req.body.puzzle
      const value = req.body.value

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
      const row = coordinate[0]
      const col = coordinate[1]

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
        return res.json(solver.solve(puzzleString))
      }
      
      res.json(validatePuzzle)
    });
};
