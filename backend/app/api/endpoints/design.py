from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import List, Optional
from app.models.schemas import RequirementsResponse, Requirement
from app.services.parser import parser_service
from app.services.llm_service import llm_service

router = APIRouter()

@router.post("/parse-requirements", response_model=RequirementsResponse)
async def parse_requirements(
    requirements_text: str = Form(...),
    additional_info: Optional[str] = Form(None),
    files: Optional[List[UploadFile]] = File(None)
):
    """
    Stage 1: Receives raw requirements text, additional info, and files (Excel or images).
    Parses them and extracts a list of requirements.
    """
    combined_text = requirements_text
    
    # Process files if they are provided
    if files:
        file_descriptions = []
        for file in files:
            file_bytes = await file.read()
            filename = file.filename or "unknown"
            
            if filename.endswith(('.xlsx', '.xls', '.csv')):
                parsed_excel = parser_service.parse_excel(file_bytes)
                file_descriptions.append(f"\n[Контент таблицы {filename}]:\n{parsed_excel}")
            elif filename.endswith(('.png', '.jpg', '.jpeg', '.webp')):
                parsed_image = parser_service.parse_image(file_bytes, filename)
                file_descriptions.append(f"\n{parsed_image}")
            else:
                file_descriptions.append(f"\n[Прикрепленный файл {filename} (размер: {len(file_bytes)} байт)]")
        
        # Merge parsed file contents to requirements context
        if file_descriptions:
            combined_text += "\n\n--- Дополнительный контекст из прикрепленных файлов ---" + "\n".join(file_descriptions)

    # Call LLM Service to structure the requirements
    try:
        requirements = llm_service.parse_requirements(combined_text, additional_info)
        return RequirementsResponse(requirements=requirements)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse requirements: {str(e)}")
