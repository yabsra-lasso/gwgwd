from django.contrib import admin
from django.contrib import admin
from .models import Artwork, Artist, Activity

@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist', 'category', 'created_at')
    list_filter = ('category', 'artist')
    search_fields = ('title', 'artist__name')

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    prepopulated_fields = {'slug': ('title',)}
