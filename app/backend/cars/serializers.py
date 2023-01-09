from cars.models import Carros
from rest_framework import serializers


class CarsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Carros
        fields = [
            "id",
            "name",
            "brand",
            "model",
            "image_url",
            "year",
            "location",
            "mileage",
            "original_value",
            "promotional_value",
        ]
