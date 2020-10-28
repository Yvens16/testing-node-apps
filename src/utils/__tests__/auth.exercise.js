// Testing Pure Functions

// 💣 remove this todo test (it's only here so you don't get an error about missing tests)
// test.todo('remove me')

// 🐨 import the function that we're testing
import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

// USE JEST IN CASE FOR SIMPLER FORMATING 
cases(
  'isPasswordAllowed: valid password',
  options => {
    expect(isPasswordAllowed(options.password)).toBe(true)
  },
  {
    'valid password': {
      password: '!aBc123',
    }
  }
)

cases(
  'isPasswordAllowed: invalid password',
  options => {
    expect(isPasswordAllowed(options.password)).toBe(false)
  },
  {
    "too short": {
      password: "a2c!"
    },
    "no letters": {
      password: "123456!"
    },
    "no numbers": {
      password: "ABCdef!"
    },
    "no uppercase letters": {
      password: "abc123!"
    },
    "no lowercase letters": {
      password: "ABC123!"
    },
    "no non-alphanumeric characters": {
      password: "ABCdef123"
    }
  }
)
// OR CUSTOM TEST WRITTEN OURSELVES 

const passwords = [
  {testTitle: 'Is a valid password', value: '!aBc123', valid: true},
  {testTitle: 'is too short', value: 'a2c!', valid: false},
  {testTitle: 'has no alphabet characters', value: '123456!', valid: false},
  {testTitle: 'has no numbers', value: 'ABCdef!', valid: false},
  {testTitle: 'has no uppercase', value: 'abc123!', valid: false},
  {testTitle: 'has no lowercase', value: 'ABC123!', valid: false},
  {
    testTitle: 'has no non-alphanumeric characters',
    value: 'ABCdef123',
    valid: false,
  },
]

describe('Test isPasswordAllowed pure function', () => {
  // No setup and clean up necessary to test pure functions
  passwords.forEach(pass => {
    it(`it should test if password: ${pass.testTitle}`, () => {
      expect(isPasswordAllowed(pass.value)).toBe(pass.valid)
    })
  })
})

// FUNCTION TO SIMPLIFY THE TEST TITLES AND ADDING NEW TESTS
function casify(obj) {
  // TO USE IN CASES
  return Object.entries(obj).map(([name, password]) => ({
    name: `${password} - ${name}`,
    password
  }));
}
cases(
  "CASIFY isPasswordAllowed: valid passwords",
  ({ password }) => {
    expect(isPasswordAllowed(password)).toBe(true);
  },
  casify({ "valid password": "!aBc123" })
);