from django.urls import path

from .views import (
    GenerateFlashcardView
)

urlpatterns = [

    path(
        'generate/',
        GenerateFlashcardView.as_view()
    ),

]