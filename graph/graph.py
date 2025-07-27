# graph.py

import os
import csv
from langgraph.graph import StateGraph, END
from typing import TypedDict, List
from tools.symbol_extractor import extract_symbols, load_dream_symbols
from tools.dream_interpreter import generate_dream_interpretation
from tools.dream_profiler import profile_dream, format_dream_profile_output
from tools.lucid_coach import suggest_lucid_practices

# ---- Define Shared Graph State ----
class DreamState(TypedDict):
    dream_text: str
    symbols: List[str]
    interpretation: dict
    profile: dict
    lucid_plan: str

# ---- Node 1: Extract Symbols from Dream ----
def extract_symbols_node(state: DreamState) -> DreamState:
    symbol_lexicon = load_dream_symbols("data/dream_symbols.txt")
    symbols = extract_symbols(state["dream_text"], symbol_lexicon)
    return {**state, "symbols": symbols}

# ---- Node 2: Interpret the Dream ----
def interpret_dream_node(state: DreamState) -> DreamState:
    interp = generate_dream_interpretation(
        dream_text=state["dream_text"],
        symbols=state["symbols"]
    )
    return {**state, "interpretation": interp}

# ---- Node 3: Profile the Dreamer ----
def profile_dream_node(state: DreamState) -> DreamState:
    interp_text = "\n".join(state["interpretation"].values())
    profile = profile_dream(interp_text, state["symbols"])
    return {**state, "profile": profile}

# ---- Node 4: Lucid Dreaming Suggestions ----
def lucid_coach_node(state: DreamState) -> DreamState:
    interp_text = "\n".join(state["interpretation"].values())
    profile_text = format_dream_profile_output(state["profile"])
    advice = suggest_lucid_practices(
        interpretation=interp_text,
        symbols=state["symbols"],
        profile=profile_text
    )
    return {**state, "lucid_plan": advice}

# ---- Final Node: Save Output to CSV ----
def save_output_node(state: DreamState) -> DreamState:
    os.makedirs("output", exist_ok=True)
    with open("output/dream_analysis_output.csv", "w", newline='', encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Dream", "Symbols", "Emotional", "Psychological", "Cultural", "Profile", "Lucid Plan"])
        writer.writerow([
            state["dream_text"],
            ", ".join(state["symbols"]),
            state["interpretation"]["emotional"],
            state["interpretation"]["psychological"],
            state["interpretation"]["cultural"],
            format_dream_profile_output(state["profile"]),
            state["lucid_plan"]
        ])
    return state

# ---- Define and Compile Graph ----
def build_graph():
    graph = StateGraph(DreamState)

    graph.add_node("extract_symbols", extract_symbols_node)
    graph.add_node("interpret_dream", interpret_dream_node)
    graph.add_node("profile_dream", profile_dream_node)
    graph.add_node("lucid_coach", lucid_coach_node)
    graph.add_node("save_output", save_output_node)

    graph.set_entry_point("extract_symbols")

    graph.add_edge("extract_symbols", "interpret_dream")
    graph.add_edge("interpret_dream", "profile_dream")
    graph.add_edge("profile_dream", "lucid_coach")
    graph.add_edge("lucid_coach", "save_output")
    graph.add_edge("save_output", END)

    return graph.compile()

# ---- Run Example ----
if __name__ == "__main__":
    user_dream = input("🌙 Enter your dream: ")

    graph = build_graph()
    final_state = graph.invoke({"dream_text": user_dream})

    print("\n✅ Analysis Complete! Output saved to: output/dream_analysis_output.csv")
