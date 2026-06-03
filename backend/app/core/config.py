import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "QA-Assistant API"
    API_V1_STR: str = "/api"
    
    # LLM Provider: "openai" or "gemini"
    LLM_PROVIDER: str = "openai"

    # OpenAI API configuration
    OPENAI_API_KEY: str = "mock-key-replace-with-your-real-key"
    OPENAI_MODEL: str = "gpt-4o-mini"

    # Gemini API configuration
    GEMINI_API_KEY: str = "mock-key-replace-with-your-real-key"
    GEMINI_MODEL: str = "gemini-2.5-flash"
    
    # Server configuration
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
