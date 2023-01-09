from cars.views import CarsApiViews
from rest_framework.routers import DefaultRouter

app_name = "cars"


router = DefaultRouter(trailing_slash=False)
router.register(r"carros", CarsApiViews)

urlpatterns = router.urls
