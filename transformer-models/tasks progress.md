# Current Tasks

## Nov 23 2021

* Create a function to compute cosine similarity between any two word vectors: cosine(word1, word2)
* Create a function to find the word closest to another word in the vocab using cosines: closest(word, vocab)
* Create a function to compute the average vector of any two vectors: average(word1, word2)
* Create a function to find the word in the vocab closest to an average vector for each wordpair closest_word(word1,word2):

  * word1: lion
  * word2: tiger
  * cosine(word1, word2): returns a high values, e.g., .75
  * average(word1,word2): returns an n-dimensional tensor/array which is (word1+word2)/2
  * closest_word(word1,word2): compute the average, then compute cosine(average, vocab_word) and find max, and returns the word that has this max cosine

* Test each function on (1) GloVe embeddings and (2) BERT embeddings
* Use wikiextractor to define a function that taken n, word as arguments and extracts n sentences containing that word: extract_sentences(word, n)
* speeding-up the tensor code




