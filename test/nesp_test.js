'use strict';
require('assert');
var nesp = require('../lib/nesp.js');

describe('User', function(){
    describe('#save()', function(){
        it('should save without error', function(done){
            if (nesp) {
                done();
            }
        });
    });
});
