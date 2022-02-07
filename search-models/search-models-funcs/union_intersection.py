def union_intersection(w1,w2, n_steps, n_walks, vocabulary):
  '''
  computes the union & intersection of n_walks random walks of n_steps from w1 and w2

  inputs:
  (1) w1 & w2: two words for which the walks will be generated
  (2) n_steps: number of steps each random walk will take
  (3) n_walks: number of walks for each word
  (4) vocabulary: the vocab from which w1 & w2 are selected

  outputs:
  (1) union_df: contains the words visited by EITHER words in descending order of times visited
  (2) intersection_df: contains the words visited by BOTH words in descending order of times visited

  '''
  # starts n_walks independent random walks for n_steps, and computes union and intersection 
  rw_w1 = np.sum(np.array([random_walk(w1, n_steps, vocab, Graph)[1] for i in range(n_walks)]), axis = 0)
  rw_w2 = np.sum(np.array([random_walk(w2, n_steps, vocab, Graph)[1] for i in range(n_walks)]), axis = 0)

  v = vocabulary.copy()

  v["w1_visited_count"] = rw_w1.tolist()
  v["w2_visited_count"] = rw_w2.tolist()

  v["w1*w2"] = v["w1_visited_count"]*v["w2_visited_count"]

  ## compute non-zero, i.e., all visited nodes 

  nonzero_w1 = list(v.loc[v['w1_visited_count'] != 0].vocab_word)
  nonzero_w2 = list(v.loc[v['w2_visited_count'] != 0].vocab_word)

  ## compute union and intersection

  union = set(nonzero_w1).union(set(nonzero_w2))
  intersection = set(nonzero_w1).intersection(set(nonzero_w2))

  ## we also need the counts of these visited nodes, sorted by nodes visited highly by both words

  union_df = v.loc[v['vocab_word'].isin(list(union))].sort_values(by='w1*w2', ascending=False)
  intersection_df = v.loc[v['vocab_word'].isin(list(intersection))].sort_values(by='w1*w2', ascending=False)

  return union_df, intersection_df