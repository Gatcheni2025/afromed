from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import sys, re

root = Path(__file__).resolve().parents[1]
html = (root / 'index.html').read_text(encoding='utf-8')
assert html.lstrip().lower().startswith('<!doctype html>'), 'Invalid HTML doctype'

class Scanner(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids=set()
        self.anchors=[]
        self.images=[]
        self.errors=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):
            if a['id'] in self.ids: self.errors.append('Duplicate ID: '+a['id'])
            self.ids.add(a['id'])
        if tag=='a' and a.get('href','').startswith('#'):
            self.anchors.append(a['href'][1:])
        if tag=='img': self.images.append(a)
parser=Scanner()
parser.feed(html)
assert not parser.errors,parser.errors
assert all(x in parser.ids for x in parser.anchors if x), 'Broken anchor'
assert len(parser.images)>=8, 'Expected Afromed field images'
for img in parser.images:
    assert img.get('alt'),f'Image missing accessible alt: {img}'
    src=img.get('src','')
    assert src.startswith('./images/'),f'Nonlocal image: {src}'
    assert (root/src).is_file(),f'Missing first-party image: {src}'

for id_ in ['home','about','programmes','saems-awards','partnerships','approach','contact']:
    assert id_ in parser.ids,f'Missing expected section {id_}'
assert '245-061' in html and 'saemsawards.co.za' in html, 'NPO / awards content missing'
assert 'Neli@afromed-development.org' in html, 'Contact destination missing'
assert 'prefers-reduced-motion' in html,'Reduced motion is required'
assert '<meta name="viewport"' in html,'Mobile viewport metadata missing'
assert (root/'sitemap.xml').exists() and (root/'favicon.svg').exists(), 'SEO assets missing'
assert not re.search(r'\b(?:href|src)=["\']https?://raw\.githubusercontent\.com/',html), 'External GitHub image dependency'
print(f'PASS static: {len(parser.ids)} element IDs, {len(parser.images)} local images, all navigation anchors and required programme content')
