# Afromed Development — premium independent website

**Official target:** https://www.afromeddevelopment.org/  
**Host:** x10hosting / DirectAdmin addon domain  
**DNS management:** GoDaddy  
**NPO:** 245-061  
**Current contact mailbox:** Neli@afromed-development.org

This folder holds a complete static responsive website. It uses authentic existing Afromed images packaged in `images/`, a custom favicon, privacy notice, animated network visualization, SEO files, and partnership enquiry email-draft form. It does **not** require WordPress, Firebase, PHP, a database or Node.js to run.

### Publish on x10hosting

Read **[DEPLOY_X10HOSTING_ORG.md](DEPLOY_X10HOSTING_ORG.md)**. Upload the contents of the website-only ZIP into the domain-specific `public_html` folder for `afromeddevelopment.org`. Do not upload into the main `asiye.cloud` folder.

### QA

GitHub workflow `.github/workflows/development-site-qa.yml` tests static links, assets and responsive browser interactions (desktop, tablet, phone). The webroot release ZIP is created separately for DirectAdmin and excludes the development/test tools.

### Content and safety before launch

Confirm consent to use field photographs and their captions, current director/contact details, SA EMS Awards sponsorship description, POPIA notice and whether formal partner information is to be provided. The enquiry form only prepares an email; visitors must press Send in their email client. No sensitive patient information should be sent through that route.

### Important domain distinction

`afromeddevelopment.org` (without hyphen) is the new site. `afromed-development.org` (with hyphen) is the existing older website and email domain. The old draft `.co.za` is not the release target.
