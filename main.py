from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import logging

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# LangGraph and analysis logic import
from graph import graph  # imports build_graph()
dream_analysis = graph.build_graph()

# Define input data model
class DreamInput(BaseModel):
    dream: str
    mood: str

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
def analyze_dream(data: DreamInput):
    try:
        logger.info(f"Received request - Dream: '{data.dream}' | Mood: '{data.mood}'")

        # Run LangGraph dream analysis pipeline
        result = dream_analysis.invoke({
            "dream_text": data.dream,
            "mood": data.mood
        })

        # Structure output into 3 tool outputs for frontend
        response = {
            "dream": result["dream_text"],
            "mood": data.mood,
            "symbols": result["symbols"],
            "interpretation": result["interpretation"],
            "dream_profile": result["profile"],
            "lucid_coach": result["lucid_plan"]
        }

        logger.info("✅ Dream analysis completed successfully.")
        return response

    except Exception as e:
        logger.error(f"❌ Error processing dream: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing dream: {str(e)}")
