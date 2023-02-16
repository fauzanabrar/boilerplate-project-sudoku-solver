
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
    this.NumberToLetter = {
      "1": "A",
      "2": "B",
      "3": "C",
      "4": "D",
      "5": "E",
      "6": "F",
      "7": "G",
      "8": "H",
      "9": "I",
    }
    this.deep = 0
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
    let rowPuzzle = Array.from(clone).splice((row-1)*9, 9)
    
    let pattern = new RegExp(`${value}`)
    if(pattern.test(rowPuzzle.join(''))){
      // console.log("row false");
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
      // console.log("col false");
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
      // console.log("region false");
      return false
    }
    return true
  }


  solve(puzzleString){
    let puzzleArr = []
    let isEmpty = true

    for(let i = 1; i<=9; i++){
      puzzleArr.push(Array.from(puzzleString).splice((i-1)*9,9))
    }


    let row = 0
    let column = 0
    let solution = puzzleString

    for(let i = 0; i < 9 ; i++){
      for(let j = 0; j < 9; j++){
        if(puzzleArr[i][j] == "."){
          row = i;
          column = j;
          isEmpty = false
          break
        }
      }
      if(!isEmpty) break
    }

    if(isEmpty){
      return {solution}
    }

    for(let num = 1; num <= 9; num++){
      let row2 = this.NumberToLetter[(row + 1).toString()]
      let column2 = (column + 1).toString()

      if(
        this.checkRowPlacement(solution, row2, column2, num) &&
        this.checkColPlacement(solution, row2, column2, num) &&
        this.checkRegionPlacement(solution, row2, column2, num) 
        ){
          puzzleArr[row][column] = num
          solution = puzzleArr.join('').replaceAll(',','')
          
          let result = this.solve(solution)

          if(result.hasOwnProperty('solution')){
            return result          
          }

          puzzleArr[row][column] = '.'
  
      }

    }
    
    return false
  }
}

module.exports = SudokuSolver;

