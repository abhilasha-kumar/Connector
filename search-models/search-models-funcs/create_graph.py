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