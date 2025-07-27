# tools/lucid_coach.py

import os
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from langchain_core.runnables import RunnablePassthrough

from prompts.lucid_prompt import lucid_dream_coach_prompt

# Load API key from .env
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize LLaMA 3 via Groq
llm = ChatGroq(
    model_name="llama3-70b-8192",
    api_key=GROQ_API_KEY,
    temperature=0.5
)

# LangChain runnable pipeline
lucid_chain = (
    {
        "interpretation": RunnablePassthrough(),
        "symbols": RunnablePassthrough(),
        "profile": RunnablePassthrough()
    }
    | lucid_dream_coach_prompt
    | llm
    | StrOutputParser()
)

def suggest_lucid_practices(interpretation: str, symbols: list[str], profile: str = "") -> str:
    """
    Returns a formatted lucid dreaming coaching guide based on dream interpretation,
    key symbols, and psychological profile.
    """
    return lucid_chain.invoke({
        "interpretation": interpretation,
        "symbols": symbols,
        "profile": profile
    })

