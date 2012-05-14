var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase("GoogleConverter - ", {

    setUp:function () {
        this.data = {
            "summary":"TestKalender",
            "description":"Google Calendar API test",
            "updated":"2012-05-01T08:08:39.000Z",
            "timeZone":"Europe/Paris",
            "accessRole":"reader",
            "items":[
                {
                    "kind":"calendar#event",
                    "summary":"Homologe Logohome - Manuel Blickle",
                    "description":"Die SFH eines hamiltonschen Symplektomorphismus F ist isomorph zur singulären Homologie der zugrundeliegenden Mannigfaltigkeit M. Daher liefern die Summen der Betti-Zahlen von M eine untere Grenze für die Anzahl der Fixpunkte eines nicht-entarteten Symplektomorphismus F (Arnold-Vermutung). Die SFH eines hamiltonschen Symplektomorphismus F haben außerdem ein \"pair of pants\" Produkt, das ein deformiertes Cup-Produkt äquivalent zur Quantenkohomologie ist.",
                    "location":"Übungsraum K4, Mathe-Institut",
                    "organizer":{
                        "email":"a0i2n11sc0e74d813ishbpiiso@group.calendar.google.com",
                        "displayName":"TestKalender"
                    },
                    "start":{
                        "dateTime":"2012-05-03T10:00:00+02:00"
                    },
                    "end":{
                        "dateTime":"2012-05-03T11:00:00+02:00"
                    }
                },
                {
                    "kind":"calendar#event",
                    "summary":"Rotationsinvariante Rotationen in 0-dimensionalen Vektorräumen - Andreas Hölzl",
                    "description":"Analog zum Beweis von lemma:4-4 ist A messbar. Zunächst sei  r  beschränkt mit kompaktem Träger. Daraus folgt, dass   ΧA   integrierbar ist. Nach dem Prinzip von Cavalieri (siehe sect:4-3-(1)) sowie sect:4-3-(3) folgt ...",
                    "location":"Hörsaal 2 - KG 4",
                    "organizer":{
                        "email":"a0i2n11sc0e74d813ishbpiiso@group.calendar.google.com",
                        "displayName":"TestKalender"
                    },
                    "start":{
                        "dateTime":"2012-05-03T13:00:00+02:00"
                    },
                    "end":{
                        "dateTime":"2012-05-03T14:00:00+02:00"
                    }
                },
                {
                    "kind":"calendar#event",
                    "summary":"Isotonische Isomorphien in i-dimensionalen Integralen - Fred Feuerstein",
                    "description":"Gegeben seien X1 = (V1,E1) und X2 = (V2,E2)\nEine bijektive Abbildung φ: V1→V2 heißt ein ISOMORPHISMUS von X1 auf X2, wenn gilt: [x,y] ⇔ [φ(x), φ(y)] ∈ E2; X1 ≈ X2",
                    "location":"Hörsaal 3 - KG 1",
                    "organizer":{
                        "email":"a0i2n11sc0e74d813ishbpiiso@group.calendar.google.com",
                        "displayName":"TestKalender"
                    },
                    "start":{
                        "dateTime":"2012-05-04T09:00:00+02:00"
                    },
                    "end":{
                        "dateTime":"2012-05-04T10:00:00+02:00"
                    }
                }
            ]
        };
    },

    "convert a single item":function () {
        var item = {
            "summary":"talk -- Andy Woodly: the summary",
            "description":"the description",
            "location":"the location",
            "start":{
                "dateTime":"2012-05-04T09:00:00+02:00"
            },
            "end":{
                "dateTime":"2012-05-04T10:00:00+02:00"
            }
        };
        var event = GoogleConverter.convertItem(item);
        assert.equals("talk", event.getType());
        assert.equals("Andy Woodly", event.getPerson());
        assert.equals("the summary", event.getTitle());
        assert.equals(9, event.getStartDate().getHours());
        assert.equals(10, event.getEndDate().getHours());
    },

    "convert items to events":function () {
        var events = GoogleConverter.convert(this.data.items);
        assert.equals(3, events.length);
        assert.match(events[0].getTitle(), /Logohome/i);
        assert.match(events[1].getTitle(), /Rotationen/i);
        assert.match(events[2].getTitle(), /Isomorphien/i);

    }

});