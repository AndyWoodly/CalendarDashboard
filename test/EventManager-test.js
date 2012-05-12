var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase("EventManager - ", {

    "update" : function() {
        var event1 = new Event(
                {
                    title: "event1",
                    startDate: new Date(Date.parse("2012-05-12T10:00:00+00:00")),
                    endDate: new Date(Date.parse("2012-05-12T12:00:00+00:00"))
                }
        );
        var event2 = new Event(
                {
                    title: "event2",
                    startDate: new Date(Date.parse("2012-05-12T13:00:00+00:00")),
                    endDate: new Date(Date.parse("2012-05-12T14:00:00+00:00"))
                }
        );
        var event3 = new Event(
                {
                    title: "event3",
                    startDate: new Date(Date.parse("2012-05-13T10:00:00+00:00")),
                    endDate: new Date(Date.parse("2012-05-13T12:00:00+00:00"))
                }
        );

        var manager = new EventManager(
                { events: [event2, event1, event3] }
        );

        assert.equals("event1", manager.getNextEvent().getTitle());

        var now = new Date(Date.parse("2012-05-12T00:00:00+00:00"));
        manager.update(now);


        var dates = manager.getDates();

        buster.log(dates);
        assert.equals(2, dates.length);
    }

});