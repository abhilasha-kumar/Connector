class predication_funcs:

  def predication_vector(sim_matrix, w1, w2, m, k):
    """
    # computes a predication vector based on kintsch's predication algorithm
    # in this algorithm, first m neighbors of w1 are computed
    # a network is created using m, w1, and w2 with inhibitory links between the m nodes and all cosines b/w m and w1 and w2
    # this network is then "integrated" until steady state, and then
    # a centroid is calculated using w1, w2, and k strongest neighbors of w2
    ## details of spreading activation:
    # More specific, an activation vector representing the initial activation
    # values of all nodes in the net is postmultiplied repeatedly with
    # the connectivity matrix. After each multiplication the activation
    # values are renormalized: Negative values are set to zero,
    # and each of the positive activation values is divided by the sum
    # of all activation values, so that the total activation on each cycles
    # remains at a value of one (e.g., Rumelhart & McClelland,
    # 1986). Usually, the system finds a stable state fairly rapidly;
    """
    neighbors_of_w1 = sim_matrix[list(vocab.vocab_word).index(w1)]
    topn_indices = np.argpartition(neighbors_of_w1, -m)[-m:].tolist()
    nodes_indices = list(set(topn_indices + [list(vocab.vocab_word).index(w1),list(vocab.vocab_word).index(w2) ]))
    nodes = [list(vocab.vocab_word)[i] for i in nodes_indices]
    vecs = representations['glove'][nodes_indices]
    # construct nodes similarity matrix 
    s = create_similarity_matrix(vecs)
    w1_index = nodes.index(w1)
    w2_index = nodes.index(w2)
    valid_indices = np.arange(0,s.shape[1]).tolist()
    valid_indices.pop(w1_index)
    valid_indices.pop(w2_index)
    s[:, valid_indices] = 0
    # also set connections to self = 0
    s[w1_index, w1_index] = 0
    s[w2_index, w2_index] = 0
    n_zero = s.size - np.count_nonzero(s)
    sum_positive_activations = np.sum(s)
    # set all 0 values to sum/n_zero
    s[s == 0] = -sum_positive_activations/n_zero

    ## now we perform the spreading activation integration: restricted to 5 steps
    s_integrated = kintsch_integration(s, 5)
    ## now we extract k neighbors of w2

    neighbors_of_w2 = s_integrated[w2_index]
    topn_indices = np.argpartition(neighbors_of_w2, -k)[-k:].tolist()
    w2_words = [nodes[i] for i in topn_indices]
    indices_in_vocab = [list(vocab.vocab_word).index(i) for i in w2_words]
    nodes_indices = list(set(indices_in_vocab + [list(vocab.vocab_word).index(w1),list(vocab.vocab_word).index(w2) ]))
    finalnodes = [list(vocab.vocab_word)[i] for i in nodes_indices]
    vecs = representations['glove'][nodes_indices]
    ## next we compute centroid of w1, w2, and w2_words
    centroid = np.mean(vecs, axis = 0).reshape((1,vecs.shape[1]))
    close = find_closest(centroid, vocab, representations['glove'])
    return  close
    
  def kintsch_integration(m, n_times):
    for i in range(1,n_times):
      m = m**(i+1)
      m[m <0] = 0
      sum_positive_activations = np.sum(m)
      m = m/sum_positive_activations
    return m

  def find_closest(vector, vocab, embeddings, k = 10):
    """finds the words closest to given vector in a given vocab for given embeddings"""
    cosine = 1-scipy.spatial.distance.cdist(embeddings, vector, 'cosine')
    cosine = cosine.flatten()
    centroid_indices = np.argpartition(cosine, -k)[-k:].tolist()
    centroid_words = [list(vocab.vocab_word)[i] for i in centroid_indices]
    return centroid_words