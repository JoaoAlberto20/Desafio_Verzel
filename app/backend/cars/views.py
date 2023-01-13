from cars.models import Carros
from cars.serializers import CarsSerializers
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class CarsApiViews(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = CarsSerializers
    queryset = Carros.objects.all()
