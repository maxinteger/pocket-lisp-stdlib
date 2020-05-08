# Pocket lisp Standard Library

Standard library for [Pocket lisp][pocket-lisp-link].


[![License: MIT][license-shield]][license-link]
[![code style: prettier][prettier-shield]][prettier-link]
[![Travis Build Status][build-shield]][build-link]
[![Codecov Code Coverage][coverage-shield]][coverage-link]


## Stdlib

Types based on [Fantasy land][fantasy-land-link]
 
### Basic data types

- Bool
- Number
- Fraction number
- String
- Vector
- HashMap

### Math functions and constants

- E
- LN2
- LN10
- LOG2E
- LOG10E
- PI
- SQRT1_2
- SQRT2
- abs
- sign
- min
- max
- floor
- round
- ceil
- trunc
- cbrt
- sqrt
- exp
- pow
- log
- log2
- log10

### Other functions

- random
- random-int
- shuffle

[https://maxinteger.github.io/pocket-lisp/](https://maxinteger.github.io/pocket-lisp/)

## For contributors

You can build packages locally with

    npm build
    
or do continuous build with

    npm watch
    
Also you can run test by

    npm test


[pocket-lisp-link]: https://maxinteger.github.io/pocket-lisp/
[license-shield]: https://img.shields.io/badge/License-MIT-blue.svg?style=shield
[license-link]: https://opensource.org/licenses/MIT
[prettier-shield]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-link]: https://github.com/prettier/prettier
[build-shield]: https://travis-ci.com/maxinteger/pocket-lisp-stdlib.svg?branch=master
[build-link]: https://travis-ci.com/maxinteger/pocket-lisp-stdlib
[coverage-shield]: https://codecov.io/gh/maxinteger/pocket-lisp-stdlib/branch/master/graph/badge.svg
[coverage-link]: https://codecov.io/gh/maxinteger/pocket-lisp
[fantasy-land-link]: https://github.com/fantasyland/fantasy-land
