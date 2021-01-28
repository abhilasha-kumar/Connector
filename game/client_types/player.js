/**
 * # Player type implementation of the game stages
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    stager.setOnInit(function() {

        // Initialize the client.

        var header, frame;

        // Bid is valid if it is a number between 0 and 100.
        this.isValidBid = function(n) {
            return node.JSUS.isInt(n, -1, 101);
        };

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();


        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);

        this.visualTimer = node.widgets.append('VisualTimer', header);

        this.doneButton = node.widgets.append('DoneButton', header);

        this.board0 = ["SMELL","FAMILY","BLOW","AMP","TANK","BIRTHDAY","PUNISHMENT","HELICOPTER","BLAME","FIB","EYES","WEEP","THIRST","FOLLOWER","ANTIDOTE","PIE","BLAZE","LEAP","DATE","NAVY"];
        this.board1 = ["BENCH","GLOW","SUNNY","IDIOT","QUICK","ANALYZE","BEAM","CAVE","OAK","RED","ROBIN","TREE","FIRM","CUT","RUN","KNIGHT","TRIM","SITE","BIRD","MONTH"];
        this.board2 = ["PLANT","LACE","TIP","TENT","ARROW","POST","SUN","SILVER","ABOVE","BLUE","HOST","LOOSE","GOLD","STERN","CUP","WIND","BOWL","LUNCH","BELOW","BOW"];
        this.board3 = ["MILD","SHINE","GRAY","GUMS","LUCK","PAPER","RUDE","LANE","HOLY","ROAD","JAM","HAMMER","REGRET","CHIP","TEETH","FAIRY","TINY","TOOL","BULB","KIND"];
        this.board4 = ["GUN","HALO","JUMP","GIVE","HOPE","TRAVEL","POOR","DREAM","SPOON","GLUE","ANGEL","WEAK","LEAP","CHIEF","ANKLE","PASTE","USUAL","BET","PATH","FORK"];
        this.board5 = ["TIGER","EXAM","BUN","TRACE","HAND","STORM","SNAKE","ALARM","BEAR","HOUSE","BIRTH","TEST","DEAD","FRESH","ALIVE","TOWER","PORK","ASH","LION","HELL"];
        this.board6 = ["SIT","PINE","WHITE","IDEAL","CRUST","FLOUR","ROCK","LEMON","ELM","FOUND","RIVER","LOST","FLAT","CHAIN","FILL","STAND","TEAR","EXACT","BOOT","CLEVER"];
        this.board7 = ["HEAVY","EAST","WOOD","DIM","NEW","GLASS","HEART","FULL","TIMBER","LOVE","SOFT","METER","EMPTY","HARD","OLD","CAGE","WORN","KITCHEN","SHORT","BOOTS"];
        this.board8 = ["PEN","LAND","ICING","HAPPY","HORN","DRUM","FLOOR","RIDE","TALL","GIANT","RURAL","FINE","TILE","STYLE","CAKE","SUGAR","ARMY","SAD","SUBTLE","ACRE"];
        this.board9 = ["MALE","HAPPEN","KING","CANDLE","TOE","HAMMOCK","SILLY","TRAUMA","RAGE","WEIRD","REAL","SLEEP","FLY","WICK","GUEST","ANGER","OLIVE","SKIRT","SORE","LAYER"];
        this.board10 = ["FEET","CHAIR","FIRE","SHIP","LATE","LIST","GAS","DUNE","SAND","BOSS","TABLE","RING","BLAZE","GARAGE","CHAPEL","EARLY","PURE","DOPE","AWARE","BONE"];
        this.board11 = ["BEE","CAMEL","SOUR","DAY","MOVE","HELP","JOKE","COAL","SAME","HONEY","SIN","HALF","CORAL","NIGHT","ASSIST","PET","ENVY","LAUGH","WASH","TOAD"];
        this.board12 = ["TULIP","ZONE","CHALK","FIST","SAFE","PRISON","PAIN","MOVIE","SMILE","PINK","GRASP","TERM","AGONY","LEGAL","BEND","FILM","PAIL","BOARD","FLOWER","RUBY"];
        this.board13 = ["ROPE","FOLLOW","PONY","SOLID","TEXT","KNIFE","EAR","BLADE","TEA","SLOW","ART","LEAD","DARE","GIRL","WEST","BOOK","BASE","HORSE","STAB","BOY"];
        this.board14 = ["TUNA","WET","FLOAT","APPLE","FALL","DUSK","BOX","TALE","SIREN","WALK","EVIL","TOY","DAWN","SUIT","DRY","COLD","LOCAL","DIRTY","HOT","LIAR"];
        this.board15 = ["HILL","ZOO","TROUT","SALT","SOUTH","CLOTH","FORT","ROW","FISH","BOAT","PLANE","FOUL","ANIMAL","BUTTER","BARK","MAD","ROUGH","PEPPER","GOAL","DAMN"];
        this.board16 = ["KNOB","ERROR","FLUID","CRIB","PROOF","RETURN","WIDE","PLUM","POWER","LIGHT","BABY","PIER","WORRY","WORKER","DOOR","SMALL","POET","SOBER","LAMP","TASK"];
        this.board17 = ["TOUGH","KEY","WORST","WAG","BADGE","SOIL","WARM","SHELF","WRITE","CART","GIFT","THREAD","ANGLE","BEST","WOOL","DIRT","TAIL","SAGE","TREAT","SKILL"];
        this.board18 = ["CREDIT","FROG","MOLE","JUNK","LEASE","GAME","VINE","SHOP","GRAPE","JUICE","SPELL","SPIDER","OAR","JOIN","SKY","CROAK","WRONG","TAN","CARD","FUSE"];

        this.boardboard = [this.board0, this.board0, this.board0, this.board1, this.board1, this.board1, this.board2, this.board2, this.board2, this.board3, this.board3, this.board3, this.board4, this.board4, this.board4, this.board5, this.board5, this.board5, this.board6, this.board6, this.board6, this.board7, this.board7, this.board7, this.board8, this.board8, this.board8, this.board9, this.board9, this.board9, this.board10, this.board10, this.board10, this.board11, this.board11, this.board11,
            this.board12, this.board12, this.board12, this.board13, this.board13, this.board13, this.board14, this.board14, this.board14, this.board15, this.board15, this.board15, this.board16, this.board16, this.board16, this.board17, this.board17, this.board17, this.board18, this.board18, this.board18];

        this.pair0 = ["BLOW","BLAZE"];
        this.pair1 = ["SMELL","EYES"];
        this.pair2 = ["WEEP","FAMILY"];
        this.pair3 = ["QUICK","GLOW"];
        this.pair4 = ["TREE","OAK"];
        this.pair5 = ["CAVE","KNIGHT"];
        this.pair6 = ["GOLD","SILVER"];
        this.pair7 = ["SUN","BOWL"];
        this.pair8 = ["STERN","WIND"];
        this.pair9 = ["TEETH","GUMS"];
        this.pair10 = ["HOLY","KIND"];
        this.pair11 = ["FAIRY","MILD"];
        this.pair12 = ["JUMP","LEAP"];
        this.pair13 = ["DREAM","BET"];
        this.pair14 = ["TRAVEL","ANKLE"];
        this.pair15 = ["SNAKE","ASH"];
        this.pair16 = ["LION","TIGER"];
        this.pair17 = ["HAND","BIRTH"];
        this.pair18 = ["SIT","STAND"];
        this.pair19 = ["CLEVER","FLOUR"];
        this.pair20 = ["ELM","ROCK"];
        this.pair21 = ["OLD","NEW"];
        this.pair22 = ["GLASS","CAGE"];
        this.pair23 = ["EAST","SHORT"];
        this.pair24 = ["HAPPY","SAD"];
        this.pair25 = ["ARMY","DRUM"];
        this.pair26 = ["GIANT","SUBTLE"];
        this.pair27 = ["CANDLE","WICK"];
        this.pair28 = ["OLIVE","REAL"];
        this.pair29 = ["WEIRD","TRAUMA"];
        this.pair30 = ["FEET","CHAPEL"];
        this.pair31 = ["CHAR","TABLE"];
        this.pair32 = ["GARAGE","BONE"];
        this.pair33 = ["BEE","HONEY"];
        this.pair34 = ["CAMEL","COAL"];
        this.pair35 = ["SOUR","ENVY"];
        this.pair36 = ["GRASP","PAIL"];
        this.pair37 = ["MOVIE","FILM"];
        this.pair38 = ["RUBY","SAFE"];
        this.pair39 = ["KNIFE","STAB"];
        this.pair40 = ["SLOW","SOLID"];
        this.pair41 = ["BLADE","BASE"];
        this.pair42 = ["WET","DRY"];
        this.pair43 = ["LOCAL","TOY"];
        this.pair44 = ["SIREN","BOX"];
        this.pair45 = ["FISH","TROUT"];
        this.pair46 = ["PLANE","GOAL"];
        this.pair47 = ["BUTTER","FOUL"];
        this.pair48 = ["SOBER","WIDE"];
        this.pair49 = ["DOOR","KNOB"];
        this.pair50 = ["ERROR","POET"];
        this.pair51 = ["DIRT","SOIL"];
        this.pair52 = ["SHELF","ANGLE"];
        this.pair53 = ["BADGE","TREAT"];
        this.pair54 = ["FROG","CROAK"];
        this.pair55 = ["JUICE","JUNK"];
        this.pair56 = ["SPIDER","JOIN"];

        this.pairList = [this.pair0,this.pair1,this.pair2,this.pair3,this.pair4,this.pair5,this.pair6,this.pair7,this.pair8,this.pair9,this.pair10,this.pair11,this.pair12,this.pair13,this.pair14,this.pair15,this.pair16,this.pair17,this.pair18,this.pair19,this.pair20,this.pair21,this.pair22,this.pair23,this.pair24,this.pair25,this.pair26,this.pair27,this.pair28,this.pair29,this.pair30,this.pair31,this.pair32,this.pair33,this.pair34,this.pair35,this.pair36,this.pair37,this.pair38,this.pair39,this.pair40,this.pair41,this.pair42,this.pair43,this.pair44,this.pair45,this.pair46,this.pair47,this.pair48,this.pair49,this.pair50,this.pair51,this.pair52,this.pair53,this.pair54,this.pair55,this.pair56];

        this.roundCounter = 0;//iterated value to move through the word pairs
        this.smallRoundCounter = 0;//iterated value to record the 3 trials for each word pair
        this.pairnumber = 2;//the number of pairs in the total experiment, should be 57
        this.optionTimeArray = [0];
        this.id;
        this.randomCode;

    });

    stager.extendStep('consent', {
        frame: 'consent.htm',
        cb: function(){
            this.consentButton = node.widgets.append('ChoiceTable', W.gid('consentText'), {//apend customInput widget with 1 mandatory input
               id: 'consentbox',
               title: false,
               requiredChoice: true,
               choices: [
                   "I agree to take part in this study."
               ]
           });
       }
    });

    stager.extendStep('idGet', {
        frame: 'idGet.htm',
        cb: function(){
            this.randomCode = Math.floor(Math.random() * 90000) + 10000;

            this.idWid = node.widgets.append('CustomInput', W.gid('container'), {//apend customInput widget with 1 mandatory input
               id: 'clueGive',
               //mainText: 'What is your final clue?',
               type: 'int',
               className: 'centered',
               //root: 'cbrd',
               requiredChoice: true
           });
       },
        done: function() {//send clue to other player and clue and time info to database
            this.id = this.idWid.getValues().value;
            return;
        }
    });

    stager.extendStep('instructions', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                frame: 'instructionsCG.htm',
            },
            GUESSER:{
                frame: 'instructions.htm',
            }
        }
    });

    stager.extendStep('clueOptions', {
        role: function() { return this.role; },//This code is repeated to maintain roles throughout steps of experiment
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                frame: 'clueboard.htm',
                init: function() {
                    node.game.clueReceived = null;
                },
                cb: function() {
                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),//Initialize board with values from our array each round
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);

                    this.randomOrder = Math.floor(Math.random()*2)//randomize the order of target words for the clue-giver
                    W.setInnerHTML('trgtWords', this.pairList[this.roundCounter][this.randomOrder] + " " + this.pairList[this.roundCounter][1-this.randomOrder]);

                    this.cluesGive = node.widgets.append('CustomInputGroup', W.gid('containerbottom'), {//create customInputGroup widget for clue options, only the first is mandatory
                       id: 'cluesGive',
                       orientation: 'H',
                       //mainText: 'Please list possible clues.',
                       sharedOptions: {
                          type: 'text',
                          width: '80%'
                       },
                       items: [
                           {
                               id: 'clue1',
                               mainText: 'Option 1',
                               requiredChoice: true
                           },
                           {
                               id: 'clue2',
                               mainText: 'Option 2'
                           },
                           {
                               id: 'clue3',
                               mainText: 'Option 3'
                           },
                           {
                               id: 'clue4',
                               mainText: 'Option 4'
                           },
                           {
                               id: 'clue5',
                               mainText: 'Option 5'
                           },
                           {
                               id: 'clue6',
                               mainText: 'Option 6'
                           },
                           {
                               id: 'clue7',
                               mainText: 'Option 7'
                           },
                           {
                               id: 'clue8',
                               mainText: 'Option 8'
                           }
                       ]

                   });
                },
                done: function() {//this sens all data to the logic client and stores the values
                    node.set({clueGiverID: this.id}),
                    node.set({clueGiverRandCode: this.randomCode}),


                    node.set({clueOption1 : this.cluesGive.getValues().items['clue1'].value}),
                    node.set({TBOption1 : this.cluesGive.getValues().items['clue1'].timeBegin}),
                    node.set({TEOption1 : this.cluesGive.getValues().items['clue1'].timeEnd}),

                    node.set({clueOption2 : this.cluesGive.getValues().items['clue2'].value}),
                    node.set({TBOption2 : this.cluesGive.getValues().items['clue2'].timeBegin}),
                    node.set({TEOption2 : this.cluesGive.getValues().items['clue2'].timeEnd}),

                    node.set({clueOption3 : this.cluesGive.getValues().items['clue3'].value}),
                    node.set({TBOption3 : this.cluesGive.getValues().items['clue3'].timeBegin}),
                    node.set({TEOption3 : this.cluesGive.getValues().items['clue3'].timeEnd}),

                    node.set({clueOption4 : this.cluesGive.getValues().items['clue4'].value}),
                    node.set({TBOption4 : this.cluesGive.getValues().items['clue4'].timeBegin}),
                    node.set({TEOption4 : this.cluesGive.getValues().items['clue4'].timeEnd}),

                    node.set({clueOption5 : this.cluesGive.getValues().items['clue5'].value}),
                    node.set({TBOption5 : this.cluesGive.getValues().items['clue5'].timeBegin}),
                    node.set({TEOption5 : this.cluesGive.getValues().items['clue5'].timeEnd}),

                    node.set({clueOption6 : this.cluesGive.getValues().items['clue6'].value}),
                    node.set({TBOption6 : this.cluesGive.getValues().items['clue6'].timeBegin}),
                    node.set({TEOption6 : this.cluesGive.getValues().items['clue6'].timeEnd}),

                    node.set({clueOption7 : this.cluesGive.getValues().items['clue7'].value}),
                    node.set({TBOption7 : this.cluesGive.getValues().items['clue7'].timeBegin}),
                    node.set({TEOption7 : this.cluesGive.getValues().items['clue7'].timeEnd}),

                    node.set({clueOption8 : this.cluesGive.getValues().items['clue8'].value}),
                    node.set({TBOption8 : this.cluesGive.getValues().items['clue8'].timeBegin}),
                    node.set({TEOption8 : this.cluesGive.getValues().items['clue8'].timeEnd}),

                    node.say('CLUES', node.game.partner, this.cluesGive.getValues().items['clue1'].value);//this sends a signal to the other player so their step ends
                    return;
                }

            },
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: false,//disable done button so they cannot proceed without their partner finishing
                frame: 'studyboard.htm',
                cb: function() {//set the board for the guesser

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    var that;//this block forces the end of the step on receiving data
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('CLUES', function(msg) {
                        that.clueReceived = msg.data;
                        node.done();
                    });
                },
                done: function() {
                    node.set({guesserID: this.id});
                    node.set({guesserRandCode: this.randomCode});
                    return;
                }
            }
        }
    });

    stager.extendStep('clueFinal', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                frame: 'clueboard.htm',
                cb: function() {
                    W.setInnerHTML('containerbottom2', "Please type your FINAL clue below and click Done:"),

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    this.clueGive2 = node.widgets.append('CustomInput', W.gid('containerbottom2'), {//apend customInput widget with 1 mandatory input
                       id: 'clueGive',
                       //mainText: 'What is your final clue?',
                       type: 'text',
                       className: 'centered',
                       root: 'cbrd',
                       requiredChoice: true
                   });
                },
                done: function() {//send clue to other player and clue and time info to database
                    node.say('CLUE', node.game.partner, this.clueGive2.getValues().value);

                    node.set({clueFinal : this.clueGive2.getValues().value});
                    node.set({TBFinal : this.clueGive2.getValues().timeBegin});
                    node.set({TEFinal : this.clueGive2.getValues().timeEnd});
                    return;
                }

            },
            GUESSER:{
                init: function() {
                    node.game.clueReceived = null;
                },
                donebutton: false,
                frame: 'studyboard.htm',

                cb: function() {
                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    var that;//force proceed when clue is sent from other player
                    if (this.clueReceived !== null) node.done();
                    that = this;
                    node.on.data('CLUE', function(msg) {
                        that.clueReceived = msg.data;
                        node.done();
                    });
                },
            }
        }
    });

    stager.extendStep('guessOptions', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guessesReceived = null;
                },
                donebutton: false,
                frame: 'studyboardCG.htm',
                cb: function() {

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    var that;//force proceed when guess is sent from other player
                    if (this.guessesReceived !== null) node.done();
                    that = this;
                    node.on.data('GUESSES', function(msg) { node.done();
                        that.guessesReceived = true;
                        node.done();
                    });


                }
            },
            GUESSER:{
                frame: 'guessesboard.htm',
                cb: function() {

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    W.setInnerHTML('clue', this.clueReceived);//show clue given by other player
                    var el = W.getElementById("gbrd");
                    this.clicker = function (e){//add event listener to record button presses of game board
                        var target = e.target;
                        var myDiv = W.getElementById("glist");
                        myDiv.innerHTML = myDiv.innerHTML+ target.innerHTML+", ";
                        node.game.memory.add({
                            player: node.player.id,
                            stage: node.game.getCurrentGameStage(),
                            GuessOptions: target.innerHTML,
                            GUESS_OPTIONS_TIME: node.timer.getTimeSince('step'),
                            customTimeStamp: node.timer.getTimeSince('start')
                        });
                    },
                    el.addEventListener('click', this.clicker);//add event listener
                },
                done: function() {//send signal for other player to end step, removes event listener so that these values cannot change
                    var el = W.getElementById("gbrd");
                    el.removeEventListener('click', this.clicker);
                    node.say('GUESSES', node.game.partner);
                    var memArray = node.game.memory.select('GuessOptions').and('customTimeStamp','!in', this.optionTimeArray).fetch();
                    var i;

                    for (i=0; i<memArray.length; i++) {//make into for loop with a bunch of if statements

                        if(i == 0){
                            node.set({GuessOption1 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION1_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }

                        if(i == 1){
                            node.set({GuessOption2 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION2_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 2){
                            node.set({GuessOption3 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION3_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 3){
                            node.set({GuessOption4 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION4_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 4){
                            node.set({GuessOption5 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION5_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 5){
                            node.set({GuessOption6 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION6_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 6){
                            node.set({GuessOption7 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION7_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }
                        if(i == 7){
                            node.set({GuessOption8 : memArray[i].GuessOptions});
                            node.set({GUESS_OPTION8_TIME: memArray[i].GUESS_OPTIONS_TIME});
                        }

                        this.optionTimeArray.push(memArray[i].customTimeStamp);

                    };
                }
            }
        }
    });

    stager.extendStep('guessFinal', {
        role: function() { return this.role; },
        partner: function() { return this.partner; },
        roles: {
            CLUEGIVER:{
                init: function() {
                    node.game.guess1Received = null;
                    node.game.guess2Received = null;
                },
                donebutton: false,
                frame: 'studyboardCG.htm',
                cb: function() {

                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);


                    var that;//receives two messages, one for each guessed word. ends after receiving the second one
                    if (this.guess2Received !== null) node.done();
                    that = this;
                    node.on.data('GUESS1', function(msg) {
                        that.guess1Received = msg.data;
                    });
                    node.on.data('GUESS2', function(msg) {
                        that.guess2Received = msg.data;
                        node.done();
                    });
                }
            },
            GUESSER:{
                frame: 'guessesboard.htm',
                donebutton: false,
                cb: function() {
                    W.setInnerHTML('clue2', "Please select your FINAL guesses." ),
                    W.setInnerHTML('b0', this.boardboard[this.roundCounter][0]),
                    W.setInnerHTML('b1', this.boardboard[this.roundCounter][1]);
                    W.setInnerHTML('b2', this.boardboard[this.roundCounter][2]);
                    W.setInnerHTML('b3', this.boardboard[this.roundCounter][3]);
                    W.setInnerHTML('b4', this.boardboard[this.roundCounter][4]);
                    W.setInnerHTML('b5', this.boardboard[this.roundCounter][5]);
                    W.setInnerHTML('b6', this.boardboard[this.roundCounter][6]);
                    W.setInnerHTML('b7', this.boardboard[this.roundCounter][7]);
                    W.setInnerHTML('b8', this.boardboard[this.roundCounter][8]);
                    W.setInnerHTML('b9', this.boardboard[this.roundCounter][9]);
                    W.setInnerHTML('b10', this.boardboard[this.roundCounter][10]);
                    W.setInnerHTML('b11', this.boardboard[this.roundCounter][11]);
                    W.setInnerHTML('b12', this.boardboard[this.roundCounter][12]);
                    W.setInnerHTML('b13', this.boardboard[this.roundCounter][13]);
                    W.setInnerHTML('b14', this.boardboard[this.roundCounter][14]);
                    W.setInnerHTML('b15', this.boardboard[this.roundCounter][15]);
                    W.setInnerHTML('b16', this.boardboard[this.roundCounter][16]);
                    W.setInnerHTML('b17', this.boardboard[this.roundCounter][17]);
                    W.setInnerHTML('b18', this.boardboard[this.roundCounter][18]);
                    W.setInnerHTML('b19', this.boardboard[this.roundCounter][19]);

                    this.answerCounter = 0;

                    var el = W.getElementById("gbrd");


                    this.clicker2 = function (e){//event listener that receives two words and then ends the step
                        var target = e.target;
                        var myDiv = W.getElementById("alist");

                        if(myDiv.innerHTML == " Your final answers:  "){//the condition if no word has been added, stores the first word and sends it to the partner
                            myDiv.innerHTML = myDiv.innerHTML+ target.innerHTML;
                            node.say('GUESS1', node.game.partner, target.innerHTML);
                            node.set({GUESS_1_FINAL : target.innerHTML});
                            node.set({GUESS_1_FINAL_TIME : node.timer.getTimeSince('step')})
                            node.game.memory.add({//adds the responded values to memory so we can access it later, cannot store this info in a variable since it is in an event listener
                                player: node.player.id,
                                stage: node.game.getCurrentGameStage(),
                                Guess1: target.innerHTML
                            });
                            node.game.memory.tag("guess1");//tag this memory for easy access later

                        }
                        else if(!myDiv.innerHTML.includes(",")) {//the condition if 1 word has been added, stores the second word, send it to the partner, and ends the step for both players
                            myDiv.innerHTML = myDiv.innerHTML + ", " + target.innerHTML;
                            node.say('GUESS2', node.game.partner, target.innerHTML);
                            node.set({GUESS_2_FINAL : target.innerHTML});
                            node.set({GUESS_2_FINAL_TIME : node.timer.getTimeSince('step')})
                            node.game.memory.add({
                                player: node.player.id,
                                stage: node.game.getCurrentGameStage(),
                                Guess2: target.innerHTML
                            });
                            node.game.memory.tag("guess2");
                            el.removeEventListener('click', this.clicker2);
                            node.done();

                        };

                    }
                    el.addEventListener('click', this.clicker2);
                },
                done: function() {
                    node.say('GUESS', node.game.partner);
                }
            }
        }

    });

    stager.extendStep('feedback', {//tells each player whether the guesser was successful
        role: function() { return this.role; },
        partner: function() { return this.partner; },

        roles: {
            CLUEGIVER:{
                frame: 'feedbackCG.htm',
                cb: function() {
                    var myDiv = W.getElementById("cganswers");
                    var myDiv2 = W.getElementById("cgcorrect");
                    var myDiv3 = W.getElementById("cgnextstep");
                    if(this.pairList[this.roundCounter].includes(this.guess1Received)&&this.pairList[this.roundCounter].includes(this.guess2Received)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else{//if they are wrong and it isn't the third trial players get another chance
                        myDiv.innerHTML = "The Guesser responded with " + this.guess1Received + " and " + this.guess2Received + " which is INCORRECT!";
                        myDiv2.innerHTML = "You will now choose a different clue for the same word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.smallRoundCounter += 1;
                    }
                }
            },
            GUESSER:{
                frame: 'feedbackGuesser.htm',
                cb: function() {
                    var guess1TXT = node.game.memory.resolveTag("guess1").Guess1;//use tags to get our response from memory and validate
                    var guess2TXT = node.game.memory.resolveTag("guess2").Guess2;

                    var myDiv = W.getElementById("ganswers");
                    var myDiv2 = W.getElementById("gcorrect");
                    var myDiv3 = W.getElementById("gnextstep");
                    if(this.pairList[this.roundCounter].includes(guess1TXT)&&this.pairList[this.roundCounter].includes(guess2TXT)){//if they were correct it ends the stage and moves on to the next word pair
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is CORRECT!";
                        myDiv2.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.roundCounter += 1;
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else if(this.smallRoundCounter == 2){//if this is the third trial the players did not get the word and we move to the next word pair
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
                        myDiv2.innerHTML = "You have exhausted your three attempts. The correct words were " + this.pairList[this.roundCounter][0] + " and " + this.pairList[this.roundCounter][1] + ".";
                        myDiv3.innerHTML = "You will now move on to the next word pair. Please click Done.";
                        this.roundCounter += 1;
                        this.smallRoundCounter = 0;
                        if(this.roundCounter == this.pairnumber){//if the next value is equal to number of pairs then we are out of pairs and the experiment is over
                            node.say('END_GAME', 'SERVER', true);
                        }
                    }
                    else{//if they are wrong and it isn't the third trial players get another chance
                        myDiv.innerHTML = "You responded with " + guess1TXT + " and " + guess2TXT + " which is INCORRECT!";
                        myDiv2.innerHTML = "The Speaker will now choose a different clue for the same word pair. Please click Done.";
                        myDiv3.innerHTML = "";
                        this.smallRoundCounter += 1;
                    }
                }
            }
        }
    });

    stager.extendStep('demographics', {
        frame: 'demos.htm',
        cb: function() {
            this.demosnode = node.widgets.append('CustomInputGroup', W.gid('demoscontainer'), {//create customInputGroup widget for clue options, only the first is mandatory
               id: 'demosroot2',
               orientation: 'V',
               //mainText: 'Please list possible clues.',
               sharedOptions: {
               },
               items: [
                   {
                       id: 'age',
                       type: 'int',
                       mainText: 'What is your age',
                       requiredChoice: true
                   },
                   {
                       id: 'gender',
                       type: 'text',
                       mainText: 'What is your gender',
                       requiredChoice: true
                   },
                   {
                       id: 'education',
                       type: 'text',
                       mainText: 'How many years of formal education have you had (consider graduating high school to be 12 years)?',
                       requiredChoice: true

                   },
                   {
                       id: 'domHand',
                       type: 'text',
                       mainText: 'What is your dominant hand? (Left/Right/Ambidextrous)'
                   },
                   {
                       id: 'alert',
                       type: 'text',
                       mainText: 'Please indicate what time of the day you feel most alert (Morning/Afternoon/Evening/No differences)'
                   },
                   {
                       id: 'racial',
                       type: 'text',
                       mainText: 'Please indicate which racial categories apply to you, separated by commas (American Indian/Alaskan Native, Asian, Native Hawaiian or Other Pacific Islander, Black/African American, White/Caucasian, More than one race, Prefer Not to Respond)'
                   },
                   {
                       id: 'hispanic',
                       type: 'text',
                       mainText: 'Are you Hispanic or Latino? (Yes/No/Prefer Not to Respond)'

                   },
                   {
                       id: 'english',
                       type: 'text',
                       mainText: 'Is English your First Language? (Yes/No)'
                   },
                   {
                       id: 'language',
                       type: 'text',
                       mainText: 'If you answered "No", what is your first language? (Please say English if you answered Yes)'
                   },
                   {
                       id: 'english5',
                       type: 'text',
                       mainText: 'Did you learn English before the age of 5?'
                   },
                   {
                       id: 'englishAge',
                       type: 'text',
                       mainText: 'If you answered "No", at what age did you learn English? (Enter 0 if you answered "Yes")'
                   },
                   {
                       id: 'msc',
                       type: 'text',
                       mainText: 'Is there anything we should know about, which might have affected your performance during the test session? (e.g., lack of sleep, feeling ill etc.)'
                   }
               ]

           });
        },
        done: function() {//this sens all data to the logic client and stores the values
            node.set({ID: this.id}),
            node.set({RandCode: this.randomCode}),
            node.set({age : this.demosnode.getValues().items['age'].value}),
            node.set({gender : this.demosnode.getValues().items['gender'].value}),
            node.set({education : this.demosnode.getValues().items['education'].value}),
            node.set({domHand : this.demosnode.getValues().items['domHand'].value}),
            node.set({alert : this.demosnode.getValues().items['alert'].value}),
            node.set({racial : this.demosnode.getValues().items['racial'].value}),
            node.set({hispanic : this.demosnode.getValues().items['hispanic'].value}),
            node.set({english : this.demosnode.getValues().items['english'].value}),
            node.set({language : this.demosnode.getValues().items['language'].value}),
            node.set({english5 : this.demosnode.getValues().items['english5'].value}),
            node.set({englishAge : this.demosnode.getValues().items['englishAge'].value}),
            node.set({msc : this.demosnode.getValues().items['msc'].value});
            return;
        }
    });

    stager.extendStep('end', {
        donebutton: false,
        frame: 'end.htm',
        cb: function() {
            node.game.visualTimer.setToZero();
            var myDiv = W.getElementById("compcode");
            myDiv.innerHTML = "Your completion code is: " + this.randomCode;
        }
    });
};
