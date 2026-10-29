# First SEO cycle: two refresh briefs

Status: proposed editorial work, not published copy and not keyword research results.
No authenticated Search Console data has been obtained by this setup. Query ideas
below are hypotheses to validate, not search volumes or guaranteed opportunities.

## 1. How to autofill job applications on iPhone

**Existing canonical:** `/guides/autofill-job-applications-iphone/`.
Do not create another generic Safari-extension or repeated-typing guide: the
current plan already redirects three related slugs into this page.

**Audience and question:** an iPhone user with an actual application open who is
tired of retyping saved information. Explain the workflow, what still needs review,
and what to do when a field stays empty or fills incorrectly.

**Query hypotheses:** `autofill job applications iphone`, `job application autofill
safari`, `stop retyping resume on applications`.

**Article structure:** immediate answer; verified setup on the currently supported
iOS release; a fictional before/after field example; resume attachment as a separate
step; written answers and review; troubleshooting; one contextual app CTA.

**Original evidence needed:** capture the shipped app and Safari extension on an
actual supported form or clearly identified controlled fixture. Show which fields
were filled, not just the button. Record app/iOS version. Do not reuse the black
phone-placeholder designs as evidence of product behavior.

**Specific existing-copy review:** `content/seo-plan.mjs` currently includes an
"Example: Turning a 25-Minute Form Into a Reviewable Draft" section and claims
about filling education/work history. Verify those claims or replace them with an
explicitly illustrative, untimed scenario. Do not convert a fictional example into
measured time savings. Clarify that auto-filling and attaching a resume do not
submit the application.

**Draft opening to refine after verification:**

> Applying from your iPhone should not require retyping the same contact details
> for every role. JobHunter is designed to reuse saved information on supported
> application forms. Start with a role you actually want, open its application,
> check the filled fields, and review your documents before you submit. A completed
> field is a draft to check, not proof that the employer has received an application.

**Internal links:** `job-application-autofill-vs-auto-apply`,
`attach-resume-from-iphone-safari`, `ten-minute-job-application-workflow`.

**CTA direction:** "Use JobHunter for repeat application fields on iPhone."
Do not advertise the new free AI allowance or a new price until verified live.

**Acceptance:** a reader can understand setup and the review boundary without
installing the app first; instructions match a current test; all unsupported
performance promises are removed; the existing canonical and redirects are kept.

## 2. How to attach a resume from iPhone Safari

**Existing canonical:** `/guides/attach-resume-from-iphone-safari/`.
Refresh this page rather than creating a second generic iPhone-resume-upload page.

**Audience and question:** a mobile applicant who cannot find, select, or confirm
their intended document. The article should help even without JobHunter.

**Query hypotheses:** `upload resume iphone safari`, `attach cv from iphone`,
`resume upload not working iphone`.

**Article structure:** quick manual path; finding the correct local file; checking
allowed formats and sizes on the employer's own form; checking the selected file;
processing/validation failures; parsed-field review; JobHunter as an optional
shortcut for supported forms.

**Original evidence needed:** an annotated current iPhone file-picker sequence and
a controlled upload example. Clearly label the fictional resume. Show the actual
site's file-selection and completion states, not a drawn success badge. Never
upload a real person's resume solely for marketing testing.

**Specific existing-copy review:** the current section says a disabled upload
button "usually means another required field must be completed first" and links
blank previews to particular PDF problems. Rewrite these as possible causes unless
supported by a reproduced case. The privacy section also implies an employer
receives the resume only after a deliberate attachment; distinguish choosing a
file, the site uploading it, and final application submission. Some forms can
transmit an attachment before the final submit step, so never promise otherwise
without checking that site's behavior and policy.

**Draft troubleshooting box to verify and refine:**

> Before selecting the file again, check the form's instructions, the file you
> chose, and any error shown beside the upload control. A filename appearing is a
> useful sign, but confirm that the site has finished processing it. If the form
> imports work-history details from the resume, compare those fields with your
> document. When you cannot tell whether the upload succeeded, use the employer's
> help instructions rather than assuming repeated taps have fixed it.

**Internal links:** `ats-friendly-resume-checklist`,
`multiple-resume-versions-different-roles`, `autofill-job-applications-iphone`.

**CTA direction:** "Keep your resume ready for supported iPhone applications."
Avoid treating JobHunter as a guaranteed fix for every employer's upload control.

**Acceptance:** distinguish file selection, network upload, parsing, and final
submission; use employer-required formats rather than universal PDF promises;
check current iOS steps and product claims; preserve the existing URL.

## Agent deliverables for each brief

- A private evidence note with the relevant GSC period and limitations, or an
  explicit "no performance baseline" label.
- A reviewed replacement article/section in the existing source model, not just
  appended duplicated prose. Cite primary sources where specific facts require it.
- A rendered page preview plus build/SEO validation results.
- One concise social post derived from the actual article, marked as a draft.
- A content PR with no private analytics, credentials, fabricated product screens,
  or changes to live deployments. No automatic merge.
