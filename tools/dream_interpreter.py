# dream_interpreter.py

import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser

from prompts.text_generation_prompt import build_dream_prompt

# Load environment variable
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize the LLM (LLaMA 3 via Groq)
llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model_name="llama3-70b-8192"
)

# Output parser
parser = StrOutputParser()

def generate_dream_interpretation(
    dream_text: str,
    symbols: list[str],
    user_mood: str = "neutral",
    user_stress: str = "medium",
    user_context: str = "general"
) -> dict:
    """
    Generate emotional, psychological, and cultural interpretations for a given dream.
    Returns a dictionary with three fields: emotional, psychological, cultural.
    """

    # Build prompts for each interpretation
    emotional_prompt = build_dream_prompt(
        dream_text, symbols, user_mood=user_mood, mode="emotional"
    )
    psychological_prompt = build_dream_prompt(
        dream_text, symbols, user_stress=user_stress, mode="psychological"
    )
    cultural_prompt = build_dream_prompt(
        dream_text, symbols, user_context=user_context, mode="cultural"
    )

    # Call LLM
    emotional_response = parser.invoke(llm.invoke(emotional_prompt))
    psychological_response = parser.invoke(llm.invoke(psychological_prompt))
    cultural_response = parser.invoke(llm.invoke(cultural_prompt))

    return {
        "emotional": emotional_response.strip(),
        "psychological": psychological_response.strip(),
        "cultural": cultural_response.strip()
    }
