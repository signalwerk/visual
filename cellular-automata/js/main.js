// var ruleInput = document.querySelector('input.rule')
// var containers = document.body.querySelectorAll('.container')
var containers = Array.prototype.slice.call(document.querySelectorAll('.container'));

var width = 15
var height = 15

// -------------- Render functions -------------- //

// make random number 0 or 1
var rndBool = () => Math.random() < .5

// make array of random numbers
var rndRow = count => Array.from(Array(count)).map(rndBool);

// make array of numbers for results
var makeRule = number => {
  var binary = (number >>> 0).toString(2)
  while (binary.length < 8) {
    binary = "0" + binary
  }
  binary = binary.split('').reverse()
  return binary
}

// meat
var calcNewRow = (oldRow, ruleNumber) => {
  var newRow = []
  var rule = makeRule(ruleNumber)
  oldRow.map((bool, index, arr) => {
    var left  = + arr[index - 1]
    var self  = + bool
    var right = + arr[index + 1]
    if (index === 0)
      var left = + arr[arr.length - 1]
    if (index === arr.length - 1)
      var right = + arr[0]

    var res = parseInt(('' + left + self + right), 2)
    newRow.push( + rule[res])
  })
  return newRow
}

// exec
var calculate = ruleNumber => {
  var result = []
  // ruleNumber = ruleInput.value || 73
  var lastRow = rndRow(width)
  Array.from(Array(height)).map(() => {
    var nextRow = calcNewRow(lastRow, ruleNumber)
    // renderRow(nextRow)
    result.push(nextRow)
    lastRow = nextRow
  })
  return result
}

// -------------- Render functions -------------- //

// makes new divs and puts cells in row
var renderRow = (row, element) => {
  var rowDiv = newRowDiv(element)
  return row.map( bool => {
    var cell = document.createElement('div')
    cell.classList.add('cell')
    cell.classList.add( bool ? 'cell--true' : 'cell--false' )
    rowDiv.appendChild(cell)
    return cell
  })
}
// makes new row.div
var newRowDiv = (element) => {
  var rowDiv = document.createElement('div')
  rowDiv.classList.add('row')
  element.appendChild(rowDiv)
  return rowDiv
}

var render = (data, element) => {
  element.innerHTML = ''
  return data.map( row => renderRow(row, element) )

}

var findSpace = (array, string) => {
  var line = array.toString().split(',').join('')
  var string = Array.from(Array(string.length)).map( x => 1 )
  .toString().split(',').join('')

  var targetIndex = line.indexOf(string)
  return targetIndex
}

var placeWords = (data, nodes, words) => {
  var fullRow = -1
  words.map( word => {
    var done = false
    data.map((row, index) => {
      if (!done) {
        var candidate = findSpace(row, word)
        if (candidate !==  -1 && index > fullRow) {
          fullRow = index
          done = true
          var letters = word.split('')
          letters.map((letter, letterIndex) => {
            nodes[index][candidate + letterIndex].innerHTML = letter
            nodes[index][candidate + letterIndex].classList.add('letter')
          })
          // console.log(`row: ${index}, space: ${candidate}, fullRow: ${fullRow}`);
        }
      }
    })
  })
}

// -------------- execute -------------- //

var newCA = elements => {
  elements.map((container, index) => {
    var result = calculate(15)
    var nodes = render(result, container)
    // console.log(nodes);
    if (index) {
      placeWords(result, nodes, ['ZE', 'TE', 'CO', '2017'])
      // addLetters(['BAR', 'RECHTS'], result, container)
    }
  })
}


newCA(containers)
