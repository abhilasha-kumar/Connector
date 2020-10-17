/**
 * # Bot type implementation of the game stages
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    stager.setDefaultCallback(function() {
        this.node.timer.randomDone();
    });

    /*stager.extendStep('game', {
        roles: {
            DICTATOR: {
                cb: function() {
                    // This Dictator BOT makes an initial offer of 50
                    // or repeats any offer previously received.
                    var node = this.node;
                    // Did we receive an offer already?
                    if ('undefined' === typeof node.game.offer) {
                        node.done({ offer: 50 });
                    }
                    else {
                        node.done({ offer: node.game.offer });
                    }
                }
            },
            OBSERVER: {
                cb: function() {
                    var node = this.node;
                    node.on.data('decision', function(msg) {

                        // Store last offer.
                        node.game.offer = msg.data;

                        setTimeout(function() {
                            node.done();
                        }, 5000);
                    });
                }
            }
        }
    });*/


};
