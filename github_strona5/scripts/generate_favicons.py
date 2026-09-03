from PIL import Image, ImageDraw, ImageFont
import os

os.chdir(os.path.dirname(__file__) or '.')
# Colors and sizes
bg = (24,25,28,255)
fg = (255,255,255,255)

# Draw function
def make(size):
    im = Image.new('RGBA', (size,size), bg)
    draw = ImageDraw.Draw(im)
    s = size/256.0
    lw = max(2, int(12*s))
    # vertical line
    vx1 = int(96*s); vy1 = int(24*s)
    vx2 = int(96*s); vy2 = int(168*s)
    draw.line([(vx1,vy1),(vx2,vy2)], fill=fg, width=lw)
    # horizontal
    hx1 = int(24*s); hy1 = int(96*s)
    hx2 = int(168*s); hy2 = int(96*s)
    draw.line([(hx1,hy1),(hx2,hy2)], fill=fg, width=lw)
    # T letter
    try:
        font = ImageFont.truetype('arial.ttf', max(10,int(28*s)))
    except Exception:
        font = ImageFont.load_default()
    text = 'T'
    try:
        tw, th = font.getsize(text)
    except Exception:
        try:
            bbox = draw.textbbox((0,0), text, font=font)
            tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
        except Exception:
            tw, th = (20, 20)
    draw.text(((size-tw)/2, size*0.78-th/2), text, font=font, fill=fg)
    return im

imgs = {sz: make(sz) for sz in [16,32,48,64,128,192,256,180]}
imgs[48].save(os.path.join('..','favicon-48.png'))
imgs[192].save(os.path.join('..','favicon-192.png'))
imgs[180].save(os.path.join('..','apple-touch-icon.png'))
imgs[256].save(os.path.join('..','favicon.ico'), format='ICO', sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])
print('Generated favicons')
