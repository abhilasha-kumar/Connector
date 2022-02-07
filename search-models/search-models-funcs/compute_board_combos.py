def compute_board_combos(board_name, boards):
  '''
  inputs:
  (1) board_name ("e1_board1_words")
  output:
  all pairwise combinations of the words on the board

  '''
  board = boards[board_name]
  all_possible_combs = list(itertools.combinations(board, 2))
  combs_df = pd.DataFrame(all_possible_combs, columns =['Word1', 'Word2'])
  combs_df["wordpair"] = combs_df["Word1"] + '-'+ combs_df["Word2"]
  return combs_df