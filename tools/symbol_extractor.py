import spacy
from typing import List, Set
import re
import os

# Load English NLP model
nlp = spacy.load("en_core_web_sm")

def normalize_text(text: str) -> str:
    """
    Normalize dream text by removing punctuation but retaining emojis and lowering case.
    """
    # Retain letters, digits, whitespace, and emoji unicode block (U+1F300–U+1FAFF)
    text = re.sub(r"[^\w\s\U0001F300-\U0001FAFF]", "", text)
    return text.lower()

def load_dream_symbols(file_path: str) -> Set[str]:
    """
    Load dream symbol lexicon from a text file. Format: 'emoji word' per line.
    """
    symbols = set()
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split(maxsplit=1)
            if len(parts) == 2:
                emoji, name = parts
                symbols.add(name.lower())
                symbols.add(emoji)
    return symbols

def extract_symbols(text: str, symbol_lexicon: Set[str]) -> List[str]:
    """
    Extract dream-relevant symbols from text using spaCy NLP and dream lexicon file.
    """
    text = normalize_text(text)
    doc = nlp(text)
    extracted: Set[str] = set()

    # Token-level symbol candidates
    for token in doc:
        if token.pos_ in {"NOUN", "PROPN"} and not token.is_stop:
            lemma = token.lemma_.lower()
            extracted.add(lemma)
        if token.text in symbol_lexicon:
            extracted.add(token.text)

    # Phrase-level symbol candidates
    for chunk in doc.noun_chunks:
        chunk_text = chunk.text.strip().lower()
        if not chunk.root.is_stop:
            extracted.add(chunk_text)

    # Match against known symbol lexicon
    matched = [
        symbol for symbol in extracted
        if any(word in symbol_lexicon for word in symbol.split())
    ]
    return sorted(set(matched))  # Remove duplicates

# Example usage
if __name__ == "__main__":
    dream_text = "I was flying through a storm with a snake🐍 chasing me in the dark forest🌲."
    
    # Correct relative pathing (no need to add absolute path here)
    lexicon_path = os.path.join("data", "dream_symbols.txt")

    # Load the dream symbols
    symbol_lexicon = load_dream_symbols(lexicon_path)

    # Extract dream symbols
    symbols = extract_symbols(dream_text, symbol_lexicon)
    print("Extracted symbols:", symbols)
