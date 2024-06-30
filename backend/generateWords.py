import nltk
from nltk.corpus import brown
import json

# nltk.download('brown')

def precompute_common_words(min_freq=100):
    word_freq = nltk.FreqDist(brown.words())
    return [word.lower() for word, freq in word_freq.items() if freq >= min_freq and word.isalpha() and len(word) > 2]

common_words = precompute_common_words(min_freq=50)

with open('backend/common_words.json', 'w') as f:
    json.dump(common_words, f)