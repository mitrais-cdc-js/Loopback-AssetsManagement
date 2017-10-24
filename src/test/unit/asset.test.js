const { app, expect } = require('../common')

const Asset = app.models.Asset

describe('It should resolve', function() {
    it('a Asset.find', function() {
        return Asset
            .find()
            .then(res => console.log(res))
    })
})