def get_wordpair_list(board_combos, board_name) :
  '''
  inputs:
  (1) board_combos from compute_board_combos
  (2) board__name ("e1_board1_words")
  output:
  a list of all wordpairs for a given board

  '''
  return list(board_combos[board_name]['wordpair'])