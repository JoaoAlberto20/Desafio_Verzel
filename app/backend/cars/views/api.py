from cars.models import Carros
from cars.serializers import CarsSerializers
from rest_framework import viewsets

# from rest_framework.decorators import api_view


class CarsApiViews(viewsets.ModelViewSet):
    serializer_class = CarsSerializers
    queryset = Carros.objects.all()


# @api_view(["GET"])
# def apiOverview(request):
#     api_urls = {
#         "List": "/cars-list",
#         "Create": "/cars-create",
#         "Update": "/cars-update/<str:pk>",
#         "Delete": "/cars-delete/<str:pk>",
#         "Detail View": "/cars-detail/<str:pk>",
#     }
#     return Response(api_urls)


# @api_view(["GET"])
# def carsList(request):
#     clientes = Carros.objects.all()
#     serializer = CarsSerializers(clientes, many=True)
#     return Response(serializer.data)


# @api_view(["GET"])
# def carDetail(request, pk):
#     cars = Carros.objects.get(id=pk)
#     serializer = CarsSerializers(cars, many=True)
#     return Response(serializer.data)


# @api_view(["POST"])
# def carCreate(request):
#     serializer = CarsSerializers(data=request.data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


# @api_view(["PATCH"])
# def carUpdate(request, pk):
#     cars = Carros.objects.get(id=pk)
#     serializer = CarsSerializers(instance=cars, data=request.data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


# @api_view(["DELETE"])
# def carDelete(request, pk):
#     cars = Carros.objects.get(id=pk)
#     cars.delete()

#     return Response("Item successfully deleted!")
