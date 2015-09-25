import nltk
#from nltk.corpus import wordnet
from gensim import corpora, models, similarities
import json
import random

numResultsToReturn = 3

nltk.data.path.append('./nltk_data/')
from nltk.corpus import wordnet

def match(query):
    r1 = matchMostStrict(query=query)[0]
    r2 = matchQuerySynonyms(query=query)[0]
    r3 = match2SynsetLayers(query=query)[0]
    r4 = matchLeastStrict(query=query)[0]
    results = [r1, r2, r3, r4]
    winningMoods = []
    winningAvg = 0
    for r in results:
        avg = 0
        for i in xrange(numResultsToReturn):
            avg += r[i][1]
        avg = float(avg)/numResultsToReturn
        if avg > winningAvg:
            winningAvg = avg
            winningMoods = []
            for i in xrange(numResultsToReturn):
                winningMoods.append(r[i][0])
    if winningAvg == 0 and len(winningMoods) == 0:
        for i in xrange(numResultsToReturn):
            winningMoods.append(r1[random.randint(0, len(r1) - 1)][0])
    return winningMoods

def matchMostStrict(query):
    moods = []
    moodsDict = {}
    count = 0
    #print "got here at least"
    f = open("./moods.txt", "r")
    #print "Opened the file"
    for mood in f:
        mood = mood.strip()
        moodsDict[count] = mood
        count += 1
        #print "before wordnet"
        #synsets = wordnet.synsets("happy")
        synsets = wordnet.synsets(mood)
        #print "after wordnet"
        lemmas = [mood]
        for synset in synsets:
            for lemma in synset.lemma_names():
                lemmas.append(lemma)
        lemmas = list(set(lemmas))
        moods.append(lemmas)
        #print "finished loop once"
    f.close()
    #return ["heloooo", "yo"]
    #print "avg: ",float(total)/len(moods)

    #takes the words in texts and assigns each to a unique id
    dictionary = corpora.Dictionary(moods)

    #result is a list of lists where each inner list contains tuples (a, b) a is an id
    corpus = [dictionary.doc2bow(mood) for mood in moods]
    lsi = models.lsimodel.LsiModel(corpus, num_topics=100, id2word=dictionary)

    # transform corpus to LSI space and index it
    index = similarities.MatrixSimilarity(lsi[corpus])

    query_bow = dictionary.doc2bow(query)
    query_lsi = lsi[query_bow]

    results = index[query_lsi]

    #list of tuples (doc num, relevance) sorted from highest to lowest relevance
    results = sorted(enumerate(results), key=lambda item: -item[1])
    #print results
    moodResults = []
    for r in results:
        moodResults.append((moodsDict[r[0]], r[1]))

    nonzero = True
    for i in xrange(numResultsToReturn):
        if moodResults[i][1] == 0:
            nonzero = False

    return (moodResults, nonzero)

def matchQuerySynonyms(query):
    moods = []
    moodsDict = {}
    count = 0
    f = open("./moods.txt", "r")
    for mood in f:
        mood = mood.strip()
        moodsDict[count] = mood
        count += 1

        synsets = wordnet.synsets(mood)
        lemmas = [mood]
        for synset in synsets:
            for lemma in synset.lemma_names():
                lemmas.append(lemma)
        lemmas = list(set(lemmas))
        moods.append(lemmas)
    f.close()
    #print "avg: ",float(total)/len(moods)

    #takes the words in texts and assigns each to a unique id
    dictionary = corpora.Dictionary(moods)

    #result is a list of lists where each inner list contains tuples (a, b) a is an id
    corpus = [dictionary.doc2bow(mood) for mood in moods]
    lsi = models.lsimodel.LsiModel(corpus, num_topics=100, id2word=dictionary)

    # transform corpus to LSI space and index it
    index = similarities.MatrixSimilarity(lsi[corpus])

    querySynonyms = []
    for q in query:
        synsets = wordnet.synsets(q)
        querySynonyms.append(q)
        for synset in synsets:
            for lemma in synset.lemma_names():
                querySynonyms.append(lemma)
        querySynonyms = list(set(querySynonyms))

    query = querySynonyms
    query_bow = dictionary.doc2bow(query)
    query_lsi = lsi[query_bow]

    results = index[query_lsi]

    #list of tuples (doc num, relevance) sorted from highest to lowest relevance
    results = sorted(enumerate(results), key=lambda item: -item[1])
    #print results
    moodResults = []
    for r in results:
        moodResults.append((moodsDict[r[0]], r[1]))

    nonzero = True
    for i in xrange(numResultsToReturn):
        if moodResults[i][1] == 0:
            nonzero = False

    return (moodResults, nonzero)

def match2SynsetLayers(query):
    moods = []
    moodsDict = {}
    count = 0
    f = open("./moods.txt", "r")
    for mood in f:
        mood = mood.strip()
        moodsDict[count] = mood
        count += 1
        synsets = wordnet.synsets(mood)
        lemmas = [mood]
        for synset in synsets:
            for lemma in synset.lemma_names():
                lemmas.append(lemma)
                synset2 = wordnet.synsets(lemma)[0]
                for l2 in synset2.lemma_names():
                  lemmas.append(l2)
        lemmas = list(set(lemmas))
        moods.append(lemmas)
    f.close()
    #print "avg: ",float(total)/len(moods)

    #takes the words in texts and assigns each to a unique id
    dictionary = corpora.Dictionary(moods)

    #result is a list of lists where each inner list contains tuples (a, b) a is an id
    corpus = [dictionary.doc2bow(mood) for mood in moods]
    lsi = models.lsimodel.LsiModel(corpus, num_topics=100, id2word=dictionary)

    # transform corpus to LSI space and index it
    index = similarities.MatrixSimilarity(lsi[corpus])

    query_bow = dictionary.doc2bow(query)
    query_lsi = lsi[query_bow]

    results = index[query_lsi]

    #list of tuples (doc num, relevance) sorted from highest to lowest relevance
    results = sorted(enumerate(results), key=lambda item: -item[1])
    #print results
    moodResults = []
    for r in results:
        moodResults.append((moodsDict[r[0]], r[1]))

    nonzero = True
    for i in xrange(numResultsToReturn):
        if moodResults[i][1] == 0:
            nonzero = False

    return (moodResults, nonzero)

def matchLeastStrict(query):
    moods = []
    moodsDict = {}
    count = 0
    f = open("./moods.txt", "r")
    for mood in f:
        mood = mood.strip()
        moodsDict[count] = mood
        count += 1
        synsets = wordnet.synsets(mood)
        lemmas = [mood]
        for synset in synsets:
            for lemma in synset.lemma_names():
                lemmas.append(lemma)
                synset2 = wordnet.synsets(lemma)[0]
                for l2 in synset2.lemma_names():
                  lemmas.append(l2)
        lemmas = list(set(lemmas))
        moods.append(lemmas)
    f.close()
    #print "avg: ",float(total)/len(moods)

    #takes the words in texts and assigns each to a unique id
    dictionary = corpora.Dictionary(moods)

    #result is a list of lists where each inner list contains tuples (a, b) a is an id
    corpus = [dictionary.doc2bow(mood) for mood in moods]
    lsi = models.lsimodel.LsiModel(corpus, num_topics=100, id2word=dictionary)

    # transform corpus to LSI space and index it
    index = similarities.MatrixSimilarity(lsi[corpus])

    querySynonyms = []
    for q in query:
        synsets = wordnet.synsets(q)
        querySynonyms.append(q)
        for synset in synsets:
            for lemma in synset.lemma_names():
                querySynonyms.append(lemma)
        querySynonyms = list(set(querySynonyms))

    query = querySynonyms
    query_bow = dictionary.doc2bow(query)
    query_lsi = lsi[query_bow]

    results = index[query_lsi]

    #list of tuples (doc num, relevance) sorted from highest to lowest relevance
    results = sorted(enumerate(results), key=lambda item: -item[1])
    #print results
    moodResults = []
    for r in results:
        moodResults.append((moodsDict[r[0]], r[1]))

    nonzero = True
    for i in xrange(numResultsToReturn):
        if moodResults[i][1] == 0:
            nonzero = False

    return (moodResults, nonzero)

query = ["fire", "volcano", "hot", "eruption", "chaos", "night", "smoke", "fireworks"]
#query = ["conflict", "action", "war", "military", "army", "danger", "weapon", "military", "smoke", "dust", "fire"]
#query = ["cold", "white", "snow", "mountain", "bright"]
# query = ["music", "party", "concert", "night", "light", "stage", "celebration", "festival", "fan", "band"]
#query = ["illustration", "cute", "cartoon", "character", "animal", "vector", "fun", "cheerful", "smile", "mascot"]
#query  = ["happy", "calm", "quiet", "mountain", "joyous"]
# print matchMostStrict(query=query)
# print matchQuerySynonyms(query=query)
# print match2SynsetLayers(query=query)
# print matchLeastStrict(query=query)
print "Winner: ", match(query)
