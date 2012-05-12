var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase("Event - ", {

    "event model" : function() {
        var params = {
            type: 'type',
            title: 'title',
            person: 'person',
            location: 'location',
            description: 'description',
            startDate: new Date(Date.parse("2012-05-03T10:00:00+00:00")),
            endDate: new Date(Date.parse("2012-05-03T11:00:00+00:00"))
        };
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
