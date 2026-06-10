from summaries.gemini_service import model


def generate_mcqs(text):

    try:

        prompt = f"""
        Generate exactly 10 MCQs.

        STRICT FORMAT:

        MCQ 1

        Question: Your question here

        A) Option A
        B) Option B
        C) Option C
        D) Option D

        Answer: Correct Option

        --------------------------------

        Continue the same format for all 10 MCQs.

        Content:

        {text[:15000]}
        """

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print(
            "MCQ GENERATION ERROR:",
            str(e)
        )

        return (
            f"MCQ Generation Error: "
            f"{str(e)}"
        )