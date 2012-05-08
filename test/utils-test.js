var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase("Utilities - ", {

    setUp: function () {

    },

    "trim() utility works with undefined" : function() {
        assert.equals("hello", Utils.trim(" hello"));
        assert.equals("hello", Utils.trim("  hello "));
        assert.equals("hello", Utils.trim("hello "));
        assert.equals("hello", Utils.trim("hello   "));
        assert.equals(undefined, Utils.trim(undefined));
    }

});