#!/usr/bin/env node

const h = require('hsimp')
const prompt = require('password-prompt')
const colors = require('zeelib/lib/colorize').default

const format = ({ time, level, checks = [] }) => {
  console.log(level)
  console.log(time)
  console.log(checks)
}

const main = () => {
  const password = prompt('Password: ', { method: 'hide' })
  password.then((p) => {
    const result = h(p)
    format(result)
  })

}

if (!module.parent) main()
