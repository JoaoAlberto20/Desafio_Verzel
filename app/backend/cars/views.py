from cars.models import Carros
from cars.serializers import CarsSerializers
from rest_framework import viewsets

from .permissions import IsAdminOrReadOnly


class CarsApiViews(viewsets.ModelViewSet):
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = CarsSerializers
    queryset = Carros.objects.all()
