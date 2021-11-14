/**
 * # Game stages definition file
 * Copyright(c) 2020 Jasper Wilson <jaspermwilson@gmail.com>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(stager, settings) {
    stager.stage('consent');
    stager.stage('idGet');
    stager.stage('instructions');
    stager.loopStage('gameplayprac', function() {
   // Returns true for executing one more iteration of the loop.
   return !this.LOOP_ENDED_PRAC;
});
    //stager.repeatStage('gameplay',3);
    // stager.step('clueOptionsprac');
    stager.step('clueFinalprac');
    // stager.step('guessOptionsprac');
    stager.step('guessFinalprac');
    stager.step('feedbackprac');
    stager.stage('endprac');
    stager.loopStage('gameplay', function() {
   // Returns true for executing one more iteration of the loop.
   return !this.LOOP_ENDED;
});
    //stager.repeatStage('gameplay',3);
    // stager.step('clueOptions');
    stager.step('clueFinal');
    // stager.step('guessOptions');
    stager.step('guessFinal');
    stager.step('feedback');
    stager.stage('demographics');
    stager.stage('end');
    stager.gameover();

    // Modify the stager to skip one stage.
    // stager.skip('instructions');

    // To skip a step within a stage use:
    // stager.skip('stageName', 'stepName');
    // Notice: here all stages have just one step.
};
