'use strict'

const app = require('../server/server')
const request = require('supertest')(app)
const chai = require('chai')
const expect = chai.expect

module.exports = {
    app,
    expect,
    request,
}