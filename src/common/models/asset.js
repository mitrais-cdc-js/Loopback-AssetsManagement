'use strict';

module.exports = function(Asset) {

    Asset.validatesLengthOf('model', {
        min: 3,
        max: 100,
        message: {
            min: 'The asset model name should be at least 3 characters long',
            max: 'The asset model name it to long'
        }
    })

    Asset.validatesLengthOf('serial', {
        min: 3,
        max: 100,
        message: {
            min: 'The asset serial number should be at least 3 characters long',
            max: 'The asset serial number it to long'
        }
    })

    Asset.validatesLengthOf('batchNo', {
        min: 3,
        max: 100,
        message: {
            min: 'The asset batch number should be at least 3 characters long',
            max: 'The asset batch number it to long'
        }
    })

    Asset.validatesLengthOf('description', {
        min: 5,
        max: 100,
        message: {
            min: 'The asset description should be at least 5 characters long',
            max: 'The asset description it to long'
        }
    })




};
