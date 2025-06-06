# admin.py
from import_export import resources, fields
from import_export.admin import ImportExportModelAdmin
from .models import Product
from django.contrib import admin

class ProductResource(resources.ModelResource):
    image_url = fields.Field(attribute='image_url', column_name='image_url')

    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'description', 'price', 'image_url')
        import_id_fields = ['id']

    def before_import_row(self, row, **kwargs):
        # Just make sure it's treated as a plain string
        if 'image_url' in row:
            row['image_url'] = str(row['image_url'])

@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    resource_class = ProductResource
