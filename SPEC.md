# Ashoka Fabricators Website Specification

## Problem

Ashoka Fabricators needs a professional web presence that clearly communicates
who the company is, what it does, what services and capabilities it offers,
and how potential customers can get in touch.

The existing website needs to be developed and refined into a polished,
responsive, trustworthy business website suitable for a professional
fabrication and manufacturing company.

## Users

- Potential customers researching Ashoka Fabricators
- Existing customers looking for company and contact information
- Business partners and suppliers
- Visitors accessing the website from desktop, tablet, or mobile devices

## Functional requirements

- FR-1: The website shall clearly present Ashoka Fabricators, its business,
  capabilities, and relevant company information using verified information.

- FR-2: The website shall present Ashoka Fabricators' services and
  capabilities in a clear and structured manner.

- FR-3: The website shall provide visitors with a clear path to contact
  Ashoka Fabricators or submit an inquiry.

- FR-4: Visitors shall be able to navigate the major sections of the website
  through clear and consistent navigation.

- FR-5: The website shall provide a usable interface across desktop, tablet,
  and mobile screen sizes.

## Non-functional requirements

- NFR-1: The website should load efficiently and avoid unnecessary
  JavaScript, network requests, and oversized assets.

- NFR-2: The website should use semantic HTML, meaningful alternative text,
  keyboard navigation, and appropriate visual contrast.

- NFR-3: The website shall provide appropriate page titles, descriptions,
  semantic structure, and relevant SEO metadata.

- NFR-4: The website shall have a polished, modern visual design appropriate
  for a professional fabrication and manufacturing company.

- NFR-5: The website must not invent company claims, certifications, clients,
  statistics, capabilities, or other factual information.

## Constraints

- Existing project structure and functionality should be preserved unless a
  change is required for an approved task.
- Existing local changes must not be discarded.
- Company information must come from verified or user-provided sources.
- The website must remain maintainable within its existing technology stack.
- Genesis workflow decisions and approvals remain human-controlled.
- Changes should remain relevant to the Ashoka Fabricators website.
- New dependencies should only be introduced when they provide a clear
  benefit to an approved requirement.
- Existing functionality should not be removed without an explicit reason.

## Non-goals

- Rebuilding the project from scratch without a justified requirement.
- Inventing business information or marketing claims.
- Adding unrelated features outside the website's business purpose.
- Replacing the existing technology stack without explicit approval.
- Introducing unnecessary dependencies or infrastructure.
- Creating functionality that is not required by an approved requirement.

## Acceptance criteria

- AC-1: The website builds successfully using the project's supported build
  process.

- AC-2: The major website pages, sections, navigation, and user-facing
  interactions work correctly.

- AC-3: The major user-facing sections remain usable across desktop, tablet,
  and mobile screen sizes.

- AC-4: A visitor can clearly find the company's contact or inquiry path.

- AC-5: Company information displayed on the website is based on verified or
  user-provided information.

- AC-6: Available automated checks pass without introducing known regressions.

## Risks

- Existing project code may contain undocumented dependencies or assumptions.
- Some company information may require verification before publication.
- Visual changes may unintentionally affect existing responsive behavior.
- Third-party services or integrations may change independently of the
  website.
- Generated development files may make repository analysis less precise.
- Changes to shared components may unintentionally affect multiple pages.

## Open questions

- Which company information and claims are officially approved for
  publication?
- Which services and capabilities should receive the most prominence?
- What contact and inquiry channels should the website expose?
- Which existing pages and components should be retained, redesigned, or
  removed?
- What additional acceptance tests should be added as development progresses?
- Which business assets, images, logos, and documentation are approved for
  public use?
- Are there existing brand guidelines, colors, typography, or visual assets
  that must be preserved?

## Project invariants

- Do not invent factual information about Ashoka Fabricators.
- Do not discard existing local work.
- Do not remove existing functionality without an explicit reason.
- Do not introduce unrelated changes while implementing a task.
- Verification results must reflect the current state of the source code.
- Human approval is required for Genesis workflow approvals and learned-rule
  promotion.
- Existing project architecture should be respected unless an approved
  requirement justifies changing it.