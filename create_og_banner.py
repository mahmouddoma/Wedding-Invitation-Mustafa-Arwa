import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display

def ar(text):
    reshaped = arabic_reshaper.reshape(text)
    return get_display(reshaped)

W, H = 1200, 630
img = Image.new('RGB', (W, H), '#f4f8fc')
draw = ImageDraw.Draw(img)

# Soft gradient background
for y in range(H):
    ratio = y / H
    r = int(244 * (1 - ratio*0.1) + 230 * (ratio*0.1))
    g = int(248 * (1 - ratio*0.1) + 238 * (ratio*0.1))
    b = int(252 * (1 - ratio*0.1) + 248 * (ratio*0.1))
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# 4 Corner Bouquets
pub = r'c:\Users\win10\Music\mostafa-invitation\public'
pub_images = os.path.join(pub, 'images')

tl = Image.open(os.path.join(pub_images, 'botanical_tl_trans.png')).convert('RGBA').resize((320, 320), Image.Resampling.LANCZOS)
tr = Image.open(os.path.join(pub_images, 'botanical_tr_trans.png')).convert('RGBA').resize((320, 320), Image.Resampling.LANCZOS)
bl = Image.open(os.path.join(pub_images, 'botanical_bl_trans.png')).convert('RGBA').resize((330, 330), Image.Resampling.LANCZOS)
br = Image.open(os.path.join(pub_images, 'botanical_br_trans.png')).convert('RGBA').resize((330, 330), Image.Resampling.LANCZOS)

img.paste(tl, (-15, -15), tl)
img.paste(tr, (W - 305, -15), tr)
img.paste(bl, (-15, H - 315), bl)
img.paste(br, (W - 315, H - 315), br)

# Center Arch Card with Double Gold Frame
card_x1, card_y1, card_x2, card_y2 = 130, 30, W - 130, H - 30
# Soft shadow for card
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
sdraw = ImageDraw.Draw(shadow)
sdraw.rounded_rectangle([card_x1 + 4, card_y1 + 8, card_x2 + 4, card_y2 + 8], radius=32, fill=(45, 68, 95, 30))
shadow = shadow.filter(ImageFilter.GaussianBlur(12))
img.paste(shadow, (0, 0), shadow)

# Card background and borders
draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=32, fill='#fffffffa', outline='#d4b47e', width=3)
draw.rounded_rectangle([card_x1 + 8, card_y1 + 8, card_x2 - 8, card_y2 - 8], radius=24, outline='#e8cf9b', width=1)

# Fonts
font_dir = r'c:\Users\win10\Music\mostafa-invitation\fonts'
font_amiri_bold = ImageFont.truetype(os.path.join(font_dir, 'Amiri-Bold.ttf'), 26)
font_names = ImageFont.truetype(os.path.join(font_dir, 'Amiri-Bold.ttf'), 76)
font_amp = ImageFont.truetype(r'C:\Windows\Fonts\times.ttf', 52)
font_invite = ImageFont.truetype(os.path.join(font_dir, 'Amiri-Bold.ttf'), 28)
font_details = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 20)
font_closing = ImageFont.truetype(os.path.join(font_dir, 'Amiri-Bold.ttf'), 28)

# Helper to draw centered text with drop shadow
def draw_centered_text(y, text, font, fill_color, shadow_color=None, shadow_offset=(0, 2)):
    bidi_text = ar(text)
    bbox = draw.textbbox((0, 0), bidi_text, font=font)
    text_w = bbox[2] - bbox[0]
    x = (W - text_w) // 2
    if shadow_color:
        draw.text((x + shadow_offset[0], y + shadow_offset[1]), bidi_text, font=font, fill=shadow_color)
    draw.text((x, y), bidi_text, font=font, fill=fill_color)
    return y + (bbox[3] - bbox[1])

# 1. Top Verse
draw_centered_text(52, 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً', font_amiri_bold, fill_color='#b87d18', shadow_color='#f0d5a0', shadow_offset=(0, 1))

# 2. Invitation line
draw_centered_text(115, 'يتشرف الأهل بدعوتكم لحضور حفل زفاف', font_invite, fill_color='#38526d')

# 3. Names Line: مصطفى  &  أروى
names_str = 'مصطفى  &  أروى'
# Draw with rich gold drop shadow
draw_centered_text(175, names_str, font_names, fill_color='#b87d18', shadow_color='#df9f2e', shadow_offset=(0, 2))

# 4. Details Trio Pill Bar
pill_w, pill_h = 760, 60
pill_x1 = (W - pill_w) // 2
pill_y1 = 345
draw.rounded_rectangle([pill_x1, pill_y1, pill_x1 + pill_w, pill_y1 + pill_h], radius=30, fill='#f4f8fc', outline='#d4b47e', width=2)

details_text = 'الجمعة، 2 أكتوبر 2026   •   الساعة 7:30 مساءً   •   Solitaire View Maadi'
draw_centered_text(pill_y1 + 17, details_text, font_details, fill_color='#2c4257')

# 5. Closing greeting
draw_centered_text(460, '— ♡ بحضوركم تكتمل فرحتنا ♡ —', font_closing, fill_color='#38526d')

# 6. Save in all required formats & paths
img.save(os.path.join(pub, 'og-image.jpg'), quality=92, optimize=True)
img.save(os.path.join(pub, 'og-image.png'), optimize=True)
img.save(os.path.join(pub, 'preview.jpg'), quality=92, optimize=True)

img.save(os.path.join(pub_images, 'og-preview.jpg'), quality=92, optimize=True)
img.save(os.path.join(pub_images, 'og-preview.png'), optimize=True)
img.save(os.path.join(pub_images, 'og-image.jpg'), quality=92, optimize=True)
img.save(os.path.join(pub_images, 'image.png'), optimize=True)

# Square version (800x800)
sq = Image.new('RGB', (800, 800), '#f2f7fc')
sq_draw = ImageDraw.Draw(sq)
scaled_banner = img.resize((760, 400), Image.Resampling.LANCZOS)
sq.paste(scaled_banner, (20, 200))
sq.save(os.path.join(pub, 'og-square.jpg'), quality=92, optimize=True)
sq.save(os.path.join(pub_images, 'og-square.jpg'), quality=92, optimize=True)

print('Generated all WhatsApp and OpenGraph preview images!')
