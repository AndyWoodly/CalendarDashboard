var config = module.exports;

config["Browser tests"] = {

    environment: "browser",

    libs: [
    ],

    src: [
        "webcontent/javascript/*.js"
    ],

    tests: [
        "tests/**/*-test.js"
    ]

};
