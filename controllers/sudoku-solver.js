class SudokuSolver {
  
  constructor(){
    this.letterToNumber = {
      "A": 1,
      "B": 2,
      "C": 3,
      "D": 4,
      "E": 5,
      "F": 6,
      "G": 7,
      "H": 8,
      "I": 9,
    }
  }

  validate(puzzleString) {

    if(puzzleString == ''){
      return {
        error: "Required field(s) missing"
      }
    }
    
    if(puzzleString.length != 81){
      return {
        error: "Expected puzzle to be 81 characters long"
      }
    }
    
    if(!(/^[0-9.]+$/.test(puzzleString))){
      return {
        error: "Invalid characters in puzzle"
      }
    }

    return {
      valid: true
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    row = this.letterToNumber[row]
    let clone = (puzzleString).slice();
    let rowPuzzle = Array.from(clone).splice((row-1)*0, (row-1)*0 + 9)
    
    let pattern = new RegExp(`${value}`)

    if(pattern.test(rowPuzzle.join(''))){
      console.log("row false");
      return false
    }
    return true
  }

  checkColPlacement(puzzleString, row, column, value) {
    row = this.letterToNumber[row]
    let colPuzzle = []
    
    for(let i = 0; i<9; i++){
      colPuzzle.push(puzzleString[i*9+ Number(column)-1])
    }

    let pattern = new RegExp(`${value}`)

    if(pattern.test(colPuzzle.join(''))){
      console.log("col false");
      return false
    }

    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    row = this.letterToNumber[row]
    let regionPuzzle = []
    
    const regionNum = (Math.ceil(row / 3)-1) * 3 + Math.ceil(Number(column) / 3)
    
    let offset = ((Math.ceil(regionNum/3) - 1) * 3 * 9 ) +  ((regionNum - (((Math.ceil(regionNum/3) - 1 ) * 3)) - 1) * 3)

    for(let i = 1; i <= 9; i++){
      regionPuzzle.push(puzzleString[offset])

      if(i % 3 == 0){
        offset += 7
      }else {
        offset += 1
      }
    }

    let pattern = new RegExp(`${value}`)
    if(pattern.test(regionPuzzle.join(''))){
      console.log("region false");
      return false
    }
    return true
  }

  solve(puzzleString) {
    let row = 0
    let column = 0
    let solution = ''
    for(let i of puzzleString){
      if(i == '.'){
        for(let j = 1; j <= 9 ; j++){
          if(
            this.checkRowPlacement(puzzleString, row, column, j) &&
            this.checkColPlacement(puzzleString, row, column, j) &&
            this.checkRegionPlacement(puzzleString, row, column, j) 
          ){
            solution += j
          }
        }
      }else {
        solution += i
      }
      if(column == 8){
        column = 0
        row++
      }else {
        column++
      }

    }

    return {
      solution
    }
  }
}

module.exports = SudokuSolver;

