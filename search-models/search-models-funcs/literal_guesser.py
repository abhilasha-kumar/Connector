def literal_guesser(board_name, representation, candidates, vocab, boards):
  '''
  inputs are:
  (1) board name ("e1_board1_words"), 
  (2) representation ("glove"), and 
  (3) candidates (a list ['apple', 'mango'] etc.)

  output:
  softmax likelihood of different wordpairs under a given set of candidates

  '''

  board_combos = {board_name : compute_board_combos(board_name,boards) for board_name in boards.keys()}

  board_matrices = {
    key : {board_name : create_board_matrix(board_combos[board_name], boards[board_name], embedding, vocab) 
          for board_name in boards.keys()}
    for (key, embedding) in representations.items()
  }
  boardmatrix = board_matrices[representation][board_name]
  ## here we restrict the softmax to only certain candidates
  candidate_index = [list(vocab["vocab_word"]).index(w) for w in candidates]
  restricted_boardmatrix = boardmatrix[:,candidate_index]
  return softmax(restricted_boardmatrix, axis=0)