export const SITE_MODIFIED = "2026-08-12";

const screenshots = {
  autofill: {
    src: "/public/ios/iphone/1125x2436/en/03-device-bottom.png",
    alt: "JobHunter saved profile and reusable application answers on iPhone"
  },
  resume: {
    src: "/public/ios/iphone/1125x2436/en/04-device-top.png",
    alt: "JobHunter resume builder workflow on iPhone"
  },
  attach: {
    src: "/public/ios/iphone/1125x2436/en/05-device-bottom.png",
    alt: "JobHunter resume attachment workflow in an iPhone job application"
  },
  matching: {
    src: "/public/ios/iphone/1125x2436/en/06-two-devices.png",
    alt: "JobHunter matched job discovery and review workflow on iPhone"
  },
  cover: {
    src: "/public/ios/iphone/1125x2436/en/07-device-top.png",
    alt: "JobHunter AI cover letter drafting and review workflow on iPhone"
  }
};

export const guidePlans = [
  {
    slug: "autofill-job-applications-iphone",
    redirectFrom: [
      "save-reusable-job-application-answers",
      "fill-long-job-application-forms-faster",
      "safari-extension-job-applications-iphone"
    ],
    relatedSlugs: [
      "job-application-autofill-vs-auto-apply",
      "attach-resume-from-iphone-safari",
      "ten-minute-job-application-workflow"
    ],
    screenshot: screenshots.autofill,
    editorialSections: [
      {
        heading: "A Complete Mobile Autofill Walkthrough",
        paragraphs: [
          "Start on the employer's real application page in Safari, not on a copy of the listing. Open JobHunter only after you have confirmed that the role, location, seniority, and work authorization requirements fit. Let the saved profile handle stable facts such as contact details, education, and employment history. Then move through the form from top to bottom and treat each filled value as a draft that you are responsible for checking.",
          "A useful review order is identity, eligibility, experience, documents, and written answers. This catches the expensive mistakes first: a wrong phone number, an incorrect sponsorship answer, a stale job date, or the wrong resume. Finish by reading the confirmation screen before submitting. Mobile autofill is valuable because it removes repeated typing, but the final decision and every answer remain yours."
        ]
      },
      {
        heading: "Example: Turning a 25-Minute Form Into a Reviewable Draft",
        paragraphs: [
          "Imagine a customer-success application that asks for three jobs, education, a portfolio link, salary expectations, and two written responses. The reusable profile can fill the factual sections in seconds. You then spend the saved time checking that the dates match the attached resume, selecting the correct salary range, and writing two answers that mention the employer's product and customer type. The form becomes faster without becoming generic.",
          "If the career site imports information from the resume, compare the imported fields with the PDF before continuing. Parsers sometimes move company names into title fields or drop bullet points. Correct the source resume when the same mistake appears repeatedly; do not accept permanent cleanup work on every application."
        ]
      }
    ],
    faqs: [
      {
        question: "Does JobHunter submit applications automatically?",
        answer: "No. JobHunter helps with repeated fields, resume attachment, and drafts, while you review the employer's form and choose when to submit."
      },
      {
        question: "Which answers should always be reviewed manually?",
        answer: "Review work authorization, sponsorship, compensation, relocation, availability, demographic questions, company-specific answers, and every uploaded document."
      },
      {
        question: "What should I do when autofill puts information in the wrong field?",
        answer: "Correct the field before submitting and update the saved profile or source resume when the same mapping problem happens more than once."
      }
    ]
  },
  {
    slug: "job-application-autofill-vs-auto-apply",
    redirectFrom: ["apply-to-jobs-faster-without-auto-submit"],
    relatedSlugs: [
      "autofill-job-applications-iphone",
      "review-job-matches-faster",
      "ten-minute-job-application-workflow"
    ],
    screenshot: screenshots.autofill,
    editorialSections: [
      {
        heading: "Choose Automation by Risk, Not by Speed Alone",
        paragraphs: [
          "The safest dividing line is whether a task requires judgment. Copying a phone number, LinkedIn URL, school name, or employment date is low risk when the saved source is accurate. Choosing a salary expectation, describing why you want the role, answering a sponsorship question, or deciding which resume to use carries much more risk. Autofill is appropriate for the first group because the applicant remains present. Auto-apply often tries to make decisions in the second group without enough context.",
          "A high application count is not useful if the submissions target the wrong locations, attach irrelevant resumes, or contradict your actual background. Recruiters also notice generic answers. A review-first workflow optimizes the number of credible applications you can submit, not the number of forms a bot can touch."
        ]
      },
      {
        heading: "A Practical Decision Matrix",
        paragraphs: [
          "Use autofill when the role has been reviewed, the form is open in front of you, and you can correct every value. Use a saved answer as a starting point when the question repeats but its wording may change. Write a fresh answer when the employer asks about its product, mission, role, or a specific situation. Skip automation entirely for legal attestations that you do not understand.",
          "Before submitting, ask four questions: Did I choose this role intentionally? Is every factual answer true today? Are the resume and cover letter meant for this role? Would I be comfortable explaining every answer in an interview? If all four answers are yes, automation has supported the application rather than replacing your judgment."
        ]
      },
      {
        heading: "Measure the Right Outcome",
        paragraphs: [
          "Track completed, qualified applications and recruiter responses rather than raw submission volume. If faster forms create more errors or fewer relevant replies, narrow the target roles and strengthen the review step. If the applications remain accurate and you consistently finish roles you would otherwise abandon on mobile, the workflow is working."
        ]
      }
    ],
    faqs: [
      {
        question: "Is autofill the same as auto-apply?",
        answer: "No. Autofill proposes values inside a form you are reviewing. Auto-apply attempts to select roles and submit applications with limited or no final review."
      },
      {
        question: "Can a fast application still be tailored?",
        answer: "Yes. Save time on stable facts, then use that time to tailor the resume emphasis, cover letter, and company-specific questions."
      },
      {
        question: "What is the biggest risk of auto-apply?",
        answer: "It can create inaccurate or irrelevant submissions at scale, including wrong eligibility answers, generic documents, and applications to roles you would not choose yourself."
      }
    ]
  },
  {
    slug: "attach-resume-from-iphone-safari",
    redirectFrom: [],
    relatedSlugs: [
      "ats-friendly-resume-checklist",
      "multiple-resume-versions-different-roles",
      "autofill-job-applications-iphone"
    ],
    screenshot: screenshots.attach,
    editorialSections: [
      {
        heading: "Prepare the File Before Opening the Application",
        paragraphs: [
          "Open the resume on your iPhone and inspect every page at normal zoom. Confirm that headings are not stranded at the bottom of a page, bullet points are visible, links are readable, and no text was clipped during export. A file that looks correct on a laptop can still reveal spacing or font problems in the mobile preview. Keep the final PDF in a predictable Files location or in JobHunter so the upload sheet does not turn into a search through downloads and message attachments.",
          "Use a professional filename that helps both you and the recruiter, such as Mahmoud-Ashraf-iOS-Developer-Resume.pdf. Avoid names such as final-final-2.pdf. When you maintain role-specific versions, include the role family rather than the employer name unless the document is truly tailored for that single company."
        ]
      },
      {
        heading: "Upload From Safari Step by Step",
        paragraphs: [
          "Tap the employer's upload control and choose the file source offered by iOS. Select the intended PDF, wait for the career site to finish processing it, and look for the filename beside the field. Do not navigate away while the upload indicator is active. If the form parses the resume into work-history fields, inspect those fields immediately because a successful upload does not guarantee a correct parse.",
          "Some sites replace the upload silently when you choose a second file. After any replacement, confirm the displayed filename again. If the site requests DOC or DOCX, follow that instruction instead of forcing a PDF. If it rejects a valid file, check the maximum size, allowed extensions, filename characters, and connection before rebuilding the document."
        ]
      },
      {
        heading: "Diagnose Common Mobile Upload Failures",
        paragraphs: [
          "A disabled upload button usually means another required field must be completed first. A file that appears to upload and then disappears may exceed the site's limit or lose connectivity. A blank preview can mean the PDF contains unsupported font or security settings. Export a fresh standard PDF, shorten the filename, and try once more rather than repeatedly tapping the same control.",
          "When an employer provides no upload control, it may expect you to paste experience into the form. Treat the resume as your source of truth and keep titles, employers, and dates consistent. Do not send the document through an unrelated contact channel unless the listing explicitly asks you to."
        ]
      },
      {
        heading: "Protect Resume Privacy on a Shared Phone",
        paragraphs: [
          "A resume contains contact details and employment history. Remove obsolete copies from public download folders, avoid storing sensitive documents in shared photo libraries, and confirm the destination before choosing a file. JobHunter's browser tools generate documents locally in the page; the employer receives a resume only when you deliberately attach it to the employer's application."
        ]
      },
      {
        heading: "Final Attachment Checklist",
        bullets: [
          "The file opens and every page is readable on iPhone.",
          "The filename is professional and identifies the intended role family.",
          "The displayed upload name matches the file you selected.",
          "Parsed employment fields match the PDF.",
          "No older resume remains attached after a replacement."
        ]
      }
    ],
    faqs: [
      {
        question: "Is PDF the best resume format for iPhone applications?",
        answer: "PDF is usually the safest because it preserves layout, but always use DOCX when the employer explicitly requests it."
      },
      {
        question: "How do I know the upload finished?",
        answer: "Wait for the progress indicator to stop and confirm that the correct filename appears beside the upload field or in the form's document section."
      },
      {
        question: "Why did the form import my resume incorrectly?",
        answer: "Complex columns, tables, icons, headers, or unusual date formats can confuse parsers. Use a clean ATS-friendly source resume and correct imported fields before submitting."
      }
    ]
  },
  {
    slug: "ten-minute-job-application-workflow",
    redirectFrom: [],
    relatedSlugs: [
      "review-job-matches-faster",
      "autofill-job-applications-iphone",
      "apply-to-matched-jobs-iphone"
    ],
    screenshot: screenshots.autofill,
    editorialSections: [
      {
        heading: "Minute Zero: Decide Whether the Role Deserves Ten Minutes",
        paragraphs: [
          "The timer starts only after a fit check. Confirm the title, seniority, location, work mode, core requirements, and compensation clues. If there is a hard mismatch, skip the role. A short workflow is not permission to apply indiscriminately; it is a way to complete strong matches before attention drifts or the listing becomes stale.",
          "Keep one primary resume ready for the role family and a saved profile with accurate dates, education, contact details, and links. The preparation happens once, outside the ten-minute application window."
        ]
      },
      {
        heading: "Minutes One to Three: Open, Scan, and Choose Documents",
        paragraphs: [
          "Open the employer's application in Safari and scan every section before typing. Note required documents, long-answer questions, and any unusual eligibility fields. Choose the correct resume version immediately so you do not reach the final page and discover that tailoring is needed. If the role needs a substantially different resume, save it for a focused session rather than forcing it through the timer."
        ]
      },
      {
        heading: "Minutes Four to Six: Fill Stable Information",
        paragraphs: [
          "Use JobHunter to fill contact details, employment history, education, links, and other stable profile information. Compare dates and titles against the attached resume. Resolve parsing mistakes now, while the relevant section is visible. Do not rush required questions about authorization, sponsorship, relocation, or availability; a wrong answer can end the process before a recruiter reads the resume."
        ]
      },
      {
        heading: "Minutes Seven to Nine: Tailor the Human-Read Sections",
        paragraphs: [
          "Edit the summary, written answers, or cover letter around two or three requirements that genuinely match your experience. Name a relevant result, tool, customer type, or project instead of repeating the job description. A concise specific response is more useful than a long generic one. If JobHunter creates a draft, check every claim and remove wording you would not use in an interview."
        ]
      },
      {
        heading: "Minute Ten: Run a Submission Gate",
        paragraphs: [
          "Confirm the role and company, email address, phone number, location, eligibility answers, resume filename, and any required portfolio link. Read the final consent text and submit only when the application is accurate. Save the role and status immediately so you do not apply twice or lose the context needed for follow-up."
        ]
      },
      {
        heading: "When to Ignore the Timer",
        paragraphs: [
          "Stop timing when the application includes a meaningful work sample, complex legal questions, a detailed compensation form, or a role worth major resume changes. The ten-minute workflow is a default for straightforward applications, not a rule that lowers quality."
        ]
      },
      {
        heading: "Improve the Workflow After Each Session",
        paragraphs: [
          "Notice where the ten minutes were lost. If you repeatedly search for a file, simplify resume storage. If dates need correction, repair the saved profile. If every cover letter starts from zero, prepare a truthful evidence bank. Improve the reusable source rather than trying to click faster."
        ]
      }
    ],
    faqs: [
      {
        question: "Can every application be completed in ten minutes?",
        answer: "No. Use the workflow for straightforward, well-matched roles. Work samples, complex questions, and major tailoring deserve more time."
      },
      {
        question: "What should be prepared before starting?",
        answer: "Keep an accurate saved profile, the correct resume versions, portfolio links, and truthful eligibility information ready."
      },
      {
        question: "Does speed reduce application quality?",
        answer: "It does when you rush judgment. The workflow saves time on repeated facts so more attention can go to the resume, written answers, and final review."
      }
    ]
  },
  {
    slug: "ats-friendly-resume-checklist",
    redirectFrom: [
      "best-resume-format-job-application-forms",
      "pdf-resume-vs-online-form-fields",
      "fix-resume-parsing-mistakes"
    ],
    relatedSlugs: [
      "tailor-resume-to-job-description-iphone",
      "multiple-resume-versions-different-roles",
      "attach-resume-from-iphone-safari"
    ],
    screenshot: screenshots.resume,
    editorialSections: [
      {
        heading: "Test the Resume Instead of Guessing",
        paragraphs: [
          "Select the text in the exported PDF and paste it into a plain-text editor. The name, headings, companies, titles, dates, and bullets should appear in a sensible reading order. Then upload the resume to a real application that offers parsing and compare the imported fields. This practical test reveals problems that visual inspection cannot.",
          "When the same field imports incorrectly more than once, repair the source document. Move critical text out of headers, footers, images, and floating text boxes. Replace decorative skill charts with plain text and use recognizable headings. The goal is not to make every resume identical; it is to make important evidence available to both software and people."
        ]
      },
      {
        heading: "A Recruiter-Friendly Quality Check",
        paragraphs: [
          "After the parsing test, read the resume as a recruiter with thirty seconds. The target role, strongest experience, recent results, and relevant tools should be easy to find. Remove vague adjectives and use evidence such as volume, time saved, revenue supported, customer outcomes, or delivery scope when those details are truthful.",
          "An ATS-friendly resume still needs human clarity. Keywords help retrieval, but coherent accomplishments create interviews. Every important keyword should sit inside a sentence or bullet that explains how you used it."
        ]
      }
    ],
    faqs: [
      {
        question: "Do ATS systems reject every two-column resume?",
        answer: "No, but columns increase parsing risk. A clean one-column format is the safer default when you cannot test the employer's system."
      },
      {
        question: "Should I copy every keyword from the job description?",
        answer: "No. Include only truthful, relevant terms and place them naturally in your summary, skills, and experience evidence."
      },
      {
        question: "How can I test a PDF resume on iPhone?",
        answer: "Open it, select and copy text to check reading order, then use a real application parser and compare every imported field with the PDF."
      }
    ]
  },
  {
    slug: "tailor-resume-to-job-description-iphone",
    redirectFrom: [
      "resume-keywords-match-job-description",
      "job-match-keywords-resume"
    ],
    relatedSlugs: [
      "ats-friendly-resume-checklist",
      "multiple-resume-versions-different-roles",
      "set-up-job-matching-profile"
    ],
    screenshot: screenshots.resume,
    editorialSections: [
      {
        heading: "Use a Requirement-to-Evidence Map",
        paragraphs: [
          "Create two short columns before editing: what the employer repeatedly asks for and where your resume proves it. A requirement such as customer onboarding should point to a bullet showing the number or type of customers, the process you owned, and the result. A tool such as Salesforce should appear only when you have used it. This map prevents keyword copying without evidence.",
          "On iPhone, keep the job description and resume accessible so you can compare one section at a time. Update the summary, skills order, and a small number of bullets rather than rewriting your work history. The tailored version must remain accurate and should still sound like the same person."
        ]
      },
      {
        heading: "Prioritize Changes That Recruiters Notice",
        paragraphs: [
          "First align the target title or professional summary. Next move the most relevant skills and accomplishments higher. Finally, adjust wording so the resume uses standard terms from the field. Do not change official job titles into something misleading; add a clarifying parenthetical or summary when necessary.",
          "Save the result as a new, clearly named version and keep the original. Before attaching it, reopen the PDF and verify that the export did not introduce page breaks or missing text."
        ]
      },
      {
        heading: "Example: Tailoring Without Inventing Experience",
        paragraphs: [
          "A support specialist applying to customer success may already have onboarding calls, account follow-up, renewal-risk notes, and product feedback experience. The tailored resume can foreground those true responsibilities and reduce space spent on less relevant ticket-volume details. It should not claim ownership of renewals or revenue if the candidate only supported those activities."
        ]
      }
    ],
    faqs: [
      {
        question: "How much of a resume should change for each application?",
        answer: "Usually the summary, skills order, and a few bullets need adjustment. Keep factual history stable and make the strongest relevant evidence easier to find."
      },
      {
        question: "Can I change my job title to match the listing?",
        answer: "Do not replace an official title with a misleading one. Add a clear functional description when the original internal title is ambiguous."
      },
      {
        question: "How many keywords should I add?",
        answer: "There is no useful fixed number. Cover the important requirements you genuinely meet and support them with readable evidence."
      }
    ]
  },
  {
    slug: "multiple-resume-versions-different-roles",
    redirectFrom: [],
    relatedSlugs: [
      "tailor-resume-to-job-description-iphone",
      "ats-friendly-resume-checklist",
      "attach-resume-from-iphone-safari"
    ],
    screenshot: screenshots.resume,
    editorialSections: [
      {
        heading: "Start With One Verified Master Resume",
        paragraphs: [
          "Maintain a private master document containing every accurate role, date, project, certification, skill, and measurable result. It can be longer than the resume you submit because its purpose is to preserve source material. Verify names and dates once in the master so individual versions do not drift into contradictions.",
          "Submitted resumes should be created from this source, not from whichever PDF happens to be in Downloads. The master prevents a useful bullet from disappearing when you move between role families."
        ]
      },
      {
        heading: "Create Versions by Role Family",
        paragraphs: [
          "Most job seekers need a small number of durable versions, not one document per listing. A customer-success version can emphasize onboarding, adoption, and account communication. A support-operations version can emphasize ticket systems, documentation, and process improvement. Both may use the same jobs while changing the summary, skills order, and selected bullets.",
          "Create a new family only when the target roles require a meaningfully different story. Too many versions create maintenance work and make mobile attachment risky."
        ]
      },
      {
        heading: "Use a Naming and Versioning Convention",
        paragraphs: [
          "Choose filenames that remain clear in the iPhone file picker: Firstname-Lastname-Customer-Success-Resume.pdf, for example. Keep dates in your private source name or version history rather than in the recruiter-facing filename. Archive retired copies outside the active attachment folder.",
          "When you improve a shared fact such as a job date or degree name, update every active family. When you improve a role-specific bullet, update only the versions that use that story."
        ]
      },
      {
        heading: "Track Which Resume Was Sent",
        paragraphs: [
          "Record the resume family with each application. If a recruiter responds, you should know exactly what they saw. This also produces useful feedback: if one version earns more relevant conversations, examine whether its positioning is clearer rather than assuming the design caused the difference."
        ]
      },
      {
        heading: "Audit Versions Monthly",
        paragraphs: [
          "Remove stale files, confirm current contact details, and compare active versions with the master resume. Check that every PDF still parses cleanly and that links work. A short monthly audit is safer than discovering an old phone number during an important application."
        ]
      },
      {
        heading: "Keep Design Changes Separate From Content Changes",
        paragraphs: [
          "Use the same reliable layout across role families unless a field genuinely expects a different presentation. When content and design both change at once, it becomes harder to identify why parsing broke or why a recruiter response improved. Keep fonts readable, section labels standard, and contact details in the document body. Test each active PDF after export, especially when a template update changes spacing or page breaks.",
          "A controlled system also makes errors easier to repair. Update the master facts first, regenerate the affected versions, reopen every PDF, and replace only the active files. This is safer than editing several independent documents and hoping they remain consistent."
        ]
      }
    ],
    faqs: [
      {
        question: "How many resume versions should I keep?",
        answer: "Keep one verified master and only the few role-family versions needed to tell genuinely different professional stories."
      },
      {
        question: "Should every company receive a different resume?",
        answer: "Not necessarily. Start from the closest role-family version and make small evidence-based changes when the role deserves them."
      },
      {
        question: "Where should I store active iPhone resume files?",
        answer: "Use a predictable Files folder or JobHunter, keep filenames clear, and move obsolete copies away from the active upload location."
      }
    ]
  },
  {
    slug: "write-cover-letter-fast",
    redirectFrom: [
      "entry-level-internship-cover-letter",
      "short-cover-letter-examples"
    ],
    relatedSlugs: [
      "ai-cover-letter-generator-review-checklist",
      "career-change-cover-letter-structure",
      "ten-minute-job-application-workflow"
    ],
    screenshot: screenshots.cover,
    editorialSections: [
      {
        heading: "Build a Reusable Evidence Bank",
        paragraphs: [
          "Speed comes from preparing examples, not from sending the same letter everywhere. Keep short notes about three or four accomplishments: the problem, what you did, the tools or people involved, and the result. When a role asks for a cover letter, choose the example that best supports its central requirement.",
          "A strong short letter can be three focused paragraphs: why this role, evidence you can do the work, and why the company or problem interests you. Remove ceremonial language that does not help the reader understand fit."
        ]
      },
      {
        heading: "A Short Cover Letter Template",
        paragraphs: [
          "Open by naming the role and one reason it fits your direction. In the middle, connect a relevant achievement to a responsibility from the listing. Close with a specific reason the company's product, customers, or mission makes the opportunity worth discussing. Replace every bracketed detail before sending and read the letter aloud once.",
          "For an entry-level role, evidence can come from an internship, project, volunteer position, coursework, or customer-facing job. For an experienced candidate, choose one result that demonstrates scope rather than summarizing the entire resume."
        ]
      }
    ],
    faqs: [
      {
        question: "How long should a cover letter be?",
        answer: "Use the shortest length that provides specific evidence and motivation. Three focused paragraphs are often enough unless the employer requests more."
      },
      {
        question: "Can I reuse a cover letter template?",
        answer: "Reuse the structure and your evidence bank, but change the role, company context, selected example, and motivation for every application."
      },
      {
        question: "What if I have no formal experience?",
        answer: "Use relevant projects, coursework, internships, volunteer work, or transferable customer and teamwork experience without exaggerating your responsibilities."
      }
    ]
  },
  {
    slug: "ai-cover-letter-generator-review-checklist",
    redirectFrom: [],
    relatedSlugs: [
      "write-cover-letter-fast",
      "career-change-cover-letter-structure",
      "tailor-resume-to-job-description-iphone"
    ],
    screenshot: screenshots.cover,
    editorialSections: [
      {
        heading: "Give the Draft Accurate Source Material",
        paragraphs: [
          "An AI draft is only as reliable as the profile, resume, and job information behind it. Before generating, confirm the employer, role title, responsibilities, and the experience you want emphasized. Remove outdated skills and do not ask the system to infer achievements, numbers, or motivations that you have not supplied.",
          "Treat the generated letter as an editable proposal. It can organize ideas quickly, but it cannot decide which claims are true or what you genuinely value about the employer."
        ]
      },
      {
        heading: "Run a Sentence-by-Sentence Accuracy Review",
        paragraphs: [
          "Underline every statement about years, tools, results, leadership, industries, education, and company knowledge. Verify each one against your resume or direct experience. Delete invented metrics, responsibilities you only observed, and praise that assumes facts about the company. If you would hesitate when an interviewer quotes the sentence, rewrite it.",
          "Check names carefully. A polished letter addressed to the wrong company is worse than a simple letter. Also confirm that the draft has not confused the employer's requirements with your own experience."
        ]
      },
      {
        heading: "Replace Generic Language With Evidence",
        paragraphs: [
          "Phrases such as passionate professional, dynamic team, and perfect fit provide little evidence. Replace one generic sentence with a concrete example showing the type of problem you solved. Keep the wording natural enough that you could say it in conversation.",
          "A useful test is to remove the company name. If the entire letter could go to any employer, it needs one specific product, customer, challenge, or responsibility from the listing."
        ]
      },
      {
        heading: "Review Tone, Privacy, and Sensitive Details",
        paragraphs: [
          "Remove private information that the employer did not request, including identification numbers, health details, account credentials, or confidential information from a current employer. Keep the tone direct and respectful. Avoid promises, desperation, exaggerated flattery, and claims that the tool itself applied or made decisions for you."
        ]
      },
      {
        heading: "Final AI Draft Checklist",
        bullets: [
          "Employer and role names are correct.",
          "Every skill, result, and number is true.",
          "At least one example proves a central requirement.",
          "The motivation is specific to the opportunity.",
          "No confidential or unnecessary personal data appears.",
          "The final voice sounds like you."
        ]
      },
      {
        heading: "Compare the Letter With the Resume",
        paragraphs: [
          "Read both documents together before attaching them. The cover letter may emphasize a different part of your experience, but titles, dates, tools, scope, and results must agree. If the letter introduces a major achievement that the resume never supports, confirm the source and decide whether the resume should include it. Consistency helps the recruiter trust the application and prepares you to discuss the same evidence in an interview."
        ]
      }
    ],
    faqs: [
      {
        question: "Can I submit an AI-generated cover letter without editing it?",
        answer: "You should not. Verify every claim, add specific evidence and motivation, remove generic wording, and make sure the final voice represents you."
      },
      {
        question: "What information should not go into a cover-letter generator?",
        answer: "Do not include passwords, identification numbers, medical details, confidential employer information, or personal data unrelated to the application."
      },
      {
        question: "How do I make an AI cover letter sound less generic?",
        answer: "Add a real accomplishment, connect it to a central job requirement, and mention one accurate reason the company's work or customers interest you."
      }
    ]
  },
  {
    slug: "career-change-cover-letter-structure",
    redirectFrom: [],
    relatedSlugs: [
      "write-cover-letter-fast",
      "ai-cover-letter-generator-review-checklist",
      "set-up-job-matching-profile"
    ],
    screenshot: screenshots.cover,
    editorialSections: [
      {
        heading: "Lead With the Destination, Not an Apology",
        paragraphs: [
          "Name the role you are pursuing and the professional problem you want to solve. Do not spend the opening apologizing for a nonlinear background. The reader needs a clear destination before the explanation of how your previous work connects to it.",
          "A useful opening identifies one bridge: customers, data, operations, writing, systems, leadership, or domain knowledge. For example, a teacher moving into customer education can lead with experience turning complex material into usable instruction for different audiences."
        ]
      },
      {
        heading: "Translate Transferable Work Into the Employer's Language",
        paragraphs: [
          "Read the job description for actions such as analyze, coordinate, persuade, document, troubleshoot, plan, or improve. Then choose evidence from your background that shows the same action in a different context. Translate the work without inflating the scope or pretending the industries are identical.",
          "Results make the bridge credible. Use the audience size, process improvement, time saved, quality increase, revenue supported, or project outcome when you can verify it."
        ]
      },
      {
        heading: "Address the Experience Gap With a Learning Signal",
        paragraphs: [
          "If the new field requires tools or knowledge you recently developed, mention the strongest concrete signal: a completed project, certification, portfolio sample, volunteer engagement, or relevant responsibility you added to your current job. Avoid listing courses without explaining what you can now do.",
          "The goal is not to claim you have already held the target title. It is to show that the transition is deliberate and that you can contribute while continuing to learn."
        ]
      },
      {
        heading: "Use a Four-Paragraph Career-Change Structure",
        paragraphs: [
          "Paragraph one names the destination and motivation. Paragraph two proves a transferable capability with one result. Paragraph three adds new-field preparation or domain knowledge. Paragraph four closes with the contribution you hope to discuss. Keep unrelated history in the resume rather than forcing it into the letter.",
          "Review the final draft for defensive wording. Replace phrases such as although I lack experience with direct evidence of what you bring. Honest confidence is more persuasive than either apology or exaggeration."
        ]
      },
      {
        heading: "Career-Change Example",
        paragraphs: [
          "A retail manager moving into operations might emphasize scheduling, inventory accuracy, training, vendor coordination, and process improvement. The letter can connect those results to the target company's operational needs, then mention a recent analytics project. It should not rename retail management as corporate operations or claim tools the candidate has only watched in tutorials."
        ]
      },
      {
        heading: "Align the Resume With the Same Transition Story",
        paragraphs: [
          "The cover letter should not carry the entire transition alone. Reorder the resume summary, skills, projects, and bullets so the transferable evidence is also visible there. Keep official titles and dates unchanged. When both documents point toward the same destination with the same truthful examples, the recruiter can understand the change without guessing."
        ]
      }
    ],
    faqs: [
      {
        question: "Should a career-change cover letter explain why I am leaving?",
        answer: "Explain the direction you are moving toward and the evidence supporting it. Avoid criticizing a current employer or providing personal detail that does not help the application."
      },
      {
        question: "How do I discuss missing direct experience?",
        answer: "Show transferable actions, verified results, and concrete preparation for the new field without pretending you already held the target role."
      },
      {
        question: "Can AI help draft a career-change letter?",
        answer: "It can organize source material, but you must verify the bridge between careers, remove invented claims, and make the motivation genuinely yours."
      }
    ]
  },
  {
    slug: "find-top-remote-jobs-iphone",
    redirectFrom: [
      "remote-hybrid-onsite-job-filters",
      "find-entry-level-remote-jobs",
      "remote-job-region-tags"
    ],
    relatedSlugs: [
      "review-job-matches-faster",
      "set-up-job-matching-profile",
      "apply-to-matched-jobs-iphone"
    ],
    screenshot: screenshots.matching,
    editorialSections: [
      {
        heading: "Verify Remote Eligibility Before Tailoring",
        paragraphs: [
          "Remote is a work arrangement, not a promise that anyone can work from anywhere. Check country, state, tax residence, time zone, working hours, travel, and occasional office requirements. Look for phrases such as remote within the United States, EMEA hours, or quarterly onsite. This sixty-second check prevents spending twenty minutes on an application that cannot progress.",
          "When the listing is unclear, save the role with a note rather than inventing an answer. If the application directly asks whether you live in an eligible region, answer accurately."
        ]
      },
      {
        heading: "Evaluate Whether the Team Supports Remote Work",
        paragraphs: [
          "Strong remote listings often describe communication rhythms, documentation, onboarding, equipment, collaboration hours, or manager expectations. Entry-level candidates should look for training and feedback signals. Experienced candidates should check whether the autonomy and meeting schedule fit how they work.",
          "Remote quality is not guaranteed by the label. A vague listing with constant availability expectations may be a worse fit than a clearly organized hybrid role."
        ]
      }
    ],
    faqs: [
      {
        question: "Why does a remote job have a location restriction?",
        answer: "Employers may limit hiring because of payroll, tax, legal entity, client, licensing, security, or working-hour requirements."
      },
      {
        question: "How can entry-level applicants judge remote support?",
        answer: "Look for structured onboarding, manager access, documentation, collaboration tools, feedback cycles, and responsibilities appropriate for the stated level."
      },
      {
        question: "Should I apply when the region is unclear?",
        answer: "Save the role and look for clarification in the company careers page or application. Never misstate your location or work authorization."
      }
    ]
  },
  {
    slug: "set-up-job-matching-profile",
    redirectFrom: [
      "best-skills-for-job-matches",
      "find-tech-jobs-that-match-resume",
      "job-matching-for-career-change"
    ],
    relatedSlugs: [
      "review-job-matches-faster",
      "tailor-resume-to-job-description-iphone",
      "find-top-remote-jobs-iphone"
    ],
    screenshot: screenshots.matching,
    editorialSections: [
      {
        heading: "Use Search Feedback to Improve the Profile",
        paragraphs: [
          "Review a week of strong and weak matches. If irrelevant roles share a skill or old title that dominates the profile, reduce that signal. If desirable roles repeatedly use a truthful term missing from your profile, add it with supporting experience. Matching improves when the profile reflects both what you can do and what you want next.",
          "Do not chase every listing by constantly rewriting the profile. Make changes only when a repeated pattern appears across several credible roles."
        ]
      },
      {
        heading: "Keep the Profile, Resume, and Application Consistent",
        paragraphs: [
          "Titles, dates, locations, education, and core skills should agree across the saved profile and active resume versions. Differences create extra form corrections and can confuse recruiters. Role-family resumes can emphasize different evidence while preserving the same factual history.",
          "After updating the profile, open one application draft and verify that the new values map to the expected fields before relying on them during a busy application session."
        ]
      }
    ],
    faqs: [
      {
        question: "Should I add every skill I have used?",
        answer: "No. Prioritize specific, truthful skills that appear in the roles you want and that your resume can support with evidence."
      },
      {
        question: "How often should I update my matching profile?",
        answer: "Review it when your target changes or when several days of matches reveal a repeated gap or irrelevant signal."
      },
      {
        question: "Can one profile cover a career change?",
        answer: "Yes when it clearly names the destination and emphasizes transferable evidence. Keep separate resume versions when different role families require distinct positioning."
      }
    ]
  },
  {
    slug: "review-job-matches-faster",
    redirectFrom: [
      "daily-job-match-routine",
      "avoid-bad-job-matches",
      "use-job-filters-without-missing-roles",
      "salary-signals-in-job-matches",
      "fresh-job-feed-application-strategy"
    ],
    relatedSlugs: [
      "find-top-remote-jobs-iphone",
      "set-up-job-matching-profile",
      "apply-to-matched-jobs-iphone"
    ],
    screenshot: screenshots.matching,
    editorialSections: [
      {
        heading: "Use Three Outcomes: Apply, Save With a Question, or Skip",
        paragraphs: [
          "Every review should end with a decision. Apply when the core fit and eligibility are clear. Save with a specific note when one answer—such as region, salary, or schedule—needs research. Skip when a hard requirement conflicts with your background or goals. Avoid an unstructured saved pile that simply moves decisions into the future.",
          "A written reason also improves your search. After several sessions, common skip reasons reveal which filters or profile signals need adjustment."
        ]
      }
    ],
    faqs: [
      {
        question: "How long should the first job-match scan take?",
        answer: "Usually less than a minute. Check title, company, level, location, work mode, and central requirements before reading deeply."
      },
      {
        question: "Should salary determine whether I apply?",
        answer: "Use a published range with role scope and location. Skip when it clearly cannot meet your needs; save a strong unclear role with a compensation question."
      },
      {
        question: "How do I stop a fresh feed from becoming overwhelming?",
        answer: "Review on a short schedule, use apply/save/skip decisions, and stop after the strongest qualified applications rather than opening every listing."
      }
    ]
  },
  {
    slug: "highest-hiring-companies-job-search",
    redirectFrom: [
      "find-companies-with-many-open-roles",
      "find-startup-jobs-hiring-now"
    ],
    relatedSlugs: [
      "review-job-matches-faster",
      "set-up-job-matching-profile",
      "find-top-remote-jobs-iphone"
    ],
    screenshot: screenshots.matching,
    editorialSections: [
      {
        heading: "Distinguish Growth From Permanent Vacancy",
        paragraphs: [
          "A company with many openings can be expanding, replacing turnover, staffing seasonal work, or leaving old listings online. Check whether roles have recent dates, specific teams, named locations, and consistent descriptions. Compare the careers page with company announcements or product activity when the application deserves deeper research.",
          "Repeated copies of the same vague role across many cities are a weaker signal than several distinct positions tied to visible teams and current business needs."
        ]
      },
      {
        heading: "Build a Company-Level Application Strategy",
        paragraphs: [
          "Choose the one or two openings with the clearest fit rather than applying to every role. Keep the resume story consistent and explain the appropriate team or problem in each tailored response. Track all applications under the same company so you can discuss them honestly if one recruiter contacts you.",
          "For startups, confirm the role exists on the official careers page, understand the likely breadth of responsibility, and look for evidence of an active product and team. Avoid paying fees, purchasing equipment through an unknown contact, or moving the conversation away from verifiable company channels."
        ]
      }
    ],
    faqs: [
      {
        question: "Does a large number of openings mean a company is healthy?",
        answer: "Not by itself. Check listing freshness, team specificity, company activity, and whether the roles appear on the official careers page."
      },
      {
        question: "Should I apply to several roles at one company?",
        answer: "Apply to one or two roles with a credible fit. Too many unrelated applications can make your direction look unclear."
      },
      {
        question: "How can I verify a startup job?",
        answer: "Use the official domain and careers page, verify the company and contact, and reject any process involving fees, checks, gift cards, or unverifiable equipment purchases."
      }
    ]
  },
  {
    slug: "apply-to-matched-jobs-iphone",
    redirectFrom: ["track-matched-jobs-after-applying"],
    relatedSlugs: [
      "review-job-matches-faster",
      "autofill-job-applications-iphone",
      "ten-minute-job-application-workflow"
    ],
    screenshot: screenshots.matching,
    editorialSections: [
      {
        heading: "Carry Match Context Into the Application",
        paragraphs: [
          "Before opening the form, write one sentence explaining why the role matched. Name the strongest requirement, the evidence in your background, and any question that remains. This note guides resume selection and prevents a promising listing from turning into a generic application once the career site opens.",
          "If the employer redirects through several pages, confirm the final company, role title, and location still match the listing you reviewed. Stop when the destination looks unrelated or requests unusual payment or account information."
        ]
      },
      {
        heading: "Move From Match to Submitted Application",
        paragraphs: [
          "Choose the closest resume family, tailor the most visible evidence, and open the application in Safari. Fill stable profile details, attach the verified file, and answer eligibility questions accurately. Use the original match note when drafting a short cover letter or role-specific response so the application remains connected to the reason you selected it.",
          "Before submission, compare the application title and company with the saved role. This simple check prevents duplicate applications and mistakes caused by similar tabs."
        ]
      },
      {
        heading: "Record the Application Immediately",
        paragraphs: [
          "Save the company, title, date, source URL, resume version, and current status as soon as the confirmation appears. Add any recruiter name, compensation detail, or question worth revisiting. If there is no confirmation, do not assume success; check for an email or return to the final form state.",
          "Tracking creates a reliable history for interviews and follow-up. It also shows which match types lead to responses, helping you refine the profile and review routine."
        ]
      },
      {
        heading: "Follow Up Without Losing Context",
        paragraphs: [
          "When a recruiter replies, reopen the saved job and the resume version you sent before responding. Review the original requirements and your application notes. Follow up through the official channel and avoid sending repeated messages when the employer has published a timeline."
        ]
      }
    ],
    faqs: [
      {
        question: "What should I save after applying?",
        answer: "Save the company, title, date, listing or application URL, resume version, status, and useful notes about requirements or written answers."
      },
      {
        question: "How do I avoid applying twice?",
        answer: "Check the tracker before submitting, then record the application immediately after receiving confirmation."
      },
      {
        question: "When should I follow up?",
        answer: "Use the employer's stated timeline when available. Otherwise, a concise follow-up after a reasonable interval is better than repeated messages."
      }
    ]
  }
];

export const retainedGuideSlugs = guidePlans.map((guide) => guide.slug);

export const guideRedirects = Object.fromEntries(
  guidePlans.flatMap((guide) =>
    guide.redirectFrom.map((source) => [
      `/guides/${source}/`,
      `/guides/${guide.slug}/`
    ])
  )
);

if (guidePlans.length !== 15) {
  throw new Error(`Expected 15 retained guides, found ${guidePlans.length}`);
}

if (Object.keys(guideRedirects).length !== 25) {
  throw new Error(
    `Expected 25 guide redirects, found ${Object.keys(guideRedirects).length}`
  );
}
