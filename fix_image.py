import os
import shutil

src = r"C:\Users\Administrator\.gemini\antigravity\brain\600c30d6-9a58-440a-ad37-e5d0fefb24db\uploaded_image_1767426566118.jpg"
dest_dir = os.path.join("core", "static", "core", "img")
dest_file = os.path.join(dest_dir, "feature_art.jpg")

os.makedirs(dest_dir, exist_ok=True)
print(f"Created directory: {dest_dir}")

shutil.copy2(src, dest_file)
print(f"Copied file to: {dest_file}")
