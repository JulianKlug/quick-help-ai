from transformers import GPT2TokenizerFast
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

def count_tokens(prompt):
    tokens = tokenizer.encode(prompt)
    num_tokens = len(tokens)
    return num_tokens