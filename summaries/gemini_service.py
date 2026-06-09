import google.generativeai as genai
from django.conf import settings

genai.configure(
    api_key=settings.GEMINI_API_KEY
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_summary(text):

    try:

        prompt = f"""
        Summarize the following study material.

        Make the summary:
        - Easy to understand
        - Important points only
        - Suitable for exam preparation

        Content:

        {text[:15000]}
        """

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print(
            "SUMMARY ERROR:",
            str(e)
        )

        return (
            f"Summary Generation Error: "
            f"{str(e)}"
        )