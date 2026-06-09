from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from documents.models import Document
from .models import Summary

from .pdf_utils import (
    extract_pdf_text
)

from .gemini_service import (
    generate_summary
)


class GenerateSummaryView(APIView):

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

        summary_text = generate_summary(
            text
        )

        summary = Summary.objects.create(
            user=request.user,
            document=document,
            content=summary_text
        )

        return Response({

            "id": summary.id,

            "summary":
                summary.content

        })