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