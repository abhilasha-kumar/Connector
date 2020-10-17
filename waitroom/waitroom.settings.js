/**
 * # Waiting Room settings
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * Waiting Room settings.
 *
 * http://nodegame.org
 * ---
 */
module.exports = {

    /**
     * ## EXECUTION_MODE (string)
     *
     * Sets the execution mode of the waiting room
     *
     * Different modes might have different default values, and need
     * different settintgs.
     *
     * Available modes:
     *
     *   - �TIMEOUT�, waits until the time is up, then it checks
     *        whether enough players are connected to start the game.
     *   - �WAIT_FOR_N_PLAYERS�, the game starts right away as soon as
     *        the desired number of connected players is reached.
     */
    EXECUTION_MODE: 'WAIT_FOR_N_PLAYERS',

    /**
     * ## GROUP_SIZE (number)
     *
     * The size of each group dispatched by the waiting room
     */
    GROUP_SIZE: 1,

    /**
     * ## POOL_SIZE (number) Optional
     *
     * If set, waits until POOL_SIZE clients are connected to dispatch a group
     *
     * Must be >= GROUP_SIZE.
     *
     * Default: GROUP_SIZE
     */
    // POOL_SIZE: 2,

    /**
     * ## N_GAMES (number) Optional
     *
     * Number of games to dispatch
     *
     * If set, waiting room will be closed after N_GAMES have been dispatched
     *
     * Default: undefined, no limit.
     */
    // N_GAMES: 1,

    /**
     * ## MAX_WAIT_TIME (number) Optional
     *
     * Maximum waiting time in milliseconds in the waiting room
     *
     * After the max waiting time expired clients are disconnected
     */
    MAX_WAIT_TIME: 90000,

    /**
     * ## START_DATE (string|object) Optional
     *
     * Time and date of the start of the game.
     *
     * Overrides `MAX_WAIT_TIME`.
     *
     * Accepted values: any valid argument to `Date` constructor.
     */
    // START_DATE: 'December 31, {YEAR} 12:00:00',
    // START_DATE: new Date().getTime() + 30000,

    /**
     * ## CHOSEN_TREATMENT (string|function)
     *
     * The treatment assigned to every new group
     *
     * Accepted values:
     *
     *   - "treatment_rotate": rotates the treatments.
     *   - undefined: a random treatment will be selected.
     *   - function: a callback returning the name of the treatment. E.g:
     *
     *       function(treatments, roomCounter) {
     *           return treatments[roomCounter % treatments.length];
     *       }
     *
     * Default: undefined, random treatment
     */
    CHOSEN_TREATMENT: function(treatments, roomCounter) {
        return treatments[roomCounter % treatments.length];
    },

    /**
     * ## PLAYER_SORTING
     *
     * Sorts the order of players before dispatching them
     *
     * Sorting takes place only if:
     *
     *  - the number of connected players > GROUP_SIZE,
     *  - PLAYER_GROUPING is undefined
     *
     * Accepted values:
     *
     *   - 'timesNotSelected': (default) gives priority to players that
     *        have not been selected by a previous call to dispatch
     *   - undefined: rollback to default choice
     *   - null: no sorting (players are anyway randomly shuffled).
     *   - function: a comparator function implementing a criteria
     *       for sorting two objects. E.g:
     *
     *        function timesNotSelected(a, b) {
     *            if ((a.timesNotSelected || 0) < b.timesNotSelected) {
     *                return -1;
     *            }
     *            else if ((a.timesNotSelected || 0) > b.timesNotSelected) {
     *                return 1;
     *            }
     *            return 0;
     *        }
     */
    // PLAYER_SORTING: 'timesNotSelected'

    /**
     * ## PLAYER_GROUPING
     *
     * Creates groups of players to be assigned to treatments
     *
     * This method is alternative to "sorting" and will be invoked only
     * if the number of connected players > GROUP_SIZE
     *
     * @param {PlayerList} pList The list of players to group
     * @param {number} nGroups The number of groups requested by current
     *   dispatch
     *
     * @return {array} An array of nGroups arrays of player objects
     */
    // PLAYER_GROUPING: function(pList, nGroups) {
    //     return [ [ pl1, pl2 ] [ pl3, pl4 ] ];
    // }

    /**
     * ## ON_TIMEOUT (function) Optional
     *
     * A callback function to be executed on the client when wait time expires
     */
    // ON_TIMEOUT: function() {
    //    console.log('I am timed out!');
    // },

    /**
     * ## ON_TIMEOUT_SERVER (function) Optional
     *
     * A callback function to be executed on the server when wait time expires
     *
     * The context of execution is WaitingRoom.
     */
    // ON_TIMEOUT_SERVER: function(code) {
    //    console.log('*** I am timed out! ', code.id);
    // }

    /**
     * ## ON_OPEN (function) Optional
     *
     * Callback to be executed when the waiting room becomes "open"
     *
     * Receives as first parameter the waiting room object itself.
     */
    // ON_OPEN: null;

    /**
     * ### WaitingRoom.ON_CLOSE (function) Optional
     *
     * Callback to be executed when the waiting room becomes "close"
     *
     * Receives as first parameter the waiting room object itself.
     */
    // ON_CLOSE: null;

    /**
     * ## ON_CONNECT (function) Optional
     *
     * Callback to be executed when a player connects
     *
     * Receives as first parameter the waiting room object itself.
     */
    // ON_CONNECT: null;

    /**
     * ## ON_DISCONNECT (function) Optional
     *
     * Callback to be executed when a player disconnects
     *
     * Receives as first parameter the waiting room object itself.
     */
    // ON_DISCONNECT: null;

    /**
     * ## ON_INIT (function) Optional
     *
     * Callback to be executed after the settings have been parsed
     *
     * Receives as first parameter the waiting room object itself.
     */
    // ON_INIT: null;

    /**
     * ## ON_DISPATCH (function) Optional
     *
     * Callback to be executed just before starting dispatching
     *
     * Receives as first parameter the waiting room object itself,
     * and the options of the dispatch call as second parameter.
     */
    // ON_DISPATCH: null;

    /**
     * ## ON_DISPATCHED (function) Optional
     *
     * Callback to be executed at the end of a dispatch call
     *
     * Receives as first parameter the waiting room object itself,
     * and the options of the dispatch call as second parameter.
     */
    // ON_DISPATCHED: null;

    /**
     * ## ON_FAILED_DISPATCH (function) Optional
     *
     * Callback to be executed if a dispatch attempt failed
     *
     * Receives as first parameter the waiting room object itself,
     * the options of the dispatch call as second parameter, and
     * optionally the error message as third parameter.
     */
    // ON_FAILED_DISPATCH: null;

    /**
     * ## DISPATCH_TO_SAME_ROOM (boolean) Optional
     *
     * If TRUE, every new group will be added to the same game room
     *
     * A new game room will be created for the first dispatch, and
     * reused for all successive groups. Default, FALSE.
     *
     * Notice: the game must support adding players while it is running.
     *
     * Default: FALSE
     *
     * @see WaitingRoom.lastGameRoom
     */
    // DISPATCH_TO_SAME_ROOM: true

    /**
     * ## PING_BEFORE_DISPATCH (boolean) Optional
     *
     * If TRUE, all players are pinged before a dispatch
     *
     * Non-responding clients are disconnected.
     *
     * If only one player is needed and mode is 'WAIT_FOR_N_PLAYERS',
     * pinging is skipped.
     *
     * Default: TRUE
     *
     * @see WaitingRoom.dispatch
     */
    // PING_BEFORE_DISPATCH: true,

    /**
     * ## PING_MAX_REPLY_TIME (number > 0) Optional
     *
     * The number of milliseconds to wait for a reply from a PING
     *
     * Default: 3000
     *
     * @see PING_BEFORE_DISPATCH
     */
    // PING_MAX_REPLY_TIME: 3000,

    /**
     * ## PING_DISPATCH_ANYWAY (boolean) Optional
     *
     * If TRUE, dispatch continues even if disconnections occur during PING
     *
     * Default: FALSE
     *
     * @see PING_BEFORE_DISPATCH
     * @see PING_MAX_REPLY_TIME
     */
    // PING_DISPATCH_ANYWAY: false,

    /**
     * ## logicPath (string) Optional
     *
     * If set, a custom implementation of the wait room will be used
     *
     * @see wait.room.js (nodegame-server)
     */
    // logicPath: 'path/to/a/wait.room.js',

    /**
     * ## DISCONNECT_IF_NOT_SELECTED (boolean) Optional
     *
     * Disconnect a client if not selected for a game when dispatching
     *
     * Default: false
     */
    // DISCONNECT_IF_NOT_SELECTED: true,

    /**
     * ## PAGE_TITLE (object) Optional
     *
     * Sets the page title, optionally adds to page
     *
     * An object containing the title, and a flag if the same text should
     * be added in a H1 element at the top of the page.
     *
     * Default: { title: 'Welcome!', addToBody: true }
     */
     PAGE_TITLE: { title: 'Welcome to Code Names!', addToBody: true },

    /** ### TEXTS
     *
     * Collections of texts displayed when given events occurs
     *
     * Each item can be a string, or function returning a string; the function
     * receives two input parameters: the instance of the widget and an object
     * with extra information (depending on the event).
     *
     * @see WaitingRoom.texts
     */
    TEXTS: {

        /**
         * #### blinkTitle
         *
         * Blinks the title of the tab to signal the beginning of the game
         *
         * False will not blink.
         */
        // blinkTitle: 'Custom string: Game Starts!',

        /**
         * #### disconnect
         *
         * Disconnected from waiting room
         */
        // disconnect: 'Custom string: YOU HAVE BEEN DISCONNECTED!',

        /**
         * #### waitedTooLong
         *
         * The MAX_WAIT_TIME countdown expired
         */
        // waitedTooLong: 'Custom string: YOU WAITED TOO LONG!',

        /**
         * #### notEnoughPlayers
         *
         * There are not enough players to start a game
         */
        // notEnoughPlayers: 'Custom string: NOT ENOUGH PLAYERS!',

        /**
         * #### roomClosed
         *
         * A player tries to connect, but the waiting room has been closed
         */
        // roomClosed: 'Custom string: ROOM CLOSED! CANNOT ENTER!',

        /**
         * #### tooManyPlayers
         *
         * Currently there are more players than needed by the game
         */
        // tooManyPlayers: 'Custom string: TOO MANY PLAYERS!',

        /**
         * #### notSelectedClosed
         *
         * Player has not been selected, and cannot participate in other games
         */
        // notSelectedClosed: 'Custom string: NOT SELECTED CLOSED!',

        /**
         * #### notSelectedOpen
         *
         * Player has not been selected, but can still participate in new games
         */
        // notSelectedOpen: 'Custom string: NOT SELECTED OPEN!',

        /**
         * #### exitCode
         *
         * Player disconnected, and an exit code might have been provided
         */
        // exitCode: 'Custom string: EXIT CODE TEXT',
    },

    /** ### SOUNDS
     *
     * Collections of sounds played when given events occurs
     *
     * Each item can be a string, or function returning a string; the function
     * receives two input parameters: the instance of the widget and an object
     * with extra information (depending on the event).
     *
     * @see WaitingRoom.sounds
     */
    SOUNDS: {

        /**
         * ## dispatch
         *
         * Notifies players that a game is about to be dispatched
         *
         * If TRUE, plays default sound, if string plays the file sound
         * located at the specified uri.
         */
        // dispatch: false
    },

    /** ### ALLOW_PLAY_WITH_BOTS
     *
     * Allows a player to request to start the game immediately with bots
     *
     * A button is added to the interface.
     */
    ALLOW_PLAY_WITH_BOTS: false,

    /** ### ALLOW_SELECT_TREATMENT
     *
     * Allows a player to select the treatment for the game
     *
     * This option requires `ALLOW_PLAY_WITH_BOTS` to be TRUE.
     *
     * A button is added to the interface.
     */
    ALLOW_SELECT_TREATMENT: false

};
