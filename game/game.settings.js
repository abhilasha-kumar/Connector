/**
 * # Game settings definition file
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * The variables in this file will be sent to each client and saved under:
 *
 *   `node.game.settings`
 *
 * The name of the chosen treatment will be added as:
 *
 *    `node.game.settings.treatmentName`
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = {

    // Variables shared by all treatments.

    // #nodeGame properties:

    /**
     * ### TIMER (object) [nodegame-property]
     *
     * Maps the names of the steps of the game to timer durations
     *
     * If a step name is found here, then the value of the property is
     * used to initialize the game timer for the step.
     */
    TIMER: {
        instructions: 60000
    },

    // # Game specific properties

    // Number of game rounds repetitions.
    REPEAT: 1,

    // In case an incoming offer does not pass validation, which indicates
    // cheating, re-set the dictator's offer to this value.
    defaultOffer: 100,

    testingTxt: "This is to test variables",


    b0txt : "a0",
    b1txt : "a1",
    b2txt : "a2",
    b3txt : "a3",
    b4txt : "a4",
    b5txt : "b0",
    b6txt : "b1",
    b7txt : "b2",
    b8txt : "b3",
    b9txt : "b4",
    b10txt : "c0",
    b11txt : "c1",
    b12txt : "c2",
    b13txt : "c3",
    b14txt : "c4",
    b15txt : "d0",
    b16txt : "d1",
    b17txt : "d2",
    b18txt : "d3",
    b19txt : "d4",


    // # Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.

    treatments: {

        standard: {
            description: "Longer time",
            bidTime: 30000
        },

        pressure: {
            description: "Short times to take decisions",
            bidTime: 10000
        },

        //new treatments
        rich: {
            description: "Wealthy",
            coins: 1000,
            TEXT: "you are rich now"
        },

    }
};
