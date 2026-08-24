import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
url = 'https://wedding-invitation-mustafa-arwa.vercel.app/'
html = urllib.request.urlopen(url).read().decode('utf-8')
matches = re.findall(r'src="(main-[^"]+)"', html)
print('Live JS files on Vercel:', matches)
if matches:
    js_url = url + matches[0]
    js_data = urllib.request.urlopen(js_url).read().decode('utf-8')
    print('Contains والد العريس:', 'والد العريس' in js_data)
    print('Contains احمد مصطفى سيف النصر:', 'سيف النصر' in js_data)
    print('Contains SCAN FOR LOCATION:', 'SCAN FOR LOCATION' in js_data)
