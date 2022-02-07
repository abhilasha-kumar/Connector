def create_board_matrix(combs_df, context_board, embeddings, vocab):
  '''
  inputs:
  (1) combs_df: all combination pairs from a given board
  (2) context_board: the specific board ("e1_board1_words")
  (3) the embeddings (representations['glove'])
  (4) the vocab over which computations are occurring

  output:
  product similarities of given vocab to each wordpair
  '''
  # grab subset of words in given board and their corresponding glove vectors
  board_df = vocab[vocab['vocab_word'].isin(context_board)]
  board_word_indices = list(board_df.index)
  board_words = board_df["vocab_word"]
  board_vectors = embeddings[board_word_indices]

  ## clue_sims is the similarity of ALL clues in full searchspace (size N) to EACH word on board (size 20)
  clue_sims = 1 - scipy.spatial.distance.cdist(board_vectors, embeddings, 'cosine')

  ## once we have the similarities of the clue to the words on the board
  ## we define a multiplicative function that maximizes these similarities
  board_df.reset_index(inplace = True)

  ## next we find the product of similarities between c-w1 and c-w2 for that specific board's 190 word-pairs
  ## this gives us a 190 x N array of product similarities for a given combs_df
  ## specifically, for each possible pair, pull out 
  f_w1_list =  np.array([clue_sims[board_df[board_df["vocab_word"]==row["Word1"]].index.values[0]]
                        for  index, row in combs_df.iterrows()])
  f_w2_list =  np.array([clue_sims[board_df[board_df["vocab_word"]==row["Word2"]].index.values[0]] 
                        for  index, row in combs_df.iterrows()])

  # result is of length 190 for the product of similarities (i.e. how similar each word i is to BOTH in pair)
  # note that cosine is in range [-1, 1] so we have to convert to [0,1] for this conjunction to be valid
  return ((f_w1_list + 1) /2) * ((f_w2_list + 1)/2)