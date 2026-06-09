from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from documents.models import Document

from summaries.pdf_utils import (
    extract_pdf_text
)

from .gemini_mcq import (
    generate_mcqs
)


class GenerateMCQView(APIView):

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

        mcqs = generate_mcqs(text)

        return Response({

            "mcqs": mcqs

        })