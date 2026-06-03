import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "QA-Assistant API"
    API_V1_STR: str = "/api"
    
    # OpenAI API configuration
    OPENAI_API_KEY: str = "mock-key-replace-with-your-real-key"
    OPENAI_MODEL: str = "gpt-4o-mini"
    
    # Server configuration
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
