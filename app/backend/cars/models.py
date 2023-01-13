import uuid

from django.db import models


class Carros(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        null=False,
        blank=True
    )

    name = models.CharField(
        max_length=50,
        null=False,
        blank=False
    )

    brand = models.CharField(
        max_length=50,
        null=False,
        blank=False
    )

    model = models.CharField(
        max_length=50,
        null=False,
        blank=False
    )

    image_url = models.CharField(
        max_length=200,
        null=False,
        blank=False
    )

    year = models.IntegerField(
        null=False,
        blank=False
    )

    location = models.CharField(
        max_length=80,
        null=False,
        blank=False
    )

    mileage = models.IntegerField(
        null=False,
        blank=False
    )

    original_value = models.DecimalField(
        null=False,
        blank=False,
        decimal_places=2,
        max_digits=20
    )

    promotional_value = models.DecimalField(
        null=True,
        blank=False,
        decimal_places=2,
        max_digits=20
    )

    def __str__(self) -> str:
        return self.name

# Create your models here.
