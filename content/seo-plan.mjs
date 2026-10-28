// Canonical guide content. Legacy topic sources preserve redirect history only.
export const SITE_MODIFIED = "2026-08-12";
export const PAGE_MODIFIED = { "/": "2026-10-29" };

export const guidePlans = [
  {
    "slug": "autofill-job-applications-iphone",
    "cluster": "job-autofill",
    "title": "How to Autofill Job Applications on iPhone",
    "h1": "How to Autofill Job Applications on iPhone",
    "description": "Set up Safari contact AutoFill on iPhone, separate supported contact fields from job-specific answers, and fix missing or incorrect suggestions.",
    "intro": "Start with Safari’s built-in contact AutoFill for supported name, email, phone and address fields. Check the result against your own details, then complete work history, written answers and document uploads separately. Filling fields does not submit the application.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [
      "save-reusable-job-application-answers",
      "fill-long-job-application-forms-faster",
      "safari-extension-job-applications-iphone"
    ],
    "relatedSlugs": [
      "job-application-autofill-vs-auto-apply",
      "attach-resume-from-iphone-safari",
      "ten-minute-job-application-workflow"
    ],
    "sections": [
      {
        "heading": "Check your contact card before opening the form",
        "paragraphs": [
          "Open your own card in Contacts and check the name, email address, phone number and address you intend to use. Remove or correct an old value before filling an application with it. You can edit a form afterward, but fixing the source avoids repeating the same correction.",
          "Read the actual vacancy first. Keep the employer’s application instructions and your current resume available; a contact card is not a record of your complete employment history."
        ]
      },
      {
        "heading": "Turn on Safari contact AutoFill",
        "paragraphs": [
          "These are the settings described in Apple’s iPhone guide. On older iOS versions, Safari may appear directly in Settings rather than inside Apps. Menu wording can also differ by language."
        ],
        "steps": [
          "Open Settings, then Apps, then Safari.",
          "Open AutoFill and enable Use Contact Info.",
          "Open My Info and select your own contact card."
        ],
        "links": [
          {
            "label": "Apple’s current contact AutoFill instructions",
            "href": "https://support.apple.com/en-gb/guide/iphone/iphccfb450b7/ios"
          }
        ]
      },
      {
        "heading": "Use AutoFill on the employer’s application",
        "paragraphs": [
          "Open the application itself in Safari. A job description alone may have no fields to fill. On a form that supports contact AutoFill, tap an empty contact field and use AutoFill Contact above the keyboard when it appears. Choose the intended contact, then inspect the values in the form.",
          "Check the selected email and phone number especially carefully if your card contains several. A site may split names or addresses differently from your card. Correct misplaced or missing values before moving on. If Safari offers no suitable suggestion, enter the value yourself; repeatedly tapping a field does not establish that the site supports AutoFill."
        ]
      },
      {
        "heading": "Review contact details and custom answers separately",
        "paragraphs": [
          "Use this fictional field-review example to distinguish reusable contact details from questions that need a separate answer. Alex Morgan is an invented applicant; the table is a review exercise rather than a capture of a particular employer’s form."
        ],
        "table": {
          "caption": "Fictional application review example",
          "columns": [
            "Field",
            "Example detail",
            "Your review"
          ],
          "rows": [
            [
              "Name",
              "Alex Morgan",
              "Check the first-name and family-name fields separately."
            ],
            [
              "Email",
              "alex.morgan@example.com",
              "Use the address you monitor and check for an old suggestion."
            ],
            [
              "Phone",
              "+1 202-555-0146",
              "Check the country code and the format requested by the form."
            ],
            [
              "Employment dates",
              "Dates from Alex’s resume",
              "Enter and check these separately; contact AutoFill is not a work-history importer."
            ],
            [
              "Why this company?",
              "An answer written for this role",
              "Write from your own research and experience."
            ],
            [
              "Country or region",
              "The applicant’s actual location",
              "Check the form’s wording; a populated address does not answer whether the employer can hire you there."
            ]
          ]
        }
      },
      {
        "heading": "Complete the parts contact AutoFill does not cover",
        "paragraphs": [
          "Use your resume as a reference for employers, job titles and dates. Complete repeating work-history sections and dropdowns in the form’s required format. Answer work authorization, sponsorship, availability and compensation questions yourself; do not accept a suggestion simply because it fills an empty field.",
          "A document upload and resume parsing are separate from contact AutoFill. Attach the requested file, wait for processing and check any fields imported from it. If a form imports a date or title incorrectly, correct it before submission."
        ],
        "links": [
          {
            "label": "Attach the correct resume from iPhone Safari",
            "href": "/guides/attach-resume-from-iphone-safari/"
          },
          {
            "label": "Check resume formatting and imported fields",
            "href": "/guides/ats-friendly-resume-checklist/"
          }
        ]
      },
      {
        "heading": "Troubleshoot without losing your answers",
        "paragraphs": [
          "Before reloading or switching browsers, save a copy of any long written answers. If the employer’s form remains incompatible, use its official help channel or another supported device rather than leaving required fields inaccurate.",
          "A useful support note names the field, what you expected and what appeared. For example: “The phone value is correct in Contacts, but this form puts the country code in a separate dropdown.” Leave out personal details when asking a public support forum for help."
        ],
        "table": {
          "caption": "Contact AutoFill symptoms and next checks",
          "columns": [
            "What you see",
            "What to check"
          ],
          "rows": [
            [
              "No contact suggestion",
              "Check Use Contact Info and My Info, then tap a contact field in Safari. Complete it manually if the site does not offer support."
            ],
            [
              "An old email or address",
              "Check the selected contact card and the particular value offered. Correct the form and the source card."
            ],
            [
              "Some fields remain blank",
              "Fill them manually and inspect custom controls separately. A partial result is not proof the whole form is complete."
            ],
            [
              "No resume filename",
              "Use the employer’s upload control. Contact AutoFill does not attach a document."
            ]
          ]
        }
      },
      {
        "heading": "Run a final check before submitting",
        "paragraphs": [
          "Treat filled fields as a draft. Read the employer’s final review and consent text, submit only when ready, and save the confirmation afterward. A populated form or an uploaded file is not a submission receipt."
        ],
        "checklist": [
          "The company, role and application destination are correct.",
          "My contact details match the ones I intend the employer to use.",
          "Titles, dates and education agree with my resume.",
          "I answered the role-specific and eligibility questions myself.",
          "The correct documents are attached and any errors are resolved."
        ],
        "links": [
          {
            "label": "Understand autofill and auto-apply before choosing a tool",
            "href": "/guides/job-application-autofill-vs-auto-apply/"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Do I need an app or extension for contact AutoFill?",
        "answer": "No. Safari includes contact AutoFill. Third-party extensions are separate tools and are optional."
      },
      {
        "question": "Will Safari fill my entire resume into an application?",
        "answer": "Contact AutoFill is not a complete resume importer. Complete work history, custom questions and uploads separately, and review any fields the employer imports from a resume."
      },
      {
        "question": "Does AutoFill submit the application?",
        "answer": "No. Review the application and use the employer’s submission control yourself. A website may receive an attachment during upload, before that final step."
      }
    ],
    "sources": [
      {
        "label": "Apple: contact AutoFill in Safari on iPhone",
        "href": "https://support.apple.com/en-gb/guide/iphone/iphccfb450b7/ios"
      }
    ],
    "summary": "Enable contact AutoFill, choose your own contact card, and review every filled field. Your resume, work history and employer-specific answers need separate attention.",
    "screenshot": null,
    "eyebrow": "iPhone · Safari · Contact AutoFill",
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text."
  },
  {
    "slug": "job-application-autofill-vs-auto-apply",
    "cluster": "job-autofill",
    "title": "Job Application Autofill vs Auto-Apply: A Practical Comparison",
    "h1": "Job Application Autofill vs Auto-Apply",
    "description": "Compare contact autofill, resume import and auto-apply. Check what a tool can change or send, and choose where to keep a manual review.",
    "intro": "The useful distinction is what the tool can do before you approve an application. Filling a name, importing a resume and submitting to an employer are separate actions. Check those boundaries before handing a tool your documents or account access.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [
      "apply-to-jobs-faster-without-auto-submit"
    ],
    "relatedSlugs": [
      "autofill-job-applications-iphone",
      "attach-resume-from-iphone-safari",
      "ten-minute-job-application-workflow"
    ],
    "sections": [
      {
        "heading": "Identify the action you are automating",
        "paragraphs": [
          "A label such as one-click apply is not enough to explain a service. Look at the actual controls: does it suggest text, change the employer’s form, attach a file, choose vacancies or send the application? One product may combine several of these actions.",
          "Use the table to describe the workflow rather than to judge a named product. Features and defaults vary; verify the service you are considering."
        ],
        "table": {
          "caption": "Four actions that need different checks",
          "columns": [
            "Action",
            "What it does",
            "What you should verify"
          ],
          "rows": [
            [
              "Contact autofill",
              "Copies saved contact details into supported fields.",
              "The selected contact, current email and placement of each value."
            ],
            [
              "Resume import",
              "Attempts to extract information from a document.",
              "Titles, dates, employers and any field left blank or mapped incorrectly."
            ],
            [
              "Drafting assistance",
              "Suggests answers or cover-letter wording.",
              "Every claim, the employer’s instructions and the information shared with the service."
            ],
            [
              "Auto-apply",
              "Sends applications according to the service’s rules.",
              "Which roles and materials will be sent, whether approval is required, and how the outcome is recorded."
            ]
          ]
        }
      },
      {
        "heading": "Use autofill where the source information is stable",
        "paragraphs": [
          "Contact details are a reasonable place to reduce repeated typing. On iPhone, Safari’s contact AutoFill can use your selected contact card on supported forms. It is a starting point for the form, not a substitute for checking it.",
          "Keep a separate source for work history and approved factual details. For example, a saved employment start date can be reused when accurate. A response to “Why do you want this role?” needs a fresh connection to the particular vacancy."
        ],
        "links": [
          {
            "label": "Set up Safari contact AutoFill",
            "href": "/guides/autofill-job-applications-iphone/"
          }
        ]
      },
      {
        "heading": "Keep judgment-heavy answers under your control",
        "paragraphs": [
          "Review eligibility, sponsorship, availability, compensation expectations and consent language yourself. A tool can populate a field without understanding the consequences of the answer. Correct the form even when the suggestion came from a previously accurate application.",
          "Consider this fictional example: an applicant’s saved availability is two weeks, but a current notice commitment is six weeks. Reusing the old answer would be inaccurate even if the field was filled perfectly. The failure is in the source fact, not the typing."
        ]
      },
      {
        "heading": "Read the access request before enabling an extension",
        "paragraphs": [
          "Apple explains how Safari extensions receive access to websites. Use those controls to understand when an extension can operate, and inspect the tool’s own documentation for what it reads, stores and sends. Browser permission and a service’s data-retention policy answer different questions.",
          "Before connecting an account or uploading a resume to a third party, locate its data-use and deletion information. Decide whether the task needs a document upload, access to a particular website or broader account access. If the explanation is unclear, resolve that question before providing the data."
        ],
        "links": [
          {
            "label": "Apple: Safari extensions and website access",
            "href": "https://support.apple.com/guide/iphone/get-extensions-iphab0432bf6/ios"
          }
        ]
      },
      {
        "heading": "Try one intended application before relying on a workflow",
        "paragraphs": [
          "Start with a real vacancy you genuinely want, or a practice environment explicitly provided for testing. Do not send invented applications to employers to benchmark a tool.",
          "Record what changed and where a review is still needed. A few successful fields on one site do not establish compatibility with another employer’s application."
        ],
        "checklist": [
          "I can see the selected role and employer before anything is submitted.",
          "I can inspect and correct the fields and attachments that will be sent.",
          "I know whether a file is transmitted during upload or only at a later step.",
          "I understand which actions happen automatically and how to stop future activity.",
          "I can find the employer’s confirmation or check the application status."
        ]
      },
      {
        "heading": "Check what the employer actually received",
        "paragraphs": [
          "After a submission, keep the role reference, confirmation and version of the documents used. A tool’s internal “completed” label is not the same evidence as an employer’s receipt. If confirmation is missing, check the official application portal before sending another copy.",
          "If an error slips through, use the employer’s stated correction or withdrawal method when available. Do not assume uninstalling an extension withdraws an application or deletes a document already transmitted."
        ],
        "links": [
          {
            "label": "Use an application record that preserves the details",
            "href": "/guides/ten-minute-job-application-workflow/"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Is autofill the same as auto-apply?",
        "answer": "No. Autofill populates fields; auto-apply includes sending applications. A service may offer both, so inspect its actual controls."
      },
      {
        "question": "Does reviewing a preview guarantee the final application is accurate?",
        "answer": "No. Check the final form and attachments, then retain the employer’s confirmation. A preview is one checkpoint."
      },
      {
        "question": "Can I reuse answers safely?",
        "answer": "Reuse verified facts when they remain accurate. Revisit answers that depend on the role, employer, timing or your current circumstances."
      }
    ],
    "sources": [
      {
        "label": "Apple: contact AutoFill in Safari",
        "href": "https://support.apple.com/en-gb/guide/iphone/iphccfb450b7/ios"
      },
      {
        "label": "Apple: control Safari extension access",
        "href": "https://support.apple.com/guide/iphone/get-extensions-iphab0432bf6/ios"
      }
    ],
    "screenshot": null,
    "summary": "Choose automation for a specific task, check its access and review the result. A filled field, an uploaded document and a submitted application need different checks.",
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text."
  },
  {
    "slug": "attach-resume-from-iphone-safari",
    "cluster": "job-autofill",
    "title": "How to Upload a Resume From iPhone Safari",
    "h1": "How to Upload a Resume From iPhone Safari",
    "description": "Find your resume in Files, select it from a Safari application form, confirm the upload, and check file-type, cloud-file and parsing problems.",
    "intro": "Save the requested resume file in Files, open the employer’s application in Safari, and use its upload control to select the document. Wait for processing and confirm the filename. Attaching a resume and submitting the application are separate steps.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [],
    "relatedSlugs": [
      "ats-friendly-resume-checklist",
      "tailor-resume-to-job-description-iphone",
      "autofill-job-applications-iphone"
    ],
    "sections": [
      {
        "heading": "Read the file requirements before exporting",
        "paragraphs": [
          "Check the application for allowed file types and a size limit. Use DOCX when requested; use a text-based PDF when the form accepts it and you want to retain your layout. There is no file type that every employer prefers.",
          "Export from your original document rather than sending a screenshot of the resume. Open the exported file and inspect every page for missing text, awkward page breaks and broken links. Give it a clear name such as Alex-Morgan-Support-Resume.pdf."
        ]
      },
      {
        "heading": "Find the document in Files",
        "paragraphs": [
          "If the resume is in an email or another app, look for a share or export control and, when offered, choose Save to Files. Select a folder and save the copy. The source app may use different labels. Open Files afterward and check the filename and contents rather than choosing a document only by its position in Recents.",
          "For a downloaded document, check the configured Downloads location, such as iCloud Drive → Downloads or a folder under On My iPhone. Open a cloud-stored document and let it finish loading before you return to the application. A filename visible in a cloud folder is not enough to confirm the document is available to open.",
          "If the resume is in a third-party cloud service, Apple documents how to enable that provider under Files → Browse → More → Edit. Set up the provider’s app first; available locations depend on the apps and accounts on your device."
        ],
        "links": [
          {
            "label": "Apple: find downloaded files",
            "href": "https://support.apple.com/en-us/102440"
          },
          {
            "label": "Apple: add a cloud provider to Files",
            "href": "https://support.apple.com/en-us/102238"
          }
        ]
      },
      {
        "heading": "Upload the resume from Safari",
        "paragraphs": [
          "The employer controls the form and iOS controls the file-selection sheet, so labels vary. Look for an upload or attachment control rather than a browser menu."
        ],
        "steps": [
          "Open the employer’s application in Safari and find the resume field, labelled Upload, Attach, Choose File or similar.",
          "If iOS offers several sources, choose the file-browsing option, such as Choose File or Browse, rather than Photo Library for a PDF or DOCX.",
          "Navigate to the file in Files and select the intended version. Confirm any selection button shown by the picker.",
          "Wait for the website’s processing indicator to finish. Read any error beside the field.",
          "Check that the displayed filename is the file you selected. If a preview or download link is provided, inspect that too.",
          "Review imported contact and employment fields separately. A successful upload does not establish that parsing was accurate."
        ]
      },
      {
        "heading": "Practice choosing a file without sending it",
        "paragraphs": [
          "Use the practice picker below to rehearse locating a resume and checking its filename. It shows only the selected file’s name and size in this page. The exercise does not read the document’s contents, send the file, save it on this site or test an employer’s uploader. If the picker stays disabled, skip the exercise and follow the upload steps above.",
          "On iPhone, use the document-browsing option if the system offers several sources. Select a harmless sample file if you prefer not to display a real resume name. Choosing a file here is a practice selection, not a job application."
        ],
        "practice": "file-picker"
      },
      {
        "heading": "A worked file-selection example",
        "paragraphs": [
          "Suppose a fictional application accepts PDF or DOCX files below 5 MB. Alex has a 900 KB PDF in Files → iCloud Drive → Resumes, plus an older file named Resume-Draft.pdf in Downloads. These are illustrative requirements, not a rule for other sites.",
          "Alex opens Alex-Morgan-Support-Resume.pdf to check the content, selects that file from the application’s resume field, and waits until its name appears. After replacing an older attachment, Alex checks the displayed name again. The filename confirms which document the form shows; the employer’s final confirmation is still needed to establish submission."
        ]
      },
      {
        "heading": "Check common upload problems in order",
        "paragraphs": [
          "Use the form’s error message as evidence. Do not assume a disabled control or a missing preview has one universal cause. Save written answers before reloading or opening the form elsewhere."
        ],
        "table": {
          "caption": "Resume upload checks on iPhone",
          "columns": [
            "Problem",
            "Next check"
          ],
          "rows": [
            [
              "The file is missing from the picker",
              "Find and open it in Files first; confirm the location or cloud account. Save a copy to an accessible folder if needed."
            ],
            [
              "The file is greyed out or rejected",
              "Compare its actual format and size with the employer’s requirements. Renaming .pdf to .docx does not convert it."
            ],
            [
              "The upload stops or reports an error",
              "Read the error, check connectivity and confirm the file still opens. Retry after resolving the stated problem."
            ],
            [
              "The wrong version is attached",
              "Use the form’s replace or remove control, then select the correct file and check the resulting filename again."
            ],
            [
              "The file attaches but fields are wrong",
              "Correct the fields manually and check the resume’s structure; upload and parsing are different operations."
            ]
          ]
        },
        "links": [
          {
            "label": "Diagnose resume parsing and layout problems",
            "href": "/guides/ats-friendly-resume-checklist/"
          }
        ]
      },
      {
        "heading": "Treat upload as a disclosure of your document",
        "paragraphs": [
          "Choose a file only after checking the employer and destination. A website may send the file to its server as soon as you select or upload it, before you press the final Submit button. Closing the tab afterward does not establish that the uploaded copy was deleted.",
          "Keep the application focused on the requested materials. If no resume field exists, follow the employer’s stated method rather than sending the file to an unrelated contact address."
        ]
      },
      {
        "heading": "Confirm the application, not just the attachment",
        "paragraphs": [
          "Review the whole application, then submit when ready. Keep the confirmation page, email or application reference. If the site shows no confirmation, check its status or official support channel before sending a duplicate application."
        ],
        "checklist": [
          "The document opens and meets the form’s stated format and size limits.",
          "The displayed attachment name identifies the correct version.",
          "Any imported names, dates and work-history fields are accurate.",
          "Required answers and documents are complete.",
          "I saved a submission confirmation after the final step."
        ],
        "links": [
          {
            "label": "Manage resume versions while tailoring",
            "href": "/guides/tailor-resume-to-job-description-iphone/"
          },
          {
            "label": "Follow the complete iPhone application workflow",
            "href": "/guides/ten-minute-job-application-workflow/"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Should I upload a PDF or DOCX resume?",
        "answer": "Follow the employer’s instructions. If both are accepted, choose a version you have opened and checked; neither format guarantees correct parsing."
      },
      {
        "question": "Why can I see a cloud file but not attach it?",
        "answer": "Check that the provider is available in Files and the document opens successfully. Then check the form’s allowed formats. The specific cause depends on the provider and website."
      },
      {
        "question": "Does an uploaded filename mean I have applied?",
        "answer": "No. It indicates the attachment currently shown by the form. Complete the remaining steps and retain the employer’s submission confirmation."
      }
    ],
    "summary": "Locate and open the correct document, select it from the employer’s resume field, and verify its filename and imported details. The practice picker below lets you rehearse file selection locally.",
    "sources": [
      {
        "label": "Apple: locate downloads on iPhone",
        "href": "https://support.apple.com/en-us/102440"
      },
      {
        "label": "Apple: use cloud providers in Files",
        "href": "https://support.apple.com/en-us/102238"
      },
      {
        "label": "Greenhouse: supported candidate file formats; other sites may differ",
        "href": "https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads"
      }
    ],
    "screenshot": null,
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text."
  },
  {
    "slug": "ten-minute-job-application-workflow",
    "cluster": "job-autofill",
    "title": "How to Apply for Jobs on iPhone: A Practical Workflow",
    "h1": "How to Apply for Jobs on iPhone",
    "description": "Set up a useful search, review job fit, prepare documents, complete the form and track the exact application you sent from your iPhone.",
    "intro": "Use Safari, Files and a simple note or spreadsheet to move from a promising job to a checked application. Start by deciding whether the role fits. Then prepare the documents, complete the employer’s form and keep a record of the result. A complex application may need another device or a longer session.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [
      "apply-to-matched-jobs-iphone",
      "track-matched-jobs-after-applying",
      "review-job-matches-faster",
      "daily-job-match-routine",
      "avoid-bad-job-matches",
      "use-job-filters-without-missing-roles",
      "salary-signals-in-job-matches",
      "fresh-job-feed-application-strategy",
      "set-up-job-matching-profile",
      "best-skills-for-job-matches",
      "find-tech-jobs-that-match-resume",
      "job-matching-for-career-change"
    ],
    "relatedSlugs": [
      "find-top-remote-jobs-iphone",
      "autofill-job-applications-iphone",
      "tailor-resume-to-job-description-iphone"
    ],
    "sections": [
      {
        "heading": "Write a search brief you can reuse",
        "paragraphs": [
          "Before opening a job feed, put five details in a note: target role families, work you can demonstrate, acceptable locations, required working hours and any essential conditions. Separate a hard requirement from a preference so your filters do not accidentally hide acceptable roles.",
          "This fictional brief belongs to Alex Morgan: customer-support or support-operations work; experience answering booking and refund emails; a help-article update; and experience helping two colleagues learn a support queue. Alex records their own location and available hours separately. The brief is a search aid, not a prediction of matching scores.",
          "When a job site has a profile, make its factual history agree with the resume. Add recognizable skills you actually use. If several results are irrelevant, change one search term or filter and inspect the result before narrowing again."
        ]
      },
      {
        "heading": "Turn each promising listing into a decision",
        "paragraphs": [
          "Read the responsibilities and stated requirements, not just the title or remote badge. Verify the listing through the employer’s own careers site. A hard mismatch deserves a different decision from an unanswered question.",
          "When pay is published, record the range, currency, time basis and stated hours. Compare those details with your needs rather than assuming the top of a range will be offered. If compensation is missing and the role otherwise fits, save a budget question; a senior-sounding title is not a reliable substitute for a stated range."
        ],
        "table": {
          "caption": "Fictional shortlist decisions for Alex",
          "columns": [
            "Listing detail",
            "Evidence or constraint",
            "Decision"
          ],
          "rows": [
            [
              "Customer support role asks for email replies and help articles.",
              "Alex has examples of both; location and hours match the stated requirements.",
              "Prepare an application after reading the full role."
            ],
            [
              "Similar role lists a permitted region but not the applicant’s country.",
              "The wording does not establish whether Alex can be hired there.",
              "Save the official link with a precise location question."
            ],
            [
              "Support manager role requires direct management of a team.",
              "Helping two colleagues learn a queue does not establish that experience.",
              "Look for a closer role unless the employer clarifies that background is acceptable."
            ],
            [
              "Similar role says a second language is preferred, not required.",
              "Alex lacks that preference but can support the listed core work.",
              "Review the other requirements; do not treat a stated preference as an automatic rejection."
            ]
          ]
        },
        "links": [
          {
            "label": "Check country and schedule restrictions on remote jobs",
            "href": "/guides/find-top-remote-jobs-iphone/"
          },
          {
            "label": "Compare different vacancies at the same company",
            "href": "/guides/highest-hiring-companies-job-search/"
          }
        ]
      },
      {
        "heading": "Save the vacancy before you start editing",
        "paragraphs": [
          "Record the company, exact role title, job reference and official application URL. Keep the relevant responsibilities and document instructions in your private application record so you can refer to the version you read if the advertisement changes.",
          "Put an unresolved question beside the listing rather than creating an unexplained saved pile. Examples include “Does this role hire in my country?” or “Which days require office attendance?” Use a verified employer contact channel when clarification is needed."
        ]
      },
      {
        "heading": "Prepare documents and source facts in Files",
        "paragraphs": [
          "Open the resume you intend to use, then compare its strongest evidence with the vacancy. Tailor the summary and selected bullets where that makes the fit clearer. Keep dates and official titles consistent across versions.",
          "Put the checked export in a predictable Files folder. Save any required letter alongside it, then open both files. A recognizable filename helps you choose the correct version in the upload picker; it does not verify the contents on its own."
        ],
        "links": [
          {
            "label": "Tailor a resume and manage role-family versions",
            "href": "/guides/tailor-resume-to-job-description-iphone/"
          },
          {
            "label": "Draft and review a focused cover letter",
            "href": "/guides/ai-cover-letter-generator-review-checklist/"
          },
          {
            "label": "Locate downloaded documents on iPhone",
            "href": "https://support.apple.com/en-us/102440"
          }
        ]
      },
      {
        "heading": "Complete the form in separate passes",
        "paragraphs": [
          "First fill contact details and review the result. Next complete employment, education and role-specific questions. Finally attach the requested documents and inspect any fields imported from them. Keeping those passes separate makes omissions easier to spot.",
          "Keep long written answers in a private note while drafting. Save them before a session timeout, reload or device switch. Avoid copying sensitive details into a shared clipboard or third-party writing service without considering who can access them.",
          "Answer work authorization, sponsorship, availability and consent questions from your actual circumstances. A previous answer or matching score cannot establish the correct response for a new role."
        ],
        "links": [
          {
            "label": "Reduce repeated typing with Safari contact AutoFill",
            "href": "/guides/autofill-job-applications-iphone/"
          },
          {
            "label": "Choose and verify a resume attachment",
            "href": "/guides/attach-resume-from-iphone-safari/"
          },
          {
            "label": "Understand the boundary between autofill and auto-apply",
            "href": "/guides/job-application-autofill-vs-auto-apply/"
          }
        ]
      },
      {
        "heading": "Do a final review, then look for confirmation",
        "paragraphs": [
          "Read the employer’s review screen and required declarations. Check the employer name, role reference, contact details, date fields and final filenames. If the website offers an attachment preview, inspect it. Clear any visible errors before submitting.",
          "After choosing the final submission control, look for a confirmation page, email or application status. If the outcome is unclear, check the portal or official support route before creating a duplicate submission."
        ],
        "checklist": [
          "The right employer and role are selected.",
          "The resume and letter contain no details from another application.",
          "Required questions are complete and accurate.",
          "The intended documents are attached.",
          "The employer’s confirmation or application status is recorded."
        ]
      },
      {
        "heading": "Keep a record you can use when someone replies",
        "paragraphs": [
          "Create one row per role. Mark a draft as a draft; change it to submitted only when you have the evidence. Keep the actual document or version identifier, not merely the latest file in your resume folder.",
          "If you receive a reply, reopen this record before responding. If you follow up, use the employer’s stated timeline and contact method. No reply does not prove that the form failed or that a particular document format caused rejection.",
          "A fictional draft record could read: “ClearDesk — Customer Support Specialist — CS-101 — Alex-Morgan-Support-v3.pdf — draft — waiting to resolve the location question.” It stays a draft until submission is confirmed. In a real record, add the official URL and preserve the exact file sent."
        ],
        "table": {
          "caption": "A useful application record",
          "columns": [
            "Field",
            "What to save"
          ],
          "rows": [
            [
              "Role",
              "Employer, title, job reference and official URL."
            ],
            [
              "Materials",
              "Resume filename/version and the letter or answers used."
            ],
            [
              "Outcome",
              "Draft, submission unconfirmed, submitted, withdrawn or another confirmed status; date and confirmation reference."
            ],
            [
              "Next step",
              "A specific unresolved question or the employer’s stated follow-up instruction."
            ]
          ]
        }
      },
      {
        "heading": "Use a short session without rushing a complex form",
        "paragraphs": [
          "A short phone session can be useful even when you do not finish an application. Save the official listing, resolve one eligibility question or prepare a document. Stop at a clear checkpoint rather than submitting unchecked answers to meet a timer.",
          "If a form cannot be completed reliably on the phone, save the work you can preserve and use an employer-supported browser or device. Report a specific problem—such as an upload error or an inaccessible required field—through its official help channel. Never pay for the promise of a job; the FTC warns that this is a scam signal."
        ],
        "links": [
          {
            "label": "FTC: recognize job scams",
            "href": "https://consumer.ftc.gov/articles/job-scams"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Can I complete every job application on an iPhone?",
        "answer": "Some forms or document tasks may work poorly on mobile. Use the employer’s supported method and switch devices when that is the practical way to finish accurately."
      },
      {
        "question": "Should I apply if one requirement is unclear?",
        "answer": "Record the exact uncertainty and seek clarification through a verified employer channel. Do not invent an answer about your qualifications or eligibility."
      },
      {
        "question": "How do I improve irrelevant job matches?",
        "answer": "Check your target titles, truthful skills and location preferences. Change one search setting at a time so you can see which results it affects."
      },
      {
        "question": "Does an uploaded resume mean the application was submitted?",
        "answer": "No. Complete the employer’s final submission step and retain its confirmation or check the portal status."
      }
    ],
    "summary": "Define your target, decide apply/save/skip, prepare the right documents, check the form and record the confirmation. The useful outcome is a complete, accurate application—not a time target.",
    "sources": [
      {
        "label": "Apple: contact AutoFill",
        "href": "https://support.apple.com/en-gb/guide/iphone/iphccfb450b7/ios"
      },
      {
        "label": "Apple: downloaded files",
        "href": "https://support.apple.com/en-us/102440"
      },
      {
        "label": "MIT: specific evidence in resume writing",
        "href": "https://capd.mit.edu/resources/resumes-writing-about-your-skills/"
      },
      {
        "label": "FTC: job-scam warning signs",
        "href": "https://consumer.ftc.gov/articles/job-scams"
      }
    ],
    "screenshot": null,
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text."
  },
  {
    "slug": "ats-friendly-resume-checklist",
    "cluster": "resume",
    "title": "ATS-Friendly Resume Checklist: Format and Parsing Checks",
    "h1": "ATS-Friendly Resume Checklist",
    "description": "Check your resume’s file format, reading order, dates and relevant skills, then review imported fields. Includes a fictional parsing-review example.",
    "intro": "Follow the employer’s file instructions, use a readable text-based resume, and compare imported fields with the original after upload. This checklist helps you check formatting and accuracy; no template or keyword score guarantees an interview.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [
      "best-resume-format-job-application-forms",
      "pdf-resume-vs-online-form-fields",
      "fix-resume-parsing-mistakes"
    ],
    "relatedSlugs": [
      "tailor-resume-to-job-description-iphone",
      "attach-resume-from-iphone-safari",
      "ten-minute-job-application-workflow"
    ],
    "sections": [
      {
        "heading": "Separate uploading, parsing and hiring decisions",
        "paragraphs": [
          "Uploading stores a document. Parsing attempts to extract information such as names, titles and dates. Hiring decisions involve the employer’s requirements and process. Success at the first step does not establish success at the others.",
          "Greenhouse’s recruiter-side documentation describes files that attach while information extraction fails. That is evidence about one product’s processing; it does not tell you what every applicant-facing form will display."
        ],
        "links": [
          {
            "label": "Greenhouse: what an unsuccessful resume parse means",
            "href": "https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse"
          }
        ]
      },
      {
        "heading": "Check the employer’s format and size rules",
        "paragraphs": [
          "Use the formats accepted by the actual application. Export a text-based PDF or DOCX from your source document when those types are allowed. Do not send an image of the resume or change a filename extension to imitate another format.",
          "Upload and parser limits can differ. Greenhouse’s documentation lists a 2.5 MB parsing limit, separately from its candidate-upload allowance. Use the actual form’s instructions and current vendor guidance rather than applying one platform’s limit to every employer."
        ],
        "links": [
          {
            "label": "Greenhouse: candidate uploads and file types",
            "href": "https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads"
          }
        ]
      },
      {
        "heading": "Make the structure easy to follow",
        "paragraphs": [
          "Use recognizable headings such as Experience, Education and Skills. Keep each role’s title, employer and dates together, and use a consistent date style. Put your name and contact details in the main document body, where they do not depend on a decorative image.",
          "A plain single-column version is a useful fallback when extraction goes wrong. Greenhouse lists columns, text boxes, graphics, and header/footer placement among potential parsing problems. This does not mean every two-column resume is rejected, or that a plain layout will parse perfectly."
        ]
      },
      {
        "heading": "Compare expected information with imported fields",
        "paragraphs": [
          "This fictional review exercise is not an ATS benchmark. Alex’s source resume lists a Support Specialist role at fictional Northline Services from January 2023 to May 2026. Compare the possible discrepancies with the source, then use the same review method on your actual application."
        ],
        "table": {
          "caption": "Fictional resume-to-form review exercise",
          "columns": [
            "Source resume",
            "Possible discrepancy to look for",
            "What to do"
          ],
          "rows": [
            [
              "Alex Morgan; alex.morgan@example.com",
              "Name or email is absent from the form",
              "Enter the correct values. Check where contact text appears in the source document."
            ],
            [
              "Support Specialist — Northline Services",
              "Employer and job title appear in the wrong fields",
              "Correct both fields and keep each role in one clear block in the resume."
            ],
            [
              "January 2023–May 2026",
              "The end date is missing or a month is wrong",
              "Compare the required date format with the source and correct the imported dates."
            ],
            [
              "Experience followed by Education",
              "Text appears in a confusing order",
              "Check the export and try a simpler layout if necessary."
            ]
          ]
        }
      },
      {
        "heading": "Run a practical review loop",
        "paragraphs": [
          "A copy-and-paste check is a rough way to examine reading order, not a certificate that an employer’s parser will work. Use an application you actually intend to complete for any form-level review; do not send fictional applications to test a document."
        ],
        "steps": [
          "Open the exported document and inspect every page at a readable zoom.",
          "Select and copy its text into a plain note where possible. Check that headings, roles and dates make sense in sequence.",
          "If important text is absent or scrambled, inspect the source document and export a simpler version.",
          "When the intended application offers resume import, compare all imported fields with your original.",
          "Correct mistakes before submitting. If a problem repeats, repair the source resume and recheck the new export."
        ],
        "links": [
          {
            "label": "Upload and verify a resume on iPhone",
            "href": "/guides/attach-resume-from-iphone-safari/"
          }
        ]
      },
      {
        "heading": "Use relevant terms only where you have evidence",
        "paragraphs": [
          "Read the vacancy for important tools, skills and responsibilities. Include the terms you can support with experience, in context. Do not add an unfamiliar tool or copy a requirement into your work history simply to increase a matching score.",
          "For a fictional applicant who answered refund emails and updated a help article, “Answered booking and refund questions by email and documented a recurring issue in the help center” is more informative than “Excellent communicator.” Adding “in Salesforce” would be appropriate only if that applicant actually used it.",
          "A third-party score cannot tell you the employer’s hiring decision. Use feedback to find missing evidence or unclear wording, then review the application yourself."
        ],
        "links": [
          {
            "label": "Map job requirements to truthful resume evidence",
            "href": "/guides/tailor-resume-to-job-description-iphone/"
          }
        ]
      },
      {
        "heading": "Final resume and application checklist",
        "paragraphs": [
          "Once the document is readable, make the relevant evidence easy to find. MIT’s resume guidance explains how specific actions and context can show a skill more clearly than a generic label."
        ],
        "checklist": [
          "The file meets this application’s stated type and size requirements.",
          "The name, email, links and phone number are correct.",
          "Each role has a clear employer, title and accurate dates.",
          "Important information appears as text in a sensible reading order.",
          "Relevant skills are supported by actual work, projects or training.",
          "I reviewed any imported fields and resolved mistakes.",
          "The final attachment is the same version I checked."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Does every ATS reject two-column resumes?",
        "answer": "No universal rule establishes that. Some systems can misread columns; use a simpler layout when your reading-order or form checks reveal problems."
      },
      {
        "question": "Is a PDF always better than DOCX?",
        "answer": "No. Follow the employer’s accepted formats and test the exported version. A PDF can still contain an image or a layout that a parser handles poorly."
      },
      {
        "question": "Does a failed parse mean my application was rejected?",
        "answer": "Not necessarily. A file can attach while extraction fails. Check the actual form or message, correct the information where possible, and follow the employer’s instructions."
      },
      {
        "question": "What ATS score do I need?",
        "answer": "There is no universal score that guarantees an interview. Prioritize accurate qualifications, readable evidence, the employer’s requirements and a complete application."
      }
    ],
    "summary": "Use the requested file type, keep important information in ordinary text, and inspect the fields after upload. Clear evidence matters as much as readable formatting.",
    "sources": [
      {
        "label": "Greenhouse: recruiter-side parsing failures and layout issues",
        "href": "https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse"
      },
      {
        "label": "Greenhouse: supported candidate uploads",
        "href": "https://support.greenhouse.io/hc/en-us/articles/360052218132-Supported-formats-for-resumes-cover-letters-and-other-candidate-uploads"
      },
      {
        "label": "MIT: evidence-based resume writing",
        "href": "https://capd.mit.edu/resources/resumes-writing-about-your-skills/"
      }
    ],
    "screenshot": null,
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text.",
    "optionalTools": [
      {
        "label": "Free browser resume maker",
        "href": "/tools/free-resume-maker/",
        "description": "Creates a single-column PDF. Keep your editable source and use PDF only when the employer accepts it."
      }
    ]
  },
  {
    "slug": "tailor-resume-to-job-description-iphone",
    "cluster": "resume",
    "title": "How to Tailor a Resume on iPhone: Examples and Version Control",
    "h1": "Tailor a Resume to a Job Description on iPhone",
    "description": "Map a job description to truthful evidence, rewrite relevant bullets, organize resume versions and check the export before applying from iPhone.",
    "intro": "Tailoring means making relevant experience easy to find. Keep the facts of your employment history intact, choose evidence that fits the vacancy, and check the exported document. A requirement in an advertisement is something to assess—not a skill to add automatically.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [
      "resume-keywords-match-job-description",
      "job-match-keywords-resume",
      "multiple-resume-versions-different-roles"
    ],
    "relatedSlugs": [
      "ats-friendly-resume-checklist",
      "attach-resume-from-iphone-safari",
      "career-change-cover-letter-structure"
    ],
    "sections": [
      {
        "heading": "Keep the vacancy and your source resume together",
        "paragraphs": [
          "Save the official role title, reference and the requirements you are responding to. Open an editable source document rather than trying to maintain separate PDFs as your only records. Your private master can hold more material than any one submitted resume.",
          "On the phone, work from an editor that lets you inspect the document and export the requested format. Do not change the extension of a file to imitate a different format. Before editing, save a working copy so you can recover a useful version."
        ]
      },
      {
        "heading": "One workable iPhone editing route: Pages",
        "paragraphs": [
          "If you already use Pages, this is one concrete way to keep an editable source and a separate export. Other document editors have different controls. A PDF is an export to inspect; start from your editable resume when revising the text.",
          "Apple documents both More → Export and Share → Export and Send in its Pages guidance. Labels depend on the app version. Use the available export command and choose the format the employer requests."
        ],
        "steps": [
          "In the Pages document browser, locate the editable resume. Touch and hold its thumbnail and choose Duplicate to make a working copy.",
          "Open the copy. Use the document’s Rename control to identify the role family; Apple’s current guide places it under More → Document Options. Tap Edit if the document opens in reading view.",
          "Make the targeted text changes. Recheck titles, dates, qualifications and contact details before exporting.",
          "Use the export command, choose Word or PDF as required, then Save to Files and select a predictable folder.",
          "Open the exported file from Files and inspect it. Keep the editable copy for future corrections."
        ],
        "links": [
          {
            "label": "Apple: duplicate and rename a Pages document",
            "href": "https://support.apple.com/en-euro/guide/pages-iphone/tan95caaa4ff/ios"
          },
          {
            "label": "Apple: exporting and converting document formats",
            "href": "https://support.apple.com/en-gb/105050"
          },
          {
            "label": "Apple: open and edit documents in Pages",
            "href": "https://support.apple.com/en-ie/guide/pages-iphone/tancdeedb11c/ios"
          }
        ]
      },
      {
        "heading": "Make a requirement-to-evidence map",
        "paragraphs": [
          "The following job and applicant are fictional. ClearDesk’s Customer Support Specialist advertisement asks for email support, useful documentation, helping colleagues learn processes and Salesforce experience. Alex Morgan has answered booking and refund emails, updated a help article and helped two colleagues learn a queue. Alex has not used Salesforce.",
          "If a requirement appears central and you cannot support it, decide whether to seek clarification or pursue another role. A matching percentage cannot resolve that judgment for you."
        ],
        "table": {
          "caption": "Fictional tailoring worksheet",
          "columns": [
            "Requirement",
            "Available evidence",
            "Resume decision"
          ],
          "rows": [
            [
              "Clear customer email replies",
              "Answered booking and refund questions by email.",
              "Put this example near the top of the relevant role."
            ],
            [
              "Maintain help documentation",
              "Updated a help article after repeated questions.",
              "Describe the action and its context."
            ],
            [
              "Help colleagues learn processes",
              "Helped two new colleagues learn the queue.",
              "Include it if training is relevant; keep the scope accurate."
            ],
            [
              "Salesforce experience",
              "None supplied.",
              "Leave it out of the skills list; assess whether the employer treats it as essential."
            ]
          ]
        }
      },
      {
        "heading": "Rewrite the strongest bullets without inventing results",
        "paragraphs": [
          "Use an action, enough context to make the work understandable, and a result when you can verify one. MIT’s resume guidance describes this approach. A useful statement can still be specific when you do not have a reliable percentage.",
          "Keep the employer’s useful terminology when it accurately describes your work. Do not repeat a keyword where it makes the sentence awkward, or rename an official title to resemble a more senior job. These revisions demonstrate editing, not a measured improvement in interview outcomes."
        ],
        "table": {
          "caption": "Original examples using only Alex’s supplied facts",
          "columns": [
            "Generic or unsupported wording",
            "A more useful revision"
          ],
          "rows": [
            [
              "Excellent communicator and team player.",
              "Answered customer questions about bookings and refunds by email."
            ],
            [
              "Improved documentation efficiency by 40%.",
              "Updated a help article after noticing a recurring customer question."
            ],
            [
              "Managed the support department.",
              "Helped two new colleagues learn the support queue."
            ],
            [
              "Expert in Salesforce.",
              "Omit it: no Salesforce experience is supplied."
            ]
          ]
        },
        "links": [
          {
            "label": "MIT: describe skills through actions and results",
            "href": "https://capd.mit.edu/resources/resumes-writing-about-your-skills/"
          }
        ]
      },
      {
        "heading": "Change the summary and order only when it helps",
        "paragraphs": [
          "Put the most relevant skills, projects or experience where they are easy to find. A short summary can connect a career change, but it should not claim a job title or level you have not held. Leave factual dates and qualifications consistent across applications.",
          "For Alex’s fictional application, a restrained summary could be: “Support professional with experience answering booking and refund emails, updating help documentation and helping colleagues learn queue processes.” The Salesforce requirement stays an unanswered fit question rather than becoming a claim.",
          "A relevant project or volunteer responsibility can provide evidence. Label it accurately so a reader can distinguish paid work, a course exercise and independent practice."
        ]
      },
      {
        "heading": "Organize versions by role family",
        "paragraphs": [
          "Keep one verified master and only the versions that tell meaningfully different stories. A support-focused version can foreground customer replies; an operations-focused version can emphasize process and documentation work you actually did. Both should share the same factual employment history.",
          "A clear system separates editable sources, checked exports and archived copies. For example, keep a dated source privately and place Alex-Morgan-Customer-Support-Resume.pdf in an Active folder. The name is an organizational example, not a requirement imposed by employers.",
          "When a shared fact changes, correct the master and affected active versions. When a role-specific sentence changes, update the relevant version. Move obsolete exports out of the active picker folder rather than relying on “final-new-2” filenames."
        ],
        "table": {
          "caption": "A small resume version log",
          "columns": [
            "Item",
            "Example purpose"
          ],
          "rows": [
            [
              "Master source",
              "All verified facts and reusable evidence; not the file attached by default."
            ],
            [
              "Support source, version 3",
              "The selected summary, skills and bullets for support roles."
            ],
            [
              "Checked PDF export",
              "The exact exported document opened and reviewed before upload."
            ],
            [
              "Application record",
              "The role reference and the version actually sent."
            ]
          ]
        },
        "links": [
          {
            "label": "McMaster: tailoring evidence and keeping a career archive",
            "href": "https://socialsciences.careers.mcmaster.ca/career-planning/job-search/applications/resumes/resume-bullets/"
          }
        ]
      },
      {
        "heading": "Inspect the export and any imported fields",
        "paragraphs": [
          "Follow the employer’s format and size instructions, then reopen the exported document. Check page breaks, contact details, dates and links. Copying selectable text into a plain note can reveal confusing reading order, but it does not certify compatibility with an employer’s parser.",
          "If an application imports information from the resume, compare the actual fields with your source. A correct filename does not prove that a date or employer was extracted correctly. Correct the fields before submitting and repair the source if the same problem keeps occurring."
        ],
        "links": [
          {
            "label": "Review resume structure and parsing checks",
            "href": "/guides/ats-friendly-resume-checklist/"
          },
          {
            "label": "Select the correct file from iPhone Safari",
            "href": "/guides/attach-resume-from-iphone-safari/"
          }
        ]
      },
      {
        "heading": "Record the version you actually send",
        "paragraphs": [
          "Before choosing the final attachment, compare the displayed filename with your log and reopen a preview when the form provides one. After submitting, keep the checked export or a stable version identifier with the employer’s confirmation.",
          "If a recruiter responds, you can then discuss the same evidence they saw. Use response patterns cautiously: a different outcome between two applications does not isolate the effect of the resume wording, layout or keywords."
        ],
        "checklist": [
          "The selected evidence relates to the role’s actual responsibilities.",
          "Every title, date, qualification and result is accurate.",
          "Unsupported requirements have not become claimed skills.",
          "The exported file opens and meets this application’s instructions.",
          "The application record identifies the version sent."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Do I need a new resume for every job?",
        "answer": "Start from the closest role-family version. Make changes where they clarify relevant evidence; a new file for every vacancy is not automatically useful."
      },
      {
        "question": "Can I add a tool because the job description mentions it?",
        "answer": "Only claim experience you actually have. Separate a learning project from professional use and leave unfamiliar tools out of your skills claims."
      },
      {
        "question": "What if I cannot quantify an achievement?",
        "answer": "Describe the action and context accurately. Do not invent a number; a specific contribution can be useful without a percentage."
      },
      {
        "question": "How should I name resume files on iPhone?",
        "answer": "Use a name that identifies you and the role family, keep a private version history, and verify the contents before uploading. Follow any filename instruction from the employer."
      }
    ],
    "sources": [
      {
        "label": "MIT: writing about your skills",
        "href": "https://capd.mit.edu/resources/resumes-writing-about-your-skills/"
      },
      {
        "label": "McMaster: accomplishment statements and master records",
        "href": "https://socialsciences.careers.mcmaster.ca/career-planning/job-search/applications/resumes/resume-bullets/"
      },
      {
        "label": "Greenhouse: extraction can fail even when a resume attaches",
        "href": "https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse"
      },
      {
        "label": "Apple: keep a separate Pages copy",
        "href": "https://support.apple.com/en-euro/guide/pages-iphone/tan95caaa4ff/ios"
      },
      {
        "label": "Apple: export Word or PDF and save to Files",
        "href": "https://support.apple.com/en-gb/105050"
      }
    ],
    "screenshot": null,
    "summary": "Map requirements to evidence, adjust the parts that matter, save an identifiable version and review its export. Keep one private master so tailoring does not create conflicting facts.",
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text.",
    "optionalTools": [
      {
        "label": "Free browser resume maker",
        "href": "/tools/free-resume-maker/",
        "description": "Creates a single-column PDF. Keep your editable source and use PDF only when the employer accepts it."
      }
    ]
  },
  {
    "slug": "ai-cover-letter-generator-review-checklist",
    "cluster": "cover-letter",
    "title": "Draft a Cover Letter: Example + AI Review Checklist",
    "h1": "How to Draft and Review a Cover Letter",
    "description": "Write a cover-letter draft from your own evidence, compare a complete fictional example, and use a practical checklist to review AI-assisted wording.",
    "intro": "Name the role, choose one relevant example from your experience, and explain how it connects to the work. Draft the letter in your own words, then check the facts, employer details and format. AI assistance is optional and must follow the employer’s instructions.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [
      "write-cover-letter-fast",
      "entry-level-internship-cover-letter",
      "short-cover-letter-examples"
    ],
    "relatedSlugs": [
      "career-change-cover-letter-structure",
      "tailor-resume-to-job-description-iphone",
      "ten-minute-job-application-workflow"
    ],
    "sections": [
      {
        "heading": "Start with a small set of verified facts",
        "paragraphs": [
          "A useful draft starts with information you can stand behind: the exact role, two relevant requirements, a real example from your work or a project, and an accurate reason the opportunity interests you. If a detail is missing, leave a note to resolve it rather than asking AI to invent an achievement.",
          "For the example below, Alex Morgan is a fictional applicant for a fictional Customer Support Specialist role at ClearDesk. The role description asks for clear customer replies and maintenance of help articles. Alex’s supplied facts are limited to the following:"
        ],
        "bullets": [
          "Answered email support questions about bookings and refunds.",
          "Updated a help article after noticing a recurring customer question.",
          "Helped two new colleagues learn the support queue.",
          "Wants to contribute to a role that combines customer support and clearer documentation."
        ]
      },
      {
        "heading": "Write a focused first draft",
        "paragraphs": [
          "Start with the exact role and a genuine reason it interests you. Use the middle of the letter to explain one or two relevant examples, then close with the contribution you would like to discuss. Add detail the resume does not explain rather than repeating every role in paragraph form.",
          "For a first job or internship, the example can come from a course project, volunteer work or another responsibility. For a career change, explain the connection between the work you have done and the role you want. Keep titles, scope and results accurate.",
          "Store a small evidence bank: what happened, what you did and what result you can verify. Reuse those facts when relevant, but choose the example and employer-specific reason for each application. You can write the draft in a note or document; no generator is required."
        ],
        "links": [
          {
            "label": "Explain a career change in a cover letter",
            "href": "/guides/career-change-cover-letter-structure/"
          }
        ]
      },
      {
        "heading": "A complete fictional cover-letter draft",
        "paragraphs": [
          "Fictional example for demonstration only. ClearDesk and this vacancy are invented; this is not a real application or evidence of a hiring outcome.",
          "Dear Hiring Manager,",
          "I am applying for the Customer Support Specialist role at ClearDesk. I would like to build on my experience answering customer emails and maintaining help articles.",
          "In my support work, I answered questions about bookings and refunds. When a recurring question appeared in the queue, I updated a help article so customers had a clearer explanation to refer to. I also helped two new colleagues learn how to work through the support queue.",
          "Those experiences are relevant to the clear replies and documentation described in your role. I would welcome the chance to discuss how I approach a customer question and turn repeated confusion into more useful guidance.",
          "Thank you for considering my application.",
          "Alex Morgan",
          "Each factual claim in this draft maps to Alex’s supplied details. Replace the example with your own evidence and research the actual employer before writing."
        ]
      },
      {
        "heading": "A shorter version for an application text box",
        "paragraphs": [
          "This fictional short version uses the same supplied facts. Use it as an illustration of selecting evidence, not wording to paste into an unrelated application.",
          "I am applying for the Customer Support Specialist role at ClearDesk because it combines customer replies with help-article work. In my support work, I answered booking and refund questions by email and updated a help article after noticing a recurring question. I would welcome the chance to discuss how I could contribute to clearer customer guidance.",
          "Follow the form’s actual character limit. Remove lower-priority detail first, keep the core example, and check that the shortened version still says something specific about your fit."
        ]
      },
      {
        "heading": "Use this cover-letter review checklist",
        "paragraphs": [
          "Tick each item as you review the actual letter. Resolve any issue before marking it complete, and compare the final draft with your resume and the job description."
        ],
        "checklist": [
          "The employer, role title and any job reference are correct.",
          "Every skill, responsibility, qualification and result is supported by my experience.",
          "One concrete example shows how I meet an important requirement.",
          "My reason for applying relates to this employer or this role.",
          "The letter adds useful detail rather than repeating my whole resume.",
          "The wording sounds natural when I read it aloud.",
          "The letter follows the employer’s instructions and contains no placeholders.",
          "The final text or attachment matches the version I reviewed."
        ]
      },
      {
        "heading": "Before and after: replace claims with evidence",
        "paragraphs": [
          "These deliberately flawed draft sentences show what to remove. The revisions use only the fictional facts above. The unsupported claims in the first column are examples of mistakes, not achievements the applicant should copy."
        ],
        "table": {
          "caption": "Editing a fictional AI cover-letter draft",
          "columns": [
            "Flawed draft",
            "Reviewed revision",
            "Why change it?"
          ],
          "rows": [
            [
              "I am a perfect fit for your world-leading company.",
              "I am applying for the Customer Support Specialist role because it combines customer replies with help-article work.",
              "Names the actual work instead of making unsupported claims."
            ],
            [
              "I reduced response times by 40% and led a large team.",
              "I answered booking and refund questions and helped two new colleagues learn the support queue.",
              "Removes an invented metric and an inflated leadership claim."
            ],
            [
              "I have always admired your award-winning product.",
              "I would like to use recurring support questions to improve customer guidance.",
              "Uses a supplied motivation instead of inventing a history with the company."
            ]
          ]
        }
      },
      {
        "heading": "Review the draft against the role and your resume",
        "paragraphs": [
          "Put the job description, resume and letter beside one another. Check job titles, dates, qualifications and any numbers. A requirement in the advertisement is not evidence that you have that skill; delete sentences that accidentally present the employer’s wish list as your background.",
          "Choose a relevant example and explain its connection to the work. Avoid squeezing every keyword into the letter or retelling each job on your resume. MIT’s cover-letter guidance emphasizes specific examples that complement the resume and relate to the opportunity.",
          "If you cannot support a sentence, revise it before polishing its tone. Replace an invented percentage with the work you actually did. When an example depends on confidential customer or employer information, describe your contribution without identifying private details."
        ],
        "links": [
          {
            "label": "Check resume formatting and imported fields with the ATS checklist",
            "href": "/guides/ats-friendly-resume-checklist/"
          }
        ]
      },
      {
        "heading": "Use AI for editing only when appropriate",
        "paragraphs": [
          "Check the employer’s rules before using AI assistance. If you use a tool, supply only information you are comfortable sharing with that service and review its handling of your data. Remove confidential customer details or internal employer information from the material you share.",
          "An editing instruction you can adapt is: “Improve clarity using only these facts. Do not add skills, numbers, qualifications or knowledge of the employer. Flag missing information instead of inventing it.” Compare the output with the source facts again; the instruction does not guarantee accuracy.",
          "Read the final letter aloud. Replace phrases you would not normally use, generic praise and unsupported certainty with direct descriptions of your work. Treat an AI revision as another draft to check against the source facts."
        ]
      },
      {
        "heading": "Check the final format and application field",
        "paragraphs": [
          "Follow the employer’s instructions for file type, length and submission method. If no length is specified, keep the letter focused; the career guidance below uses a concise one-page format as a starting point. A web form may have its own character limit.",
          "For a text field, paste the reviewed letter and check paragraph breaks, quotation marks and any character counter. For an attachment, open the exported file and inspect every page. Confirm the filename and make sure a previous draft is not still attached. Do one final check for the wrong employer name, bracketed placeholders and an old role title.",
          "Do not add a letter through an unrelated contact channel when the application does not request one. Complete the materials the employer asks for, then review the whole application before choosing Submit."
        ],
        "links": [
          {
            "label": "Find and upload your application documents from iPhone Safari",
            "href": "/guides/attach-resume-from-iphone-safari/"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Can I draft a cover letter without AI?",
        "answer": "Yes. Start with the role, a genuine reason for applying and one or two examples you can support. Write the draft in a note or document and use the review checklist before sending."
      },
      {
        "question": "What if I have no formal work experience?",
        "answer": "Use a relevant project, course, volunteer activity or other responsibility. Describe your actual contribution without presenting it as paid experience or inventing results."
      },
      {
        "question": "Can I reuse the same letter for every employer?",
        "answer": "Reuse your structure and source facts, but select evidence and explain your interest for the actual role. Check the employer name, role and requirements each time."
      },
      {
        "question": "Should I keep a percentage suggested by AI?",
        "answer": "Only if you can verify it from your own work. Otherwise remove it and describe the contribution accurately."
      },
      {
        "question": "How long should the letter be?",
        "answer": "Follow the employer’s instructions. Without a specific limit, keep the letter focused; a text field may require a shorter version than a document attachment."
      }
    ],
    "sources": [
      {
        "label": "MIT: effective cover-letter structure and tailoring",
        "href": "https://capd.mit.edu/resources/how-to-write-an-effective-cover-letter/"
      },
      {
        "label": "MIT: describing skills through evidence",
        "href": "https://capd.mit.edu/resources/resumes-writing-about-your-skills/"
      }
    ],
    "summary": "Build the draft from verified facts, keep the evidence specific and review every claim before sending. Use the example and checklist below with or without AI.",
    "screenshot": null,
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text.",
    "optionalTools": [
      {
        "label": "Free cover-letter template",
        "href": "/tools/free-cover-letter-generator/",
        "description": "A browser template, not an AI writer. Replace its sample details and check the finished text."
      }
    ]
  },
  {
    "slug": "career-change-cover-letter-structure",
    "cluster": "cover-letter",
    "title": "Career-Change Cover Letter: Complete Example and Writing Guide",
    "h1": "Write a Cover Letter for a Career Change",
    "description": "Explain a career change with transferable evidence, a complete fictional letter and a checklist that keeps the story accurate and relevant.",
    "intro": "Name the role you want, show one credible connection from your previous work, and explain what you have done to prepare. Your letter should make the transition understandable without presenting adjacent experience as a job you have already held.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [],
    "relatedSlugs": [
      "ai-cover-letter-generator-review-checklist",
      "tailor-resume-to-job-description-iphone",
      "ten-minute-job-application-workflow"
    ],
    "sections": [
      {
        "heading": "Decide whether the experience gap can be explained",
        "paragraphs": [
          "Read the vacancy before drafting a persuasive story. Separate a required license, location or qualification from experience that the employer says can be equivalent or preferred. A good letter cannot turn an unmet hard requirement into eligibility.",
          "If a requirement is ambiguous, ask through the employer’s verified contact route or choose a role with a clearer match. Keep your current title and qualifications accurate while explaining the work that transfers."
        ]
      },
      {
        "heading": "Build a fact sheet before writing the letter",
        "paragraphs": [
          "Here is the complete source material for the fictional example below. Jordan Lee, the applicant, and Cedar Works, the employer, are invented. This is a writing exercise, not a real application or a hiring success story."
        ],
        "bullets": [
          "Jordan has worked as a retail shift supervisor.",
          "Jordan prepared weekly shift schedules and maintained an inventory spreadsheet.",
          "Jordan trained three colleagues in stock-check procedures.",
          "Jordan completed an introductory spreadsheet course and made a personal stock-reconciliation practice sheet.",
          "The fictional Operations Coordinator role involves scheduling, maintaining records and communicating discrepancies.",
          "Jordan wants to move toward work centered on coordination and records rather than direct retail sales."
        ]
      },
      {
        "heading": "Translate the work without changing its level",
        "paragraphs": [
          "Match the action in the vacancy to something you have actually done. Similar actions can connect different settings, but the scale, tools and responsibility still need an honest description."
        ],
        "table": {
          "caption": "Mapping Jordan’s supplied experience",
          "columns": [
            "Target work",
            "Evidence from retail",
            "What the letter should not claim"
          ],
          "rows": [
            [
              "Scheduling",
              "Prepared weekly shift schedules.",
              "Company-wide workforce planning."
            ],
            [
              "Accurate records",
              "Maintained an inventory spreadsheet.",
              "Ownership of an enterprise inventory system."
            ],
            [
              "Explain a process",
              "Trained three colleagues in stock checks.",
              "Management of an operations department."
            ],
            [
              "Develop spreadsheet skills",
              "Completed an introductory course and a practice sheet.",
              "Advanced analytics experience or a professional project outcome."
            ]
          ]
        }
      },
      {
        "heading": "A complete fictional career-change letter",
        "paragraphs": [
          "The letter below uses only the supplied facts. Its purpose is to show a clear bridge and an appropriately limited learning claim.",
          "Dear Hiring Manager,",
          "I am applying for the Operations Coordinator role at Cedar Works. I would like to bring my retail scheduling and record-keeping experience to the coordination work described in your vacancy.",
          "As a retail shift supervisor, I prepared weekly shift schedules and maintained an inventory spreadsheet. I also trained three colleagues in stock-check procedures. These responsibilities gave me practical examples of coordinating work, keeping information organized and explaining a process to others.",
          "To prepare for the transition, I completed an introductory spreadsheet course and built a personal stock-reconciliation practice sheet. I would welcome the opportunity to discuss how my scheduling and record-keeping experience relates to this role.",
          "Thank you for considering my application.",
          "Jordan Lee"
        ]
      },
      {
        "heading": "Make the opening specific to the actual employer",
        "paragraphs": [
          "Jordan’s example names the work described in a fictional vacancy. For your own application, add an accurate reason that the particular role or employer interests you. It might be the customer group, product, responsibilities or a problem described in the advertisement. Research it before claiming a connection.",
          "Avoid invented familiarity such as saying you have used a product for years when you have not. A short, specific interest is more useful than unsupported praise. MIT’s cover-letter guidance recommends connecting relevant examples with the particular opportunity."
        ],
        "links": [
          {
            "label": "MIT: write a focused letter for a specific opportunity",
            "href": "https://capd.mit.edu/resources/how-to-write-an-effective-cover-letter/"
          }
        ]
      },
      {
        "heading": "Keep the resume and letter telling the same story",
        "paragraphs": [
          "Use the resume to make the relevant work easy to find, while keeping the official title and dates unchanged. The letter can explain the connection; it should not introduce an achievement that the rest of the application cannot support.",
          "For Jordan, that means making schedules, inventory records and colleague training visible under the retail role. The course and practice sheet belong under learning or projects with labels that identify their scope."
        ],
        "links": [
          {
            "label": "Tailor a resume using a requirement-to-evidence map",
            "href": "/guides/tailor-resume-to-job-description-iphone/"
          }
        ]
      },
      {
        "heading": "Review the transition story before sending",
        "paragraphs": [
          "Read the letter against your fact sheet and the vacancy. If you use AI to edit it, ask for unsupported claims to be flagged, then compare the output with your facts yourself. Follow any employer rules about AI assistance.",
          "Use the requested format and submission method. For a text box, check the pasted paragraph breaks and character limit. For a file, open the final export. Cut unrelated history before making the wording smaller or harder to read."
        ],
        "checklist": [
          "The destination role and motivation are clear.",
          "At least one transferable action has a concrete example.",
          "Learning activities are distinguished from professional experience.",
          "The letter does not disguise a missing hard requirement.",
          "The resume, letter and form agree on titles, dates and scope.",
          "No employer names, placeholders or claims remain from another application."
        ],
        "links": [
          {
            "label": "Use the general cover-letter drafting and review checklist",
            "href": "/guides/ai-cover-letter-generator-review-checklist/"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Should I apologize for changing careers?",
        "answer": "A factual explanation of the direction you want and the evidence you bring is more useful than an apology. Address a relevant gap directly without disguising it."
      },
      {
        "question": "Can I use experience from another industry?",
        "answer": "Yes when the action is relevant and you preserve its actual context and scope. Show what you did rather than relying on a transferable-skills label."
      },
      {
        "question": "What if my only new-field experience is a course project?",
        "answer": "Label it as a course project and explain your own contribution. Do not present it as a paid role or a workplace result."
      },
      {
        "question": "Should I explain personal reasons for leaving my field?",
        "answer": "Include only what helps explain the application and what you are comfortable sharing. You can focus on the work you want next without disclosing private circumstances."
      }
    ],
    "sources": [
      {
        "label": "MIT: cover-letter structure and specific examples",
        "href": "https://capd.mit.edu/resources/how-to-write-an-effective-cover-letter/"
      },
      {
        "label": "MIT: showing skills through evidence",
        "href": "https://capd.mit.edu/resources/resumes-writing-about-your-skills/"
      }
    ],
    "screenshot": null,
    "summary": "Build the letter around a demonstrated transferable action and concrete preparation. Use the example to understand the structure, then replace its details with your own facts.",
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text."
  },
  {
    "slug": "find-top-remote-jobs-iphone",
    "cluster": "job-matching",
    "title": "How to Find Remote Jobs on iPhone: Location and Fit Checks",
    "h1": "How to Find Remote Jobs on iPhone",
    "description": "Search for remote roles, check country and working-hour restrictions, verify the employer and build a shortlist you can act on from iPhone.",
    "intro": "Start with the work you can demonstrate and the places an employer can hire you. A remote label does not establish that a job is open worldwide, has flexible hours or matches your experience. Use your phone to narrow the search before spending time on an application.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [
      "remote-hybrid-onsite-job-filters",
      "find-entry-level-remote-jobs",
      "remote-job-region-tags"
    ],
    "relatedSlugs": [
      "ten-minute-job-application-workflow",
      "highest-hiring-companies-job-search",
      "tailor-resume-to-job-description-iphone"
    ],
    "sections": [
      {
        "heading": "Choose a role family and a few useful search terms",
        "paragraphs": [
          "Start from responsibilities you can support with examples. For customer-support work, useful terms might include customer support, customer service and help-center documentation. Inspect what the results actually involve rather than assuming those titles are interchangeable.",
          "Use the job site’s remote or work-mode filter if one is available, then add location and level filters one at a time. If useful roles disappear, remove the most restrictive setting and inspect the wording in individual vacancies. A broad filter result is an invitation to review, not confirmation of eligibility."
        ]
      },
      {
        "heading": "Run the search and save the official role on your phone",
        "paragraphs": [
          "Open Safari and try a search that combines work, location and a useful alternative title. For example, “customer support remote Canada”, “customer operations remote Europe”, or a known employer’s name plus “careers support”. These are query examples, not keywords with measured market-wide search volume.",
          "Follow a promising result to the employer’s official site. Within its careers page, inspect the available department and location filters and open the individual role. Search-engine results and board filters can be stale or broader than the actual listing."
        ],
        "steps": [
          "Read the official role title, reference, hiring locations and required hours.",
          "Open Safari’s Share menu; depending on the layout, it may be inside the Page Menu. Choose Notes, select or create an application note, then save the link.",
          "In that note, add your reason for considering the role and a specific unresolved question. Keep required locations and hours beside the link.",
          "Return to the official vacancy when you are ready to apply and check that the instructions are still current."
        ],
        "links": [
          {
            "label": "Apple: save a website to a note from another app",
            "href": "https://support.apple.com/en-au/118442"
          }
        ]
      },
      {
        "heading": "Read the employer’s official listing",
        "paragraphs": [
          "Find the company’s careers page from its official website and locate the same title or job reference. Follow the application link supplied there, including a third-party hiring platform when that is the employer’s documented route.",
          "An employer name and logo on a job board do not independently verify a listing. If a role is missing from the official site, check the employer’s stated recruiting channels or seek clarification before sharing documents or identity information."
        ]
      },
      {
        "heading": "Check geography and hours as separate requirements",
        "paragraphs": [
          "Country, region, time-zone overlap, travel and office attendance can each constrain a role. Read the full description for these conditions; a remote badge may omit them.",
          "Do not change your stated location to pass a form or assume a regional label answers a work-authorization question. Follow the employer’s eligibility instructions and clarify uncertainty directly."
        ],
        "table": {
          "caption": "Illustrative location wording—not live vacancies",
          "columns": [
            "Listing wording",
            "What remains to check",
            "Next step"
          ],
          "rows": [
            [
              "Remote—United States",
              "Whether the role hires in your actual location and any state restrictions.",
              "Read the stated conditions; do not treat remote as worldwide."
            ],
            [
              "Remote—Europe",
              "Which countries the employer includes and can hire in.",
              "Ask about your specific country when the listing is unclear."
            ],
            [
              "Remote, with required overlap during 13:00–17:00 UTC",
              "Whether you can work those hours in your local time, including seasonal clock changes.",
              "Compare the required interval with your actual availability."
            ],
            [
              "Hybrid, two office days",
              "Which office, which days and any attendance expectations.",
              "Resolve the practical commute and schedule before applying."
            ]
          ]
        }
      },
      {
        "heading": "A researched example: all-remote still needs a location check",
        "paragraphs": [
          "GitLab describes itself as an all-remote company. Its public country-hiring guidance also says that some roles have location-specific eligibility requirements. This pair of primary sources, checked on October 29, 2026, illustrates why company-wide remote culture and a vacancy’s hiring locations need separate checks.",
          "Use the current listing for the role you are considering. This example is not a list of available jobs or an endorsement, and the employer’s policy may change."
        ],
        "links": [
          {
            "label": "GitLab: company careers page",
            "href": "https://about.gitlab.com/jobs/"
          },
          {
            "label": "GitLab: country-hiring guidance",
            "href": "https://handbook.gitlab.com/handbook/people-group/employment-solutions/"
          }
        ]
      },
      {
        "heading": "Review the role’s level and support needs",
        "paragraphs": [
          "For entry-level searches, inspect the actual experience requirements and the work expected in the first months. A junior title alone does not explain supervision, training, working hours or the tools you must already know.",
          "For an asynchronous role, look for how the team documents decisions and handles urgent work. For customer-facing shifts, check the roster and coverage requirements. Turn an uncertainty into a specific question, such as “What training is provided before I handle the queue independently?”",
          "Keep an unfamiliar required skill as a fit question. Do not add it to your profile just because the search result matches your preferred title."
        ]
      },
      {
        "heading": "Use a shortlist with a reason and an unanswered question",
        "paragraphs": [
          "Save the official URL, job reference, permitted locations, required hours and strongest evidence of fit. Give the role one outcome: apply, save for a named clarification or skip for a clear mismatch.",
          "In a fictional example, a support applicant finds three remote listings. One permits their location and asks for work they can demonstrate; they prepare that application. Another has ambiguous country wording; they save a location question. The third requires hours they cannot work; they skip it rather than changing their availability.",
          "A remote search still needs a normal application record. Keep the resume version, materials and confirmation once you submit."
        ],
        "links": [
          {
            "label": "Move from a shortlist to a checked iPhone application",
            "href": "/guides/ten-minute-job-application-workflow/"
          },
          {
            "label": "Tailor the resume to the actual responsibilities",
            "href": "/guides/tailor-resume-to-job-description-iphone/"
          }
        ]
      },
      {
        "heading": "Stop when the recruiting process becomes suspicious",
        "paragraphs": [
          "The FTC warns about paying for the promise of a job and fake-check arrangements that require you to send money onward. Verify unexpected messages through a contact route found independently on the company’s official site.",
          "Before providing identity or payment details, check who is requesting them, at what stage and through which verified process. A polished website or a lack of online complaints is not a guarantee of legitimacy."
        ],
        "links": [
          {
            "label": "FTC: job scams and warning signs",
            "href": "https://consumer.ftc.gov/articles/job-scams"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Does remote mean work from anywhere?",
        "answer": "No. Check the role’s permitted locations, hours and other eligibility requirements. An employer can be remote-first while restricting where a particular role is hired."
      },
      {
        "question": "Why does a remote role ask for my location?",
        "answer": "Location may matter to the employer’s hiring arrangements, schedule or role requirements. Read its instructions and answer accurately."
      },
      {
        "question": "How do I search for entry-level remote work?",
        "answer": "Use related role titles and inspect the actual duties, required skills, training and supervision. A title or remote filter does not establish that the role is suitable."
      },
      {
        "question": "Should I apply when my country is not mentioned?",
        "answer": "Check the full listing and employer’s hiring guidance. When the wording is genuinely unclear, ask about your specific location through a verified channel."
      }
    ],
    "sources": [
      {
        "label": "GitLab: remote company context",
        "href": "https://about.gitlab.com/jobs/"
      },
      {
        "label": "GitLab: location-specific hiring requirements",
        "href": "https://handbook.gitlab.com/handbook/people-group/employment-solutions/"
      },
      {
        "label": "FTC: recognize job scams",
        "href": "https://consumer.ftc.gov/articles/job-scams"
      },
      {
        "label": "Apple: save a website in Notes",
        "href": "https://support.apple.com/en-au/118442"
      }
    ],
    "screenshot": null,
    "summary": "Search by role and location, read the official vacancy, verify country and schedule requirements, and save each promising role with a clear next step.",
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text."
  },
  {
    "slug": "highest-hiring-companies-job-search",
    "cluster": "job-matching",
    "title": "How to Find Companies With Multiple Job Openings",
    "h1": "Find Companies Hiring for Several Roles",
    "description": "Verify openings on company careers pages, distinguish duplicate advertisements from separate roles and choose applications supported by your experience.",
    "intro": "Repeated company names in a job feed can help you discover employers, but a count of advertisements does not tell you how many people will be hired. Verify the official openings, separate role references and choose the vacancies whose work you can actually support.",
    "datePublished": "2026-05-28",
    "dateModified": "2026-10-29",
    "redirectFrom": [
      "find-companies-with-many-open-roles",
      "find-startup-jobs-hiring-now"
    ],
    "relatedSlugs": [
      "find-top-remote-jobs-iphone",
      "ten-minute-job-application-workflow",
      "tailor-resume-to-job-description-iphone"
    ],
    "sections": [
      {
        "heading": "Build the list from official careers pages",
        "paragraphs": [
          "Use a job board or search result to find a possible employer, then reach its careers page from the company’s official website. Search by the function, title or location you want and save the official role link and reference.",
          "Look for related titles rather than applying the same title assumption to every company. Customer support, customer operations and customer education may describe different responsibilities. The vacancy text should tell you which work is actually being hired."
        ]
      },
      {
        "heading": "Count distinct job references rather than cards in a feed",
        "paragraphs": [
          "The following example is fictional. It demonstrates a review method, not a current employer’s hiring activity. A vacancy may appear in several locations or on several boards, and a single requisition may cover more than one hire.",
          "The worksheet contains three distinct references. It does not establish three hires, current recruiting budgets or your chances of being selected. When references are absent, compare the full description and official application link before treating two entries as duplicates."
        ],
        "table": {
          "caption": "Five fictional advertisements, three job references",
          "columns": [
            "Advertisement",
            "Reference",
            "What to record"
          ],
          "rows": [
            [
              "Support Specialist—location A",
              "CS-101",
              "First copy of reference CS-101."
            ],
            [
              "Support Specialist—location B",
              "CS-101",
              "Same reference; inspect permitted locations rather than counting another distinct requisition."
            ],
            [
              "Senior Support Specialist",
              "CS-102",
              "A different reference and seniority level."
            ],
            [
              "Help-Center Writer on the company site",
              "CW-103",
              "A third reference with different work."
            ],
            [
              "Help-Center Writer on an external board",
              "CW-103",
              "Another advertisement for the same recorded reference."
            ]
          ]
        }
      },
      {
        "heading": "Check whether each listing is relevant and usable now",
        "paragraphs": [
          "Inspect the responsibilities, hiring locations, level and application instructions. Check whether the official role page still accepts applications. A displayed date is one clue, not proof that a position is active or that it has just been created.",
          "Many advertisements can reflect different teams, replacement hiring, a talent pool or duplicate distribution. Treat company growth as a separate research question. Avoid turning the number of cards in a search result into a claim about business health."
        ],
        "links": [
          {
            "label": "Check remote roles for location and schedule restrictions",
            "href": "/guides/find-top-remote-jobs-iphone/"
          }
        ]
      },
      {
        "heading": "Compare the actual work before choosing a role",
        "paragraphs": [
          "Return to the fictional references above. An applicant with experience answering customer emails and updating a help article may have relevant evidence for CS-101. For CS-102, check what senior responsibilities the listing requires. For CW-103, check whether the employer asks for a writing portfolio; customer-support experience alone does not establish that evidence.",
          "Read each role independently. Highlight what you can demonstrate and what remains uncertain. When several roles are credible, explain the appropriate connection in each application while keeping your employment history consistent.",
          "Employer rules about multiple applications differ. GitLab’s candidate handbook explicitly discusses applying for more than one role; use it as an example of an employer publishing its policy, not a rule for other companies."
        ],
        "links": [
          {
            "label": "GitLab: candidate handbook and multiple-role applications",
            "href": "https://handbook.gitlab.com/handbook/hiring/candidate-faq/"
          },
          {
            "label": "Map a vacancy’s requirements to resume evidence",
            "href": "/guides/tailor-resume-to-job-description-iphone/"
          }
        ]
      },
      {
        "heading": "For startups, clarify scope before writing a broad pitch",
        "paragraphs": [
          "A small company may describe work that spans several functions. Ask which outcomes and responsibilities matter most, who you would work with and what skills are expected at the start. A broad title is not evidence that you must claim expertise across every listed tool.",
          "Use company research to form specific questions: “Which of the listed responsibilities is the priority for this hire?” or “Who owns the work this role will take over?” Keep your resume and letter focused on the evidence relevant to the answer."
        ]
      },
      {
        "heading": "Track applications under both company and role",
        "paragraphs": [
          "Keep one company note for shared research, then one application row per role reference. Save the exact resume and letter used, the date and the employer’s confirmation. This prevents a reply about one vacancy from being confused with another application.",
          "If a recruiter discusses several openings, use that record to explain what interests you about each. Follow the company’s instructions about additional applications or routing a candidate to another team."
        ],
        "links": [
          {
            "label": "Use the complete iPhone application workflow",
            "href": "/guides/ten-minute-job-application-workflow/"
          },
          {
            "label": "Set up Safari contact AutoFill",
            "href": "/guides/autofill-job-applications-iphone/"
          },
          {
            "label": "Upload the correct resume from iPhone Safari",
            "href": "/guides/attach-resume-from-iphone-safari/"
          }
        ]
      },
      {
        "heading": "Verify unexpected recruiting messages independently",
        "paragraphs": [
          "Use an official company contact route to check an unexpected request. Do not rely only on a logo, a familiar employee name or the conversation’s original email link. The FTC warns against paying for the promise of employment and forwarding money from a supposed employer’s check.",
          "Research can help you decide whether to proceed, but it cannot guarantee that an opportunity is legitimate. Stop and seek clarification when the recruiting channel or request does not match the company’s published process."
        ],
        "links": [
          {
            "label": "FTC: job-scam advice",
            "href": "https://consumer.ftc.gov/articles/job-scams"
          }
        ]
      }
    ],
    "faqs": [
      {
        "question": "Does a high vacancy count mean a company is growing?",
        "answer": "Not necessarily. Check the official roles and investigate any growth claim separately; advertisement counts do not establish hiring budgets or business health."
      },
      {
        "question": "Can one job reference represent several hires?",
        "answer": "Yes, it can. A distinct-reference count is a way to organize advertisements, not a verified headcount forecast."
      },
      {
        "question": "How many jobs should I apply for at the same company?",
        "answer": "Follow the employer’s instructions and apply where you have a credible fit. There is no universal numerical limit appropriate to every employer."
      },
      {
        "question": "What if the official vacancy has disappeared?",
        "answer": "Check the employer’s stated recruiting channels or contact route before sharing more information or assuming that an external copy remains current."
      }
    ],
    "sources": [
      {
        "label": "GitLab: candidate handbook and role-specific recruiting process",
        "href": "https://handbook.gitlab.com/handbook/hiring/candidate-faq/"
      },
      {
        "label": "FTC: verify opportunities and recognize scams",
        "href": "https://consumer.ftc.gov/articles/job-scams"
      }
    ],
    "screenshot": null,
    "summary": "Use hiring activity to find employers, then inspect individual vacancies. Deduplicate advertisements, check the requirements and keep a separate record for each application.",
    "editorialNote": "Prepared with AI-assisted drafting and editorial review. Linked technical and career guidance was checked on October 29, 2026. Fictional examples are identified in the text."
  }
];

export const retainedGuideSlugs = guidePlans.map((guide) => guide.slug);

export const guideRedirects = Object.fromEntries(
  guidePlans.flatMap((guide) => guide.redirectFrom.map((source) => [
    `/guides/${source}/`, `/guides/${guide.slug}/`
  ]))
);

if (guidePlans.length !== 10) throw new Error("Expected 10 retained guides, found " + guidePlans.length);
if (Object.keys(guideRedirects).length !== 30) throw new Error("Expected 30 guide redirects, found " + Object.keys(guideRedirects).length);
