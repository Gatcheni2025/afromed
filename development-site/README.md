# Afromed Development — Premium NPO website

**Target domain:** https://www.afromeddevelopment.co.za/  
**Registered NPO:** 245-061  
**Relationship to group site:** This is a separate static website. The repository root `index.html` (Afromed Group / afromed.life) must remain unchanged.

## Design & content
- Ivory, forest green and antique gold design, editorial serif display type, responsive layout.
- Motion: scroll reveals, drifting orbit, subtle ribbon marquee, CSS photo interactions, interactive canvas network globe.
- Sections: NPO story, four community programmes, **SA EMS Awards 2027/2028** sponsorship and organising role, international partnerships, approach, field gallery, enquiries.
- Accessibility: keyboard navigation, responsive mobile menu, input labels, reduced-motion support.
- SEO: canonical, social metadata, NGO structured data, sitemap, robots.
- Images reference existing Afromed photo assets hosted in `Gatcheni2025/afromed/main/images/`; these assets should be copied to this site or an approved media CDN before going live to avoid an external GitHub runtime dependency.

## Safe Firebase Hosting deployment

Use a **dedicated Hosting site** for Afromed Development; do not deploy this folder to the existing Afromed Group site's Hosting target.

1. Confirm the Firebase project used to manage Afromed Development. Install Firebase CLI if needed: `npm install -g firebase-tools`.
2. Log in with `firebase login` and choose the correct project.
3. Create a **separate Firebase Hosting site** in that project (Firebase Console / Hosting), e.g. `afromed-development` if that ID is available.
4. From the `development-site` directory, associate its target:
   `firebase target:apply hosting development ACTUAL_HOSTING_SITE_ID --project ACTUAL_FIREBASE_PROJECT_ID`.
5. Preview first: `firebase hosting:channel:deploy design-review --only hosting:development --project ACTUAL_FIREBASE_PROJECT_ID`.
6. Once reviewed, publish:
   `firebase deploy --only hosting:development --project ACTUAL_FIREBASE_PROJECT_ID`.
7. In Firebase Hosting **Add custom domain** for `afromeddevelopment.co.za` and `www.afromeddevelopment.co.za`, then apply the DNS records Firebase supplies at the registrar; wait for SSL validation.

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
- The new domain could not be confirmed as live at the time this branch was prepared (HTTP 502 from lookup). No production deployment is represented by this PR.

**Important:** Do not publish unverifiable impact statistics, third-party logos or partnership claims without supporting evidence.
