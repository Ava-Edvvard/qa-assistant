from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    QuestionsGenerationRequest, QuestionsResponse,
    ScenariosGenerationRequest, ScenariosResponse,
    CompareRequest, CompareResponse
)
from app.services.llm_service import llm_service

router = APIRouter()

@router.post("/generate-questions", response_model=QuestionsResponse)
async def generate_questions(payload: QuestionsGenerationRequest):
    """
    Stage 3: Takes requirements list and generates a list of clarifying questions using LLM.
    """
    try:
        questions = llm_service.generate_questions(payload.requirements)
        return QuestionsResponse(questions=questions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate questions: {str(e)}")

@router.post("/generate-scenarios", response_model=ScenariosResponse)
async def generate_scenarios(payload: ScenariosGenerationRequest):
    """
    Stage 4: Takes requirements list and answers, then generates structured test scenarios.
    """
    try:
        scenarios = llm_service.generate_scenarios(payload.requirements, payload.answers)
        return ScenariosResponse(scenarios=scenarios)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate test scenarios: {str(e)}")

@router.post("/compare-scenarios", response_model=CompareResponse)
async def compare_scenarios(payload: CompareRequest):
    """
    Stage 5 (Existing Design): Compares user's original/old test scenarios with the new ones.
    """
    try:
        summary = llm_service.compare_scenarios(payload.old_scenarios_text, payload.new_scenarios)
        
        # Calculate mock ids for added/removed/modified for metadata (UI display helper)
        # In a real app, this can be parsed from LLM JSON response or calculated.
        added_ids = []
        modified_ids = []
        for tc in payload.new_scenarios:
            if "TC-" in tc.id:
                # Mock comparison logic: if priority is П1 or odd, mark it as modified/added for display
                if int(tc.id.split("-")[-1]) % 2 == 0:
                    modified_ids.append(tc.id)
                else:
                    added_ids.append(tc.id)
                    
        return CompareResponse(
            changes_summary=summary,
            added=added_ids,
            removed=[],
            modified=modified_ids
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to compare test scenarios: {str(e)}")
