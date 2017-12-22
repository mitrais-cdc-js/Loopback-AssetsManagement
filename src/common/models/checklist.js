'use strict';

module.exports = function(Checklist) {
    Checklist.validatesUniquenessOf('name');
};
