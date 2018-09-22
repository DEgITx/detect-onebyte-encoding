One-byte encoding detection
==============

Detection encoding of string according to one-byte representation.

## Examples

``` js
const detectEncoding = require('detect-onebyte-encoding');

console.log(detectEncoding('привет'))
// cp1251

console.log(detectEncoding('żywność'))
// cp1250

```

## Instalation

``` sh
npm install detect-onebyte-encoding
```
