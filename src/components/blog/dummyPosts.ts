export type DummyBlog = {
  id: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  content: string;
  featured_image: string | null;
  tags: string[];
  category: string | null;
  created_at: string;
};

export const DUMMY_BLOGS: DummyBlog[] = [
  {
    id: "demo-blog-1",
    title: "Inside the Intelligence Tech Ecosystem",
    slug: "inside-the-intelligence-tech-ecosystem",
    meta_title: "Inside the Intelligence Tech Ecosystem",
    meta_description:
      "A quick tour of the products, the shared intelligence layer, and the design principles behind the ecosystem.",
    content: `## The ecosystem mindset

Modern teams don’t need more disconnected tools — they need a system that **works together**. Our approach is simple:

- Build focused products that do one job extremely well
- Connect them with a shared intelligence layer
- Keep UX consistent so switching contexts feels effortless

## What you’ll see next

Over the coming weeks, we’ll publish deep dives into reliability, scaling, and the design system powering the platform.`,
    featured_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeAxcu6zyY4OgnsBKQchFs49w4k5T9vYrqxbmCPcEweuduRZGEBfQLzaGdtlw9OoUnPiYkgAL_wIPti4nbH2BdQ1lGZvVnd_nPGN9C9gLndjT55yMtxfhSAL1-j94DfHj0InrlnYginkK6viW8ir0H31Vigrv8buTJJHBLW5BTndEyyCagpdKjK-ezWVfK19y89vSlr2tMbYyhr2tat9cNaYAw4P79XUXSZ0LD9sXTMBil2OzUFSJY7vuyt9iBNvB1AJR413l7pxgj",
    tags: ["ecosystem", "product", "design"],
    category: "Updates",
    created_at: new Date("2026-04-10T10:00:00.000Z").toISOString(),
  },
  {
    id: "demo-blog-2",
    title: "How ScaleWise Predicts Load Before It Happens",
    slug: "how-scalewise-predicts-load",
    meta_title: "How ScaleWise Predicts Load Before It Happens",
    meta_description:
      "From reactive thresholds to proactive scaling: the core ideas behind our Neural Engine and why it matters.",
    content: `## Reactive scaling is expensive

Thresholds wait until you’ve already hit trouble. That means:

- slower recovery
- more overprovisioning
- unpredictable user experience

## A better approach

ScaleWise learns from historical traffic patterns and correlates multiple signals — then acts early, not late.

## The result

Teams can ship faster with less operational overhead and more predictable performance.`,
    featured_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkalvA6GRwcBvCpx6uBLv7eYC4BGswnZWXe0L6eKMQbkLcPQx5J0yFhQ2efSql_iu67jj1Eedk6ZHWQggBVmCXM-ytMU54hVhllJgt2N2uZpby6nRbiHDYRTmY3akLkhNIoG1a9FurzeDOeayf-FEJBpZXQZ_pLiN-J0SBt_FJDl8AGGJueO-2r-3p2S0rmDVIpjCp2E0cgRQKZhMHT8I8KLncTlGohocC-ThCbJvjG8YkLjjJIoQsVl-zRuQ-Yf2Uw3CqZbJwes5H",
    tags: ["scalewise", "infra", "reliability"],
    category: "Engineering",
    created_at: new Date("2026-04-05T10:00:00.000Z").toISOString(),
  },
  {
    id: "demo-blog-3",
    title: "Designing the White/Grey Rhythm",
    slug: "designing-the-white-grey-rhythm",
    meta_title: "Designing the White/Grey Rhythm",
    meta_description:
      "Why alternating section tones improves scanning, reduces fatigue, and makes motion feel premium.",
    content: `## Rhythm matters

Alternating section tones creates a natural reading cadence:

- faster scanning
- clearer hierarchy
- calmer feel on long pages

## Motion supports structure

When sections already have a rhythm, scroll animations can be slower and smoother — without feeling overwhelming.`,
    featured_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOAbucxLWL1CQOOp8fEMXo9d_126zxnkKl7gJ0DgtlCpQ1nXKbcfhgOxvp1DOQCyWEVmh_xlajAKJSkHLJhyzU64zdQWyHtpAvgbdNl7qKBYIi8MgWaso7jDhOM6uQXnhNSgpjZEDJ4P9_CfUemm92G0XH2Jgdq-OWVEUfK-X0ZLnrEFq4iKXR3cWG6E4VflrHlrAUg4id-oBHmokGsanM_XG9vapk1Oqyl-5GfbKS_kNWdzLu5jPYEmKeREajgFXGrJEuosl7qjgE",
    tags: ["ui", "ux", "motion"],
    category: "Design",
    created_at: new Date("2026-03-28T10:00:00.000Z").toISOString(),
  },
  {
    id: "demo-blog-4",
    title: "OmniGraph: Seeing Dependencies Clearly",
    slug: "omnigraph-seeing-dependencies-clearly",
    meta_title: "OmniGraph: Seeing Dependencies Clearly",
    meta_description:
      "Turn tangled systems into clean, navigable graphs—so teams can trace lineage, ownership, and impact in minutes.",
    content: `## Clarity beats complexity

When systems grow, relationships become the real source of risk. OmniGraph helps you:

- visualize services, data, and ownership
- identify hidden coupling
- plan changes with confidence

## Built for fast scanning

The UI is designed to make large graphs feel calm, readable, and actionable.`,
    featured_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmfGDmqaPVSrOSA_EqIOHNmrRbUJuvUgy8g2XA9qFl_bBNgdZShAjAfdlC79Y4y801s4SqLV4jcLd1akKDWzqx0sOK0n0nqjT16qM_M0IYsKAzb_N9OsvK1HjNrsCFn1bAiqvuRgWfnUfccvtgz9US3v0szIEG8C4hkhoKqbpBDz-fR_-LTVh3Mmy1e73mYsZAZhGEb2Gp_InK_U-PvhPv__-bQ-jG4m0MweM-vO9htj155qxilzRi890lzlrputn6i3jVcBnlCqD9",
    tags: ["omnigraph", "architecture", "observability"],
    category: "Engineering",
    created_at: new Date("2026-03-22T10:00:00.000Z").toISOString(),
  },
  {
    id: "demo-blog-5",
    title: "FlowGenie and the Future of Ops Automation",
    slug: "flowgenie-future-of-ops-automation",
    meta_title: "FlowGenie and the Future of Ops Automation",
    meta_description:
      "From runbooks to intelligent workflows: how we’re reducing operational toil without sacrificing control.",
    content: `## Automation should feel safe

FlowGenie focuses on guardrails:

- approvals when needed
- clear diffs and audit trails
- rollback-first design

## Faster loops

Less time clicking, more time shipping—without losing visibility.`,
    featured_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKMEBsEr8oTeuZQHM5ffRxWUc6r2X1U7VR8d2uavy9sMROUpRlZuW2Fdr9SOu8X6tvnmzR4IUnMDp5mxQkFXQiizPTxxiFZkkJ_9tLUEEL2BoIs6cELTON6Nv_cCECnkI4n17gmEZrWwmCm679KdRofXtk41i0ObXshs3zAoBVhf4kCDUpl2tpHQ6xrwNJBG_uLcO2d4vfPGowrXkgrKiSm7qzfhk8jDryu0uq8Gj1dM0em_4n9SlZ6M6KGVMQB0TofApmGI9QP0Z",
    tags: ["flowgenie", "automation", "ops"],
    category: "Product",
    created_at: new Date("2026-03-15T10:00:00.000Z").toISOString(),
  },
  {
    id: "demo-blog-6",
    title: "NeuralHub: A Shared Intelligence Layer",
    slug: "neuralhub-shared-intelligence-layer",
    meta_title: "NeuralHub: A Shared Intelligence Layer",
    meta_description:
      "Why knowledge systems fail, and how we’re building a calm, contextual workspace for real institutional learning.",
    content: `## Knowledge needs context

Docs without context become clutter. NeuralHub connects:

- decisions to incidents
- runbooks to outcomes
- patterns to teams

## A calm interface

We optimize for readability, search, and trust—not noise.`,
    featured_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzwtLbrNIZYrnTqG4iHUJOQaQU-1cRbxD44IcbwWqEzhQe1rckgAvbsB_Csxhmyke9JyjakuiFPTJLBhPe46ryFSh9NdR_5DDqyg87KUc2PLFQ3TLjS7rN_BmYpGXxaxOiG3ZdcjECNzlFdtwGWGs5VhJkO54zNxgh-K7esrwo6eRdxq7KstwCTDW1feeJbKdrgS00L6mEJ_4IF5F7PLngoo_0qOwzRLEA7bu5UI-ngnEc2ol6ICOpLPxiQ3Nfc79nQbTA3SjqUU54",
    tags: ["neuralhub", "knowledge", "teams"],
    category: "Design",
    created_at: new Date("2026-03-08T10:00:00.000Z").toISOString(),
  },
  {
    id: "demo-blog-7",
    title: "Shipping a Design System That Stays Consistent",
    slug: "shipping-a-design-system-that-stays-consistent",
    meta_title: "Shipping a Design System That Stays Consistent",
    meta_description:
      "Tokens, rhythm, and motion: the small rules that keep a product ecosystem feeling like one platform.",
    content: `## Consistency is a feature

When typography, spacing, and interaction patterns stay consistent, users move faster and trust the product more.

## Our principles

- fewer components, more reuse
- clear hierarchy
- slow, smooth motion

## Why it matters

The ecosystem only works if it feels cohesive end-to-end.`,
    featured_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhLxnspFc3Ft2uDaHu9mEHZU_tRd8vZDtwzBkvaYaZKUTq4CAZPpg6WPGmbVkOJqnxVkNDnPCXdIDYpCVfSG_wz1sdlSO88aDNI20IoxGoPtlHx-mmLqEfGXpPBetDcUSPFfwJZwB4EFW4boTq54HlwfVyx9KQvNv-ccTB9NR81t_qoBBTJ7Qyp5gh0XINULAynZokhLVQwi9oETRZ8K3iKkV4rZZdNtOJPS4qjn7pfKKcmCyyAc65Q7M4D3qEAIz9h3t4XArJtWzy",
    tags: ["design-system", "tokens", "motion"],
    category: "Design",
    created_at: new Date("2026-03-01T10:00:00.000Z").toISOString(),
  },
  {
    id: "demo-blog-8",
    title: "Reliability by Default: The Integrity Layer",
    slug: "reliability-by-default-the-integrity-layer",
    meta_title: "Reliability by Default: The Integrity Layer",
    meta_description:
      "How we think about uptime, encryption, auditability, and the guardrails that make automation trustworthy.",
    content: `## Trust is engineered

Reliability isn’t one feature—it’s a system of constraints and defaults:

- encryption in transit and at rest
- audit trails everywhere
- predictable failure modes

## Guardrails for AI workflows

If automation is going to touch production, the integrity layer must come first.`,
    featured_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgNY1yKL9bEDYyBfU9-OaWBi-Ze6CqSz20HJWoGJSgF48OfHLogoH7YMpIQMg2LTLKCq_Dw9FyKuocJ5tVEgomf4-eCSn6cyPWlCMatowA3UXFwECB8Ri1EOYGtQkFiuxkLhVdpvBgaK5MoWfq63DL37GMIxLzfaOk8uLVyqIJEK1zJ7qvJTSG8IGCGsbS1EP4f14E2HfCN-U5rswRwSH5Atw9rRxXk6hwOSkJP2uPkanxaXUtVQH7aCUEo8W6oc_imxwRbmgdk7kR",
    tags: ["security", "reliability", "compliance"],
    category: "Engineering",
    created_at: new Date("2026-02-22T10:00:00.000Z").toISOString(),
  },
];

export function getDummyBlogBySlug(slug: string) {
  return DUMMY_BLOGS.find((b) => b.slug === slug) ?? null;
}

