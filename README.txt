MACROLARGE ECO CONSULT — HTML / CSS / JAVASCRIPT VERSION
======================================================

চালানোর নিয়ম
-------------
1. ZIP ফাইলটি Extract করুন।
2. ecoconsult-html ফোল্ডারের index.html ফাইলটি ব্রাউজারে খুলুন।
3. React, npm বা build command লাগবে না।
4. HTML ফাইল ও assets ফোল্ডার একসঙ্গে রাখবেন। শুধু index.html কপি করলে CSS, JS, ছবি ও font লোড হবে না।

Current theme: Reference-inspired Deep Navy (#0B1720), Gold (#C7A45A), White and Light Grey (#F4F5F5).
Typography: Inter. Dark photographic hero and footer, gold pill buttons.

ফাইলগুলো
--------
index.html                  Homepage
about.html                  About page
services.html               Services, pricing, retainers and workshops
faqs.html                   Searchable frequently asked questions
contact.html                Enquiry form and contact information
privacy.html                Draft privacy notice
404.html                    Custom page-not-found page
assets/css/style.css        Full responsive website styling
assets/js/main.js           Plain JavaScript — no framework or dependencies
assets/images/              Website photographs
assets/fonts/               Local fonts and licences
assets/favicon.svg          Website icon

কীভাবে Edit করবেন
-----------------
- Page content: সংশ্লিষ্ট .html ফাইল edit করুন।
- Colours, spacing, layout, responsive design: assets/css/style.css
- Four service stages and their prices: assets/js/main.js-এর stages array
- Initial Measure pricing is also in services.html for the initial HTML view; keep both in sync when changing Measure prices.
- Retainer and training prices: services.html
- FAQs: faqs.html
- Homepage FAQ excerpts: index.html
- Services FAQ excerpts: services.html
- Header/footer সব HTML ফাইলে আছে; পরিবর্তন করলে সব পেজে update করুন।
- Contact service dropdown options: contact.html

যেসব Features কাজ করে
----------------------
- Desktop, tablet and mobile layout
- Mobile menu with keyboard Escape support
- Four pricing tabs with shareable query strings
- Service links that preselect the contact form service
- FAQ search, clear search and expandable answers
- Required-field and email validation
- Email-draft preparation with a copyable fallback
- Local images and fonts, including offline viewing

IMPORTANT — CONTACT FORM
------------------------
এটি pure static HTML/CSS/JS version। এখানে backend নেই।
Form পূরণ করে “Prepare email enquiry” চাপলে আপনার email application-এ draft খুলবে।
Email application-এ নিজে Send চাপতে হবে। Website কোনো email পাঠায় না এবং form data save করে না।
Email app না খুললে prepared message কপি করে info@ecoconsult.com-এ পাঠাতে পারবেন।

সরাসরি website থেকে email পাঠানোর জন্য পরে PHP/Node backend বা একটি approved form service connect করতে হবে।
কখনো frontend JavaScript-এ email API key, SMTP password বা অন্য secret রাখবেন না।

Hosting / cPanel
----------------
Upload every file inside ecoconsult-html, including the entire assets folder, to your public_html directory.
index.html is the homepage. No Node server or build process is required.
For subfolder deployment, upload all files together into the same subfolder; all asset and page links are relative.
Configure your host to use 404.html as its custom error document if desired.
This HTML version can also run on GitHub Pages, Netlify or another static host.

Client approval before launch
-----------------------------
- Confirm the concept wordmark/logo or replace it with the official logo.
- Approve final copy, imagery, contact details, pricing and VAT treatment.
- Approve and complete the production privacy policy; privacy.html is explicitly a draft.
- Add required company legal information supplied by the client.
- Set up the final domain, HTTPS, domain-specific SEO metadata and sitemap.
- If adding a form service, update the privacy notice and test delivery.

Assets / licences
-----------------
Nature imagery from Unsplash:
https://images.unsplash.com/photo-1448375240586-882707db888b
https://images.unsplash.com/photo-1473448912268-2022ce9509d8

Fonts: Inter (active), plus previously supplied DM Sans and Manrope files, SIL Open Font License.
Font licence files are in assets/fonts/.
Icons: Lucide, ISC licence; see assets/ICON-LICENSE.txt.
The M/leaf logo is an original design concept, not a supplied official logo.
No invented testimonials or named team member profiles have been added.

Checks completed
----------------
All seven pages were checked at 1440, 390 and 320 px widths, both over HTTP and by opening files locally.
Tested pricing tabs, contact service preselection, email draft generation, FAQ search/expansion and mobile navigation.
No React runtime, external libraries, CDN resources, npm files or server API are required.


SITE-WIDE ANIMATIONS
--------------------
- Staggered hero/title entrance on each page.
- Scroll-triggered section and card reveals using IntersectionObserver.
- Subtle desktop-only hero image movement, driven by scrolling.
- Animated pricing tab content changes.
- Smooth FAQ expansion/collapse with native details/summary semantics.
- Card, image, icon and button hover transitions.
- Mobile menu entrance and sticky-header shadow.
- Enquiry draft confirmation entrance.

No animation library, CDN, artificial loading screen or scroll hijacking is used.
Motion automatically respects prefers-reduced-motion. Content stays readable without JavaScript.
Print and keyboard-focus handling keep content accessible.

Edit motion timings in assets/js/main.js under “Eco Consult motion system”,
and assets/css/style.css under “Site-wide motion”.
The HTML/CSS/JS live preview runs on port 3001.
