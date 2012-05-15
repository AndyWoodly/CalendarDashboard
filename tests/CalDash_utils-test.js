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
    },

    "correctness of formatTimeToStart()" : function() {
        assert.equals("1 second", CalDash.utils.formatTimeToStart(1000));
        assert.equals("2 seconds", CalDash.utils.formatTimeToStart(2000));
        assert.equals("1 minute and 6 seconds", CalDash.utils.formatTimeToStart(66000));
        assert.equals("3 hours and 25 minutes", CalDash.utils.formatTimeToStart(12345000));
        assert.equals("6 hours and 45 minutes", CalDash.utils.formatTimeToStart(24348000));
    }

});