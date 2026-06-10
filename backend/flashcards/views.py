from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from documents.models import Document

from summaries.pdf_utils import extract_pdf_text

from .gemini_flashcards import (
    generate_flashcards
)


class GenerateFlashcardView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        try:

            document_id = request.data.get(
                "document_id"
            )

            document = Document.objects.get(
                id=document_id
            )

            text = extract_pdf_text(
                document.file.path
            )

            flashcards = generate_flashcards(
                text
            )

            return Response({

                "success": True,

                "flashcards": flashcards

            })

        except Exception as e:

            return Response({

                "success": False,

                "error": str(e)

            }, status=500)