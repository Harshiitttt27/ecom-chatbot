from django.contrib import admin
from django.urls import path
from products.views import ProductCreateView, ProductSearchView, ChatView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/products/create', ProductCreateView.as_view()),
    path('api/products/search', ProductSearchView.as_view(), name='product_search'),
    path('api/chat/', ChatView.as_view()),
]