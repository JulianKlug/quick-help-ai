"""
Script to convert the structured json data created by the scraper into a text_file
"""
import json
import re

# todo remove "schliesse diskussion"
# todo remove questions

with open('../scraper/data/results/results.json') as json_file:
    data = json.load(json_file)

discussion_textfile = open("../backend/templates/discussion.txt", "w")


def filter_relevant_QA(elem):
    # filter out questions that have no answer, those that have a question in the answer and those started by moderator
    if ('answer' in elem) and not (elem['startedByEmployee']) and (len(elem['answer'].split('?')) == 1):
        return elem


def clean_answer(answer):
    if answer.startswith('Hallo'):
        # remove unnecessary "hallo username" from answer
        answer = answer.split('\n')[1:]
        answer = '\n'.join(answer)
    answer = answer.replace('\n', ' ')
    answer = answer.replace('Christoph', 'QAI-bot')
    # remove usernames (they start with @ most of the times)
    answer = re.sub(r'@\d*\b', '', answer)
    # remove all "schliesse diese Diskussion"
    to_remove = ['Ich schliesse diese Diskussion hier.', 'Schliesse diese Diskussion', 'Schliesse daher diese Diskussion hier.', ]
    for item in to_remove:
        answer = answer.replace(item, '')
    return answer


for elem in data:
    if filter_relevant_QA(elem):
        question = elem['question'].replace('\n', ' ')
        answer = clean_answer(elem['answer'])
        question_line = 'Q: {}\n'.format(question)
        discussion_textfile.write(question_line)
        answer_line = 'A: {}'.format(answer)
        discussion_textfile.write(answer_line)
        discussion_textfile.write("\n\n")

discussion_textfile.close()
