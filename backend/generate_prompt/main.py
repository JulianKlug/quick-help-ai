import argparse
from count_tokens import count_tokens
from matching import sort_match

intent_file = './templates/intent_specification.txt'
intent = open(intent_file, "r").read()

good_behaviour_file = './templates/good_behaviour_examples.txt'
good_behaviour = open(good_behaviour_file, 'r').read()

max_tokens = 2000

def generate_prompt(input):
    question = 'Q: ' + input
    separator = '\n\n'
    ending = '\n'

    constant_tokens = intent + good_behaviour + question + ending
    separator_token_count = count_tokens(separator)
    n_constant_tokens = count_tokens(constant_tokens) + 2 * separator_token_count

    sorted_prompts = sort_match(input)
    selected_prompts = []
    total_token_count = n_constant_tokens
    for prompt in sorted_prompts:
        prompt_token_count = count_tokens(str(prompt) + separator)
        if total_token_count + prompt_token_count > max_tokens:
            break
        selected_prompts.append(str(prompt))
        total_token_count += prompt_token_count

    template_prompts = separator.join(selected_prompts)

    templated_prompt = intent + ending \
                         + template_prompts + separator \
                         + good_behaviour + separator \
                         + question

    print(templated_prompt)
    return templated_prompt

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Find Prompt relevant for question.')

    parser.add_argument('-q', '--question',  help='question to find prompt for', required=True)
    args = parser.parse_args()

    generate_prompt(args.question)