var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase("Utilities - ", {

    setUp: function () {

    },

    "trim() utility works with undefined" : function() {
        assert.equals("hello", trim(" hello"));
        assert.equals("hello", trim("  hello "));
        assert.equals("hello", trim("hello "));
        assert.equals("hello", trim("hello   "));
        assert.equals(undefined, trim(undefined));
    },

    "robustness of parseTitle()" : function() {
        var parts = parseTitle("Talk -- Andy Woodly: Testing with buster.js");
        assert.equals("Talk", parts.type);
        assert.equals("Andy Woodly", parts.person);
        assert.equals("Testing with buster.js", parts.title);

        parts = parseTitle(" Talk  --Andy Woodly :  Testing with buster.js  ");
        assert.equals("Talk", parts.type);
        assert.equals("Andy Woodly", parts.person);
        assert.equals("Testing with buster.js", parts.title);

        parts = parseTitle("  Andy Woodly :Testing with buster.js  ");
        refute.defined(parts.type);
        assert.equals("Andy Woodly", parts.person);
        assert.equals("Testing with buster.js", parts.title);

        parts = parseTitle("Testing with buster.js  ");
        refute.defined(parts.type);
        refute.defined(parts.person);
        assert.equals("Testing with buster.js", parts.title);

        parts = parseTitle("Talk -- Testing with buster.js  ");
        assert.equals("Talk", parts.type);
        refute.defined(parts.person);
        assert.equals("Testing with buster.js", parts.title);
    }

});