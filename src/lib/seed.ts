import { Task } from "./types";
import { v4 as uuid } from "uuid";

export const SEED_TASKS: Omit<Task, "id" | "createdAt">[] = [
  // ── Search performance ── Completed
  {
    deliverable: "Search performance",
    status: "completed",
    text: "Developed search performance strategy framework (AI-driven search, zero-click behavior, conversion-focused SEO)",
    note: "",
  },
  {
    deliverable: "Search performance",
    status: "completed",
    text: "Conducted keyword research using Moz for niche content opportunities (Know-How)",
    note: "",
  },
  {
    deliverable: "Search performance",
    status: "completed",
    text: "Contributed to SEO-focused content development with optimized titles (Workplace Now)",
    note: "",
  },
  {
    deliverable: "Search performance",
    status: "completed",
    text: "Established structured approach to keyword research and content planning across initiatives",
    note: "",
  },
  // ── Search performance ── Ongoing
  {
    deliverable: "Search performance",
    status: "ongoing",
    text: "Expanding keyword research into structured clusters and pillar-based content",
    note: "",
  },
  {
    deliverable: "Search performance",
    status: "ongoing",
    text: "Applying AI-aware SEO practices for visibility in AI-driven search and zero-click environments",
    note: "",
  },
  // ── Search performance ── Expected
  {
    deliverable: "Search performance",
    status: "expected",
    text: "Improve visibility in both traditional and AI-driven search through structured, intent-aligned content",
    note: "",
  },

  // ── Website performance ── Completed
  {
    deliverable: "Website performance",
    status: "completed",
    text: "Developed website performance strategy framework (Core Web Vitals, UX, search visibility)",
    note: "",
  },
  {
    deliverable: "Website performance",
    status: "completed",
    text: "Built and optimized website pages and pillar content using WordPress",
    note: "",
  },
  {
    deliverable: "Website performance",
    status: "completed",
    text: "Identified performance bottlenecks in WordPress (themes, plugins, media handling)",
    note: "",
  },
  {
    deliverable: "Website performance",
    status: "completed",
    text: "Defined performance optimization standards (image handling, page structure, technical best practices)",
    note: "",
  },
  {
    deliverable: "Website performance",
    status: "completed",
    text: "Supported evaluation of lighter WordPress theme (paused due to team changes)",
    note: "",
  },
  // ── Website performance ── Ongoing
  {
    deliverable: "Website performance",
    status: "ongoing",
    text: "Driving Core Web Vitals improvements through theme optimization, media handling, and technical refinements",
    note: "",
  },
  {
    deliverable: "Website performance",
    status: "ongoing",
    text: "Progressing evaluation and potential migration to lighter WordPress setup",
    note: "",
  },
  // ── Website performance ── Expected
  {
    deliverable: "Website performance",
    status: "expected",
    text: "Strengthen site speed, UX, and search rankings for higher engagement and conversion rates",
    note: "",
  },

  // ── Data management ── Completed
  {
    deliverable: "Data management",
    status: "completed",
    text: "Developed data management framework (data quality standards, key risks, best practices)",
    note: "",
  },
  {
    deliverable: "Data management",
    status: "completed",
    text: "Manage centralized weekly marketing data tracker (social, email, leads, engagement)",
    note: "",
  },
  {
    deliverable: "Data management",
    status: "completed",
    text: "Identified data quality issues in HubSpot (duplicates, incomplete fields, inconsistent structures)",
    note: "",
  },
  {
    deliverable: "Data management",
    status: "completed",
    text: "Conducted email performance analysis — identified high bounce rates as data quality indicator",
    note: "",
  },
  {
    deliverable: "Data management",
    status: "completed",
    text: "Implemented suppression segments for bounced, stale, and high-risk contacts",
    note: "",
  },
  {
    deliverable: "Data management",
    status: "completed",
    text: "Created HubSpot performance dashboard (delivery, engagement, campaign metrics)",
    note: "",
  },
  {
    deliverable: "Data management",
    status: "completed",
    text: "Translated data quality insights into actionable improvements for cleanup and segmentation",
    note: "",
  },
  // ── Data management ── Ongoing
  {
    deliverable: "Data management",
    status: "ongoing",
    text: "Implementing structured data cleanup, validation, and standardization in HubSpot",
    note: "",
  },
  {
    deliverable: "Data management",
    status: "ongoing",
    text: "Enhancing segmentation logic and data structure for targeting and reporting accuracy",
    note: "",
  },
  // ── Data management ── Expected
  {
    deliverable: "Data management",
    status: "expected",
    text: "Enable reliable segmentation, reporting, and campaign execution through improved data quality",
    note: "",
  },

  // ── Lead ops & revenue mapping ── Completed
  {
    deliverable: "Lead ops & revenue mapping",
    status: "completed",
    text: "Developed lead operations and revenue mapping framework (lead tracking, attribution, pipeline transparency)",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "completed",
    text: "Manage LinkedIn channel for Intuition Now (B2C demand generation and audience growth)",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "completed",
    text: "Maintain structured visibility on inbound leads and weekly performance trends",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "completed",
    text: "Took ownership of finance newsletter production (blog, email, social, podcast)",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "completed",
    text: "Executed cross-platform content distribution (YouTube, Spotify, Apple Podcasts)",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "completed",
    text: "Defined initial CRM requirements (dashboards, lead attribution, reporting)",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "completed",
    text: "Supported early-stage planning for HubSpot–Microsoft Dynamics 365 integration",
    note: "",
  },
  // ── Lead ops & revenue mapping ── Ongoing
  {
    deliverable: "Lead ops & revenue mapping",
    status: "ongoing",
    text: "Supporting HubSpot–Dynamics 365 integration (field mapping and sync logic)",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "ongoing",
    text: "Building lifecycle tracking and attribution frameworks (lead acquisition to revenue)",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "ongoing",
    text: "Defining marketing-focused CRM dashboards (lead attribution, campaign performance, revenue visibility)",
    note: "",
  },
  // ── Lead ops & revenue mapping ── Expected
  {
    deliverable: "Lead ops & revenue mapping",
    status: "expected",
    text: "Establish end-to-end visibility from marketing activity to revenue through integrated systems",
    note: "",
  },
  {
    deliverable: "Lead ops & revenue mapping",
    status: "expected",
    text: "Improve lead quality, conversion rates, and pipeline efficiency through better tracking",
    note: "",
  },
];

export function buildSeedTasks(): Task[] {
  return SEED_TASKS.map((t) => ({
    ...t,
    id: uuid(),
    createdAt: new Date().toISOString(),
  }));
}
