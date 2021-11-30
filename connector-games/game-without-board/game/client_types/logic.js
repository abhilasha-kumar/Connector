/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var J = ngc.JSUS;

/* function for shuffling board on the server side
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
*/
function endGameFunc(msg) {//ends the game
    this.LOOP_ENDED = true;
}

function endGameFuncPrac(msg) {//ends the game
    this.LOOP_ENDED_PRAC = true;
}


module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var node = gameRoom.node;
    var channel =  gameRoom.channel;
    let db = node.game.memory;
    // Must implement the stages here.
    // stager.setDefaultProperty('minPlayers', [
    //     settings.MIN_PLAYERS,
    //     function() { node.game.gotoStep('demographics'); }
    // ]);

    stager.extendStep('instructions', {
        cb: function() {
            console.log('Instructions.');
        },
        matcher: {//assign roles for gameplay
            roles: ['CLUEGIVER','GUESSER'],
            match: 'roundrobin',
        },
        reconnect: true,

    });





    stager.extendStage('gameplayprac', {
        init: function() {//create view for results storage
            db.view('feedbackprac', function() {
            return node.game.isStage('gameplay');
        });


        }

    });



    // stager.extendStep('clueOptionsprac', {
    //     cb: function() {
    //         /*include for board shuffling
    //         var board = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];

    //         var sboard = shuffle(board);
    //         */
    //     }

    // });

    stager.extendStep('feedbackprac', {
        cb: function() {//when the server receives the end game msg it runs the end game function
            node.on.data('END_GAME', endGameFuncPrac);
        },
        exit: function(){
            db.feedbackprac.save('feedbackprac.csv', {

                // Custom header.
                // header: ["clueGiverID", "clueGiverRandCode", "guesserID", "guesserRandCode","target1","target2", "clueOption1", "TBOption1", "TEOption1", "clueOption2", "TBOption2", "TEOption2", "clueOption3", "TBOption3", "TEOption3", "clueOption4", "TBOption4", "TEOption4", "clueOption5", "TBOption5", "TEOption5", "clueOption6", "TBOption6", "TEOption6", "clueOption7", "TBOption7", "TEOption7", "clueOption8", "TBOption8", "TEOption8", "clueFinal", "TBFinal", "TEFinal", "GuessOption1", "GUESS_OPTION1_TIME", "GuessOption2", "GUESS_OPTION2_TIME", "GuessOption3", "GUESS_OPTION3_TIME", "GuessOption4", "GUESS_OPTION4_TIME", "GuessOption5", "GUESS_OPTION5_TIME", "GuessOption6", "GUESS_OPTION6_TIME", "GuessOption7", "GUESS_OPTION7_TIME", "GuessOption8", "GUESS_OPTION8_TIME", "GUESS_1_FINAL", "GUESS_1_FINAL_TIME", "GUESS_2_FINAL", "GUESS_2_FINAL_TIME"],
                header: ["clueGiverID", "clueGiverRandCode", "guesserID", "guesserRandCode","target1","target2", "clueFinal", "TBFinal", "TEFinal", "GUESS_1_FINAL", "GUESS_1_FINAL_TIME", "GUESS_2_FINAL", "GUESS_2_FINAL_TIME"],

                // Saves only updates from previous save command.
                updatesOnly: true,

                flatten: true
            });

         }
    });







    stager.extendStage('gameplay', {
        init: function() {//create view for results storage
            db.view('feedback', function() {
            return node.game.isStage('gameplay');
        });


        },

    });



    // stager.extendStep('clueOptions', {
    //     cb: function() {
    //         /*include for board shuffling
    //         var board = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];

    //         var sboard = shuffle(board);
    //         */
    //     }

    // });

    stager.extendStep('feedback', {
        cb: function() {//when the server receives the end game msg it runs the end game function
            node.on.data('END_GAME', endGameFunc);
        },
        exit: function(){
            db.feedback.save('feedback.csv', {

                // Custom header.
                header: ["clueGiverID", "clueGiverRandCode", "guesserID", "guesserRandCode","target1","target2", "clueOption1", "TBOption1", "TEOption1", "clueOption2", "TBOption2", "TEOption2", "clueOption3", "TBOption3", "TEOption3", "clueOption4", "TBOption4", "TEOption4", "clueOption5", "TBOption5", "TEOption5", "clueOption6", "TBOption6", "TEOption6", "clueOption7", "TBOption7", "TEOption7", "clueOption8", "TBOption8", "TEOption8", "clueFinal", "TBFinal", "TEFinal", "GuessOption1", "GUESS_OPTION1_TIME", "GuessOption2", "GUESS_OPTION2_TIME", "GuessOption3", "GUESS_OPTION3_TIME", "GuessOption4", "GUESS_OPTION4_TIME", "GuessOption5", "GUESS_OPTION5_TIME", "GuessOption6", "GUESS_OPTION6_TIME", "GuessOption7", "GUESS_OPTION7_TIME", "GuessOption8", "GUESS_OPTION8_TIME", "GUESS_1_FINAL", "GUESS_1_FINAL_TIME", "GUESS_2_FINAL", "GUESS_2_FINAL_TIME"],

                // Saves only updates from previous save command.
                updatesOnly: true,

                flatten: true
            });

         }
    });

    stager.extendStep('demographics', {
        init: function() {
            db.view('demographics', function() {//creates view for saving demographics
                return node.game.isStage('demographics');
            });
        },
        exit: function(){
            db.feedback.save('demographics.csv', {

                // Custom header.
                // header: ["player","ID","RandCode","age","gender","education","domHand","alert","racial","hispanic","english","language","english5","englishAge","msc"],
                header: ["clueGiverID", "clueGiverRandCode", "guesserID", "guesserRandCode","target1","target2", "clueFinal", "TBFinal", "TEFinal", "GUESS_1_FINAL", "GUESS_1_FINAL_TIME", "GUESS_2_FINAL", "GUESS_2_FINAL_TIME"],

                // Saves only updates from previous save command.
                updatesOnly: true,

                flatten: true,

                flattenByGroup: 'player'
            });

         }
    });

    stager.extendStep('end', {
    });

    stager.setOnGameOver(function() {
    });
};
