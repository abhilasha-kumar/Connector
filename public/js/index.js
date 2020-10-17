/**
 * # Index script for nodeGame
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * http://nodegame.org
 * ---
 */
window.onload = function() {
    if ('undefined' === typeof node) {
        throw new Error('node is not loaded. Aborting.');
    }

    // All these properties will be overwritten
    // by remoteSetup from server.
    node.setup('nodegame', {
        verbosity: 100,
        debug : true,
        window : {
            promptOnleave : false
        },
        env : {
            auto : false,
            debug : false
        },
        events : {
            dumpEvents : true
        },
        socket : {
            type : 'SocketIo',
            reconnection : false
        }
    });
    // Connect to channel.
    // (If using an alias if default channel, must pass the channel name
    // as parameter to connect).
    node.connect();
};
