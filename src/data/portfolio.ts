export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  {
    id: 'ghl',
    icon: 'Workflow',
    title: 'GoHighLevel Systems',
    description: 'Full GHL account builds, CRM setup, sub-account management, workflow automations, and pipeline configuration for agencies and service businesses.',
    tags: ['CRM', 'Workflows', 'Pipelines', 'Sub-Accounts'],
  },
  {
    id: 'ai',
    icon: 'Bot',
    title: 'AI Voice & Conversation AI',
    description: 'AI-powered voice agents and chatbots for lead qualification, appointment booking, and 24/7 follow-up — so your pipeline runs while you sleep.',
    tags: ['Voice AI', 'Chatbots', 'Lead Qualification'],
  },
  {
    id: 'web',
    icon: 'Globe',
    title: 'Website & Funnel Development',
    description: 'High-converting landing pages, sales funnels, and branded websites built for speed, SEO, and conversion — not just aesthetics.',
    tags: ['React', 'Vite', 'Tailwind', 'Funnels'],
  },
  {
    id: 'automation',
    icon: 'Zap',
    title: 'Workflow Automation',
    description: 'End-to-end automation pipelines using n8n and GHL — from lead intake to nurture sequences, booking, and internal ops.',
    tags: ['n8n', 'Zapier', 'APIs', 'Webhooks'],
  },
  {
    id: 'dashboard',
    icon: 'LayoutDashboard',
    title: 'Lead Capture Dashboards',
    description: 'Custom dashboards that unify your lead data, track pipeline performance, and surface the metrics that actually drive decisions.',
    tags: ['Analytics', 'Reporting', 'CRM', 'Data'],
  },
  {
    id: 'seo',
    icon: 'TrendingUp',
    title: 'SEO & Local Growth',
    description: 'On-page SEO, local search optimization, and content strategy for service businesses competing in their market.',
    tags: ['Local SEO', 'On-Page', 'Content', 'Rankings'],
  },
]

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  impact: string
  tech: string[]
  category: string
  featured?: boolean
  problem: string
  solution: string[]
  outcome: string[]
}

export const projects: Project[] = [
  {
    id: 'personal-brand',
    title: 'Personal Brand Automation',
    subtitle: 'YouTube/Meta Ad Pipeline',
    description: 'Built a full automation pipeline that produces multiple brand-safe motion-design ad variations weekly — with consistent pacing, typography, and polish.',
    impact: '$100k-commercial look with consistent pacing. Faster iteration (days, not weeks). Repeatable pipeline for versioning offers.',
    tech: ['Remotion', 'TypeScript', 'Claude Code', 'FFmpeg'],
    category: 'Automation',
    featured: true,
    problem: 'A personal brand needed a repeatable, brand-safe video production system that could produce multiple ad variations per week — consistent in pacing, typography, and visual identity — without relying on a full creative studio or per-project freelancer costs.',
    solution: [
      'Built a modular Remotion template system with a brand-locked design system encoded in a single token file.',
      'Developed a variant system: swap hooks, offers, and CTAs by changing a single config file — Remotion renders the rest.',
      'Automated export pipeline renders multiple lengths (15s, 30s, 60s) in one command using FFmpeg.',
      'Added audio-reactive accent overlays synced to music beats for premium motion feel.',
      'Integrated Claude Code as the AI coding accelerator to build scene components and transition logic faster.',
    ],
    outcome: [
      'Turnaround dropped from 3–5 days to under 2 hours per variant.',
      'Client produced 12+ ad variations in the first month alone.',
      'Consistent brand look across all formats — no freelancer guesswork.',
      'Repeatable pipeline now handles seasonal campaign refreshes independently.',
    ],
  },
  {
    id: 'ghl-lead-system',
    title: 'GoHighLevel Lead System',
    subtitle: 'Service Business CRM',
    description: 'Complete GHL account setup with custom pipelines, automated follow-up sequences, and AI-driven lead nurturing for a local service business.',
    impact: 'Leads get tracked, nurtured, and booked consistently.',
    tech: ['GoHighLevel', 'AI Voice', 'Webhooks', 'SMS'],
    category: 'GoHighLevel',
    featured: true,
    problem: 'A local service business was losing leads because follow-up was manual and inconsistent. Leads would go cold waiting for a callback, and there was no visibility into where each prospect was in the pipeline.',
    solution: [
      'Built a full GoHighLevel CRM with custom pipeline stages tailored to the service workflow.',
      'Created automated SMS + email follow-up sequences triggered at each pipeline stage transition.',
      'Integrated AI Voice agent for after-hours lead qualification and appointment booking.',
      'Set up webhook-based lead intake from website forms directly into GHL pipelines.',
      'Built internal task automations to assign leads to team members and notify via SMS.',
    ],
    outcome: [
      'Leads are now tracked, nurtured, and booked without manual intervention.',
      'Response time dropped from hours to under 5 minutes using automated sequences.',
      'Booking rate increased as AI Voice handles leads even outside business hours.',
      'Full pipeline visibility — owner can see every lead\'s status at a glance.',
    ],
  },
  {
    id: 'web-system',
    title: 'Web System Rebuild',
    subtitle: 'Conversion-Focused Website',
    description: 'Redesigned and rebuilt a service business website from scratch — focused on conversion architecture, speed, and brand consistency.',
    impact: 'Improved brand trust, speed, and conversion rate.',
    tech: ['React', 'Tailwind', 'TypeScript', 'Vite'],
    category: 'Web Dev',
    featured: true,
    problem: 'A service business had an outdated website that was slow, off-brand, and not converting visitors into inquiries. The layout buried the offer, had no clear CTA, and loaded poorly on mobile.',
    solution: [
      'Redesigned the entire site architecture around a single conversion goal: book a call.',
      'Built with React + Vite for fast load times and modern component architecture.',
      'Implemented a clear visual hierarchy: headline → proof → offer → CTA on every scroll.',
      'Added mobile-first responsive design with optimized images and lazy loading.',
      'Integrated Calendly inline booking widget and WhatsApp CTA for frictionless contact.',
    ],
    outcome: [
      'Improved brand trust with a polished, professional aesthetic.',
      'Page load time reduced significantly with the new stack.',
      'Inquiry quality improved — visitors arrive pre-qualified by the page copy.',
      'Client now has a fully owned, maintainable codebase — not a locked website builder.',
    ],
  },
  {
    id: 'hubstaff-expense',
    title: 'Hubstaff → Daily Expense Reporting',
    subtitle: 'Automation (n8n ETL Pipeline)',
    description: 'Built an n8n workflow that pulls Hubstaff time logs, applies hourly rates and hard costs, validates totals, and posts daily expense reports to Google Drive and Slack.',
    impact: 'Expense reporting fully automated — no manual exports, no spreadsheet merging, weekly Slack summaries for leadership.',
    tech: ['n8n', 'Hubstaff API', 'Google Sheets', 'Google Drive', 'Slack', 'ETL'],
    category: 'Automation',
    problem: 'A US-based R&D company needed daily expense visibility per user, combining Hubstaff time logs, individual hourly rates, and fixed hard costs. Finance and ops teams were manually exporting Hubstaff data, copying it into spreadsheets, applying rates, and adding hard costs. This was slow, error-prone, and made it hard to catch unmapped users or validate that totals matched Hubstaff.',
    solution: [
      'Authenticates with the Hubstaff API and verifies access tokens on every run.',
      'Pulls all time entries for the period and aggregates hours per user.',
      'Reads two Google Sheets: User mapping + hourly rates, and Hard costs per user.',
      'Merges Hubstaff data with rates and hard costs, then calculates: Daily labor cost, Daily hard cost, and Total daily expense per user.',
      'Validates totals against Hubstaff, targeting ±1% variance.',
      'Writes structured CSV outputs to Google Drive for finance/ops.',
      'Builds a weekly cost summary and posts it to Slack every Monday 9 AM PH.',
      'Flags any unmapped users and posts a separate Slack alert so the mapping sheet can be updated.',
    ],
    outcome: [
      'Expense reporting per user is now fully automated — no more manual exports or spreadsheet merging.',
      'Finance and operations teams receive consistent, validated daily cost data ready for reporting and analysis.',
      'Weekly Slack summaries give leadership a clear view of labor and hard costs without logging into multiple systems.',
      'Unmapped users are detected and fixed early, keeping reporting clean and ensuring all active team members are included.',
    ],
  },
  {
    id: 'clickup-slack-bot',
    title: 'ClickUp → Slack Approval Bot',
    subtitle: 'Automation (Queue-Based)',
    description: 'A queue-driven approval system that activates when a quote is sent, then runs tiered GHL SMS prompts while the opportunity waits in "Review Estimate" — branching based on customer response.',
    impact: 'One task → one Slack card sync, approval/rejection branching fully automated, SMS handoffs without manual follow-up.',
    tech: ['ClickUp', 'Slack', 'Make (Integromat)', 'Webhooks', 'SMS'],
    category: 'Automation',
    problem: 'A service business needed a structured approval flow where quotes sent to clients would trigger an automated follow-up sequence while keeping the internal team updated in Slack — without manual handoffs or missed responses.',
    solution: [
      'Built a Make (Integromat) workflow triggered by ClickUp task status changes.',
      'When a quote is marked "Sent", the system creates a Slack approval card with full job context.',
      'Runs tiered SMS prompts to the customer at defined intervals if no response is received.',
      'Branches the automation based on customer response: Approved → advance pipeline, Rejected → notify team.',
      'Syncs all state changes back to ClickUp so the task reflects real-time approval status.',
    ],
    outcome: [
      'One task status change triggers the entire approval and follow-up chain.',
      'Sales team gets Slack notifications without checking ClickUp manually.',
      'SMS follow-up runs automatically until the customer responds.',
      'Zero manual handoffs between quote sent and approval confirmed.',
    ],
  },
  {
    id: 'linkedin-research',
    title: 'Automated LinkedIn Classification & Investor Research Pipeline',
    subtitle: 'AI Research Automation',
    description: 'End-to-end automation that ingests 1,000+ prospective LPs using website scraping, AI-driven analysis, and automated research — reducing manual research from weeks to hours.',
    impact: '1.5 minutes per client (down from 15–20 min). LP distribution + ICP scoring automated.',
    tech: ['n8n', 'OpenAI', 'Perplexity', 'Google Sheets', 'LinkedIn'],
    category: 'Automation',
    problem: 'An investment team needed to classify and research 1,000+ prospective LPs (Limited Partners) using their LinkedIn profiles and websites. Manual research took 15–20 minutes per contact, making it impossible to process at scale.',
    solution: [
      'Built an n8n pipeline that ingests LP data from Google Sheets.',
      'Scrapes each LP\'s website and LinkedIn profile for context signals.',
      'Passes scraped data to OpenAI for classification: investment focus, check size, ICP match score.',
      'Uses Perplexity for supplemental research on firms with limited online presence.',
      'Writes enriched, scored data back to Google Sheets with classification tags.',
      'Flags high-priority targets for immediate outreach based on ICP scoring.',
    ],
    outcome: [
      'Research time dropped from 15–20 minutes per LP to under 1.5 minutes.',
      '1,000+ LPs processed in hours instead of weeks.',
      'ICP scoring ensures outreach focuses on the highest-fit prospects first.',
      'Team can now run research refreshes quarterly without manual effort.',
    ],
  },
  {
    id: 'podcast-video-factory',
    title: 'AI Podcast-to-Landscape Video Factory',
    subtitle: 'Talking Head + B-Rolls',
    description: 'End-to-end automation that transforms Facebook individual videos into polished, podcast-style vertical content at scale — fully standardized, multi-segment, and AI-enhanced.',
    impact: 'Consistent podcast-style output from a single video input. Multi-format delivery automated.',
    tech: ['n8n', 'OpenAI', 'InVideo', 'FFmpeg', 'Google Drive'],
    category: 'Automation',
    problem: 'A content creator was producing long-form podcast videos but had no scalable way to repurpose them into short, landscape-format clips with B-rolls, lower thirds, and consistent branding for distribution across platforms.',
    solution: [
      'Built an n8n pipeline that ingests raw podcast MP4 files from Google Drive.',
      'Transcribes audio using OpenAI Whisper and identifies key moments.',
      'Sends transcript to GPT-4 to generate B-roll descriptions and segment titles.',
      'Passes segments and prompts to InVideo API for B-roll insertion and layout.',
      'FFmpeg handles final render — lower thirds, outro cards, format normalization.',
      'Outputs organized by segment length (60s, 90s, full clip) to Google Drive.',
    ],
    outcome: [
      'One raw podcast upload triggers the full production pipeline automatically.',
      'Multiple clip formats ready for YouTube, LinkedIn, and Instagram simultaneously.',
      'Consistent branding across all outputs — same lower thirds, colors, and outro.',
      'Creator now ships 3x more content with zero additional editing time.',
    ],
  },
  {
    id: 'estimate-scheduling',
    title: 'Estimate Approved → Scheduling Automation',
    subtitle: 'GHL Workflow Automation',
    description: 'GoHighLevel workflow that activates the moment an estimate is approved, creates internal tasks, and broadcasts a scheduling notification to push qualified leads into Project Planning.',
    impact: 'Multi-qualified booking (500+ h/month). Reduces time-to-schedule by same day.',
    tech: ['GoHighLevel', 'Workflows', 'SMS', 'Email', 'Internal Tasks'],
    category: 'GoHighLevel',
    problem: 'A service company was losing momentum after estimates were approved — scheduling happened manually and often days later, causing friction and sometimes losing the job entirely.',
    solution: [
      'Built a GHL workflow triggered the instant an opportunity moves to "Estimate Approved."',
      'Automatically sends a scheduling SMS and email to the client within 2 minutes.',
      'Creates an internal task assigned to the scheduling team with all job details.',
      'Moves the opportunity to the "Project Planning" stage.',
      'Sends a follow-up if no booking is made within 24 hours.',
    ],
    outcome: [
      'Same-day scheduling rate improved dramatically.',
      'No approved estimates sit idle — every one triggers immediate action.',
      'Scheduling team gets assigned tasks automatically without manager intervention.',
      'Client experience improved with immediate post-approval communication.',
    ],
  },
  {
    id: 'quote-followup',
    title: 'Quote Sent Follow-Up Engine',
    subtitle: 'GHL Workflow Automation',
    description: 'GoHighLevel follow-up workflow that activates when a quote is sent, then runs tiered GHL SMS + email prompts while the opportunity waits in "Review Estimate."',
    impact: 'Stage-based follow-up (500+ h/month). SMS handoffs without manual tracking.',
    tech: ['GoHighLevel', 'Workflows', 'SMS', 'Email', 'Pipeline Automation'],
    category: 'GoHighLevel',
    problem: 'After sending quotes, the sales team had no systematic follow-up — they relied on memory or manual reminders. Quotes would sit unreviewed for days, and the team had no visibility into who had seen the quote.',
    solution: [
      'Built a GHL workflow triggered when an opportunity enters "Quote Sent" stage.',
      'Sends an immediate confirmation SMS with a link to review the quote.',
      'Runs a tiered follow-up sequence: Day 1 email, Day 3 SMS, Day 5 call task.',
      'Stops the sequence automatically when the client responds or the stage changes.',
      'Notifies the sales rep via internal notification when a client opens the quote link.',
    ],
    outcome: [
      'Quote response time improved — clients receive follow-up before they forget.',
      'Sales reps no longer need to manually track who to follow up with.',
      'Follow-up sequence runs 24/7 without manager oversight.',
      'Pipeline visibility improved with stage-based automation status.',
    ],
  },
  {
    id: 'appointment-reminder',
    title: 'Appointment Reminder → Estimate Stage Handoff',
    subtitle: 'GHL Sequence Automation',
    description: 'A GoHighLevel sequence that creates the opportunity, sets multi-touch reminders (instant, 2h, 3h, 1 day) and automatically moves the data to the "Creating Estimate" stage.',
    impact: '10+ high value transactions ($500–$1000+). Automated confirmation, reminder, and stage advance.',
    tech: ['GoHighLevel', 'Workflows', 'SMS', 'Calendar', 'Pipeline'],
    category: 'GoHighLevel',
    problem: 'Service appointments were being missed or arriving without proper documentation. After appointments, creating the estimate was a manual step that often got delayed, slowing the whole sales cycle.',
    solution: [
      'Built a GHL sequence triggered when an appointment is confirmed.',
      'Sends instant confirmation SMS with appointment details and prep instructions.',
      'Runs 2h, 3h, and 1-day reminder touchpoints automatically.',
      'When the appointment time passes, auto-advances the opportunity to "Creating Estimate."',
      'Creates a task for the estimator with all client and appointment context pre-filled.',
    ],
    outcome: [
      'No-show rate dropped with multi-touch reminders.',
      'Estimates are created the same day as appointments — no more delays.',
      'Estimators have full context before they start — no back-and-forth needed.',
      '10+ high-value transactions processed through the pipeline monthly.',
    ],
  },
  {
    id: 'sales-pipeline-suite',
    title: 'Sales Pipeline Automation Suite → Invoice to Revenue',
    subtitle: 'Full GHL Pipeline Build',
    description: 'End-to-end GoHighLevel pipeline workflows for a US-based service company that automates stage transitions, follow-ups, scheduling after deposit, and invoice requests — keeping every deal moving.',
    impact: 'Full pipeline automated from lead to paid invoice. Reduced follow-up lag to near-zero.',
    tech: ['GoHighLevel', 'Workflows', 'SMS', 'Invoicing', 'Pipeline'],
    category: 'GoHighLevel',
    problem: 'A US-based service company had a complex sales pipeline but was managing it manually — each stage transition required a rep to remember to send a message, create a task, or move the deal. Revenue was leaking through the cracks.',
    solution: [
      'Mapped the full sales cycle: Lead → Estimate → Approval → Deposit → Scheduling → Completion → Invoice → Paid.',
      'Built stage-specific workflows for every transition: messages, tasks, and next-step automations.',
      'After deposit received, auto-schedules the job and notifies the field team.',
      'Post-job completion triggers invoice generation and sends payment request to client.',
      'Escalation workflows fire if any stage sits idle beyond defined thresholds.',
    ],
    outcome: [
      'Entire pipeline from lead to paid invoice runs with minimal manual intervention.',
      'Stage transition lag reduced from days to hours.',
      'Revenue cycle shortened — invoices go out the day the job is completed.',
      'Owner has full visibility into every deal\'s status in real time.',
    ],
  },
  {
    id: 'ghl-saas-website',
    title: 'GoHighLevel SaaS Marketing Agency Website',
    subtitle: 'Sub-Account Featured Build',
    description: 'High-converting GoHighLevel website for a digital marketing agency selling GHL sub-accounts, showcasing service tiers, driving discovery calls, and capturing leads into GHL directly.',
    impact: 'Premium GHL positioning for SaaS sub-account sales. Broadened reach with consistent lead capture.',
    tech: ['GoHighLevel', 'Funnels', 'CSS', 'Forms', 'Calendly'],
    category: 'Web Dev',
    problem: 'A GHL agency needed a polished, conversion-focused website to sell sub-account packages to local businesses. Their existing site looked generic and did not communicate the value of GHL automation clearly to non-technical clients.',
    solution: [
      'Designed and built a full marketing website inside GoHighLevel.',
      'Service tiers presented with clear feature breakdowns and pricing anchors.',
      'Lead capture forms feed directly into GHL pipelines for instant follow-up.',
      'Embedded Calendly booking for discovery calls with pre-qualification questions.',
      'Custom CSS applied throughout for a premium, branded aesthetic.',
    ],
    outcome: [
      'Agency now has a professional online presence matching their GHL expertise.',
      'Leads captured from the site enter automated follow-up sequences immediately.',
      'Discovery call bookings increased with embedded, frictionless scheduling.',
      'Client positioned as a premium GHL provider — not just a "website builder."',
    ],
  },
]

export const techStack = [
  { name: 'GoHighLevel', category: 'Platform' },
  { name: 'n8n', category: 'Automation' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Vite', category: 'Build' },
  { name: 'Claude AI', category: 'AI' },
  { name: 'AI Voice', category: 'AI' },
  { name: 'Typeform', category: 'Forms' },
  { name: 'Webhooks', category: 'Integration' },
  { name: 'Make', category: 'Automation' },
  { name: 'Framer', category: 'Design' },
]

export const marqueeItems = [
  'GoHighLevel',
  'n8n',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vite',
  'Claude AI',
  'AI Voice',
  'Make (Integromat)',
  'Webhooks',
  'Typeform',
  'Funnel Systems',
  'Remotion',
  'FFmpeg',
]

export const faqs = [
  {
    question: 'What do you need to start?',
    answer: "Typically just a discovery call and access to your existing tools (GHL account, website CMS, or relevant platforms). I'll audit what's already there and outline exactly what needs to be built.",
  },
  {
    question: 'Do you work inside my existing GoHighLevel account?',
    answer: "Yes. I can work as a sub-account user inside your existing GHL agency or directly within your standalone account — whichever fits your setup.",
  },
  {
    question: 'Can you integrate third-party tools via API?',
    answer: 'Absolutely. I regularly connect tools like Typeform, Calendly, Stripe, Slack, and custom webhooks using n8n or native GHL workflows.',
  },
  {
    question: 'How do you handle errors and failed runs?',
    answer: "Every automation I build includes error handling, fallback logic, and monitoring. I set up alerts so you know when something needs attention — before it becomes a problem.",
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer: 'Yes. I offer retainer-based maintenance for active automation systems, including monitoring, updates, and performance improvements as your business grows.',
  },
  {
    question: 'Can you build the web interface for the system?',
    answer: 'Yes. I build both the backend automations and the frontend interfaces — dashboards, landing pages, funnels — as a full-stack engagement.',
  },
]

export const testimonials = [
  {
    id: 1,
    quote: 'Your automations eliminated manual handoffs and made our process predictable. We ship faster without chasing tasks.',
    author: 'Operations Manager',
  },
  {
    id: 2,
    quote: 'Our GoHighLevel pipeline finally works. Leads get tracked, nurtured, and booked consistently.',
    author: 'Sales Lead',
  },
  {
    id: 3,
    quote: 'The new website improved our inquiry quality immediately. The layout is clean, professional, and built to convert.',
    author: 'Business Owner',
  },
]

export const contactLinks = {
  whatsapp: 'https://wa.me/639386916747',
  email: 'mailto:marcelo.taweng@gmail.com',
  calendly: 'https://calendly.com/marcelo-taweng/30minutes-call',
}

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/sherwin-marcelo-b222372a5/',
  github: 'https://github.com/Eriin2816',
  facebook: 'https://www.facebook.com/sherwin.garcia.marcelo/',
  email: 'mailto:marcelo.taweng@gmail.com',
}

export const footerNav = {
  navigation: [
    { label: 'Home', href: '/#home' },
    { label: 'Services', href: '/#services' },
    { label: 'Projects', href: '/#projects' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
  services: [
    { label: 'AI Automation', href: '/#services' },
    { label: 'GoHighLevel Systems', href: '/#services' },
    { label: 'Websites & Funnels', href: '/#services' },
    { label: 'Lead Capture', href: '/#services' },
    { label: 'Voice AI', href: '/#services' },
  ],
}
