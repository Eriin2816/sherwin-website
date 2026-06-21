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
  image?: string
  highlights?: string[]
  problem: string
  solution: string[]
  outcome: string[]
}

export const projects: Project[] = [
  {
    id: 'hubstaff-expense',
    title: 'Hubstaff → Daily Expense Reporting Automation',
    subtitle: 'n8n ETL Pipeline',
    description: 'Automated daily per-user expense visibility by merging Hubstaff time logs with hourly rates and hard costs, validating totals, and delivering reports to Drive + Slack.',
    highlights: [
      'Daily labor + hard-cost calculation per user',
      'Validation against Hubstaff totals (±1% variance target)',
    ],
    impact: 'Expense reporting fully automated — no manual exports, no spreadsheet merging, weekly Slack summaries for leadership.',
    tech: ['n8n', 'Hubstaff API', 'Google Sheets', 'Google Drive', 'Slack', 'ETL'],
    category: 'n8n',
    image: '/brand_assets/hubstaff.png',
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
    title: 'ClickUp → Slack Approval Bot Automation (Queue-Based)',
    subtitle: 'n8n Queue-Based Workflow',
    description: 'A queue-driven approval system that posts one ClickUp task per Slack card, syncs Approve/Revision back to ClickUp, and safely ignores double-clicks.',
    highlights: [
      'One task = one Slack card (time-based queue consumer)',
      'Approve/Revision buttons + guarded "already processed" logic',
    ],
    impact: 'One task status change triggers the entire approval and follow-up chain. Zero manual handoffs between submission and approval confirmed.',
    tech: ['n8n', 'ClickUp', 'Slack Block Kit', 'Google Sheets Queue', 'Webhooks', 'Notion', 'Google Drive'],
    category: 'n8n',
    image: '/brand_assets/click.png',
    problem: 'A creative team needed a structured approval flow where ClickUp tasks could be approved or sent for revision directly from Slack — without double-processing or missing updates back in ClickUp.',
    solution: [
      'Built an n8n workflow triggered by ClickUp task status changes.',
      'Posts one Slack card per ClickUp task with full job context using Slack Block Kit.',
      'Implements a Google Sheets-based queue to prevent duplicate Slack messages (double-click guard).',
      'Approve/Revision buttons in Slack update the task status back in ClickUp in real time.',
      '"Already processed" guard logic ensures each task is handled exactly once.',
      'Syncs state changes to Notion and Google Drive for record keeping.',
    ],
    outcome: [
      'Sales team gets Slack notifications without checking ClickUp manually.',
      'Approval loop runs automatically until the client responds.',
      'Zero duplicate Slack cards — queue guard eliminates race conditions.',
      'Full audit trail in Notion and Google Drive for every approval decision.',
    ],
  },
  {
    id: 'linkedin-research',
    title: 'Automated LP Classification & Investor Research Pipeline',
    subtitle: 'AI-Powered n8n Research Automation',
    description: 'End-to-end n8n automation that classifies and enriches ~1,000 prospective LPs using website ingestion, AI-driven analysis, and external research—reducing manual research from weeks to hours.',
    highlights: [
      '< 1 minute per firm (down from 10–15 minutes)',
      'Structured LP classification + ICP fit scoring',
    ],
    impact: '1,000+ LPs processed in hours instead of weeks. ICP scoring ensures outreach focuses on the highest-fit prospects first.',
    tech: ['n8n', 'OpenAI', 'Perplexity', 'Google Sheets', 'HTTP', 'Code'],
    category: 'n8n',
    image: '/brand_assets/investor.png',
    problem: 'An investment team needed to classify and research 1,000+ prospective LPs (Limited Partners) using their LinkedIn profiles and websites. Manual research took 10–15 minutes per contact, making it impossible to process at scale.',
    solution: [
      'Built an n8n pipeline that ingests LP data from Google Sheets.',
      'Scrapes each LP\'s website for context signals using HTTP requests.',
      'Passes scraped data to OpenAI for classification: investment focus, check size, ICP match score.',
      'Uses Perplexity for supplemental research on firms with limited online presence.',
      'Custom Code nodes handle data transformation and scoring logic.',
      'Writes enriched, scored data back to Google Sheets with classification tags.',
      'Flags high-priority targets for immediate outreach based on ICP scoring.',
    ],
    outcome: [
      'Research time dropped from 10–15 minutes per LP to under 1 minute.',
      '1,000+ LPs processed in hours instead of weeks.',
      'ICP scoring ensures outreach focuses on the highest-fit prospects first.',
      'Team can now run research refreshes quarterly without manual effort.',
    ],
  },
  {
    id: 'podcast-video-factory',
    title: 'AI Podcast-to-Landscape Video Factory (Talking Head + B-Roll)',
    subtitle: 'AI Video Production Pipeline',
    description: 'End-to-end automation that transforms Facebook motivational videos into polished, podcast-style vertical content at scale—fully standardized, multi-segment, and publish-ready.',
    highlights: [
      'Automated video production from a single Google Sheet row',
      'Multi-angle, talking-head style output',
    ],
    impact: 'One raw video upload triggers the full production pipeline. Creator ships 3x more content with zero additional editing time.',
    tech: ['n8n', 'OpenAI', 'Google Sheets', 'Apify', 'InfiTalk', 'Seedance Pro', 'fal.ai'],
    category: 'AI',
    image: '/brand_assets/aivideo.png',
    problem: 'A content creator was producing long-form Facebook motivational videos but had no scalable way to repurpose them into polished, podcast-style landscape clips with B-rolls, talking-head segments, and consistent branding for distribution across platforms.',
    solution: [
      'Built an n8n pipeline triggered from a single Google Sheet row entry.',
      'Apify scrapes and downloads source videos from Facebook.',
      'OpenAI transcribes audio and identifies key moments and segment titles.',
      'InfiTalk generates AI talking-head segments from the script.',
      'Seedance Pro and fal.ai handle B-roll generation and visual enhancement.',
      'Outputs organized by segment length and format to Google Drive.',
    ],
    outcome: [
      'One Google Sheet row triggers the full multi-segment video production pipeline.',
      'Talking-head and B-roll content produced automatically from a single source video.',
      'Consistent branding across all outputs — standardized format and style.',
      'Creator now ships 3x more content with zero additional editing time.',
    ],
  },
  {
    id: 'estimate-scheduling',
    title: 'Estimate Approved → Scheduling Automation (GHL)',
    subtitle: 'GHL Workflow Automation',
    description: 'GoHighLevel workflow that follows up immediately after an estimate is approved—sending SMS/email, creating internal tasks, and branching based on contact replies to push qualified leads into Project Planning.',
    highlights: [
      'Multi-channel follow-up (SMS + Email)',
      'Reply-based branching (positive vs unclear)',
    ],
    impact: 'Same-day scheduling rate improved dramatically. No approved estimates sit idle — every one triggers immediate action.',
    tech: ['GoHighLevel', 'Workflows', 'SMS', 'Email', 'Pipeline', 'Tasks'],
    category: 'GHL',
    image: '/brand_assets/Estimate.png',
    problem: 'A service company was losing momentum after estimates were approved — scheduling happened manually and often days later, causing friction and sometimes losing the job entirely.',
    solution: [
      'Built a GHL workflow triggered the instant an opportunity moves to "Estimate Approved."',
      'Automatically sends a scheduling SMS and email to the client within 2 minutes.',
      'Creates an internal task assigned to the scheduling team with all job details.',
      'Branches based on contact reply: positive response → advance to Project Planning, unclear → additional follow-up.',
      'Moves the opportunity to the "Project Planning" stage once qualified.',
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
    title: 'Quote Sent Follow-Up Engine (GHL)',
    subtitle: 'GHL Follow-Up Workflow',
    description: 'GoHighLevel follow-up workflow that activates when a quote is sent, then runs timed SMS + call prompts while the opportunity remains in "Review Estimate"—preventing leads from going cold.',
    highlights: [
      'Stage-guarded follow-up (only runs if still reviewing)',
      'SMS touches + call follow-up prompts',
    ],
    impact: 'Quote response time improved — clients receive follow-up before they forget. Follow-up sequence runs 24/7 without manager oversight.',
    tech: ['GoHighLevel', 'Workflows', 'SMS', 'Tasks/Call Prompts', 'Pipeline', 'Conditions'],
    category: 'GHL',
    image: '/brand_assets/Quote.png',
    problem: 'After sending quotes, the sales team had no systematic follow-up — they relied on memory or manual reminders. Quotes would sit unreviewed for days, and the team had no visibility into who had seen the quote.',
    solution: [
      'Built a GHL workflow triggered when an opportunity enters "Quote Sent" stage.',
      'Sends an immediate confirmation SMS with a link to review the quote.',
      'Runs a tiered follow-up sequence: Day 1 SMS, Day 3 call prompt task, Day 5 final follow-up.',
      'Stage guard ensures the sequence only continues if the opportunity is still in "Review Estimate."',
      'Stops the sequence automatically when the client responds or the stage changes.',
      'Notifies the sales rep via internal notification when follow-up tasks are due.',
    ],
    outcome: [
      'Quote response time improved — clients receive follow-up before they forget.',
      'Sales reps no longer need to manually track who to follow up with.',
      'Stage-guarded logic prevents follow-up on already-decided quotes.',
      'Pipeline visibility improved with stage-based automation status.',
    ],
  },
  {
    id: 'appointment-reminder',
    title: 'Appointment Reminder Sequence → Estimate Stage Handoff (GHL)',
    subtitle: 'GHL Sequence Automation',
    description: 'GoHighLevel appointment workflow that creates/updates the opportunity, assigns ownership, sends multi-touch reminders (instant, 24h, 2h), then delivers a post-appointment thank-you and automatically moves the deal into the "Creating Estimate" stage.',
    highlights: [
      'Instant + 24h + 2h appointment reminders (SMS + Email)',
      'Auto tags + owner assignment + internal follow-up task',
    ],
    impact: 'No-show rate dropped with multi-touch reminders. Estimates are created the same day as appointments — no more delays.',
    tech: ['GoHighLevel', 'Workflows', 'SMS', 'Calendar', 'Pipeline'],
    category: 'GHL',
    image: '/brand_assets/Reminder.png',
    problem: 'Service appointments were being missed or arriving without proper documentation. After appointments, creating the estimate was a manual step that often got delayed, slowing the whole sales cycle.',
    solution: [
      'Built a GHL sequence triggered when an appointment is confirmed.',
      'Creates/updates the opportunity and assigns ownership to the right team member.',
      'Sends instant confirmation SMS + Email with appointment details.',
      'Runs 24h and 2h reminder touchpoints automatically via SMS + Email.',
      'Applies auto tags and creates an internal follow-up task for the estimator.',
      'When the appointment time passes, auto-advances the opportunity to "Creating Estimate."',
    ],
    outcome: [
      'No-show rate dropped with multi-touch reminders.',
      'Estimates are created the same day as appointments — no more delays.',
      'Estimators have full context before they start — no back-and-forth needed.',
      'Auto tags and owner assignment ensure no lead slips through the cracks.',
    ],
  },
  {
    id: 'sales-pipeline-suite',
    title: 'Sales Pipeline Automation Suite → Estimate to Invoice to Review (GHL)',
    subtitle: 'Full GHL Pipeline Build',
    description: 'End-to-end GoHighLevel pipeline workflows for a USA pool services company that automates stage handoffs from estimate follow-ups to invoicing, scheduling after payment, project planning after deposit, and review requests—keeping every deal moving with consistent follow-up.',
    highlights: [
      'Automated stage-based follow-ups for Estimates + Invoices (SMS/Email)',
      'Deposit → Project Planning + Invoice Paid → Send Scheduling handoffs',
    ],
    impact: 'Entire pipeline from lead to paid invoice runs with minimal manual intervention. Stage transition lag reduced from days to hours.',
    tech: ['GoHighLevel', 'Workflows', 'Pipelines', 'Opportunities', 'SMS', 'Email', 'Tasks', 'Tags'],
    category: 'GHL',
    image: '/brand_assets/Sales.png',
    problem: 'A US-based pool services company had a complex sales pipeline but was managing it manually — each stage transition required a rep to remember to send a message, create a task, or move the deal. Revenue was leaking through the cracks.',
    solution: [
      'Mapped the full sales cycle: Lead → Estimate → Approval → Deposit → Scheduling → Completion → Invoice → Paid → Review.',
      'Built stage-specific workflows for every transition: messages, tasks, and next-step automations.',
      'After deposit received, auto-schedules the job and notifies the field team.',
      'Post-job completion triggers invoice generation and sends payment request to client.',
      'Invoice Paid → auto-sends scheduling confirmation and advances to next stage.',
      'Post-completion review request sequence fires 3 days after job is marked complete.',
      'Escalation workflows fire if any stage sits idle beyond defined thresholds.',
    ],
    outcome: [
      'Entire pipeline from lead to paid invoice runs with minimal manual intervention.',
      'Stage transition lag reduced from days to hours.',
      'Revenue cycle shortened — invoices go out the day the job is completed.',
      'Review requests automated — no rep needed to ask for Google reviews manually.',
    ],
  },
  {
    id: 'ghl-saas-agency',
    title: 'GoHighLevel SaaS Marketing Agency Website (Sub-Accounts + Features)',
    subtitle: 'GHL SaaS Website Build',
    description: 'High-converting GoHighLevel website built for a marketing agency selling GHL sub-accounts (SaaS/white-label) and platform features. Designed to drive discovery calls and streamline inquiries.',
    highlights: [
      'Premium SaaS positioning for GHL sub-accounts + feature breakdown',
      'Conversion-focused layout: clear CTA, trust sections, and service/offer structure',
    ],
    impact: 'Premium GHL positioning for SaaS sub-account sales. Broadened reach with consistent lead capture.',
    tech: ['GoHighLevel', 'GHL Sites', 'Funnels', 'Forms', 'Calendly', 'CSS'],
    category: 'GHL',
    image: '/brand_assets/Agency.png',
    problem: 'A GHL agency needed a polished, conversion-focused website to sell sub-account packages and platform features to local businesses. Their existing presence looked generic and did not clearly communicate the value of GHL automation to non-technical clients.',
    solution: [
      'Designed and built a full marketing website inside GoHighLevel Sites.',
      'Service tiers and feature breakdowns presented with clear pricing anchors.',
      'Trust sections and social proof integrated throughout to build authority.',
      'Lead capture forms feed directly into GHL pipelines for instant follow-up.',
      'Embedded Calendly booking for discovery calls with pre-qualification questions.',
      'Custom CSS applied throughout for a premium, branded SaaS aesthetic.',
    ],
    outcome: [
      'Agency now has a professional online presence matching their GHL expertise.',
      'Leads captured from the site enter automated follow-up sequences immediately.',
      'Discovery call bookings increased with embedded, frictionless scheduling.',
      'Client positioned as a premium GHL SaaS provider — clear differentiation from competitors.',
    ],
  },
  {
    id: 'showtime-pools',
    title: 'Showtime Pools — GoHighLevel Website Build (California)',
    subtitle: 'GHL Website Build',
    description: 'Conversion-focused GoHighLevel website built for a California pool company to drive bookings, promote services, and capture leads with clear CTAs.',
    highlights: [
      'Service pages structured for repairs, maintenance, and upgrades',
      'Strong CTAs: booking + instant estimate entry points',
    ],
    impact: 'Increased lead capture and booking inquiries. Service pages clearly communicate offerings across pool repair, maintenance, and upgrade categories.',
    tech: ['GoHighLevel', 'GHL Sites', 'Funnels', 'Forms', 'Calendly', 'Custom CSS'],
    category: 'GHL',
    image: '/brand_assets/showtime.png',
    problem: 'A California-based pool services company needed a professional website that could clearly present their service range, build local trust, and convert visitors into booking and estimate inquiries — without relying on a developer for every update.',
    solution: [
      'Built a full multi-page website inside GoHighLevel Sites.',
      'Dedicated service pages for repairs, maintenance, and upgrades with clear scope descriptions.',
      'Prominent booking and instant estimate CTAs placed above the fold and throughout each page.',
      'Lead capture forms integrated directly into GHL pipelines for automatic follow-up.',
      'Custom CSS for a polished, California-market-appropriate visual identity.',
      'Calendly embedded for frictionless appointment scheduling.',
    ],
    outcome: [
      'Website clearly communicates service offerings across all pool service categories.',
      'Booking and estimate inquiries route directly into GHL for automated follow-up.',
      'Professional design builds local trust and differentiates from generic pool company sites.',
      'Client can manage content without developer dependency.',
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
