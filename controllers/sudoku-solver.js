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

  // solve(puzzleString) {
  //   let row = 0
  //   let column = 0
  //   let solution = Array.from(puzzleString.slice())
  //   let possibilities = []

  //   while((/[.]/.test(solution.join('')))){
      // for(let i = 0; i < solution.length; i++){
      //   console.log(i, row, column, solution)
      //   if(solution[i] == '.'){
      //     for(let j = 1; j <= 9 ; j++){
      //       if(
      //         this.checkRowPlacement(solution, this.NumberToLetter[(row+1).toString()], (column+1).toString(), j) &&
      //         this.checkColPlacement(solution, this.NumberToLetter[(row+1).toString()], (column+1).toString(), j) &&
      //         this.checkRegionPlacement(solution, this.NumberToLetter[(row+1).toString()], (column+1).toString(), j) 
      //       ){
      //         console.log("why this is work?", this.NumberToLetter[(row+1).toString()], (column+1).toString(), j)
              
      //         possibilities.push(j)
              
      //       }
      //     }
      //     if(possibilities.length == 1){
      //       solution[i] = possibilities[0]
      //     }
          
      //     possibilities = []            
      //   }

      //   if(column == 8){
      //     column = 0
      //     row++
      //   }else {
      //     column++
      //   }

      // }
  //     row = 0
  //     column = 0
      

  //   }
  //   solution = solution.join('')

  //   return {
  //     solution
  //   }
  // }

  solve(puzzleString){
    let solution = Array.from(puzzleString.slice())
    let possibilities = []
    let allPossibilities = []

    let row = 0
    let column = 0
    console.log("runn", puzzleString)

    for(let i = 0; i < solution.length; i++){
      if(solution[i] == '.'){
        for(let j = 1; j <= 9 ; j++){
          let row2 = this.NumberToLetter[(row+1).toString()]
          let column2 = (column+1).toString()
          if(
            this.checkRowPlacement(solution, row2 , column2 , j) &&
            this.checkColPlacement(solution, row2, column2, j) &&
            this.checkRegionPlacement(solution, row2, column2, j) 
          ){
            possibilities.push(j.toString())
            
          }

        }
          allPossibilities.push([...possibilities, i])
          if(possibilities.length ==1){
            solution[i] = possibilities[0]
            i = 0
            row = 0
            column = 0
            allPossibilities = []
          }

          possibilities = []
      }


      if(column == 8){
        column = 0
        row++
      }else {
        column++
      }

    }
    console.log(allPossibilities, solution)

    // if(/[.]/.test(solution)){
    //   return false
    // }

    return {
      solution
    }
  }
}

module.exports = SudokuSolver;

