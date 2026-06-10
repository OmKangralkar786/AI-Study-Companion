from django.db import models
from django.contrib.auth.models import User
from documents.models import Document


class MCQ(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    document = models.ForeignKey(
        Document,
        on_delete=models.CASCADE
    )

    question = models.TextField()

    answer = models.TextField()