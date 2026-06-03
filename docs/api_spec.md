# API Specification - QA-Assistant

The backend provides several endpoints to handle raw text analysis, question generation, test case generation, and comparison.

---

## 1. Parse Requirements & Attachments
Extracts structured requirements from raw inputs (text, attachments).

- **Endpoint**: `POST /api/design/parse-requirements`
- **Request Body (JSON / Multipart)**:
  - `requirements_text`: string
  - `additional_info`: string (optional)
  - `files`: binary files (Excel, images) (optional)
- **Response** (`200 OK`):
  ```json
  {
    "requirements": [
      {
        "id": "RQ-01",
        "description": "Тестовое требование 1",
        "cases_count": 0
      },
      {
        "id": "RQ-02",
        "description": "Тестовое требование 2",
        "cases_count": 0
      }
    ]
  }
  ```

---

## 2. Generate Clarifying Questions
Asks the LLM to inspect the requirements and return list of ambiguities.

- **Endpoint**: `POST /api/llm/generate-questions`
- **Request Body**:
  ```json
  {
    "requirements": [
      {
        "id": "RQ-01",
        "description": "Тестовое требование 1"
      }
    ]
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "questions": [
      {
        "id": "Q-01",
        "requirement_id": "RQ-01",
        "question": "Каково ожидаемое поведение при вводе неверного пароля?"
      }
    ]
  }
  ```

---

## 3. Generate Test Scenarios
Generates structured test cases based on requirements and answered questions.

- **Endpoint**: `POST /api/llm/generate-scenarios`
- **Request Body**:
  ```json
  {
    "requirements": [
      {
        "id": "RQ-01",
        "description": "Тестовое требование 1"
      }
    ],
    "answers": [
      {
        "question_id": "Q-01",
        "question": "Каково ожидаемое поведение при вводе неверного пароля?",
        "answer": "Отобразить ошибку 'Неверный логин или пароль'"
      }
    ]
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "scenarios": [
      {
        "id": "TC-001",
        "name": "Открытие страницы авторизации",
        "priority": "П1",
        "preconditions": [
          "Пользователь находится на главной странице"
        ],
        "steps": [
          "Нажать на кнопку Войти"
        ],
        "expected_results": [
          "Страница авторизации успешно открылась"
        ],
        "coverage": ["RQ-01"]
      }
    ]
  }
  ```

---

## 4. Compare Scenarios
Compares original/old test scenarios with the newly generated/edited test scenarios.

- **Endpoint**: `POST /api/llm/compare-scenarios`
- **Request Body**:
  ```json
  {
    "old_scenarios_text": "TC-001: Тестовый сценарий...",
    "new_scenarios": [
      {
        "id": "TC-001",
        "name": "Открытие страницы авторизации",
        "priority": "П1",
        "preconditions": ["..."],
        "steps": ["..."],
        "expected_results": ["..."],
        "coverage": ["RQ-01"]
      }
    ]
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "changes_summary": "Сводка изменений:\n1. TC-001: Изменены предусловия...\n2. Добавлен новый тест-кейс TC-002...",
    "added": ["TC-002"],
    "removed": [],
    "modified": ["TC-001"]
  }
  ```
