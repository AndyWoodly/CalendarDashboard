var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase("EventManager - ", {

    setUp: function() {
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

        this.manager = new EventManager(
                { events: [event2, event1, event3] }
        );

    },

    "update - include all events" : function() {
        var manager = this.manager;

        assert.equals("event1", manager.getNextEvent().getTitle());

        var now = new Date(Date.parse("2012-05-12T00:00:00+00:00"));
        manager.update(now);

        var dates = manager.getDates();
        assert.equals(2, dates.length);
        assert.equals(12, dates[0].getDate());
        assert.equals(13, dates[1].getDate());

        var dates1 = manager.getEventsForDate(dates[0]);
        assert.equals(2, dates1.length);
        assert.equals("event1", dates1[0].getTitle());
        assert.equals("event2", dates1[1].getTitle());

        var dates2 = manager.getEventsForDate(dates[1]);
        assert.equals(1, dates2.length);
        assert.equals("event3", dates2[0].getTitle());
    },

    "update - one event elapsed" : function() {
        var manager = this.manager;

        var now = new Date(Date.parse("2012-05-12T13:00:00+00:00"));
        manager.update(now);

        var dates = manager.getDates();
        assert.equals(2, dates.length);
        assert.equals(12, dates[0].getDate());
        assert.equals(13, dates[1].getDate());

        var dates1 = manager.getEventsForDate(dates[0]);
        assert.equals(1, dates1.length);
        assert.equals("event2", dates1[0].getTitle());

        var dates2 = manager.getEventsForDate(dates[1]);
        assert.equals(1, dates2.length);
        assert.equals("event3", dates2[0].getTitle());
    },

    "update - all events elapsed" : function() {
        var manager = this.manager;

        var now = new Date(Date.parse("2012-05-13T13:00:00+00:00"));
        manager.update(now);

        var dates = manager.getDates();
        assert.equals(0, dates.length);
    }

});