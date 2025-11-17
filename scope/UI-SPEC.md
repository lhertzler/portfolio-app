

UI Spec – lukehertzler.com (Single-Page Layout + Extras)

0. Overall Layout
	•	Primary experience: single-page layout (/) with smooth scroll between sections.
	•	Additional routes still exist for deep dives:
	•	/portfolio (full projects)
	•	/resume (printable resume)
	•	/lab (bigger experiments)
	•	/blog (full blog index)
	•	Default behavior:
	•	On Home: nav items scroll to sections via smooth scroll.
	•	From other routes:
	•	Nav “About/Services/Portfolio/Resume/Lab/Blog/Contact” → either:
	•	redirect to /#section-id, or
	•	router push to / with hash and scroll there.
  • Take insipiration from "https://zelio-nextjs.vercel.app/index-2"

We’ll give each home section a clear id for anchor scroll.

⸻

1. Header / Navigation

1.1 Header States

Component: Header
Pattern: sticky header that shrinks into a “mini” version on scroll.
	•	Default (Top of page):
	•	Slightly taller (e.g. h-16).
	•	Shows full nav, name, and icons.
	•	Background: bg-background/80 with backdrop-blur.
	•	Scrolled state:
	•	Adds shadow-sm and maybe slightly darker background.
	•	Reduces vertical padding (py-3 → py-2).
	•	Logo/name shrinks a bit (font size down).
	•	Use an effect that toggles scrolled once window.scrollY > X (e.g. 60px).

State:
	•	isScrolled local state, derived via useEffect + scroll listener.

1.2 Header Layout & Items

Desktop layout (left to right):
	1.	Hamburger / Directory Icon
	•	Icon (VS Code style directory icon or classic hamburger).
	•	Clicking opens a code editor style nav sliding from the left (see Section 2).
	2.	Name/Logo
	•	Text: Luke Hertzler
	•	Always clickable → scroll to top (/#hero or just /).
	•	Could have small monogram logo later.
	3.	Main Nav (center / right)
In order:
	•	About → scroll to #about
	•	Services → scroll to #services
	•	Portfolio → scroll to #portfolio
	•	Resume → scroll to #resume
	•	Lab → scroll to #lab
	•	Blog → scroll to #blog
	•	Contact → opens Contact Dialog (no scroll)
	4.	Right-side Utility Icons
	•	Theme icon → opens theme panel.
	•	⌘K-style icon or button → opens command palette (later).
	•	</> icon → toggle inspect mode.
	•	>_ icon → open mini terminal.

Mobile:
	•	Show:
	•	Left: hamburger/directory icon.
	•	Center: Luke Hertzler.
	•	Right: maybe just theme icon.
	•	Full nav lives inside:
	•	Left slide-in “code editor nav”.
	•	Optionally a simple mobile nav overlay if needed, but we can reuse the same panel.

1.3 Active Link Highlight
	•	Use an IntersectionObserver to track which section is in view.
	•	Maintain activeSectionId in a useHomeSections hook.
	•	Apply:
	•	font-medium text-foreground on active item.
	•	text-muted-foreground on others.
	•	For contact, base highlighting on whether dialog is open (or never highlight).

⸻

2. Code Editor Style Nav (Left Panel)

Component: EditorNavPanel

Trigger: hamburger/directory icon in header.

Behavior:
	•	Slides in from the left (shadcn Sheet or custom panel).
	•	Style like a VS Code sidebar:
	•	Darker background.
	•	List of “files” representing sections and pages.
	•	Structure example:

src/
  app/
    [ Home ]          -> #hero
    [ About ]         -> #about
    [ Services ]      -> #services
    [ Portfolio ]     -> #portfolio
    [ Resume ]        -> #resume
    [ Lab ]           -> #lab
    [ Blog ]          -> #blog
  system/
    [ Contact.tsx ]   -> opens Contact Dialog
    [ Theme.config ]  -> opens Theme Panel
    [ Player.tsx ]    -> focus bottom player (scroll/pulse)

	•	On click:
	•	If section: close panel, smooth-scroll to section.
	•	If Contact: close panel, open dialog.
	•	If Theme config: close panel, open theme panel.

This is a neat place to be playful with icons and show your “code brain”.

⸻

3. Smooth Scroll & Section IDs

Each home section gets a section wrapper like:

<section
  id="about"
  data-section="about"
  data-component="AboutSection"
  className="scroll-mt-24 py-16"
>
  ...
</section>

IDs:
	•	#hero — Short intro text.
	•	#identity — Identity slider.
	•	#about — About section.
	•	#services — Services.
	•	#portfolio — Portfolio preview.
	•	#resume — Resume preview.
	•	#lab — Lab preview.
	•	#blog — Blog preview.
	•	#footer — Footer (optional anchor).

Scroll behavior:
	•	Use window.scrollTo({ top: targetOffset, behavior: 'smooth' }) or a library like react-scroll.
	•	Adjust for header height via scroll-mt-* Tailwind utilities.

⸻

4. Home Sections – Visual & Interaction Spec

4.1 Short Intro Text (#hero)

Component: HomeHeroSection

Content:
	•	Small eyebrow: “Hey, I’m Luke.”
	•	Main heading:
	•	Something like:
Full-Stack Engineer, UI/UX Designer, Musician.
	•	Short supporting body text (1–2 lines).
	•	Buttons:
	•	Primary: “View Portfolio” → #portfolio
	•	Secondary: “Download Resume” → /resume or scroll to #resume.

Layout:
	•	Left: text + CTAs.
	•	Right: either:
	•	Simple gradient / abstract shape.
	•	Placeholder for future 3D hero.

4.2 Identity Slider (#identity)

Component: IdentitySliderSection

Behavior:
	•	Tabs or segmented control with three options:
	•	Engineer
	•	Designer
	•	Musician
	•	Below the control, a card animates between content states using Framer Motion.

Content for each:
	•	Engineer:
	•	Tagline: “I architect scalable web systems.”
	•	Bullets: Next.js, Supabase, Stripe, real-time, RLS, etc.
	•	Designer:
	•	Tagline: “I design interfaces that actually feel good to use.”
	•	Bullets: Figma, design systems, UX process.
	•	Musician:
	•	Tagline: “I write and produce heavy, melodic music.”
	•	Bullets: Kavalkade, guitar/production focus.
	•	Small button: “Play a track” → triggers global player with a specific song.

Layout:
	•	Full-width section with center-aligned card and horizontal controls.

4.3 About Section (#about)

Component: AboutSection

Goal: go deeper than the slider.

Structure:
	•	Two-column layout on desktop:
	•	Left: more detailed bio, your story, values.
	•	Right:
	•	“Quick facts” list (years experience, stacks, roles).
	•	Possibly a small vertical timeline summary.

Content ideas:
	•	“Who I am”
	•	“What I’m building now (SoundVent, etc.)”
	•	“How I like to work”

⸻

4.4 Services Section (#services)

Component: ServicesSection

You wanted this to be sleek and modern – here’s a concept:

Layout
	•	Three or four “service cards” in a responsive grid.
	•	On desktop:
	•	3-wide layout with one featured card larger, or a 2x2 layout with staggered heights.
	•	Each card:
	•	Icon
	•	Service name
	•	Short blurb (1–2 sentences)
	•	“What you get” bullet list (3 points max).

Possible services:
	1.	Full-Stack Product Builds
	•	Next.js, Supabase, Stripe, messaging, dashboards.
	2.	Shopify + E-commerce Systems
	•	Theme dev, custom apps, Printful, headless.
	3.	UI/UX Design & Systems
	•	Figma, design systems, component libraries.
	4.	Architecture & Technical Consulting
	•	Codebase audits, scaling strategies, refactors.

Interaction Idea
To flex React skills, we can make this more dynamic:
	•	A service “focus” strip on the left (like a vertical tab list).
	•	When you hover/click a service:
	•	Right panel animates into view with detailed info:
	•	Short case examples.
	•	Tech tags.
	•	On mobile:
	•	Cards stack, tapping expands accordions.

Let Cursor implement as:
	•	Left: ServiceList (list of service headings).
	•	Right: ServiceDetailPanel (animated, listens to active service state via local state).

⸻

4.5 Portfolio Preview (#portfolio)

Component: PortfolioPreviewSection

Layout:
	•	Section title: “Selected Work”
	•	Subtext: 1–2 lines: what kind of projects you do.
	•	Grid of 3–4 featured projects (coming from projects data).
	•	Each ProjectCard with:
	•	Title
	•	Tags (Next.js, Supabase, Shopify, etc.)
	•	Short tagline
	•	Click:
	•	Scroll to /portfolio/[slug] page OR open a modal; for now, link to page.

Interaction:
	•	Add subtle hover transitions (lift, glow).
	•	Each card tagged with data-component="ProjectCard" for inspect mode.

⸻

4.6 Resume Preview (#resume)

Component: ResumePreviewSection

Goal: show the highlight of your experience and direct to full resume page.

Layout:
	•	Two columns:
	•	Left: summary of roles / frameworks:
	•	“10+ years building for Shopify & modern stacks”
	•	Key roles/companies (Yale, August, Levi’s, etc.).
	•	Right:
	•	Mini-timeline with last 3 roles.
	•	CTA:
	•	Button: “View full resume” → /resume in new tab or same tab.
	•	Link: “Download PDF”.

⸻

4.7 Lab + Blog Row (#lab, #blog)

Component: LabAndBlogSection

Layout:
	•	Section title: “Lab & Writing”
	•	Two-column layout (cards side by side on desktop, stacked on mobile):

Left card: Lab preview
	•	id="lab"
	•	Title: “Lab”
	•	Body: “What I’m currently experimenting with.”
	•	Bulleted list:
	•	Amp sims / ML stuff
	•	SoundVent features
	•	UI experiments
	•	Button: “Explore the Lab” → /lab

Right card: Blog preview
	•	id="blog"
	•	Title: “From the Blog”
	•	Show recent posts (3 cards):
	•	Title
	•	Tag / category
	•	Short snippet
	•	Button: “View all posts” → /blog

⸻

4.8 Footer (#footer)

Component: Footer

Already partially spec’d, but for the homepage:
	•	Keep consistent with existing Footer component.
	•	Content:
	•	Copyright
	•	Social links
	•	Maybe a small text: “Built with Next.js, React, and way too much caffeine.”

⸻

5. Contact – Shadcn Dialog (No Page)

Component: ContactDialog

Trigger:
	•	Nav item “Contact”
	•	EditorNav “Contact.tsx”
	•	Possibly a footer button “Get in touch”

Behavior:
	•	Use shadcn Dialog.
	•	On open:
	•	Slide/fade in from center (nice subtle framer animation if desired).
	•	Contents:
	•	Left (top): “Let’s build something.”
	•	Right (or below on mobile): contact form.

Form Fields:
	•	Name
	•	Email
	•	Project Type (select: “Full Build”, “Shopify”, “Consulting”, “Collab / Music”)
	•	Message

Extra Info:
	•	Display:
	•	Email (click to copy).
	•	Location (e.g. Santa Cruz / Bay Area-ish).
	•	Links to LinkedIn & GitHub.

Implementation notes for Cursor:
	•	Keep as a standalone component:
	•	ContactDialog with open prop + onOpenChange.
	•	A ContactDialogTrigger wrapper for the nav item can be added later.

⸻

6. Persistent Music Player (Spotify-ish)

We already have a basic player skeleton; now let’s style + extend it.

Component: AudioPlayer (bottom bar, full width)
Extra Component: PlaylistSheet

6.1 Visual Layout

Bar structure (left → right):
	1.	Track Info
	•	Album cover (square, 40–48px, rounded).
	•	Title line (bold).
	•	Artist line (muted).
	2.	Player Controls
	•	Previous, Play/Pause, Next.
	•	(Optionally) shuffle / repeat later.
	•	Minimal, icon-only buttons.
	3.	Scrub Bar
	•	Seek slider across most of the width.
	•	Time elapsed / remaining.
	4.	Right Controls
	•	Icon: hide/minimize player → collapses bar to a tiny floating pill (“Now Playing”) at bottom-right.
	•	Icon: “Playlist” → opens right-side sheet.

6.2 Playlist Sheet

Component: PlaylistSheet
	•	Use shadcn Sheet anchored to the right.
	•	Contains:
	•	Header: “Playlist”
	•	List of tracks:
	•	Track title
	•	Artist
	•	Maybe duration
	•	Active track highlighted.
	•	Clicking a track:
	•	playTrack(id) via store.

⸻

7. Motion & Polish

High-level:
	•	All nav scrolls: smooth.
	•	Section reveals: subtle fade/slide in when scrolled into view (Framer Motion + whileInView).
	•	Header shrink: animated height/padding and background using Framer Motion or simple CSS transitions.
	•	Services section: use Framer Motion for card hover & active state transitions.
	•	Player: animate in on load; smooth transitions for hide/show and sheet open.

⸻

8. What Cursor Should Actually Do With This

You can tell Cursor something like:

Implement the homepage layout (app/page.tsx) with sections and components based on this spec.
Use these section IDs: hero, identity, about, services, portfolio, resume, lab, blog.
Implement smooth scroll behavior for nav + editor nav.
Style the header to shrink on scroll.

Concrete steps for Cursor:
	1.	Update Header:
	•	Add nav items in specified order.
	•	Add isScrolled state & class toggles.
	•	Wire nav to smooth scroll via a scrollToSection(id) helper when on /.
	2.	Implement the following components under components/home/:
	•	HeroSection
	•	IdentitySliderSection
	•	AboutSection
	•	ServicesSection
	•	PortfolioPreviewSection
	•	ResumePreviewSection
	•	LabAndBlogSection
	3.	Wire them in app/page.tsx as sequential <section id="..."> blocks.
	4.	Implement EditorNavPanel using shadcn Sheet + VS Code-like styling.
	5.	Enhance AudioPlayer styling to match the Spotify-style bar and add PlaylistSheet.
	6.	Implement ContactDialog using shadcn Dialog, triggered from nav.