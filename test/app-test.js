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

buster.testCase("Event - ", {

    "event model" : function() {
        var params = {};
        params.type = 'type';
        params.title = 'title';
        params.person = 'person';
        params.location = 'location';
        params.description = 'description';
        params.startDate = new Date(Date.parse("2012-05-03T10:00:00+00:00"));
        params.endDate = new Date(Date.parse("2012-05-03T11:00:00+00:00"));
        var event = new Event(params);

        assert.equals("type", event.getType());
        assert.equals("title", event.getTitle());
        assert.equals("person", event.getPerson());
        assert.equals("location", event.getLocation());
        assert.equals("description", event.getDescription());

        assert.equals(12, event.getStartDate().getHours());
        assert.equals(13, event.getEndDate().getHours());
    }

});
