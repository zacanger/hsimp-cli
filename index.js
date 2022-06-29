#!/usr/bin/env node

const h = require('hsimp')
const prompt = require('password-prompt')
const colors = require('zeelib/lib/colorize').default
const wordwrap = require('wordwrap')

const wrap = wordwrap(80)
const {
  blue,
  bold,
  gray,
  green,
  magenta,
  red,
  yellow
} = colors

const formatLevel = (level) => {
  // || instead of = above because possible null
  const l = level || 'secure'
  const cased = l.charAt(0).toUpperCase() + l.slice(1)
  switch (cased) {
    case 'Secure':
    case 'Achievement':
      return green(cased)
    case 'Notice':
      return blue(cased)
    case 'Warning':
      return yellow(cased)
    case 'Insecure':
      return red(cased)
    case 'Easter-egg':
      return magenta(cased)
    default:
      return gray(cased)
  }
}

const formatChecks = (checks) => {
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
  console.log(bold(formatLevel(level)))
  console.log(bold(`Time to crack: ${time}`))
  console.log(formatChecks(checks))
}

const main = () => {
  const password = prompt('Password: ', { method: 'hide' })
  password.then((p) => {
    const result = h(p)
    formatAndLog(result)
  })
}

main()
