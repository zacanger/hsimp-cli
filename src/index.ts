#!/usr/bin/env node

import h from 'hsimp'
import prompt from 'password-prompt'
import colors from 'zeelib/lib/colorize'
import wordwrap from 'wordwrap'

const wrap = wordwrap(80)
const {
  // @ts-ignore
  blue,
  // @ts-ignore
  bold,
  // @ts-ignore
  gray,
  // @ts-ignore
  green,
  // @ts-ignore
  magenta,
  // @ts-ignore
  red,
  // @ts-ignore
  yellow,
} = colors

const formatLevel = (level?: string) => {
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

type Checks = {
  name: string
  message: string
  level: string
}

const formatChecks = (checks: Checks[] = []) => {
  if (!checks || !checks.length) {
    return ''
  }
  const formattedChecks = checks
    .map(
      ({ name, message, level }: Checks) =>
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

type Result = {
  time: string
  level: string
  checks: Checks[]
}

const formatAndLog = ({ time, level, checks = [] }: Result) => {
  console.log('')
  console.log(bold(formatLevel(level)))
  console.log(bold(`Time to crack: ${time}`))
  console.log(formatChecks(checks))
}

const main = () => {
  const password = prompt('Password: ', { method: 'hide' })
  password.then((p: string) => {
    const result = h(p)
    formatAndLog(result)
  })
}

export default main
