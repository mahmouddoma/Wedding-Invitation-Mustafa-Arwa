import urllib.request
import re
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')
url = f'https://wedding-invitation-mustafa-arwa.vercel.app/?_t={int(time.time())}'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache, no-store'})
html = urllib.request.urlopen(req).read().decode('utf-8')

matches = re.findall(r'src="(main-[^"]+)"', html)
print('✅ Live JS files on Vercel:', matches)
if matches:
    js_url = 'https://wedding-invitation-mustafa-arwa.vercel.app/' + matches[0]
    js_req = urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache, no-store'})
    js_data = urllib.request.urlopen(js_req).read().decode('utf-8')
    has_groom = '\\u0633\\u064A\\u0641 \\u0627\\u0644\\u0646\\u0635\\u0631' in js_data or 'سيف النصر' in js_data
    has_bride = '\\u0639\\u0628\\u062F \\u0627\\u0644\\u0645\\u062C\\u064A\\u062F' in js_data or 'عبد المجيد' in js_data
    print('✅ Contains groom father (سيف النصر):', has_groom)
    print('✅ Contains bride father (عبد المجيد):', has_bride)
    print('✅ Old QR text (SCAN FOR LOCATION) is gone:', 'SCAN FOR LOCATION' not in js_data)

