/* global jest */

import 'regenerator-runtime/runtime'

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

// Mocks the Fullscreen API.
Object.defineProperty(document, 'fullscreenEnabled', { value: true, writable: true })

class LocalStorage {
  constructor () {
    this.store = {}
  }

  getItem (key) {
    return this.store[key]
  }

  setItem (key, value) {
    this.store[key] = value
  }

  clear () {
    this.store = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: new LocalStorage() })

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  trace: jest.fn(),
  debug: console.debug
}
