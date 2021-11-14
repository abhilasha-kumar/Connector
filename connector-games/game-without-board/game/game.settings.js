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
    MIN_PLAYERS: 2,
    WAIT_TIME: 3000,
    WAIT_TIME_TEXT: "Please wait for your partner to reconnect",

    /**
     * ### TIMER (object) [nodegame-property]
     *
     * Maps the names of the steps of the game to timer durations
     *
     * If a step name is found here, then the value of the property is
     * used to initialize the game timer for the step.
     */
    // TIMER: {
    //      consent: 300000,
    //      idGet: 120000,
    //      instructions: 300000,
    //      clueOptionsprac: 180000,
    //      clueFinalprac: 60000,
    //      : 180000,
    //      guessFinalprac: 60000,
    //      feedbackprac: 60000,
    //      endprac: 120000,
    //      clueOptions: 180000,
    //      clueFinal: 60000,
    //      guessOptions: 180000,
    //      guessFinal: 60000,
    //      feedback: 60000
    // },

    // # Game specific properties

    // Number of game rounds repetitions.
    REPEAT: 1,

    // In case an incoming offer does not pass validation, which indicates
    // cheating, re-set the dictator's offer to this value.
    defaultOffer: 100,


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
/*
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
*/
    }
};
