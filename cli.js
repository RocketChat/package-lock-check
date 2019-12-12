#!/usr/bin/env node
'use strict'
require('@iarna/cli')(main)
  .usage('lock-verify [projectPath]')
  .help()

const lockVerify = require('lock-verify')

function main (opts, check) {
  return lockVerify(check).then(result => {

    if (result.warnings.length) {
      result.warnings.forEach(w => console.error('\n    Warning:', w))
    }

    if (!result.status) {
      console.log('\nErrors were found in your package-lock.json, run  npm install  to fix them.\n')
      result.errors.forEach(e => console.error(`    ${e}`))
      console.log('\n')
      throw 1
    }
  }).catch((e) => {
    throw e;
  })
}
