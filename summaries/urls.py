from django.urls import path

from .views import (
    GenerateSummaryView
)

urlpatterns = [

    path(
        'generate/',
        GenerateSummaryView.as_view()
    ),
]