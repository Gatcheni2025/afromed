# Afromed Development Website — afromeddevelopment.org

The official target for this release is **https://www.afromeddevelopment.org/**. The domain is registered/managed through GoDaddy and hosting will use an isolated domain in x10hosting DirectAdmin. The older **afromed-development.org** (with hyphen) is a separate current website, and its mailbox `Neli@afromed-development.org` must remain functional.

## How to publish

Use [DEPLOY_X10HOSTING_ORG.md](DEPLOY_X10HOSTING_ORG.md), not the older Firebase instructions. The DirectAdmin web root for this addon domain is normally `domains/afromeddevelopment.org/public_html` (check the panel's actual path).

**Use the separate web-root ZIP**, `Afromed_Development_ORG_x10hosting_Webroot.zip`, and upload its **contents** into the new domain's public_html. It includes the website plus photographs, SEO files, and privacy notice. It does not contain Firebase configuration, tests, or operator scripts.


**Target domain:** https://www.afromeddevelopment.org/  
**Registered NPO:** 245-061  
**Relationship to group site:** This is a separate static website. The repository root `index.html` (Afromed Group / afromed.life) must remain unchanged.

## Design & content
- Ivory, forest green and antique gold design, editorial serif display type, responsive layout.
- Motion: scroll reveals, drifting orbit, subtle ribbon marquee, CSS photo interactions, interactive canvas network globe.
- Sections: NPO story, four community programmes, **SA EMS Awards 2027/2028** sponsorship and organising role, international partnerships, approach, field gallery, enquiries.
- Accessibility: keyboard navigation, responsive mobile menu, input labels, reduced-motion support.
- SEO: canonical, social metadata, NGO structured data, sitemap, robots.
- Eight approved-candidate Afromed field photos have been packaged in `development-site/images/` from the existing Afromed repository; their rights and alt captions still require owner review before launch.

## Safe Legacy Firebase Hosting deployment

Use a **dedicated Hosting site** for Afromed Development; do not deploy this folder to the existing Afromed Group site's Hosting target.

1. Confirm the Firebase project used to manage Afromed Development. Install Firebase CLI if needed: `npm install -g firebase-tools`.
2. Log in with `firebase login` and choose the correct project.
3. Create a **separate Firebase Hosting site** in that project (Firebase Console / Hosting), e.g. `afromed-development` if that ID is available.
4. From the `development-site` directory, associate its target:
   `firebase target:apply hosting development ACTUAL_HOSTING_SITE_ID --project ACTUAL_FIREBASE_PROJECT_ID`.
5. Preview first: `firebase hosting:channel:deploy design-review --only hosting:development --project ACTUAL_FIREBASE_PROJECT_ID`.
6. Once reviewed, publish:
   `firebase deploy --only hosting:development --project ACTUAL_FIREBASE_PROJECT_ID`.
7. In Firebase Hosting **Add custom domain** for `afromeddevelopment.org` and `www.afromeddevelopment.org`, then apply the DNS records Firebase supplies at the registrar; wait for SSL validation.

Do not invent or reuse existing Firebase project/site IDs. Verify the correct target before deployment.

## Contact form
The form prepares a **mailto:** email addressed to `Neli@afromed-development.org`. It does **not** submit to a backend or store data. On public launch, confirm an active mailbox and consider a privacy-reviewed server-side form handler, spam protection, POPIA disclosure and anti-abuse controls. The user must press Send in their email application.

## Content to confirm before launch
- Official logo and branding (current wordmark is an elegant typographic design).
- Whether the director's old public email and telephone are still preferred.
- SA EMS Awards sponsorship wording and event year.
- Permission to reuse each photo from the Afromed repository and accuracy of image captions.
- Live programme availability, contact person, partnership materials, registered office, privacy policy and POPIA information officer.
- Image optimization, browser/device QA, WCAG contrast, analytics consent, spam policy, and deployment/DNS checks.
- The new domain was not reachable in checks on 16 Nov 2026. DNS and production deployment require operator access; no live publication is represented by this PR.

**Important:** Do not publish unverifiable impact statistics, third-party logos or partnership claims without supporting evidence.

## QA

Automated workflow: `.github/workflows/development-site-qa.yml`. Runs static validation plus Chromium desktop (1440), tablet (820) and mobile (390) smoke tests with screenshots. Inspect the CI result before deployment. 

## Legacy Firebase Windows deployment (not used for this release)

From the `development-site` directory, with Firebase CLI installed and logged in:

```powershell
.\Deploy-AfromedDevelopment.ps1 -ProjectId YOUR_FIREBASE_PROJECT_ID -HostingSiteId YOUR_DEDICATED_HOSTING_SITE_ID -Mode Preview
```

Inspect the preview URL and configure the custom domain from the Firebase Console. After owner approval, use `-Mode Production`. The script prompts for an explicit `YES` and rejects two unrelated site IDs. It will not deploy without real project/site identifiers. See the official [Firebase custom-domain guide](https://firebase.google.com/docs/hosting/custom-domain).

## Privacy

`privacy.html` describes the current mailto-only form, external web fonts and email-handling expectations. Verify legal text, information officer details, photo permissions and the partner-contact mailbox before launch.

