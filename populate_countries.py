from core.models import Artwork, Country

# Map of Category Name to Country Name (assuming they match 1:1)
# Create countries if they don't exist
categories = ['USA', 'Brazil', 'Morocco', 'India', 'UAE']

for cat_name in categories:
    Country.objects.get_or_create(name=cat_name, defaults={'description': f'Projects in {cat_name}'})

# Update Artworks
count = 0
for artwork in Artwork.objects.all():
    if artwork.category:
        country, created = Country.objects.get_or_create(name=artwork.category)
        artwork.country = country
        artwork.save()
        count += 1

print(f"Updated {count} artworks with country references.")
