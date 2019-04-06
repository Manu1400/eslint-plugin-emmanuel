Math.exp(1) // Math.E

const math = require("mathjs")
math.eval('exp(1)') // math.eval('e')

math.eval([
  'f = 3',
  'g = 4',
  'f * g'
]) // [3, 4, 12]
