var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase("CalDash - ", {

    setUp: function () {

    },

    "robustness of parseTitle()" : function() {
        var parts = CalDash.utils.parseTitle("Talk -- Andy Woodly: Testing with buster.js");
        assert.equals("Talk", parts.type);
        assert.equals("Andy Woodly", parts.person);
        assert.equals("Testing with buster.js", parts.title);

        parts = CalDash.utils.parseTitle(" Talk  --Andy Woodly :  Testing with buster.js  ");
        assert.equals("Talk", parts.type);
        assert.equals("Andy Woodly", parts.person);
        assert.equals("Testing with buster.js", parts.title);

        parts = CalDash.utils.parseTitle("  Andy Woodly :Testing with buster.js  ");
        refute.defined(parts.type);
        assert.equals("Andy Woodly", parts.person);
        assert.equals("Testing with buster.js", parts.title);

        parts = CalDash.utils.parseTitle("Testing with buster.js  ");
        refute.defined(parts.type);
        refute.defined(parts.person);
        assert.equals("Testing with buster.js", parts.title);

        parts = CalDash.utils.parseTitle("Talk -- Testing with buster.js  ");
        assert.equals("Talk", parts.type);
        refute.defined(parts.person);
        assert.equals("Testing with buster.js", parts.title);
    }

});