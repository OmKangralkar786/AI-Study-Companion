from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from documents.models import Document

from .models import Note

from summaries.pdf_utils import (
    extract_pdf_text
)

from .gemini_notes import (
    generate_notes
)


class GenerateNotesView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        document_id = request.data.get(
            "document_id"
        )

        document = Document.objects.get(
            id=document_id
        )

        text = extract_pdf_text(
            document.file.path
        )

        notes = generate_notes(
            text
        )

        Note.objects.create(
            user=request.user,
            document=document,
            content=notes
        )

        return Response({

            "notes": notes

        })