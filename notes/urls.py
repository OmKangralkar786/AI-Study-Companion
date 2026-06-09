from django.urls import path
from .views import GenerateNotesView

urlpatterns = [

    path(
        'generate/',
        GenerateNotesView.as_view()
    ),
]