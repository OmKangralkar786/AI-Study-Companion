from summaries.gemini_service import model


def generate_flashcards(text):

    try:

        prompt = f"""
        Create flashcards.

        Format:

        Front: Question

        Back: Answer

        Content:

        {text[:15000]}
        """

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print(
            "FLASHCARD ERROR:",
            str(e)
        )

        return (
            f"Flashcard Generation Error: "
            f"{str(e)}"
        )