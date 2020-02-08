#!/usr/bin/env node

const h = require('hsimp')
const prompt = require('password-prompt')
const colors = require('zeelib/lib/colorize').default
const wordwrap = require('wordwrap')
const wrap = wordwrap(80)

const formatLevel = (level) => {
  // || instead of = above because possible null
  const l = level || 'secure'
  const cased = l.charAt(0).toUpperCase() + l.slice(1)
  switch (cased) {
    case 'Secure':
    case 'Achievement':
      return colors.green(cased)
    case 'Notice':
      return colors.blue(cased)
    case 'Warning':
      return colors.yellow(cased)
    case 'Insecure':
      return colors.red(cased)
    case 'Easter-egg':
      return colors.magenta(cased)
    default:
      return colors.gray(cased)
  }
}

const formatChecks = (checks = []) => {
  if (!checks || !checks.length) {
    return ''
  }
  const formattedChecks = checks
    .map(
      ({ name, message, level }) =>
        `
${formatLevel(level)}
${name}
${wrap(message)}
    `
    )
    .join('')
  return `
Checks:
${formattedChecks}
  `
}

const formatAndLog = ({ time, level, checks = [] }) => {
  console.log('')
  console.log(colors.bold(formatLevel(level)))
  console.log(colors.bold(`Time to crack: ${time}`))
  console.log(formatChecks(checks))
}

const main = () => {
  const password = prompt('Password: ', { method: 'hide' })
  password.then((p) => {
    const result = h(p)
    formatAndLog(result)
  })
}

if (!module.parent) {
  main()
}
