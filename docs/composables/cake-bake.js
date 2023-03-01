const recipe = { flour: 500, sugar: 200, eggs: 1 }
const available = { flour: 1200, sugar: 1200, eggs: 5, milk: 200 }

export const cakes = (r, a) => Math.min(...Object.keys(r).map(k => Math.floor(a[k] / r[k] || 0)))

console.log(cakes(recipe, available))