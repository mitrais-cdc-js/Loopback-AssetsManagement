'use strict';

module.exports = function(Asset) {

    Asset.validatesPresenceOf(  'model', 'serial', 'batchNo', 
                                'description', 'createDate', 'productionDate' );

    Asset.validatesLengthOf('model', {
        min: 3,
        max: 100,
        message: {
            min: 'The asset model name should be at least 3 characters long',
            max: 'The asset model name is to long'
        }
    })

    Asset.validatesLengthOf('serial', {
        min: 3,
        max: 100,
        message: {
            min: 'The asset serial number should be at least 3 characters long',
            max: 'The asset serial number is to long'
        }
    })

    Asset.validatesLengthOf('batchNo', {
        min: 3,
        max: 100,
        message: {
            min: 'The asset batch number should be at least 3 characters long',
            max: 'The asset batch number is to long'
        }
    })

    Asset.validatesLengthOf('description', {
        min: 5,
        max: 100,
        message: {
            min: 'The asset description should be at least 5 characters long',
            max: 'The asset description is to long'
        }
    })

    Asset.validatesLengthOf('history', {
        max: 100,
        message: {
            max: 'The asset history is to long'
        }
    })

    Asset.validatesInclusionOf('riskLevel', {
        in: ['OK'], message: 'is not allowed' 
    });

    Asset.validatesInclusionOf('complianceStatus', {
        in: ['COMPLIANT'], message: 'is not allowed' 
    });

    Asset.validatesInclusionOf('status', {
        in: ['OK', 'OVERDUE INSPECTITON', 'DO NOT USE'], message: 'is not allowed' 
    });



};
