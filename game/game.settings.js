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

    /**
     * ### TIMER (object) [nodegame-property]
     *
     * Maps the names of the steps of the game to timer durations
     *
     * If a step name is found here, then the value of the property is
     * used to initialize the game timer for the step.
     */
    TIMER: {
         consent: 300000,
         idGet: 120000,
         instructions: 300000,
         clueOptionsprac: 180000,
         clueFinalprac: 60000,
         guessOptionsprac: 180000,
         guessFinalprac: 60000,
         feedbackprac: 60000,
         endprac: 120000,
         clueOptions: 180000,
         clueFinal: 60000,
         guessOptions: 180000,
         guessFinal: 60000,
         feedback: 60000
    },

    // # Game specific properties

    // Number of game rounds repetitions.
    REPEAT: 1,

    // In case an incoming offer does not pass validation, which indicates
    // cheating, re-set the dictator's offer to this value.
    defaultOffer: 100,



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

    board1: ["BENCH","GLOW","SUNNY","IDIOT","QUICK","ANALYZE","BEAM","CAVE","OAK","RED","ROBIN","TREE","FIRM","CUT","RUN","KNIGHT","TRIM","SITE","BIRD","MONTH"],
    board2: ["PLANT","LACE","TIP","TENT","ARROW","POST","SUN","SILVER","ABOVE","BLUE","HOST","LOOSE","GOLD","STERN","CUP","WIND","BOWL","LUNCH","BELOW","BOW"],
    board3: ["MILD","SHINE","GRAY","GUMS","LUCK","PAPER","RUDE","LANE","HOLY","ROAD","JAM","HAMMER","REGRET","CHIP","TEETH","FAIRY","TINY","TOOL","BULB","KIND"],
    board4: ["GUN","HALO","JUMP","GIVE","HOPE","TRAVEL","POOR","DREAM","SPOON","GLUE","ANGEL","WEAK","LEAP","CHIEF","ANKLE","PASTE","USUAL","BET","PATH","FORK"],
    board5: ["TIGER","EXAM","BUN","TRACE","HAND","STORM","SNAKE","ALARM","BEAR","HOUSE","BIRTH","TEST","DEAD","FRESH","ALIVE","TOWER","PORK","ASH","LION","HELL"],
    board6: ["SIT","PINE","WHITE","IDEAL","CRUST","FLOUR","ROCK","LEMON","ELM","FOUND","RIVER","LOST","FLAT","CHAIN","FILL","STAND","TEAR","EXACT","BOOT","CLEVER"],
    board7: ["HEAVY","EAST","WOOD","DIM","NEW","GLASS","HEART","FULL","TIMBER","LOVE","SOFT","METER","EMPTY","HARD","OLD","CAGE","WORN","KITCHEN","SHORT","BOOTS"],
    board8: ["PEN","LAND","ICING","HAPPY","HORN","DRUM","FLOOR","RIDE","TALL","GIANT","RURAL","FINE","TILE","STYLE","CAKE","SUGAR","ARMY","SAD","SUBTLE","ACRE"],
    board9: ["MALE","HAPPEN","KING","CANDLE","TOE","HAMMOCK","SILLY","TRAUMA","RAGE","WEIRD","REAL","SLEEP","FLY","WICK","GUEST","ANGER","OLIVE","SKIRT","SORE","LAYER"],
    board10: ["FEET","CHAIR","FIRE","SHIP","LATE","LIST","GAS","DUNE","SAND","BOSS","TABLE","RING","BLAZE","GARAGE","CHAPEL","EARLY","PURE","DOPE","AWARE","BONE"],
    board11: ["BEE","CAMEL","SOUR","DAY","MOVE","HELP","JOKE","COAL","SAME","HONEY","SIN","HALF","CORAL","NIGHT","ASSIST","PET","ENVY","LAUGH","WASH","TOAD"],
    board12: ["TULIP","ZONE","CHALK","FIST","SAFE","PRISON","PAIN","MOVIE","SMILE","PINK","GRASP","TERM","AGONY","LEGAL","BEND","FILM","PAIL","BOARD","FLOWER","RUBY"],
    board13: ["ROPE","FOLLOW","PONY","SOLID","TEXT","KNIFE","EAR","BLADE","TEA","SLOW","ART","LEAD","DARE","GIRL","WEST","BOOK","BASE","HORSE","STAB","BOY"],
    board14: ["TUNA","WET","FLOAT","APPLE","FALL","DUSK","BOX","TALE","SIREN","WALK","EVIL","TOY","DAWN","SUIT","DRY","COLD","LOCAL","DIRTY","HOT","LIAR"],
    board15: ["HILL","ZOO","TROUT","SALT","SOUTH","CLOTH","FORT","ROW","FISH","BOAT","PLANE","FOUL","ANIMAL","BUTTER","BARK","MAD","ROUGH","PEPPER","GOAL","DAMN"],
    board16: ["KNOB","ERROR","FLUID","CRIB","PROOF","RETURN","WIDE","PLUM","POWER","LIGHT","BABY","PIER","WORRY","WORKER","DOOR","SMALL","POET","SOBER","LAMP","TASK"],
    board17: ["TOUGH","KEY","WORST","WAG","BADGE","SOIL","WARM","SHELF","WRITE","CART","GIFT","THREAD","ANGLE","BEST","WOOL","DIRT","TAIL","SAGE","TREAT","SKILL"],
    board18: ["CREDIT","FROG","MOLE","JUNK","LEASE","GAME","VINE","SHOP","GRAPE","JUICE","SPELL","SPIDER","OAR","JOIN","SKY","CROAK","WRONG","TAN","CARD","FUSE"],
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
