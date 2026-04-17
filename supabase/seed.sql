-- Intelligence Tech — Seed Data
-- Run this AFTER 001_create_tables.sql in Supabase SQL Editor

-- ══════════════════════════════════════════════════════════════
-- PRODUCTS (11 products, 4 featured)
-- ══════════════════════════════════════════════════════════════
insert into public.products (name, slug, description, category, status, icon, featured, featured_order, page_content) values

('ScaleWise', 'scalewise',
 'Autonomous resource scaling for distributed infrastructures.',
 'Platform', 'active', 'insights', true, 1,
 '{
   "eyebrow": "Intelligence Ecosystem Product",
   "headline": "ScaleWise",
   "subhead": "Autonomous Scaling for Modern Infrastructure.",
   "heroCopy": "Predict load, optimize resources, and scale your infrastructure with zero manual intervention. Built on the next‑gen Neural Engine.",
   "heroImage": "https://lh3.googleusercontent.com/aida-public/AB6AXuAeAxcu6zyY4OgnsBKQchFs49w4k5T9vYrqxbmCPcEweuduRZGEBfQLzaGdtlw9OoUnPiYkgAL_wIPti4nbH2BdQ1lGZvVnd_nPGN9C9gLndjT55yMtxfhSAL1-j94DfHj0InrlnYginkK6viW8ir0H31Vigrv8buTJJHBLW5BTndEyyCagpdKjK-ezWVfK19y89vSlr2tMbYyhr2tat9cNaYAw4P79XUXSZ0LD9sXTMBil2OzUFSJY7vuyt9iBNvB1AJR413l7pxgj",
   "benefits": [
     {"icon": "insights", "title": "Predictive Load Balancing", "desc": "Our AI anticipates traffic spikes before they hit your nodes, ensuring zero downtime during critical surges."},
     {"icon": "savings", "title": "Cost Optimization", "desc": "Intelligently decommission idle resources to reduce cloud waste by up to 40% without compromising performance."},
     {"icon": "rocket_launch", "title": "Instant Deployment", "desc": "Deploy in minutes with native 1‑click integrations for AWS, GCP, Azure, and private cloud clusters."}
   ],
   "deepDive": [
     {
       "eyebrow": "Proprietary AI",
       "title": "The Neural Engine",
       "copy": "Unlike traditional threshold-based scaling, the Neural Engine uses temporal pattern recognition to understand your application''s unique heartbeat. It learns from history to engineer the future of your infrastructure.",
       "bullets": ["Sub-millisecond decision logic", "Multi-variable anomaly detection"],
       "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBkalvA6GRwcBvCpx6uBLv7eYC4BGswnZWXe0L6eKMQbkLcPQx5J0yFhQ2efSql_iu67jj1Eedk6ZHWQggBVmCXM-ytMU54hVhllJgt2N2uZpby6nRbiHDYRTmY3akLkhNIoG1a9FurzeDOeayf-FEJBpZXQZ_pLiN-J0SBt_FJDl8AGGJueO-2r-3p2S0rmDVIpjCp2E0cgRQKZhMHT8I8KLncTlGohocC-ThCbJvjG8YkLjjJIoQsVl-zRuQ-Yf2Uw3CqZbJwes5H",
       "imageStyle": "card",
       "bgTinted": true,
       "layout": "image-left"
     },
     {
       "eyebrow": "Infrastructure",
       "title": "Global Edge Network",
       "copy": "ScaleWise operates across 140+ global points of presence. By distributing the scaling logic to the edge, we reduce latency and ensure your infrastructure responds instantly to users, regardless of geography.",
       "link": {"label": "Explore our network", "href": "#"},
       "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCmfGDmqaPVSrOSA_EqIOHNmrRbUJuvUgy8g2XA9qFl_bBNgdZShAjAfdlC79Y4y801s4SqLV4jcLd1akKDWzqx0sOK0n0nqjT16qM_M0IYsKAzb_N9OsvK1HjNrsCFn1bAiqvuRgWfnUfccvtgz9US3v0szIEG8C4hkhoKqbpBDz-fR_-LTVh3Mmy1e73mYsZAZhGEb2Gp_InK_U-PvhPv__-bQ-jG4m0MweM-vO9htj155qxilzRi890lzlrputn6i3jVcBnlCqD9",
       "imageStyle": "circle",
       "bgTinted": false,
       "layout": "image-right"
     }
   ],
   "testimonial": {
     "quote": "ScaleWise didn''t just save us money on our AWS bill; it gave our engineering team back 15 hours a week. It''s the silent architect every high-growth startup needs.",
     "author": "Marcus Thorne",
     "role": "CTO, NexaGen Labs"
   },
   "integrity": [
     {"icon": "verified_user", "title": "SOC2 Type II", "desc": "Fully compliant with the highest industry security standards."},
     {"icon": "update", "title": "99.99% Uptime", "desc": "Guaranteed reliability with our premium service level agreement."},
     {"icon": "api", "title": "REST & GraphQL", "desc": "Deeply extensible API architecture for custom workflows."},
     {"icon": "lock", "title": "End-to-End Encryption", "desc": "Your infrastructure metadata is encrypted in transit and at rest."}
   ],
   "cta": {
     "heading": "Ready to scale?",
     "body": "Join 2,000+ companies optimizing their infrastructure with the intelligence of ScaleWise.",
     "buttonLabel": "Start Your Free Trial",
     "buttonHref": "/products"
   }
 }'::jsonb),

('OmniGraph', 'omnigraph',
 'Relational data visualization for complex ecosystems.',
 'Platform', 'active', 'hub', true, 2,
 '{
   "eyebrow": "Intelligence Ecosystem Product",
   "headline": "OmniGraph",
   "subhead": "See Every Connection. Own Every Decision.",
   "heroCopy": "Turn tangled systems into clean, navigable graphs—so teams can trace lineage, ownership, and impact in minutes.",
   "heroImage": "https://lh3.googleusercontent.com/aida-public/AB6AXuCmfGDmqaPVSrOSA_EqIOHNmrRbUJuvUgy8g2XA9qFl_bBNgdZShAjAfdlC79Y4y801s4SqLV4jcLd1akKDWzqx0sOK0n0nqjT16qM_M0IYsKAzb_N9OsvK1HjNrsCFn1bAiqvuRgWfnUfccvtgz9US3v0szIEG8C4hkhoKqbpBDz-fR_-LTVh3Mmy1e73mYsZAZhGEb2Gp_InK_U-PvhPv__-bQ-jG4m0MweM-vO9htj155qxilzRi890lzlrputn6i3jVcBnlCqD9",
   "benefits": [
     {"icon": "hub", "title": "Dependency Mapping", "desc": "Visualize services, data, and ownership in real-time."},
     {"icon": "query_stats", "title": "Impact Analysis", "desc": "Understand how a change cascades across systems before you ship."},
     {"icon": "speed", "title": "Fast Scanning", "desc": "Large graphs feel calm, readable, and actionable."}
   ],
   "deepDive": [
     {
       "eyebrow": "Visualization",
       "title": "Graph Intelligence Engine",
       "copy": "OmniGraph uses advanced layout algorithms to keep large graphs scannable. Zoom from a 10,000-foot view down to individual edges without losing context.",
       "bullets": ["Auto-layout for 1000+ node graphs", "Real-time dependency detection"],
       "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBkalvA6GRwcBvCpx6uBLv7eYC4BGswnZWXe0L6eKMQbkLcPQx5J0yFhQ2efSql_iu67jj1Eedk6ZHWQggBVmCXM-ytMU54hVhllJgt2N2uZpby6nRbiHDYRTmY3akLkhNIoG1a9FurzeDOeayf-FEJBpZXQZ_pLiN-J0SBt_FJDl8AGGJueO-2r-3p2S0rmDVIpjCp2E0cgRQKZhMHT8I8KLncTlGohocC-ThCbJvjG8YkLjjJIoQsVl-zRuQ-Yf2Uw3CqZbJwes5H",
       "imageStyle": "card",
       "bgTinted": true,
       "layout": "image-left"
     }
   ],
   "testimonial": {
     "quote": "OmniGraph turned our architecture reviews from 2-hour meetings into 10-minute walkthroughs.",
     "author": "Sarah Lin",
     "role": "VP Engineering, DataCore"
   },
   "integrity": [
     {"icon": "verified_user", "title": "SOC2 Type II", "desc": "Fully compliant with the highest industry security standards."},
     {"icon": "update", "title": "99.99% Uptime", "desc": "Guaranteed reliability with our premium service level agreement."},
     {"icon": "api", "title": "REST & GraphQL", "desc": "Deeply extensible API architecture for custom workflows."},
     {"icon": "lock", "title": "End-to-End Encryption", "desc": "Your data is encrypted in transit and at rest."}
   ],
   "cta": {
     "heading": "Ready to see clearly?",
     "body": "Join teams using OmniGraph to navigate complexity with confidence.",
     "buttonLabel": "Start Your Free Trial",
     "buttonHref": "/products"
   }
 }'::jsonb),

('FlowGenie', 'flowgenie',
 'Generative automation for repetitive operational tasks.',
 'Platform', 'active', 'auto_fix_high', true, 3,
 '{
   "eyebrow": "Intelligence Ecosystem Product",
   "headline": "FlowGenie",
   "subhead": "Automate the Repetitive. Focus on the Important.",
   "heroCopy": "From runbooks to intelligent workflows: reduce operational toil without sacrificing control.",
   "heroImage": "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKMEBsEr8oTeuZQHM5ffRxWUc6r2X1U7VR8d2uavy9sMROUpRlZuW2Fdr9SOu8X6tvnmzR4IUnMDp5mxQkFXQiizPTxxiFZkkJ_9tLUEEL2BoIs6cELTON6Nv_cCECnkI4n17gmEZrWwmCm679KdRofXtk41i0ObXshs3zAoBVhf4kCDUpl2tpHQ6xrwNJBG_uLcO2d4vfPGowrXkgrKiSm7qzfhk8jDryu0uq8Gj1dM0em_4n9SlZ6M6KGVMQB0TofApmGI9QP0Z",
   "benefits": [
     {"icon": "auto_fix_high", "title": "Smart Workflows", "desc": "Generate automation flows from natural language descriptions."},
     {"icon": "security", "title": "Guardrails Built In", "desc": "Approvals, diffs, and audit trails for every automated action."},
     {"icon": "undo", "title": "Rollback-First", "desc": "Every action is reversible with one click."}
   ],
   "deepDive": [
     {
       "eyebrow": "Automation",
       "title": "Generative Workflow Engine",
       "copy": "Describe what you want in plain English and FlowGenie generates the workflow, complete with error handling and rollback steps.",
       "bullets": ["Natural language to workflow", "Built-in approval gates"],
       "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAOAbucxLWL1CQOOp8fEMXo9d_126zxnkKl7gJ0DgtlCpQ1nXKbcfhgOxvp1DOQCyWEVmh_xlajAKJSkHLJhyzU64zdQWyHtpAvgbdNl7qKBYIi8MgWaso7jDhOM6uQXnhNSgpjZEDJ4P9_CfUemm92G0XH2Jgdq-OWVEUfK-X0ZLnrEFq4iKXR3cWG6E4VflrHlrAUg4id-oBHmokGsanM_XG9vapk1Oqyl-5GfbKS_kNWdzLu5jPYEmKeREajgFXGrJEuosl7qjgE",
       "imageStyle": "card",
       "bgTinted": true,
       "layout": "image-left"
     }
   ],
   "testimonial": {
     "quote": "FlowGenie cut our ops toil by 60% in the first month. The guardrails make automation feel safe.",
     "author": "James Okoro",
     "role": "SRE Lead, CloudShift"
   },
   "integrity": [
     {"icon": "verified_user", "title": "SOC2 Type II", "desc": "Fully compliant with the highest industry security standards."},
     {"icon": "update", "title": "99.99% Uptime", "desc": "Guaranteed reliability with our premium service level agreement."},
     {"icon": "api", "title": "REST & GraphQL", "desc": "Deeply extensible API architecture for custom workflows."},
     {"icon": "lock", "title": "End-to-End Encryption", "desc": "All workflow data is encrypted in transit and at rest."}
   ],
   "cta": {
     "heading": "Ready to automate?",
     "body": "Join teams shipping faster with FlowGenie''s intelligent automation.",
     "buttonLabel": "Start Your Free Trial",
     "buttonHref": "/products"
   }
 }'::jsonb),

('NeuralHub', 'neuralhub',
 'Centralized intelligence repository for shared team learning.',
 'Platform', 'active', 'psychology', true, 4,
 '{
   "eyebrow": "Intelligence Ecosystem Product",
   "headline": "NeuralHub",
   "subhead": "Your Team''s Collective Brain.",
   "heroCopy": "A calm, contextual workspace for real institutional learning. Connect decisions to incidents, runbooks to outcomes.",
   "heroImage": "https://lh3.googleusercontent.com/aida-public/AB6AXuCzwtLbrNIZYrnTqG4iHUJOQaQU-1cRbxD44IcbwWqEzhQe1rckgAvbsB_Csxhmyke9JyjakuiFPTJLBhPe46ryFSh9NdR_5DDqyg87KUc2PLFQ3TLjS7rN_BmYpGXxaxOiG3ZdcjECNzlFdtwGWGs5VhJkO54zNxgh-K7esrwo6eRdxq7KstwCTDW1feeJbKdrgS00L6mEJ_4IF5F7PLngoo_0qOwzRLEA7bu5UI-ngnEc2ol6ICOpLPxiQ3Nfc79nQbTA3SjqUU54",
   "benefits": [
     {"icon": "psychology", "title": "Contextual Knowledge", "desc": "Connect decisions to incidents, runbooks to outcomes, patterns to teams."},
     {"icon": "search", "title": "Smart Search", "desc": "Find answers instantly with AI-powered semantic search."},
     {"icon": "group", "title": "Team Learning", "desc": "Build institutional memory that grows with your organization."}
   ],
   "deepDive": [
     {
       "eyebrow": "Knowledge",
       "title": "Contextual Intelligence Layer",
       "copy": "NeuralHub doesn''t just store docs — it understands relationships between knowledge, incidents, and teams.",
       "bullets": ["Semantic search across all content", "Auto-linked context graphs"],
       "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBhLxnspFc3Ft2uDaHu9mEHZU_tRd8vZDtwzBkvaYaZKUTq4CAZPpg6WPGmbVkOJqnxVkNDnPCXdIDYpCVfSG_wz1sdlSO88aDNI20IoxGoPtlHx-mmLqEfGXpPBetDcUSPFfwJZwB4EFW4boTq54HlwfVyx9KQvNv-ccTB9NR81t_qoBBTJ7Qyp5gh0XINULAynZokhLVQwi9oETRZ8K3iKkV4rZZdNtOJPS4qjn7pfKKcmCyyAc65Q7M4D3qEAIz9h3t4XArJtWzy",
       "imageStyle": "circle",
       "bgTinted": false,
       "layout": "image-right"
     }
   ],
   "testimonial": {
     "quote": "NeuralHub transformed how our distributed team shares knowledge. Onboarding time dropped 40%.",
     "author": "Priya Sharma",
     "role": "Head of Engineering, Nextera"
   },
   "integrity": [
     {"icon": "verified_user", "title": "SOC2 Type II", "desc": "Fully compliant with the highest industry security standards."},
     {"icon": "update", "title": "99.99% Uptime", "desc": "Guaranteed reliability with our premium service level agreement."},
     {"icon": "api", "title": "REST & GraphQL", "desc": "Deeply extensible API architecture for custom workflows."},
     {"icon": "lock", "title": "End-to-End Encryption", "desc": "All knowledge data is encrypted in transit and at rest."}
   ],
   "cta": {
     "heading": "Ready to learn faster?",
     "body": "Join teams building lasting institutional knowledge with NeuralHub.",
     "buttonLabel": "Start Your Free Trial",
     "buttonHref": "/products"
   }
 }'::jsonb),

('SignalStack', 'signalstack', 'Event pipelines and alerting with unified intelligence routing.', 'Platform', 'beta', 'notifications_active', false, 0, '{}'::jsonb),
('PolicyForge', 'policyforge', 'Automated compliance checks and policy enforcement for teams.', 'Security', 'beta', 'policy', false, 0, '{}'::jsonb),
('OmniOps', 'omniops', 'Ops command center for incidents, runbooks, and on-call coordination.', 'Operations', 'beta', 'terminal', false, 0, '{}'::jsonb),
('AuditTrail', 'audittrail', 'Immutable change logs and forensic timelines for critical systems.', 'Security', 'beta', 'history', false, 0, '{}'::jsonb),
('WorkMesh', 'workmesh', 'Unified workflow orchestration across teams and tools.', 'Platform', 'beta', 'share', false, 0, '{}'::jsonb),
('InsightHub', 'insighthub', 'Executive analytics with narrative dashboards powered by AI.', 'Analytics', 'beta', 'analytics', false, 0, '{}'::jsonb),
('SecureGate', 'securegate', 'Identity-aware access and policy controls for modern stacks.', 'Security', 'beta', 'shield', false, 0, '{}'::jsonb)
on conflict (slug) do nothing;


-- ══════════════════════════════════════════════════════════════
-- BLOGS (8 demo posts)
-- ══════════════════════════════════════════════════════════════
insert into public.blogs (title, slug, content, meta_title, meta_description, featured_image, tags, category, published) values

('Inside the Intelligence Tech Ecosystem',
 'inside-the-intelligence-tech-ecosystem',
 E'## The ecosystem mindset\n\nModern teams don''t need more disconnected tools — they need a system that **works together**. Our approach is simple:\n\n- Build focused products that do one job extremely well\n- Connect them with a shared intelligence layer\n- Keep UX consistent so switching contexts feels effortless\n\n## What you''ll see next\n\nOver the coming weeks, we''ll publish deep dives into reliability, scaling, and the design system powering the platform.',
 'Inside the Intelligence Tech Ecosystem',
 'A quick tour of the products, the shared intelligence layer, and the design principles behind the ecosystem.',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeAxcu6zyY4OgnsBKQchFs49w4k5T9vYrqxbmCPcEweuduRZGEBfQLzaGdtlw9OoUnPiYkgAL_wIPti4nbH2BdQ1lGZvVnd_nPGN9C9gLndjT55yMtxfhSAL1-j94DfHj0InrlnYginkK6viW8ir0H31Vigrv8buTJJHBLW5BTndEyyCagpdKjK-ezWVfK19y89vSlr2tMbYyhr2tat9cNaYAw4P79XUXSZ0LD9sXTMBil2OzUFSJY7vuyt9iBNvB1AJR413l7pxgj',
 ARRAY['ecosystem', 'product', 'design'], 'Updates', true),

('How ScaleWise Predicts Load Before It Happens',
 'how-scalewise-predicts-load',
 E'## Reactive scaling is expensive\n\nThresholds wait until you''ve already hit trouble. That means:\n\n- slower recovery\n- more overprovisioning\n- unpredictable user experience\n\n## A better approach\n\nScaleWise learns from historical traffic patterns and correlates multiple signals — then acts early, not late.\n\n## The result\n\nTeams can ship faster with less operational overhead and more predictable performance.',
 'How ScaleWise Predicts Load Before It Happens',
 'From reactive thresholds to proactive scaling: the core ideas behind our Neural Engine and why it matters.',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkalvA6GRwcBvCpx6uBLv7eYC4BGswnZWXe0L6eKMQbkLcPQx5J0yFhQ2efSql_iu67jj1Eedk6ZHWQggBVmCXM-ytMU54hVhllJgt2N2uZpby6nRbiHDYRTmY3akLkhNIoG1a9FurzeDOeayf-FEJBpZXQZ_pLiN-J0SBt_FJDl8AGGJueO-2r-3p2S0rmDVIpjCp2E0cgRQKZhMHT8I8KLncTlGohocC-ThCbJvjG8YkLjjJIoQsVl-zRuQ-Yf2Uw3CqZbJwes5H',
 ARRAY['scalewise', 'infra', 'reliability'], 'Engineering', true),

('Designing the White/Grey Rhythm',
 'designing-the-white-grey-rhythm',
 E'## Rhythm matters\n\nAlternating section tones creates a natural reading cadence:\n\n- faster scanning\n- clearer hierarchy\n- calmer feel on long pages\n\n## Motion supports structure\n\nWhen sections already have a rhythm, scroll animations can be slower and smoother — without feeling overwhelming.',
 'Designing the White/Grey Rhythm',
 'Why alternating section tones improves scanning, reduces fatigue, and makes motion feel premium.',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOAbucxLWL1CQOOp8fEMXo9d_126zxnkKl7gJ0DgtlCpQ1nXKbcfhgOxvp1DOQCyWEVmh_xlajAKJSkHLJhyzU64zdQWyHtpAvgbdNl7qKBYIi8MgWaso7jDhOM6uQXnhNSgpjZEDJ4P9_CfUemm92G0XH2Jgdq-OWVEUfK-X0ZLnrEFq4iKXR3cWG6E4VflrHlrAUg4id-oBHmokGsanM_XG9vapk1Oqyl-5GfbKS_kNWdzLu5jPYEmKeREajgFXGrJEuosl7qjgE',
 ARRAY['ui', 'ux', 'motion'], 'Design', true),

('OmniGraph: Seeing Dependencies Clearly',
 'omnigraph-seeing-dependencies-clearly',
 E'## Clarity beats complexity\n\nWhen systems grow, relationships become the real source of risk. OmniGraph helps you:\n\n- visualize services, data, and ownership\n- identify hidden coupling\n- plan changes with confidence\n\n## Built for fast scanning\n\nThe UI is designed to make large graphs feel calm, readable, and actionable.',
 'OmniGraph: Seeing Dependencies Clearly',
 'Turn tangled systems into clean, navigable graphs—so teams can trace lineage, ownership, and impact in minutes.',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmfGDmqaPVSrOSA_EqIOHNmrRbUJuvUgy8g2XA9qFl_bBNgdZShAjAfdlC79Y4y801s4SqLV4jcLd1akKDWzqx0sOK0n0nqjT16qM_M0IYsKAzb_N9OsvK1HjNrsCFn1bAiqvuRgWfnUfccvtgz9US3v0szIEG8C4hkhoKqbpBDz-fR_-LTVh3Mmy1e73mYsZAZhGEb2Gp_InK_U-PvhPv__-bQ-jG4m0MweM-vO9htj155qxilzRi890lzlrputn6i3jVcBnlCqD9',
 ARRAY['omnigraph', 'architecture', 'observability'], 'Engineering', true),

('FlowGenie and the Future of Ops Automation',
 'flowgenie-future-of-ops-automation',
 E'## Automation should feel safe\n\nFlowGenie focuses on guardrails:\n\n- approvals when needed\n- clear diffs and audit trails\n- rollback-first design\n\n## Faster loops\n\nLess time clicking, more time shipping—without losing visibility.',
 'FlowGenie and the Future of Ops Automation',
 'From runbooks to intelligent workflows: how we''re reducing operational toil without sacrificing control.',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvKMEBsEr8oTeuZQHM5ffRxWUc6r2X1U7VR8d2uavy9sMROUpRlZuW2Fdr9SOu8X6tvnmzR4IUnMDp5mxQkFXQiizPTxxiFZkkJ_9tLUEEL2BoIs6cELTON6Nv_cCECnkI4n17gmEZrWwmCm679KdRofXtk41i0ObXshs3zAoBVhf4kCDUpl2tpHQ6xrwNJBG_uLcO2d4vfPGowrXkgrKiSm7qzfhk8jDryu0uq8Gj1dM0em_4n9SlZ6M6KGVMQB0TofApmGI9QP0Z',
 ARRAY['flowgenie', 'automation', 'ops'], 'Product', true),

('NeuralHub: A Shared Intelligence Layer',
 'neuralhub-shared-intelligence-layer',
 E'## Knowledge needs context\n\nDocs without context become clutter. NeuralHub connects:\n\n- decisions to incidents\n- runbooks to outcomes\n- patterns to teams\n\n## A calm interface\n\nWe optimize for readability, search, and trust—not noise.',
 'NeuralHub: A Shared Intelligence Layer',
 'Why knowledge systems fail, and how we''re building a calm, contextual workspace for real institutional learning.',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzwtLbrNIZYrnTqG4iHUJOQaQU-1cRbxD44IcbwWqEzhQe1rckgAvbsB_Csxhmyke9JyjakuiFPTJLBhPe46ryFSh9NdR_5DDqyg87KUc2PLFQ3TLjS7rN_BmYpGXxaxOiG3ZdcjECNzlFdtwGWGs5VhJkO54zNxgh-K7esrwo6eRdxq7KstwCTDW1feeJbKdrgS00L6mEJ_4IF5F7PLngoo_0qOwzRLEA7bu5UI-ngnEc2ol6ICOpLPxiQ3Nfc79nQbTA3SjqUU54',
 ARRAY['neuralhub', 'knowledge', 'teams'], 'Design', true),

('Shipping a Design System That Stays Consistent',
 'shipping-a-design-system-that-stays-consistent',
 E'## Consistency is a feature\n\nWhen typography, spacing, and interaction patterns stay consistent, users move faster and trust the product more.\n\n## Our principles\n\n- fewer components, more reuse\n- clear hierarchy\n- slow, smooth motion\n\n## Why it matters\n\nThe ecosystem only works if it feels cohesive end-to-end.',
 'Shipping a Design System That Stays Consistent',
 'Tokens, rhythm, and motion: the small rules that keep a product ecosystem feeling like one platform.',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhLxnspFc3Ft2uDaHu9mEHZU_tRd8vZDtwzBkvaYaZKUTq4CAZPpg6WPGmbVkOJqnxVkNDnPCXdIDYpCVfSG_wz1sdlSO88aDNI20IoxGoPtlHx-mmLqEfGXpPBetDcUSPFfwJZwB4EFW4boTq54HlwfVyx9KQvNv-ccTB9NR81t_qoBBTJ7Qyp5gh0XINULAynZokhLVQwi9oETRZ8K3iKkV4rZZdNtOJPS4qjn7pfKKcmCyyAc65Q7M4D3qEAIz9h3t4XArJtWzy',
 ARRAY['design-system', 'tokens', 'motion'], 'Design', true),

('Reliability by Default: The Integrity Layer',
 'reliability-by-default-the-integrity-layer',
 E'## Trust is engineered\n\nReliability isn''t one feature—it''s a system of constraints and defaults:\n\n- encryption in transit and at rest\n- audit trails everywhere\n- predictable failure modes\n\n## Guardrails for AI workflows\n\nIf automation is going to touch production, the integrity layer must come first.',
 'Reliability by Default: The Integrity Layer',
 'How we think about uptime, encryption, auditability, and the guardrails that make automation trustworthy.',
 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgNY1yKL9bEDYyBfU9-OaWBi-Ze6CqSz20HJWoGJSgF48OfHLogoH7YMpIQMg2LTLKCq_Dw9FyKuocJ5tVEgomf4-eCSn6cyPWlCMatowA3UXFwECB8Ri1EOYGtQkFiuxkLhVdpvBgaK5MoWfq63DL37GMIxLzfaOk8uLVyqIJEK1zJ7qvJTSG8IGCGsbS1EP4f14E2HfCN-U5rswRwSH5Atw9rRxXk6hwOSkJP2uPkanxaXUtVQH7aCUEo8W6oc_imxwRbmgdk7kR',
 ARRAY['security', 'reliability', 'compliance'], 'Engineering', true)
on conflict (slug) do nothing;


-- ══════════════════════════════════════════════════════════════
-- SITE_CONTENT (7 CMS entries)
-- ══════════════════════════════════════════════════════════════

-- Hero section
insert into public.site_content (key, value) values
('hero', '{
  "eyebrow": "The Next Frontier",
  "headlineLine1": "Intelligence,",
  "headlineLine2": "Engineered.",
  "body": "A growing ecosystem of intelligent SaaS products designed to streamline workflows, optimize growth, and redefine the standard of modern enterprise tools.",
  "primaryCta": {"label": "Explore Products", "href": "/products"},
  "secondaryCta": {"label": "Watch Demo", "href": "/updates"},
  "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKMEBsEr8oTeuZQHM5ffRxWUc6r2X1U7VR8d2uavy9sMROUpRlZuW2Fdr9SOu8X6tvnmzR4IUnMDp5mxQkFXQiizPTxxiFZkkJ_9tLUEEL2BoIs6cELTON6Nv_cCECnkI4n17gmEZrWwmCm679KdRofXtk41i0ObXshs3zAoBVhf4kCDUpl2tpHQ6xrwNJBG_uLcO2d4vfPGowrXkgrKiSm7qzfhk8jDryu0uq8Gj1dM0em_4n9SlZ6M6KGVMQB0TofApmGI9QP0Z",
  "imageAlt": "Abstract 3D architectural render with glowing amber nodes and sleek metallic surfaces representing neural network architecture"
}'::jsonb) on conflict (key) do nothing;

-- About section
insert into public.site_content (key, value) values
('about', '{
  "label": "About Us",
  "heading": "We build the tools that build the future.",
  "body": "Intelligence Tech is a product-driven technology company building a connected ecosystem of SaaS tools designed for the modern enterprise. Our platform shares a singular intelligence layer that makes every tool smarter — together.",
  "pillars": [
    {"icon": "rocket_launch", "title": "Our Mission", "desc": "To democratize intelligent software — making enterprise-grade tools accessible to teams of every size."},
    {"icon": "visibility", "title": "Our Vision", "desc": "A world where every business decision is powered by interconnected, self-optimizing software systems."},
    {"icon": "diversity_3", "title": "Our Culture", "desc": "Remote-first, builder-focused, and deeply committed to shipping products that people genuinely love."}
  ],
  "stats": [
    {"value": "4+", "label": "Products Shipped"},
    {"value": "99.9%", "label": "Platform Uptime"},
    {"value": "10K+", "label": "Active Users"},
    {"value": "40%", "label": "Avg. Cost Savings"}
  ]
}'::jsonb) on conflict (key) do nothing;

-- Navigation links
insert into public.site_content (key, value) values
('nav_links', '{
  "mainLinks": [
    {"label": "Products", "href": "/products"},
    {"label": "About Us", "href": "/about"},
    {"label": "Contact Us", "href": "/contact"}
  ],
  "signInLabel": "Sign In",
  "signInHref": "/blog",
  "ctaLabel": "Get Started",
  "ctaHref": "/products"
}'::jsonb) on conflict (key) do nothing;

-- Footer
insert into public.site_content (key, value) values
('footer', '{
  "tagline": "Building the software layer for the next generation of digital enterprise.",
  "socialLinks": [
    {"platform": "facebook", "url": "https://facebook.com"},
    {"platform": "instagram", "url": "https://instagram.com"},
    {"platform": "linkedin", "url": "https://linkedin.com"}
  ],
  "columns": [
    {
      "title": "Products",
      "links": [
        {"label": "Product Tour", "href": "/products"},
        {"label": "API Documentation", "href": "/api/products"},
        {"label": "Ecosystem Hub", "href": "/ecosystem"}
      ]
    },
    {
      "title": "Company",
      "links": [
        {"label": "Release Notes", "href": "/updates"},
        {"label": "Blog", "href": "/blog"},
        {"label": "Privacy Policy", "href": "/legal/privacy"}
      ]
    },
    {
      "title": "Contact",
      "links": [
        {"label": "support@intelligencetech.com", "href": "mailto:support@intelligencetech.com"},
        {"label": "HQ: 500 Silicon Way, CA", "href": "#"}
      ]
    }
  ],
  "copyright": "Intelligence Tech Editorial"
}'::jsonb) on conflict (key) do nothing;

-- Contact info
insert into public.site_content (key, value) values
('contact_info', '{
  "eyebrow": "Contact Us",
  "heading": "Let''s talk.",
  "body": "Whether you have a question about our products, need a demo, or want to explore partnership opportunities — we''d love to hear from you.",
  "details": [
    {"icon": "mail", "label": "Email", "value": "support@intelligencetech.com"},
    {"icon": "location_on", "label": "Headquarters", "value": "500 Silicon Way, San Francisco, CA 94105"},
    {"icon": "schedule", "label": "Business Hours", "value": "Mon – Fri, 9:00 AM – 6:00 PM PST"}
  ]
}'::jsonb) on conflict (key) do nothing;

-- Privacy policy
insert into public.site_content (key, value) values
('privacy_policy', '{
  "lastUpdated": "April 15, 2026",
  "intro": "At Intelligence Tech, protecting your privacy is fundamental to our mission. This policy explains how we collect, use, and safeguard your information.",
  "sections": [
    {
      "title": "Information we collect",
      "type": "cards",
      "items": [
        {"title": "Information you provide", "body": "Account details, contact information, and any content you submit through our platform."},
        {"title": "Usage information", "body": "How you interact with our services, including pages visited, features used, and time spent."},
        {"title": "Cookies & tracking", "body": "We use cookies and similar technologies to remember preferences and improve experience."},
        {"title": "Log data", "body": "Server logs that include IP address, browser type, and referring pages."}
      ]
    },
    {
      "title": "How we use information",
      "type": "bullets",
      "items": [
        "To provide, maintain, and improve our services",
        "To communicate with you about updates and changes",
        "To detect and prevent fraud or abuse",
        "To comply with legal obligations",
        "To personalize your experience"
      ]
    },
    {
      "title": "How we share information",
      "type": "mixed",
      "intro": "We do not sell your personal information. We may share data with:",
      "items": [
        "Service providers who assist in operations",
        "Legal authorities when required by law",
        "Business partners with your consent",
        "Affiliated companies within our ecosystem"
      ]
    },
    {
      "title": "Data retention & security",
      "type": "paragraph",
      "body": "We retain your data only as long as necessary for the purposes outlined in this policy. We employ industry-standard encryption, access controls, and monitoring to protect your information."
    },
    {
      "title": "Your choices & rights",
      "type": "paragraph",
      "body": "You can access, update, or delete your account information at any time. You may opt out of marketing communications. Depending on your jurisdiction, you may have additional rights under GDPR, CCPA, or similar regulations."
    }
  ],
  "contactEmail": "support@intelligencetech.com",
  "contactAddress": "HQ: 500 Silicon Way, CA"
}'::jsonb) on conflict (key) do nothing;
