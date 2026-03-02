import os
import sys
import subprocess

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Installing Pillow...")
    install("pillow")
    from PIL import Image, ImageDraw, ImageFont

def create_sequence():
    output_dir = "public/sequence"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Higher resolution for better quality on High DPI screens
    width, height = 3840, 2160 # 4K
    
    # But if we want to save space/performance, 1920x1080 is standard.
    # However, user complained about pixelation. Let's do 2560x1440 (2K) as a compromise or full 4K.
    # Let's try 1920x1080 with high quality settings first, or maybe the previous script failed 
    # and they are seeing the fallback?
    # If they are running this script now, let's give them good quality.
    width, height = 2560, 1440 
    
    bg_color = (10, 10, 12) # Matches CSS #0a0a0c
    
    print("Generating 240 frames...")
    
    for i in range(1, 241):
        img = Image.new('RGB', (width, height), color=bg_color)
        draw = ImageDraw.Draw(img)
        
        cx, cy = width // 2, height // 2
        
        # Phase logic similar to before but smoother
        t = i / 240.0
        
        if i <= 80:
            # Mist Phase
            opacity = i / 80.0
            radius = 200 * opacity
            # Draw multiple circles with transparency simulation
            for k in range(10):
                offset_x = (k - 5) * 50 * (1-opacity)
                offset_y = (k % 3 - 1) * 50 * (1-opacity)
                
                color_val = int(50 + 100 * opacity)
                draw.ellipse([cx + offset_x - radius, cy + offset_y - radius, 
                              cx + offset_x + radius, cy + offset_y + radius], 
                             outline=(color_val, color_val, color_val), width=2)
            
            label = "Mist Coalescing"
        elif i <= 160:
            # Liquid Phase
            progress = (i - 80) / 80.0
            w = 200 + progress * 200
            h = 400 + progress * 300
            
            color = (212, 175, 55) # Gold
            draw.ellipse([cx - w/2, cy - h/2, cx + w/2, cy + h/2], fill=color, outline=None)
            label = "Liquid Gold Vortex"
        else:
            # Bottle Phase
            progress = (i - 160) / 80.0
            w = 400
            h = 700
            
            # Draw bottle shape
            draw.rectangle([cx - w/2, cy - h/2, cx + w/2, cy + h/2], fill=(30, 30, 35), outline=(212, 175, 55), width=4)
            
            # Label
            font_size = 60
            # text hard to do perfectly without font file, just draw basic
            draw.rectangle([cx - 100, cy - 50, cx + 100, cy + 50], fill=(212, 175, 55))
            
            label = "PERFUME BOTTLE"

        # Draw frame number
        # draw.text((50, 50), f"Frame {i:03d}", fill=(255, 255, 255))
        
        filename = f"ezgif-frame-{i:03d}.jpg"
        # Save with High Quality
        img.save(os.path.join(output_dir, filename), quality=95, subsampling=0)
        
        if i % 20 == 0:
            print(f"Saved {filename}")

if __name__ == "__main__":
    create_sequence()
