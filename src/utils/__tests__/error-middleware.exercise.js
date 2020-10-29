// Testing Middleware
import {buildRes, buildReq, buildNext} from 'utils/generate';

// 🐨 you'll need both of these:
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
it('Should return UnauthorizedError', () => {
  const req = buildReq() || {};
  const next = buildNext() || jest.fn()
  const code = 'some_error_code'
  const message = 'some message'
  const error = new UnauthorizedError(code, {message})
  const res = buildRes() || {json: jest.fn(() => res), status: jest.fn(() => res)}

  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenLastCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message,
  })
})


// 🐨 Write a test for the headersSent case
it('Should test the headersSent case', () => {
  const req = {};
  const next = jest.fn()
  const error = new Error('blah')
  const res = {json: jest.fn(() => res), status: jest.fn(() => res), headersSent: true}
  errorMiddleware(error, req, res, next)
  expect(next).toHaveBeenCalledWith(error);
  expect(next).toHaveBeenCalledTimes(1);
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

// 🐨 Write a test for the else case (responds with a 500)
it('Should test the else case', () => {
  const req = {};
  const next = jest.fn()
  const error = {message: 'blah'}
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.json).toHaveBeenCalledWith({
    message: error.message,
    stack: error.stack
  })
})