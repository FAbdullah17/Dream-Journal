from langchain.prompts import PromptTemplate

# Emotional interpretation prompt
emotional_prompt = PromptTemplate.from_template(
    """
You are an expert dream interpreter focused on emotional meaning.

Dream: "{dream_text}"

Symbols in the dream: {symbols}
User's mood: {user_mood}

Interpret the dream from an emotional perspective. What emotions is the user possibly processing? What unresolved feelings might this dream reflect?

Write 1 short paragraph with deep emotional insight.
"""
)

# Psychological interpretation prompt
psychological_prompt = PromptTemplate.from_template(
    """
You are a Jungian dream analyst. Your task is to interpret the following dream psychologically.

Dream: "{dream_text}"

Symbols present: {symbols}
Current stress level: {user_stress}

Analyze the unconscious thoughts, fears, and desires this dream may reflect from a psychological perspective. Refer to archetypes if helpful.

Write 1 paragraph of psychological interpretation.
"""
)

# Cultural interpretation prompt
cultural_prompt = PromptTemplate.from_template(
    """
You're a cultural and spiritual dream guide.

Dream: "{dream_text}"

Symbols seen: {symbols}
User's background or belief context: {user_context}

Provide an interpretation of this dream based on cultural symbolism, myths, or spiritual archetypes associated with the symbols. Keep it respectful and insightful.

Respond with 1 paragraph rooted in cultural/spiritual meaning.
"""
)

# Function to generate interpretation prompts
def build_dream_prompt(
    dream_text: str,
    symbols: list[str],
    user_mood: str = "neutral",
    user_stress: str = "medium",
    user_context: str = "general",
    mode: str = "emotional"
) -> str:
    """
    Build a dream interpretation prompt for the selected mode.
    Modes: 'emotional', 'psychological', or 'cultural'
    """
    symbol_str = ", ".join(symbols)

    if mode == "emotional":
        return emotional_prompt.format(
            dream_text=dream_text,
            symbols=symbol_str,
            user_mood=user_mood
        )
    elif mode == "psychological":
        return psychological_prompt.format(
            dream_text=dream_text,
            symbols=symbol_str,
            user_stress=user_stress
        )
    elif mode == "cultural":
        return cultural_prompt.format(
            dream_text=dream_text,
            symbols=symbol_str,
            user_context=user_context
        )
    else:
        raise ValueError("Invalid mode selected: choose 'emotional', 'psychological', or 'cultural'")
