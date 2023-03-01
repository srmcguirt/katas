/**
 * Calculates the number of ways to represent a number as the sum of four squares.
 * @param{number} n Given number.
*/
const fourSquares = function(n){
  const result = []
  const sq = (v) => v * v
  const lteSq = (v, num) => sq(v) <= num
  
  const type = Object.prototype.toString.call(n).slice(8, -1).toLowerCase()

  if (type !== 'bigint' || Number.isNaN(n)) {
    result.push([BigInt(0n), BigInt(0n), BigInt(0n), BigInt(0n)])
  }

  let i, j, k, l

  for (i = 0; lteSq(i, n); i++) {
    for (j = i; lteSq(j, n); j++){
      for (k = j; lteSq(k, n); k++){
        for (l = k; lteSq(l, n); l++) {
          if (
            sq(i) + sq(j) + sq(k) + sq(l) == n
          ){
            result.push(
              [
                BigInt(i),
                BigInt(j),
                BigInt(k),
                BigInt(l)
              ])
          }
        }
      }
    }
  }
  return result
}
  console.log(fourSquares(1n))