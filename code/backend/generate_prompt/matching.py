import spacy
nlp = spacy.load("de_core_news_lg")

faq_file = './templates/FAQ.txt'
discussion_file = './templates/discussion.txt'
discussion_questions = []
faq_file = open(faq_file, "r")
faq_items = faq_file.read().split('\n\n')
for item in faq_items:
        temp = item.split('A:')
        discussion_questions.append(temp[0])
faq_items = list(map(nlp, faq_items))

discussion_file = open(discussion_file, 'r')
discussion_items = discussion_file.read().split('\n\n')

for item in discussion_items:
        temp = item.split('A:')
        discussion_questions.append(temp[0])
discussion_items = list(map(nlp, discussion_items))
mapped_questions = list(map(nlp, discussion_questions))


qa_items = faq_items + discussion_items

def sort_match(input):
    input = nlp('Q: ' + input)
    similarity_scores = [input.similarity(qa_item) for qa_item in qa_items]
    similarity_scores_questions = [input.similarity(qa_item) for qa_item in mapped_questions]
    final_similarity_scores = []
    for score, question_score in zip(similarity_scores, similarity_scores_questions):
        if question_score >= 0.8:
            final_similarity_scores.append(0.5*(score+question_score))
        else:
            final_similarity_scores.append(score)
    sorted_faq_items = [x for _, x in sorted(zip(final_similarity_scores, qa_items), reverse=True, key=lambda pair: pair[0])]
    return sorted_faq_items
