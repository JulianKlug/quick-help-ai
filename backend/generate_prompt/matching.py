import spacy
nlp = spacy.load("de_core_news_sm")

faq_file = '../templates/FAQ.txt'

text_file = open(faq_file, "r")
faq_items = text_file.read().split('\n\n')
faq_items = list(map(nlp, faq_items))

def sort_match(input):
    input = nlp(input)
    similarity_scores = [input.similarity(faq_item) for faq_item in faq_items]
    sorted_faq_items = [x for _, x in sorted(zip(similarity_scores, faq_items), reverse=True)]
    return sorted_faq_items
