"""
Script to convert the structured json data created by the scraper into a text_file
"""
import json

with open('../scraper/data/results/results.json') as json_file:
    data = json.load(json_file)

discussion_textfile = open("../backend/templates/discussion.txt", "w")


def filter_relevant_QA(elem):
    # filter out questions that have no answer and those started by moderator
    if ('answer' in elem) and not (elem['startedByEmployee']):
        return elem


for elem in data:
    if filter_relevant_QA(elem):
        question = elem['question'].replace('\n', ' ')
        answer = elem['answer'].replace('\n', ' ')
        question_line = 'Q: {}\n'.format(question)
        discussion_textfile.write(question_line)
        answer_line = 'A: {}'.format(answer)
        discussion_textfile.write(answer_line)
        discussion_textfile.write("\n\n")

discussion_textfile.close()
