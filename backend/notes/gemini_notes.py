from summaries.gemini_service import model


def generate_notes(text):

    try:

        prompt = f"""
        Generate detailed study notes.

        Content:

        {text[:15000]}
        """

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print(
            "NOTES ERROR:",
            str(e)
        )

        return (
            f"Notes Generation Error: "
            f"{str(e)}"
        )