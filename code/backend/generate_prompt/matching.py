import spacy
nlp = spacy.load("de_core_news_sm")

faq_file = './templates/FAQ.txt'
discussion_file = './templates/discussion.txt'

faq_file = open(faq_file, "r")
faq_items = faq_file.read().split('\n\n')
faq_items = list(map(nlp, faq_items))

discussion_file = open(discussion_file, 'r')
discussion_items = discussion_file.read().split('\n\n')
discussion_items = list(map(nlp, discussion_items))

qa_items = faq_items + discussion_items

def sort_match(input):
    input = nlp(input)
    similarity_scores = [input.similarity(qa_item) for qa_item in qa_items]
    sorted_faq_items = [x for _, x in sorted(zip(similarity_scores, qa_items), reverse=True)]
    return sorted_faq_items
