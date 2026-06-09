from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Document
from .serializers import DocumentSerializer


class DocumentUploadView(
    generics.CreateAPIView
):

    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )

class DocumentListView(
    generics.ListAPIView
):

    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Document.objects.filter(
            user=self.request.user
        )