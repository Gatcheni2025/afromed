# Publish Afromed Development at afromeddevelopment.org — x10hosting / GoDaddy

## Confirmed domains

- **New website:** `afromeddevelopment.org` / `www.afromeddevelopment.org` (GoDaddy DNS).
- **Separate old site:** `afromed-development.org` (with a hyphen). Do not modify or replace it.
- **Existing correspondence mailbox:** `Neli@afromed-development.org` (with a hyphen). Preserve its DNS/MX records.
- **Old draft domain `.co.za`:** NOT selected for this release.

## 1. Create the new hosting domain in DirectAdmin

1. Open your x10hosting DirectAdmin control panel.
2. Under **Account Manager → Domains → Create Domain**, change the Domain field to exactly `afromeddevelopment.org` (no `www`, `https`, slash or spaces).
3. Leave **Secure SSL** checked. `PHP Access` is optional and not required for this static website.
4. Leave Bandwidth and Disk Usage set to "Same as Main account" if this is intended.
5. Click **CREATE**. Wait for the "domain created" confirmation.
6. Use the domain selector in the top right to select `afromeddevelopment.org`.
7. From **System Info & Files → File Manager**, check `domains/afromeddevelopment.org/public_html`. Do **not** upload into `domains/asiye.cloud/public_html` or an account-wide root folder.

If the accidentally entered `.co.za` domain was already created and has no useful content, it can be removed later. Do not remove an unknown domain with existing content.

## 2. Upload website files

1. Download `Afromed_Development_ORG_x10hosting_Webroot.zip` from the release package.
2. Before replacing any existing index file in the target public_html, **download/backup the existing contents**.
3. Open DirectAdmin **File Manager** inside `domains/afromeddevelopment.org/public_html`.
4. Upload the ZIP file; right-click and choose **Extract**.
5. **Important:** confirm `index.html` is directly inside that `public_html`, not nested in an extra folder. The `images` directory should sit alongside it.
6. Verify the following files at the web root: `index.html`, `privacy.html`, `favicon.svg`, `robots.txt`, `sitemap.xml`, and `images/`.
7. Remove any default host `index.php` or placeholder `index.html` **only if** a backup is available and you are sure the correct domain's folder is open. A default `index.php` can take priority over the uploaded `index.html`.
8. This is a fully static site; **do not create a database or run PHP**. There is no `npm install` requirement.

## 3. Connect the domain from GoDaddy without disrupting email

Your GoDaddy DNS dashboard for `afromeddevelopment.org` already shows existing DNS records. **Do not erase these records indiscriminately.**

- In DirectAdmin, find your x10hosting server's **actual IPv4 address** (or ask x10hosting support if unsure). Do not use the IP from a generic tutorial.
- At GoDaddy → `afromeddevelopment.org` → DNS → DNS Records, first take screenshots/export the complete existing A, AAAA, CNAME, MX and TXT records and note its **nameservers**.
- If GoDaddy DNS is authoritative and x10hosting allows A-record pointing, use:
  - `A`, host `@` → **your confirmed x10hosting server IPv4**.
  - `CNAME`, host `www` → `@` (or `afromeddevelopment.org`, subject to GoDaddy's interface). Remove or modify any conflicting `www` record only after verifying its purpose.
- Preserve email-related MX, SPF, DKIM, DMARC and verification TXT records. Do not delete them to make room for website records.
- If x10hosting explicitly requires its nameservers instead, **first copy and plan to recreate every current MX/TXT/email record** at the new DNS authority, and verify that the existing mail service will continue working. Changing nameservers blindly can interrupt mail.
- Wait for propagation, which may be gradual. The domain should open the uploaded site after the web records have taken effect.

## 4. Enable HTTPS and www

1. In DirectAdmin, use the top-right selector to choose **afromeddevelopment.org**.
2. Open **SSL/TLS Certificates** and request the available free certificate (e.g. Let's Encrypt) covering both `afromeddevelopment.org` and `www.afromeddevelopment.org`, once they resolve to the hosting server.
3. Confirm that both HTTPS addresses load without certificate warnings.
4. Only once HTTPS works, enable **Force HTTPS Redirect** (if offered in the control panel). Do not force HTTPS prematurely.
5. The site's SEO canonical prefers `https://www.afromeddevelopment.org/`; optional apex-to-www redirect can be configured after both addresses work.

## 5. Check after publishing

- Load both `https://afromeddevelopment.org/` and `https://www.afromeddevelopment.org/`.
- Check desktop and mobile for layout, field photographs and the animated global partnership section.
- Verify the SAEMS Awards button goes to `https://saemsawards.co.za/`.
- Check `/privacy.html`, `/robots.txt`, `/sitemap.xml` and `/favicon.svg`.
- Complete the contact form using test details: it **opens an email draft**, not an automatic form submission. Verify the sending mailbox separately.
- Verify that `asiye.cloud` and `www.afromed-development.org` continue working as before.
- Keep a copy of the old site's web files and current DNS records for rollback.

## Not performed by generating this release package

- Domain creation in your authenticated DirectAdmin session
- DNS changes inside your GoDaddy account
- Upload to x10hosting server
- SSL issuance, live website publishing or server-side contact form processing

These require your authenticated control-panel access. No deployment should be considered complete until the live URL is independently verified.
