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