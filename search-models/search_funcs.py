import networkx as nx
import random
import matplotlib.pyplot as plt
import operator
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import heapq
import pandas as pd
import scipy.spatial.distance
import numpy as np
from numpy.random import randint
from sklearn.preprocessing import MinMaxScaler, normalize
from numpy.linalg import matrix_power
from scipy import stats
from sklearn import preprocessing
from numpy.random import choice
import json
import heapq
import json
import itertools
import sys
import scipy.spatial.distance
from scipy.special import softmax

class search:
  def create_similarity_matrix(matrix):
    '''
    inputs:
    (1) matrix: a numpy array with vectors for which the NxN similarity matrix needs to be created
    output:
    a NxN similarity matrix
    
    '''
    import scipy.spatial.distance
    N = matrix.shape[0]
    matrix = 1-scipy.spatial.distance.cdist(matrix, matrix, 'cosine').reshape(-1)
    matrix = matrix.reshape((N,N))
    return matrix

  def random_walk(word, n_steps, vocab, Graph):
    '''
    A random walk implementation.
    inputs:
    (1) the starting word ('apple')
    (2) n_steps: number of steps to run the random walk for
    (3) vocab: the vocabulary from which "word" is selected
    (4) Graph: the networkX graph on which the walk will be run

    outputs:
    (1) all words visited during the walk
    (2) number of times the word was visited
    '''
    # run this RW until all nodes have been visited at least once
    nodes_visited = []
    random_node = list(vocab.vocab_word).index(word) 
    nodes_visited.append(random_node)
    dict_counter = {} #initialise the value for all nodes as 0 (i.e., each node has been visited 0 times)
    for i in range(Graph.number_of_nodes()):
        dict_counter[i] = 0
    # update dict_count for the chosen random node by 1 (since walk starts here)
    dict_counter[random_node] = dict_counter[random_node]+1

    #Traversing through the neighbors of start node
    #increment by traversing through all neighbors nodes ()
    for i in range(n_steps):
        list_for_nodes = list(Graph.neighbors(random_node))
        neighbors = {}
        for n in list_for_nodes:
          neighbors[n] = Graph.edges[(random_node,n)]['weight']
        if len(list_for_nodes)==0:
          # if random_node having no outgoing edges
          # choose a different random node and update its visit count
          random_node = random.choice([i for i in range(Graph.number_of_nodes())])
          dict_counter[random_node] = dict_counter[random_node]+1
          nodes_visited.append(random_node)
        else:
          #choose a node randomly from neighbors of current random_node
          random_node = random.choices(population = list_for_nodes, k = 1,
                  weights=list(neighbors.values()))[0]
          dict_counter[random_node] = dict_counter[random_node]+1
          nodes_visited.append(random_node)
            
    ## return the words visited and the counts of each time a node was visited (in the order of vocab) as a numpy array

    words_visited = [list(vocab.vocab_word)[index] for index in nodes_visited]

    return words_visited, np.fromiter(dict_counter.values(), dtype=float)
  
  def create_graph(similarity_matrix, threshold):
    '''
    inputs:
    (1) a NxN similarity matrix for which a graph will be created
    (2) threshold below which to exclude similarity values

    output:
    A networkX weighted graph with N nodes 
    '''
    ## make diagonal 0 and all values below a certain threshold also 0: can parameterize this eventually
    x = np.copy(similarity_matrix)
    np.fill_diagonal(x, 0)
    x[x < threshold] = 0
    G = nx.from_numpy_matrix(np.matrix(x), create_using=nx.DiGraph)
    return G
  
  def union_intersection(w1, w2, n_steps, n_walks, vocabulary, Graph):
    '''
    computes the union & intersection of n_walks random walks of n_steps from w1 and w2

    inputs:
    (1) rw_w1 & rw_w2: outputs of two random walks starting from w1 and w2
    
    (4) vocabulary: the vocab from which w1 & w2 are selected

    outputs:
    (1) union_df: contains the words visited by EITHER words in descending order of times visited
    (2) intersection_df: contains the words visited by BOTH words in descending order of times visited

    '''

    # starts n_walks independent random walks for n_steps, and computes union and intersection 
    rw_w1 = np.sum(np.array([search.random_walk(w1, n_steps, vocabulary, Graph)[1] for i in range(n_walks)]), axis = 0)
    rw_w2 = np.sum(np.array([search.random_walk(w2, n_steps, vocabulary, Graph)[1] for i in range(n_walks)]), axis = 0)


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

class RSA:

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

  def get_wordpair_list(board_combos, board_name) :
    '''
    inputs:
    (1) board_combos from compute_board_combos
    (2) board__name ("e1_board1_words")
    output:
    a list of all wordpairs for a given board

    '''
    return list(board_combos[board_name]['wordpair'])

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

  def literal_guesser(board_name, representation, candidates, vocab, boards):
    '''
    inputs are:
    (1) board name ("e1_board1_words"), 
    (2) representation ("glove"), and 
    (3) candidates (a list ['apple', 'mango'] etc.)

    output:
    softmax likelihood of different wordpairs under a given set of candidates

    '''

    board_combos = {board_name : RSA.compute_board_combos(board_name,boards) for board_name in boards.keys()}

    board_matrices = {
      key : {board_name : RSA.create_board_matrix(board_combos[board_name], boards[board_name], embedding, vocab) 
            for board_name in boards.keys()}
      for (key, embedding) in representations.items()
    }
    boardmatrix = board_matrices[representation][board_name]
    ## here we restrict the softmax to only certain candidates
    candidate_index = [list(vocab["vocab_word"]).index(w) for w in candidates]
    restricted_boardmatrix = boardmatrix[:,candidate_index]
    return softmax(restricted_boardmatrix, axis=0)

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
    literal_guesser_prob = np.log(RSA.literal_guesser(board_name, representation, candidates, vocab, boards))
    clues_cost = -np.array([list(vocab["LgSUBTLWF"])[i] for i in candidate_index])
    utility = (1-costweight) * literal_guesser_prob - costweight * clues_cost
    return softmax(beta * utility, axis = 1)
  
