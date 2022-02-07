def pragmatic_speaker(board_name, beta, costweight, representation, candidates, vocab, boards):
  '''
  inputs:
  (1) board name ("e1_board1_words")
  (2) beta: optimized parameter 
  (3) costweight: optimized weight to freequency 
  (4) representation ('glove')
  (5) candidates (a list of words/clues to iterate over)
  (6) vocab

  outputs:
  softmax likelihood of each possible clue in "candidates"

  '''
  candidate_index = [list(vocab["vocab_word"]).index(w) for w in candidates]
  literal_guesser_prob = np.log(literal_guesser(board_name, representation, candidates, vocab, boards))
  clues_cost = -np.array([list(vocab["LgSUBTLWF"])[i] for i in candidate_index])
  utility = (1-costweight) * literal_guesser_prob - costweight * clues_cost
  return softmax(beta * utility, axis = 1)