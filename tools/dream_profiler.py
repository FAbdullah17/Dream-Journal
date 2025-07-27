import os
import json
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from prompts.dream_analysis_prompt import dream_profiler_prompt
from langchain_core.output_parsers import JsonOutputParser
from langchain_groq import ChatGroq
from langchain_core.runnables import RunnableMap, RunnablePassthrough

# Load API key
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize LLM (LLaMA 3 via Groq)
llm = ChatGroq(
    model_name="llama3-70b-8192",
    api_key=GROQ_API_KEY,
    temperature=0.4
)

# JSON parser
parser = JsonOutputParser()

# LangChain pipeline
dream_profile_chain = (
    {"interpretation": RunnablePassthrough(), "symbols": RunnablePassthrough()}
    | dream_profiler_prompt
    | llm
    | parser
)

def profile_dream(interpretation: str, symbols: list[str]) -> dict:
    """
    Generates a structured dream profile using the LLaMA 3 model via Groq.
    """
    result = dream_profile_chain.invoke({"interpretation": interpretation, "symbols": symbols})
    return result

def format_dream_profile_output(profile: dict) -> str:
    """
    Converts structured dream profile dictionary to human-readable text format.
    """
    return f"""🧠 Dream Interpretation Profile

• Mood: {profile.get("overall_mood", "N/A").capitalize()}
• Emotions felt: {", ".join(profile.get("emotions", []))}
• Mental State: {profile.get("mental_state", "N/A")}
• Possible Cause: {profile.get("possible_real_life_cause", "N/A")}
• Archetypes: {", ".join(profile.get("archetypes_involved", []))}
• Confidence: {round(profile.get("confidence_score", 0.0) * 100)}%
"""
