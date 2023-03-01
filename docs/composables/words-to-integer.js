function codeWarsParseInt(str) {
  const d = [
    { word: 'zero', value: 0 },
    { word: 'one', value: 1 },
    { word: 'two', value: 2 },
    { word: 'three', value: 3 },
    { word: 'four', value: 4 },
    { word: 'five', value: 5 },
    { word: 'six', value: 6 },
    { word: 'seven', value: 7 },
    { word: 'eight', value: 8 },
    { word: 'nine', value: 9 },
    { word: 'ten', value: 10 },
    { word: 'eleven', value: 11 },
    { word: 'twelve', value: 12 },
    { word: 'thirteen', value: 13 },
    { word: 'fourteen', value: 14 },
    { word: 'fifteen', value: 15 },
    { word: 'sixteen', value: 16 },
    { word: 'seventeen', value: 17 },
    { word: 'eighteen', value: 18 },
    { word: 'nineteen', value: 19 },
    { word: 'twenty', value: 20 },
    { word: 'thirty', value: 30 },
    { word: 'forty', value: 40 },
    { word: 'fifty', value: 50 },
    { word: 'sixty', value: 60 },
    { word: 'seventy', value: 70 },
    { word: 'eighty', value: 80 },
    { word: 'ninety', value: 90 },
    { word: 'hundred', value: 100 },
    { word: 'thousand', value: 1000 },
    { word: 'million', value: 1000000 },
    { word: 'billion', value: 1000000000 },
  ]
  
  const u = ['hundred', 'thousand', 'million', 'billion', 'trillion']

  const dict = d.map((v) => { return { [v.word]: v.value }})

  const getNumber = (n) => {
    return dict[n]
      ? dict[n]
      : n
        .split(/[\s-,]+/)
        .map(v => obj.value === obj)
        .reduce((a, b) => a + b, 0)
  }

  const addUnit = (arr, i, dict, unit, result) => {
    console.log(arr, i, unit)
    if (unit === 'hundred') {
      result += dict[arr[i]] * dict[arr[i + 1]]
    } else {
      result += getNumber(arr[i])
      result = result * dict[arr[i + 1]]
    }
    return result
  }

  const getUnitNumber = (n) => {
    let r = 0
    n = n.filter((v) => v !== 'and')
    let l = n.length

    for (let i = 0; i < l;) {
      if (n[i + 1] && u.includes(n[i + 1])) {
        const v = n[i + 1]
        r += addUnit(n, i, d, v, r)
        i += 2
        continue
      } else if (n[i] === u[1]) {
        r = r * d[u[1]]
      } else {
        r += getNumber(n[i])
      }
      i += 1
    }
    return r
  }

  const a = str.split(' ')
  return a.length === 1 
    ? getNumber(a[0])
    : getUnitNumber(a)
}

const d = [
  { word: 'zero', value: 0 },
  { word: 'one', value: 1 },
  { word: 'two', value: 2 },
  { word: 'three', value: 3 },
  { word: 'four', value: 4 },
  { word: 'five', value: 5 },
  { word: 'six', value: 6 },
  { word: 'seven', value: 7 },
  { word: 'eight', value: 8 },
  { word: 'nine', value: 9 },
  { word: 'ten', value: 10 },
  { word: 'eleven', value: 11 },
  { word: 'twelve', value: 12 },
  { word: 'thirteen', value: 13 },
  { word: 'fourteen', value: 14 },
  { word: 'fifteen', value: 15 },
  { word: 'sixteen', value: 16 },
  { word: 'seventeen', value: 17 },
  { word: 'eighteen', value: 18 },
  { word: 'nineteen', value: 19 },
  { word: 'twenty', value: 20 },
  { word: 'thirty', value: 30 },
  { word: 'forty', value: 40 },
  { word: 'fifty', value: 50 },
  { word: 'sixty', value: 60 },
  { word: 'seventy', value: 70 },
  { word: 'eighty', value: 80 },
  { word: 'ninety', value: 90 },
  { word: 'hundred', value: 100 },
  { word: 'thousand', value: 1000 },
  { word: 'million', value: 1000000 },
  { word: 'billion', value: 1000000000 },
]

const u = ['hundred', 'thousand', 'million', 'billion', 'trillion']

const dict = d.map((v) => { return { [v.word]: v.value }})

const num = (s) => d.find((d) => d.word === s)
const simple = (s) => num(s).value 
  ? num(s).value
  : s.split(/[\s-,]+/)
    .map(v => (v).value)
    .reduce((a, b) => a + b, 0)


console.log(num('one').value)
console.log(simple('twenty'))
console.log(_reduce('twenty one'))