'use strict';

module.exports = function(Asset) {

    Asset.validatesLengthOf('description', {
        min: 5,
        max: 100,
        message: {
            min: 'The asset description should be at least 5 characters long',
            max: 'The asset description it to long'
        }
    })

};
