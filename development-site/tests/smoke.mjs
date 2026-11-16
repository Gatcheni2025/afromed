import { chromium, devices } from 'playwright';
import assert from 'node:assert/strict';

const url = process.env.SITE_URL || 'http://127.0.0.1:8787/';
const browser = await chromium.launch({ headless: true });
let total = 0;

async function testViewport(name, width, height, mobile = false) {
  const context = await browser.newContext({
    viewport: {width,height},
    isMobile: mobile,
    hasTouch: mobile,
    deviceScaleFactor: mobile ? 2 : 1,
    reducedMotion: 'reduce'
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto(url,{waitUntil:'domcontentloaded'});
  assert.equal(response?.status(),200,`${name}: HTTP status`);
  assert.match(await page.title(),/Afromed Development/);
  assert.match(await page.locator('h1').innerText(),/Care that.*reaches.*further/s);
  assert.equal(await page.locator('section#saems-awards').count(),1);
  assert.match(await page.locator('section#saems-awards').innerText(),/sponsors and organises/);
  assert.match(await page.locator('section#partnerships').innerText(),/International & local partners welcome/i);
  assert.equal(await page.locator('form#partner-form').count(),1);

  const anchors = await page.locator('a[href^="#"]').evaluateAll(els => els.map(x=>x.getAttribute('href').slice(1)));
  const missing = await page.evaluate(anchors => anchors.filter(a => a && !document.getElementById(a)),anchors);
  assert.deepEqual(missing,[],`${name}: internal links`);

  if (mobile) {
    const nav = page.locator('#nav-links');
    assert.equal(await nav.isVisible(), false, 'menu initially collapsed');
    await page.locator('#menu-toggle').click();
    assert.equal(await nav.isVisible(), true, 'menu opens');
    await nav.locator('a[href="#saems-awards"]').click();
    assert.equal(await nav.isVisible(), false, 'menu closes after navigation');
  }

  const imageElements = page.locator('img');
  const imageCount = await imageElements.count();
  for(let i=0;i<imageCount;i++){
    const img=imageElements.nth(i);
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(el => el.decode());
    const result=await img.evaluate(el=>({src:el.getAttribute('src'),naturalWidth:el.naturalWidth}));
    assert.ok(result.naturalWidth>0,`${name}: failed image ${result.src}`);
  }
  assert.ok(imageCount>=8, `${name}: expected original field photos`);

  await page.locator('#contact').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('#partner-form').evaluate(el=>el.checkValidity()),false,'empty form invalid');
  await page.locator('#partner-name').fill('Test Person');
  await page.locator('#partner-email').fill('contact@example.org');
  await page.locator('#partner-org').fill('Test Foundation');
  await page.locator('#partner-country').fill('United Kingdom');
  await page.locator('#partner-message').fill('Interested in a healthcare programme partnership.');
  await page.locator('.consent input').check();
  assert.equal(await page.locator('#partner-form').evaluate(el=>el.checkValidity()),true,'completed form valid');
  const formScript = await page.locator('script').last().textContent();
  assert.match(formScript,/mailto:Neli@afromed-development.org/,'mailto fallback configured');

  const overflow = await page.evaluate(()=>({
    viewport:document.documentElement.clientWidth,
    scroll:document.documentElement.scrollWidth
  }));
  assert.ok(overflow.scroll <= overflow.viewport+2, `${name}: horizontal overflow ${JSON.stringify(overflow)}`);
  assert.deepEqual(errors,[],`${name}: JavaScript errors`);
  await page.screenshot({path: `/tmp/afromed-${name}.png`,fullPage:true,animations:'disabled'});
  console.log(`PASS ${name}: page, sections, mobile navigation, photos (${imageCount}), form, responsive layout and JS`);
  total++;
  await context.close();
}

try {
  await testViewport('desktop',1440,900);
  await testViewport('tablet',820,1000);
  await testViewport('mobile',390,844,true);
  console.log(`PASS all ${total} viewport suites`);
} finally {
  await browser.close();
}
