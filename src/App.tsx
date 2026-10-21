import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import archiBOONColorLogo from "@/imports/ArchiBOON_Color_Logo.png"
import archiBOONWhiteLogo from "@/imports/ArchiBOON_Geometric_Monochrome_Logo.png"

type Page = "home" | "products" | "category" | "product" | "materials" | "material" | "brands" | "brand" | "professionals" | "professional" | "fabricators" | "assistant" | "request" | "enquiry" | "join" | "how" | "about" | "contact" | "saved"

type Product = {
  id: number
  name: string
  maker: string
  category: string
  note: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Contour Vessel Basin",
    maker: "Atelier Forma",
    category: "Washbasins",
    note: "Solid-surface vessel",
    image: "/images/basin.jpg",
  },
  {
    id: 2,
    name: "Axis Three-Hole Mixer",
    maker: "Nord Werk",
    category: "Bathroom Faucets",
    note: "Brushed metal finish",
    image: "/images/faucet.jpg",
  },
  {
    id: 3,
    name: "Plane Counter Basin",
    maker: "Studio Ceramica",
    category: "Sanitaryware",
    note: "Wall-mounted ceramic",
    image: "/images/sink.jpg",
  },
  {
    id: 4,
    name: "Linear Wall Light",
    maker: "Forma Luce",
    category: "Lighting",
    note: "Indirect architectural light",
    image: "/images/lighting.jpg",
  },
  {
    id: 5,
    name: "Arc Lounge Chair",
    maker: "Common Objects",
    category: "Furniture",
    note: "Leather and timber",
    image: "/images/furniture.jpg",
  },
  {
    id: 6,
    name: "Split Stone Surface",
    maker: "Material Works",
    category: "Surfaces",
    note: "Textured natural stone",
    image: "/images/surface.jpg",
  },
  {
    id: 7,
    name: "Line Lever Set",
    maker: "Foundry Hardware",
    category: "Architectural Hardware",
    note: "Satin metal lever",
    image: "/images/hardware.jpg",
  },
  {
    id: 8,
    name: "Halo Ceiling Light",
    maker: "North Light",
    category: "Lighting",
    note: "Surface-mounted luminaire",
    image: "/images/ceiling-light.jpg",
  },
  {
    id: 9,
    name: "Relief Field Tile",
    maker: "Clay Assembly",
    category: "Wall Coverings",
    note: "Textured ceramic tile",
    image: "/images/tile.jpg",
  },
]

const categories = [
  ["Bathroom & Sanitaryware", "42 subcategories", "/images/basin.jpg"],
  ["Lighting", "Indoor and outdoor", "/images/lighting.jpg"],
  ["Furniture", "Contract and residential", "/images/furniture.jpg"],
  ["Surfaces & Flooring", "Stone, tile and timber", "/images/surface.jpg"],
]

const nav: [string, Page][] = [
  ["Discover", "home"],
  ["Products", "products"],
  ["Materials", "materials"],
  ["Professionals", "professionals"],
  ["Material Assistant", "assistant"],
  ["About", "about"],
]

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    bookmark: <path d="M7 4.5h10v16l-5-3-5 3z" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    filter: (
      <>
        <path d="M4 6h16M7 12h10M10 18h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    upload: (
      <>
        <path d="M12 16V4m0 0L7 9m5-5 5 5" />
        <path d="M5 19h14" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    external: (
      <>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <rect x="14" y="14" width="6" height="6" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name] || paths.arrow}
    </svg>
  )
}

function Button({
  children,
  kind = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: {
  children: ReactNode
  kind?: "primary" | "secondary" | "ghost" | "dark"
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      className={`button button-${kind} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

function Logo({
  go,
  variant = "color",
}: {
  go: (page: Page) => void
  variant?: "color" | "white"
}) {
  return (
    <button
      aria-label="ArchiBOON home"
      className="logo"
      onClick={() => go("home")}
    >
      <img
        alt="ArchiBOON"
        src={variant === "white" ? archiBOONWhiteLogo : archiBOONColorLogo}
      />
    </button>
  )
}

function Header({ page, go }: { page: Page; go: (page: Page) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="header-inner">
        <Logo go={go} />
        <nav className={open ? "nav nav-open" : "nav"}>
          {nav.map(([label, target]) => (
            <button
              className={page === target ? "nav-link active" : "nav-link"}
              key={label}
              onClick={() => {
                go(target)
                setOpen(false)
              }}
            >
              {label}
            </button>
          ))}
          <button
            className="nav-request-mobile"
            onClick={() => {
              go("request")
              setOpen(false)
            }}
          >
            Request Assistance <Icon name="external" />
          </button>
        </nav>
        <div className="header-actions">
          <Button className="desktop-request" onClick={() => go("request")}>
            Request assistance <Icon name="external" />
          </Button>
          <button
            aria-label="Open menu"
            className="menu-button"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}) {
  return <p className={light ? "eyebrow light" : "eyebrow"}>{children}</p>
}

function SectionTitle({
  label,
  title,
  copy,
  action,
}: {
  label: string
  title: string
  copy?: string
  action?: ReactNode
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
        {copy && <p className="section-copy">{copy}</p>}
      </div>
      {action}
    </div>
  )
}

function SearchBar({
  onSearch,
  compact = false,
}: {
  onSearch: () => void
  compact?: boolean
}) {
  const [value, setValue] = useState("")
  return (
    <form
      className={compact ? "search-bar compact" : "search-bar"}
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
    >
      <Icon name="search" size={22} />
      <input
        aria-label="Search"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products, materials, brands, or professionals…"
        value={value}
      />
      <Button type="submit">
        {compact ? (
          "Search"
        ) : (
          <>
            Start discovering <Icon name="arrow" />
          </>
        )}
      </Button>
    </form>
  )
}

function SaveButton({
  id,
  saved,
  toggle,
}: {
  id: number
  saved: boolean
  toggle: (id: number) => void
}) {
  return (
    <button
      aria-label={saved ? "Remove from saved" : "Save product"}
      className={saved ? "save-button saved" : "save-button"}
      onClick={(e) => {
        e.stopPropagation()
        toggle(id)
      }}
    >
      <Icon name="bookmark" />
    </button>
  )
}

function ProductCard({
  product,
  go,
  saved,
  toggle,
}: {
  product: Product
  go: (page: Page) => void
  saved: boolean
  toggle: (id: number) => void
}) {
  return (
    <article className="product-card" onClick={() => go("product")}>
      <div className="product-image">
        <img alt={product.name} src={product.image} />
        <SaveButton id={product.id} saved={saved} toggle={toggle} />
      </div>
      <div className="product-meta">
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <span>{product.maker}</span>
        <div className="product-foot">
          <small>{product.note}</small>
          <Icon name="arrow" />
        </div>
      </div>
    </article>
  )
}

function ProductGrid({
  go,
  saved,
  toggle,
  list = products,
}: {
  go: (page: Page) => void
  saved: number[]
  toggle: (id: number) => void
  list?: Product[]
}) {
  return (
    <div className="product-grid">
      {list.map((product) => (
        <ProductCard
          go={go}
          key={product.id}
          product={product}
          saved={saved.includes(product.id)}
          toggle={toggle}
        />
      ))}
    </div>
  )
}

function Footer({ go }: { go: (page: Page) => void }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Logo go={go} variant="white" />
          <p>Discover better. Source smarter. Build better.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <button onClick={() => go("assistant")}>Material Assistant</button>
          <button onClick={() => go("request")}>Request Assistance</button>
          <button onClick={() => go("how")}>How It Works</button>
        </div>
        <div>
          <h4>Connect</h4>
          <button onClick={() => go("join")}>Join our network</button>
          <button onClick={() => go("about")}>About ArchiBOON</button>
          <button onClick={() => go("contact")}>Contact</button>
        </div>
        <div>
          <h4>Need something specific?</h4>
          <p>
            Our research team can help identify the right resources for your
            requirement.
          </p>
          <Button kind="secondary" onClick={() => go("request")}>
            Start a request <Icon name="arrow" />
          </Button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 ArchiBOON. Prototype experience.</span>
        <span>Privacy · Terms · Accessibility</span>
      </div>
    </footer>
  )
}

function Home({
  go,
  saved,
  toggle,
}: {
  go: (page: Page) => void
  saved: number[]
  toggle: (id: number) => void
}) {
  return (
    <>
      <main>
        <section className="full-hero">
          <img
            alt="Refined concrete architecture with expansive landscape views"
            className="full-hero-background"
            src="/images/hero.jpg"
          />
          <div className="full-hero-overlay" />
          <img
            alt=""
            aria-hidden="true"
            className="full-hero-wordmark"
            src="/images/archiboon-logo.png"
          />

          <div className="full-hero-content">
            <div className="full-hero-message">
              <Eyebrow light>The architectural discovery space</Eyebrow>
              <h1>
                Find the right elements
                <br />
                for <em>every project.</em>
              </h1>
              <p>
                Discover products, explore materials, connect with specialists,
                and source difficult-to-find solutions.
              </p>
            </div>

            <form
              className="full-hero-search"
              onSubmit={(event) => {
                event.preventDefault()
                go("products")
              }}
            >
              <Icon name="search" size={22} />
              <label>
                <small>Search ArchiBOON</small>
                <input
                  aria-label="Search products, materials, brands, or professionals"
                  placeholder="Products, materials, brands, or professionals…"
                />
              </label>
              <Button type="submit">
                Search <Icon name="arrow" />
              </Button>
            </form>

            <div className="full-hero-meta">
              <span>Explore</span>
              {["Sanitaryware", "Lighting", "Surfaces", "Furniture"].map(
                (item) => (
                  <button key={item} onClick={() => go("products")}>
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>

          <aside className="hero-discovery-card">
            <div className="hero-card-images">
              <button onClick={() => go("products")}>
                <img
                  alt="Sculptural white vessel basin"
                  src="/images/basin.jpg"
                />
                <span>Products</span>
              </button>
              <button onClick={() => go("materials")}>
                <img
                  alt="Architectural stone and timber material samples"
                  src="/images/materials.jpg"
                />
                <span>Materials</span>
              </button>
            </div>
            <div className="hero-card-body">
              <Eyebrow>Material Assistant</Eyebrow>
              <h2>Tell us what your project needs.</h2>
              <p>
                Share one requirement and explore relevant products, resources,
                and specialist expertise.
              </p>
              <Button kind="dark" onClick={() => go("request")}>
                Start your request <Icon name="arrow" />
              </Button>
            </div>
            <div className="hero-card-links">
              {[
                ["Find a product", "products"],
                ["Find a professional", "professionals"],
                ["Find a fabricator", "fabricators"],
              ].map(([label, target]) => (
                <button key={label} onClick={() => go(target as Page)}>
                  {label} <Icon name="arrow" />
                </button>
              ))}
            </div>
          </aside>
        </section>

        <section className="trust-strip">
          <p>Built for the way project teams source</p>
          {[
            "ARCHITECTS",
            "INTERIORS",
            "DEVELOPERS",
            "CONSULTANTS",
            "FABRICATORS",
          ].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </section>

        <section className="home-proof">
          {[
            [
              "09",
              "Curated product examples",
              "Across essential architectural categories",
            ],
            [
              "10",
              "Material families",
              "From natural stone to engineered surfaces",
            ],
            [
              "05",
              "Professional disciplines",
              "For design, supply, making, and installation",
            ],
            [
              "01",
              "Connected project brief",
              "For requirements that need deeper research",
            ],
          ].map(([value, title, copy]) => (
            <div key={title}>
              <span>{value}</span>
              <b>{title}</b>
              <small>{copy}</small>
            </div>
          ))}
        </section>

        <section className="section">
          <SectionTitle
            action={
              <Button kind="secondary" onClick={() => go("category")}>
                View all categories <Icon name="arrow" />
              </Button>
            }
            label="Explore by category"
            title="Everything your project needs, in one considered place."
          />
          <div className="category-grid">
            {categories.map(([name, detail, image], i) => (
              <button
                className={`category-card category-${i}`}
                key={name}
                onClick={() => go("category")}
              >
                <img alt="" src={image} />
                <span className="category-index">0{i + 1}</span>
                <span className="category-info">
                  <b>{name}</b>
                  <small>{detail}</small>
                </span>
                <span className="category-arrow">
                  <Icon name="arrow" />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="section warm">
          <SectionTitle
            action={
              <Button kind="ghost" onClick={() => go("products")}>
                Explore all products <Icon name="arrow" />
              </Button>
            }
            label="Curated discovery"
            title="Products selected for thoughtful spaces."
            copy="Illustrative catalogue content for discovery and prototype evaluation."
          />
          <ProductGrid
            go={go}
            list={products.slice(0, 3)}
            saved={saved}
            toggle={toggle}
          />
        </section>

        <section className="section split-editorial">
          <div className="editorial-image">
            <img
              alt="Architectural material samples including stone and wood"
              src="/images/materials.jpg"
            />
            <span>Material study · 01</span>
          </div>
          <div className="editorial-copy">
            <Eyebrow>Material library</Eyebrow>
            <h2>Begin with the material. Shape everything after.</h2>
            <p>
              Explore natural stone, timber, ceramic, metal, glass, concrete,
              and considered sustainable alternatives through an editorial,
              application-led library.
            </p>
            <div className="material-list">
              {[
                "Natural stone",
                "Wood",
                "Ceramic & porcelain",
                "Metal",
                "Engineered surfaces",
                "Sustainable materials",
              ].map((x) => (
                <button key={x} onClick={() => go("materials")}>
                  <span>{x}</span>
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section professionals-preview">
          <SectionTitle
            label="Find expertise"
            title="Products are only part of the project."
            copy="Connect with the people who specify, make, supply, and install them."
          />
          <div className="expertise-grid">
            {[
              "Architects & designers",
              "Consultants",
              "Suppliers",
              "Fabricators",
              "Installers",
            ].map((x, i) => (
              <button key={x} onClick={() => go("professionals")}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <p>
                  Discover relevant expertise and start a contextual enquiry.
                </p>
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        </section>

        <section className="section warm home-brands">
          <SectionTitle
            action={
              <Button kind="ghost" onClick={() => go("brands")}>
                Browse the brand directory <Icon name="arrow" />
              </Button>
            }
            label="Brands & manufacturers"
            title="Meet the makers behind the detail."
            copy="Explore illustrative profiles, product families, catalogues, and contextual enquiry routes."
          />
          <div className="home-brand-grid">
            {[
              ["AF", "Atelier Forma", "Bathroom objects"],
              ["NW", "Nord Werk", "Fittings & hardware"],
              ["FL", "Forma Luce", "Architectural lighting"],
              ["MW", "Material Works", "Surfaces & stone"],
              ["CO", "Common Objects", "Furniture"],
            ].map(([mark, name, category]) => (
              <button key={name} onClick={() => go("brand")}>
                <span>{mark}</span>
                <div>
                  <b>{name}</b>
                  <small>{category}</small>
                </div>
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        </section>

        <section className="section why-home">
          <div>
            <Eyebrow>Why ArchiBOON</Eyebrow>
            <h2>Less searching. More confident next steps.</h2>
            <p>
              A discovery platform designed around how architects, designers,
              developers, and project teams actually source.
            </p>
            <Button kind="secondary" onClick={() => go("how")}>
              See how ArchiBOON works <Icon name="arrow" />
            </Button>
          </div>
          <div className="why-home-list">
            {[
              [
                "01",
                "Discovery with context",
                "Move from broad inspiration to relevant categories, products, and makers.",
              ],
              [
                "02",
                "One connected resource layer",
                "Explore materials, brands, professionals, fabricators, and installers together.",
              ],
              [
                "03",
                "Research when search is not enough",
                "Brief the Material Assistant for difficult or highly specific requirements.",
              ],
            ].map(([index, title, copy]) => (
              <article key={index}>
                <span>{index}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="assistant-band">
          <div>
            <Eyebrow light>ArchiBOON Material Assistant</Eyebrow>
            <h2>
              You tell us what you need.
              <br />
              <em>We help you find it.</em>
            </h2>
          </div>
          <div className="steps">
            {["Request", "Check", "Research", "Verify", "Assist"].map(
              (x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  <b>{x}</b>
                </div>
              ),
            )}
          </div>
          <Button onClick={() => go("assistant")}>
            See how it works <Icon name="arrow" />
          </Button>
        </section>
      </main>
    </>
  )
}

function MvpHome({ go }: { go: (page: Page) => void }) {
  const huntTypes = [
    {
      index: "01",
      title: "Material Hunt",
      copy: "Materials, products, brands, manufacturers, suppliers, and technical solutions.",
      image: "/images/materials.jpg",
    },
    {
      index: "02",
      title: "Professional Hunt",
      copy: "Architects, consultants, engineers, specialists, technical experts, and other professionals.",
      image: "/images/design-review.jpg",
    },
    {
      index: "03",
      title: "Fabricator / Specialist Hunt",
      copy: "Fabricators, manufacturers, installers, specialist contractors, and execution specialists.",
      image: "/images/workshop.jpg",
    },
    {
      index: "04",
      title: "Not Sure / Need Guidance",
      copy: "Share your project brief and ArchiBOON will help identify the appropriate type of resource.",
      image: "/images/architect-drawing.jpg",
    },
  ]
  const processSteps = [
    {
      number: "01",
      title: "Request",
      copy: "Submit your requirement and useful project context.",
      detail:
        "Tell us what you need, where the project is located, the intended application, timeline, and any known technical constraints.",
      image: "/images/architect-drawing.jpg",
      outcome: "A clear, structured project brief",
    },
    {
      number: "02",
      title: "Check",
      copy: "Review ArchiBOON’s existing internal resources.",
      detail:
        "The team checks the internal resource database first to identify existing material, professional, fabricator, or specialist information.",
      image: "/images/samples.jpg",
      outcome: "Existing resources reviewed first",
    },
    {
      number: "03",
      title: "Hunt",
      copy: "Research suitable options when a resource is not available.",
      detail:
        "If an appropriate resource is not already available, ArchiBOON begins targeted research based on the requirement and project context.",
      image: "/images/design-review.jpg",
      outcome: "Potentially suitable options identified",
    },
    {
      number: "04",
      title: "Verify",
      copy: "Evaluate gathered information against the requirement.",
      detail:
        "Available information is reviewed against the brief. Technical claims, availability, and suitability still require confirmation with the relevant resource.",
      image: "/images/materials.jpg",
      outcome: "Information organised around the brief",
    },
    {
      number: "05",
      title: "Assist",
      copy: "Present useful findings and practical next steps.",
      detail:
        "The requester receives relevant findings, useful context, and practical next actions. The team may request further information where needed.",
      image: "/images/hero.jpg",
      outcome: "Practical next steps for the requester",
    },
  ]
  const [activeProcess, setActiveProcess] = useState(0)
  const workflowSectionRef = useRef<HTMLElement>(null)
  const scrollToProcess = (index: number) => {
    const section = workflowSectionRef.current
    const nextIndex = Math.min(processSteps.length - 1, Math.max(0, index))
    setActiveProcess(nextIndex)
    if (!section) return

    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight)
    window.scrollTo({
      behavior: "smooth",
      top: sectionTop + (nextIndex / (processSteps.length - 1)) * scrollRange,
    })
  }

  useEffect(() => {
    const syncProcessToScroll = () => {
      const section = workflowSectionRef.current
      if (!section) return

      const sectionTop = window.scrollY + section.getBoundingClientRect().top
      const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight)
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - sectionTop) / scrollRange),
      )
      setActiveProcess(Math.round(progress * (processSteps.length - 1)))
    }

    window.addEventListener("scroll", syncProcessToScroll, { passive: true })
    syncProcessToScroll()
    return () => window.removeEventListener("scroll", syncProcessToScroll)
  }, [processSteps.length])

  return (
    <main className="mvp-home">
      <section className="full-hero mvp-hero">
        <img
          alt="Refined material-led contemporary architecture"
          className="full-hero-background"
          src="/images/hero.jpg"
        />
        <div className="full-hero-overlay" />
        <div className="full-hero-content mvp-hero-content">
          <div className="full-hero-message mvp-hero-message">
            <Eyebrow light>ARCHI Boon Material Assistant</Eyebrow>
            <h1>
              You tell us what you need.
              <br />
              <em>We find it.</em>
            </h1>
            <p>
              A research and sourcing assistance service for materials,
              professionals, fabricators, and specialist resources.
            </p>
          </div>
          <div className="mvp-hero-actions">
            <Button onClick={() => go("request")}>
              Request Assistance <Icon name="arrow" />
            </Button>
            <Button kind="secondary" onClick={() => go("how")}>
              How It Works
            </Button>
          </div>
          <p className="mvp-principle">
            You don’t have to know where to find it. Tell ARCHI Boon what you
            need, and we’ll research the right resource.
          </p>
        </div>

        <aside className="hero-discovery-card mvp-hero-card">
          <img
            alt="Architectural stone, timber, and surface material samples"
            className="mvp-card-image hero-box-img"
            src="/images/hero-box-img.jpeg"
          />
          <div className="hero-card-body">
            <Eyebrow>One unified request</Eyebrow>
            <h2>What do you need help with?</h2>
            <p>
              Provide your requirement. ArchiBOON will check existing internal
              resources first and begin a Hunt if suitable options are not
              already available.
            </p>
          </div>
          <div className="mvp-request-types">
            {[
              "Material / Product",
              "Professional / Consultant",
              "Fabricator / Installer",
              "Not Sure / Need Guidance",
            ].map((type) => (
              <button key={type} onClick={() => go("request")}>
                <span>{type}</span>
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        </aside>
      </section>

      <section className="trust-strip mvp-audiences">
        <p>Assistance for</p>
        {[
          "CLIENTS",
          "ARCHITECTS",
          "INTERIOR DESIGNERS",
          "ENGINEERS",
          "CONTRACTORS",
          "DEVELOPERS",
        ].map((audience) => (
          <span key={audience}>{audience}</span>
        ))}
      </section>

      <section className="section mvp-intro-grid">
        <div>
          <Eyebrow>Request-driven resource assistance</Eyebrow>
          <h2>Need help finding the right resource?</h2>
        </div>
        <div>
          <p>
            Tell us what you are looking for. ArchiBOON checks its existing
            resources first. If the required material, professional, fabricator,
            or specialist is not already available, the team researches and
            identifies suitable options.
          </p>
          <Button onClick={() => go("request")}>
            Request ArchiBOON Assistance <Icon name="arrow" />
          </Button>
        </div>
      </section>

      <section className="section warm mvp-hunts">
        <SectionTitle
          label="ArchiBOON Hunt"
          title="One request. The right research path."
          copy="Choose the closest request type. If you are unsure, share the brief and the team will help establish the appropriate resource path."
        />
        <div className="hunt-grid">
          {huntTypes.map((hunt) => (
            <button key={hunt.index} onClick={() => go("request")}>
              <img alt="" src={hunt.image} />
              <span className="hunt-card-content">
                <span className="hunt-card-index">{hunt.index}</span>
                <h3>{hunt.title}</h3>
                <p>{hunt.copy}</p>
                <span className="hunt-action">
                  Start this request <Icon name="arrow" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="section mvp-resource-showcase">
        <SectionTitle
          label="Resource examples"
          title="Products and materials worth finding well."
          copy="Illustrative examples of the kinds of resources ArchiBOON can research. Final options depend on your project brief, location, technical requirements, and current resource information."
          action={
            <Button kind="secondary" onClick={() => go("request")}>
              Request a Product Hunt <Icon name="arrow" />
            </Button>
          }
        />
        <div className="resource-image-grid">
          {[
            [
              "Natural stone surfaces",
              "Exterior and interior applications",
              "/images/surface.jpg",
            ],
            [
              "Sanitaryware",
              "Basins, fixtures, and bathroom systems",
              "/images/basin.jpg",
            ],
            [
              "Bathroom fittings",
              "Mixers, taps, and coordinated hardware",
              "/images/faucet.jpg",
            ],
            [
              "Architectural lighting",
              "Decorative and technical solutions",
              "/images/ceiling-light.jpg",
            ],
            [
              "Architectural hardware",
              "Handles, fittings, and detail components",
              "/images/hardware.jpg",
            ],
            [
              "Furniture & joinery",
              "Residential and contract applications",
              "/images/furniture.jpg",
            ],
          ].map(([title, copy, image], index) => (
            <button
              className={`resource-image-card resource-image-card-${index + 1}`}
              key={title}
              onClick={() => go("request")}
            >
              <img alt={title} src={image} />
              <span className="resource-image-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="resource-image-caption">
                <b>{title}</b>
                <small>{copy}</small>
              </span>
              <span className="resource-image-arrow">
                <Icon name="arrow" />
              </span>
            </button>
          ))}
        </div>
        <p className="resource-disclaimer">
          These images are illustrative and do not imply availability,
          certification, manufacturer representation, or an official commercial
          relationship.
        </p>
      </section>

      <section className="mvp-workflow-scroll" ref={workflowSectionRef}>
        <div className="section mvp-workflow-sticky">
          <SectionTitle
            label="How the Material Assistant works"
            title="Human research. Practical assistance."
            copy="The service is designed around one clear workflow supported by an internal resource database."
          />
          <div className="process-interactive" tabIndex={0}>
            <div className="process-tabs" role="tablist">
              {processSteps.map((step, index) => (
                <button
                  aria-selected={activeProcess === index}
                  className={activeProcess === index ? "active" : ""}
                  key={step.number}
                  onClick={() => scrollToProcess(index)}
                  role="tab"
                >
                  <span>{step.number}</span>
                  <span>
                    <b>{step.title}</b>
                    <small>{step.copy}</small>
                  </span>
                  <Icon name="arrow" />
                </button>
              ))}
            </div>

            <div className="process-visual">
              <img
                alt={`${processSteps[activeProcess].title} workflow stage`}
                key={processSteps[activeProcess].image}
                src={processSteps[activeProcess].image}
              />
              <div className="process-visual-caption">
                <span>
                  Step {processSteps[activeProcess].number} /{" "}
                  {String(processSteps.length).padStart(2, "0")}
                </span>
                <h3>{processSteps[activeProcess].title}</h3>
                <p>{processSteps[activeProcess].copy}</p>
              </div>
            </div>

            <div className="process-detail">
              <Eyebrow>What happens at this stage</Eyebrow>
              <h3>{processSteps[activeProcess].outcome}</h3>
              <p>{processSteps[activeProcess].detail}</p>
              <div className="process-progress">
                <span>
                  {String(activeProcess + 1).padStart(2, "0")} of{" "}
                  {String(processSteps.length).padStart(2, "0")}
                </span>
                <div>
                  <i className={`progress-${activeProcess + 1}`} />
                </div>
              </div>
              <div className="process-controls">
                <button
                  aria-label="Previous workflow step"
                  disabled={activeProcess === 0}
                  onClick={() => scrollToProcess(activeProcess - 1)}
                >
                  ← Previous
                </button>
                {activeProcess < processSteps.length - 1 ? (
                  <button onClick={() => scrollToProcess(activeProcess + 1)}>
                    Next step <Icon name="arrow" />
                  </button>
                ) : (
                  <button onClick={() => go("request")}>
                    Start a request <Icon name="arrow" />
                  </button>
                )}
              </div>
              <div className="process-scroll-hint">
                <span />
                <p>
                  {activeProcess < processSteps.length - 1
                    ? "Scroll to continue to the next step"
                    : "Scroll again to continue to the next section"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section warm mvp-use-cases">
        <SectionTitle
          label="Example project briefs"
          title="Start with the outcome not the answer."
          copy="A useful request explains the project context and the practical result you need. ArchiBOON can then establish the appropriate research path."
        />
        <div className="use-case-grid">
          {[
            {
              label: "Material / Product",
              title: "Exterior cladding for hospitality",
              brief:
                "Looking for a suitable stone for exterior cladding of a hospitality project. Need supply and fabrication near Madurai.",
              details: [
                "Natural stone",
                "Exterior application",
                "Supply + fabrication",
              ],
            },
            {
              label: "Professional / Consultant",
              title: "Specialist technical expertise",
              brief:
                "Need a consultant with relevant experience to review a project requirement, advise on technical suitability, and support specification.",
              details: [
                "Required specialisation",
                "Project stage",
                "Location + timeline",
              ],
            },
            {
              label: "Fabricator / Installer",
              title: "Custom fabrication and execution",
              brief:
                "Need a specialist capable of custom fabrication, shop drawings, mock-ups, installation, and site coordination for a defined material package.",
              details: ["Capability", "Quantity or scale", "Service area"],
            },
          ].map((useCase, index) => (
            <article key={useCase.title}>
              <div className="use-case-head">
                <span>0{index + 1}</span>
                <Eyebrow>{useCase.label}</Eyebrow>
              </div>
              <h3>{useCase.title}</h3>
              <p>“{useCase.brief}”</p>
              <div className="use-case-tags">
                {useCase.details.map((detail) => (
                  <span key={detail}>{detail}</span>
                ))}
              </div>
              <button onClick={() => go("request")}>
                Use this request path <Icon name="arrow" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mvp-request-detail">
        <div className="mvp-request-image">
          <img
            alt="Architectural material samples used for project specification"
            src="/images/samples.jpg"
          />
        </div>
        <div className="mvp-request-copy">
          <Eyebrow light>Request ArchiBOON Assistance</Eyebrow>
          <h2>Tell us about your requirement.</h2>
          <p>
            You do not need to know exactly where or how to find it. A useful
            request can include the intended application, project type,
            location, stage, timeline, and any technical requirements.
          </p>
          <div className="request-detail-list">
            {[
              "Describe the material, product, professional, or capability needed",
              "Add project type, location, stage, timeline, and optional budget",
              "Upload drawings, images, BOQ, specifications, or references",
              "Provide contact details and preferred contact method",
            ].map((item) => (
              <div key={item}>
                <Icon name="check" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Button onClick={() => go("request")}>
            Start Your Request <Icon name="arrow" />
          </Button>
        </div>
      </section>

      <section className="section mvp-support">
        <div className="mvp-support-intro">
          <Eyebrow>Resource support</Eyebrow>
          <h2>More than a name or a link.</h2>
          <p>
            Depending on the resource and request, useful next steps may include
            access to product information, samples, technical conversations, or
            execution support. Availability must be confirmed with the relevant
            resource.
          </p>
          <Button
            className="support-requirement-button"
            kind="secondary"
            onClick={() => go("request")}
          >
            Discuss Your Requirement <Icon name="arrow" />
          </Button>
        </div>
        <div className="support-capability-grid">
          {[
            [
              "01",
              "Samples",
              "Explore whether current material or finish samples can be requested.",
            ],
            [
              "02",
              "Technical Consultation",
              "Identify relevant product or material expertise for technical questions.",
            ],
            [
              "03",
              "Specification Support",
              "Research information that may support project specification decisions.",
            ],
            [
              "04",
              "Site Visit / Demonstration",
              "Check whether a relevant resource offers project or product demonstrations.",
            ],
            [
              "05",
              "Installation Support",
              "Identify specialists or support routes for installation and execution.",
            ],
            [
              "06",
              "Documents",
              "Research available catalogues, datasheets, test reports, or maintenance information.",
            ],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section mvp-network">
        <SectionTitle
          label="Secondary pathway"
          title="Join the Archi Boon Network."
          copy="Professionals, brands, manufacturers, fabricators, and specialists may submit their details for consideration in Archi Boon’s internal resource network."
        />
        <div className="network-options">
          {[
            [
              "Professional Registration",
              "Role, experience, specialisation, service area, and portfolio.",
              "/images/design-review.jpg",
            ],
            [
              "Brand / Manufacturer Registration",
              "Company details, product categories, technical information, and support capability.",
              "/images/samples.jpg",
            ],
            [
              "Fabricator / Specialist Registration",
              "Specialisations, materials, capability, services, experience, and service area.",
              "/images/fabricator-craftsman.jpg",
            ],
          ].map(([title, copy, image], index) => (
            <button key={title} onClick={() => go("join")}>
              <img
                alt=""
                className={`network-card-image network-card-image-${index + 1}`}
                src={image}
              />
              <h3>{title}</h3>
              <p>{copy}</p>
              <span>
                Submit details <Icon name="arrow" />
              </span>
            </button>
          ))}
        </div>
        <div className="mvp-privacy-note">
          <b>Private MVP resource network</b>
          <p>
            Submitted and researched information is used internally by
            ArchiBOON. It is not publicly displayed, rated, reviewed, or
            presented as a public verification profile at this stage.
          </p>
        </div>
      </section>

      <section className="assistant-band mvp-final-cta">
        <div>
          <Eyebrow light>Start with one request</Eyebrow>
          <h2>
            Material. Professional. Fabricator.
            <br />
            <em>One request.</em>
          </h2>
        </div>
        <p>
          Request → Database Check → Hunt if Required → Research → Verify →
          Assist
        </p>
        <Button onClick={() => go("request")}>
          Request Assistance <Icon name="arrow" />
        </Button>
      </section>
    </main>
  )
}

function Filters({
  active,
  setActive,
}: {
  active: string[]
  setActive: (x: string[]) => void
}) {
  const groups = [
    ["Category", ["Washbasins", "Bathroom Faucets", "Lighting", "Furniture"]],
    ["Material", ["Ceramic", "Natural stone", "Metal", "Timber"]],
    [
      "Application",
      ["Residential", "Hospitality", "Workplace", "Public space"],
    ],
  ]
  return (
    <aside className="filters">
      <div className="filter-title">
        <b>Filters</b>
        <button onClick={() => setActive([])}>Clear all</button>
      </div>
      {groups.map(([title, items]) => (
        <details className="filter-group" key={title as string} open>
          <summary>
            <h4>{title}</h4>
            <span>
              {active.filter((value) => (items as string[]).includes(value))
                .length || "+"}
            </span>
          </summary>
          <div>
            {(items as string[]).map((x, index) => (
              <label key={x}>
                <input
                  checked={active.includes(x)}
                  onChange={() =>
                    setActive(
                      active.includes(x)
                        ? active.filter((a) => a !== x)
                        : [...active, x],
                    )
                  }
                  type="checkbox"
                />
                <span>{x}</span>
                <small>{12 + index * 7}</small>
              </label>
            ))}
          </div>
        </details>
      ))}
      <div className="filter-help">
        <b>Need help narrowing it down?</b>
        <p>Share your project requirement with our research team.</p>
        <Button kind="secondary">Ask the assistant</Button>
      </div>
    </aside>
  )
}

function Listing({
  go,
  saved,
  toggle,
  category = false,
}: {
  go: (page: Page) => void
  saved: number[]
  toggle: (id: number) => void
  category?: boolean
}) {
  const [filters, setFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  return (
    <main>
      <section
        className={category ? "page-hero category-page-hero" : "page-hero"}
      >
        <div className="breadcrumbs">
          <button onClick={() => go("home")}>Home</button>
          <span>/</span>
          {category && (
            <>
              <button onClick={() => go("products")}>Products</button>
              <span>/</span>
            </>
          )}
          <b>{category ? "Bathroom & Sanitaryware" : "Discover products"}</b>
        </div>
        {category ? (
          <div className="category-hero-grid">
            <div>
              <Eyebrow>Architectural products</Eyebrow>
              <h1>
                Bathroom &<br />
                Sanitaryware
              </h1>
              <p>
                Explore considered fixtures, fittings, and systems for
                residential, hospitality, and commercial bathroom environments.
              </p>
            </div>
            <img alt="Minimal white ceramic basin" src="/images/basin.jpg" />
          </div>
        ) : (
          <>
            <Eyebrow>Product catalogue</Eyebrow>
            <h1>Discover products made for better spaces.</h1>
            <p>
              Search across architectural categories, compare options, and
              connect with manufacturers or sourcing support.
            </p>
            <SearchBar compact onSearch={() => undefined} />
          </>
        )}
      </section>
      {!category && (
        <section className="product-discovery-hub">
          <aside className="product-family-index">
            <div className="family-index-title">
              <Icon name="grid" />
              <span>
                <small>Product discovery</small>
                <b>Browse families</b>
              </span>
            </div>
            <div className="family-index-list">
              {[
                "Bathroom & Sanitaryware",
                "Lighting",
                "Surfaces & Flooring",
                "Furniture",
                "Doors & Windows",
                "Kitchen Systems",
                "Architectural Hardware",
                "Building Materials",
                "Facades",
                "Outdoor & Landscape",
              ].map((item, index) => (
                <button key={item} onClick={() => go("category")}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{item}</b>
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
            <div className="family-index-assist">
              <Eyebrow>Need something specific?</Eyebrow>
              <p>
                Share your project requirement and ArchiBOON can research an
                appropriate resource path.
              </p>
              <Button onClick={() => go("request")}>
                Request Assistance <Icon name="arrow" />
              </Button>
            </div>
          </aside>

          <div className="product-hub-main">
            <div className="maker-feature">
              <div className="maker-feature-heading">
                <div>
                  <Eyebrow>Illustrative maker index</Eyebrow>
                  <h2>Explore by maker.</h2>
                </div>
                <button onClick={() => go("request")}>
                  Ask about a brand <Icon name="arrow" />
                </button>
              </div>
              <div className="maker-feature-row">
                {[
                  ["AF", "Atelier Forma"],
                  ["NW", "Nord Werk"],
                  ["SC", "Studio Ceramica"],
                  ["FL", "Forma Luce"],
                  ["MW", "Material Works"],
                  ["CO", "Common Objects"],
                ].map(([mark, name]) => (
                  <button key={name} onClick={() => go("brand")}>
                    <span>{mark}</span>
                    <b>{name}</b>
                  </button>
                ))}
              </div>
              <p>
                Demonstration profiles only. No official manufacturer
                relationship is implied.
              </p>
            </div>

            <div className="browse-category-heading">
              <div>
                <Eyebrow>Browse by category</Eyebrow>
                <h2>Move from project intent to the right product family.</h2>
              </div>
              <p>
                Begin with an architectural category, then refine by material,
                application, finish, and relevant project requirements.
              </p>
            </div>

            <div className="product-category-cards">
              {[
                [
                  "Bathroom & Sanitaryware",
                  "Fixtures, fittings, and systems",
                  "/images/basin.jpg",
                ],
                [
                  "Surfaces & Flooring",
                  "Stone, tile, timber, and finishes",
                  "/images/surface.jpg",
                ],
                [
                  "Lighting",
                  "Decorative and architectural lighting",
                  "/images/ceiling-light.jpg",
                ],
                [
                  "Furniture",
                  "Residential and contract collections",
                  "/images/furniture.jpg",
                ],
                [
                  "Architectural Hardware",
                  "Handles, fittings, and components",
                  "/images/hardware.jpg",
                ],
                [
                  "Building Materials",
                  "Core materials and technical solutions",
                  "/images/materials.jpg",
                ],
              ].map(([title, copy, image], index) => (
                <button key={title} onClick={() => go("category")}>
                  <div>
                    <img alt={title} src={image} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                    <span>
                      Explore category <Icon name="arrow" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
      {category && (
        <section className="subcategory-strip">
          {[
            "Washbasins",
            "Toilets",
            "Bathtubs",
            "Shower systems",
            "Faucets",
            "Accessories",
            "Flush systems",
          ].map((x, i) => (
            <button key={x} onClick={() => go("products")}>
              <span>0{i + 1}</span>
              {x}
              <Icon name="arrow" />
            </button>
          ))}
        </section>
      )}
      <section className="catalogue section">
        <div className="catalogue-toolbar">
          <div>
            <Eyebrow>
              {category ? "Featured selection" : "Product directory"}
            </Eyebrow>
            <h2>
              {category
                ? "Products for the complete bathroom."
                : "Explore the catalogue."}
            </h2>
            <p className="catalogue-result-count">
              {products.length} curated prototype products across architectural
              categories
            </p>
          </div>
          <div className="toolbar-actions">
            <Button
              kind="secondary"
              className="mobile-filter"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Icon name="filter" /> Filters
            </Button>
            <label className="sort-label">
              Sort by
              <select>
                <option>Curated</option>
                <option>Newest</option>
                <option>Name A–Z</option>
              </select>
            </label>
          </div>
        </div>
        {filters.length > 0 && (
          <div className="active-filters">
            {filters.map((x) => (
              <button
                key={x}
                onClick={() => setFilters(filters.filter((f) => f !== x))}
              >
                {x} ×
              </button>
            ))}
          </div>
        )}
        <div className="catalogue-layout">
          <div className={showFilters ? "filter-mobile open" : "filter-mobile"}>
            <Filters active={filters} setActive={setFilters} />
          </div>
          <ProductGrid go={go} saved={saved} toggle={toggle} />
        </div>
        <div className="load-more">
          <Button kind="secondary">
            Load more products <Icon name="plus" />
          </Button>
          <p>Showing an illustrative selection for this prototype.</p>
        </div>
      </section>
      {category && (
        <section className="section warm">
          <SectionTitle
            label="Manufacturer directory"
            title="Explore makers in this category."
          />
          <div className="brand-row">
            {[
              "Atelier Forma",
              "Nord Werk",
              "Studio Ceramica",
              "Object Foundry",
            ].map((x) => (
              <button key={x} onClick={() => go("brand")}>
                {x}
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function ProductDetail({
  go,
  saved,
  toggle,
}: {
  go: (page: Page) => void
  saved: number[]
  toggle: (id: number) => void
}) {
  const product = products[0]
  return (
    <main>
      <section className="detail section">
        <div className="breadcrumbs">
          <button onClick={() => go("home")}>Home</button>
          <span>/</span>
          <button onClick={() => go("category")}>Bathroom</button>
          <span>/</span>
          <b>{product.name}</b>
        </div>
        <div className="product-detail-grid">
          <div className="gallery">
            <div className="gallery-main">
              <img alt={product.name} src={product.image} />
              <span>01 / 03</span>
            </div>
            <div className="gallery-thumbs">
              <button>
                <img alt="" src="/images/basin.jpg" />
              </button>
              <button>
                <img alt="" src="/images/faucet.jpg" />
              </button>
              <button>
                <img alt="" src="/images/surface.jpg" />
              </button>
            </div>
          </div>
          <div className="detail-copy">
            <Eyebrow>{product.category}</Eyebrow>
            <h1>{product.name}</h1>
            <button className="maker-link" onClick={() => go("brand")}>
              {product.maker} <Icon name="arrow" />
            </button>
            <p className="lead">
              A refined vessel basin with a quiet, sculptural profile, presented
              as illustrative catalogue content for the ArchiBOON prototype.
            </p>
            <div className="detail-actions">
              <Button onClick={() => go("enquiry")}>
                Enquire about this product <Icon name="arrow" />
              </Button>
              <SaveButton
                id={product.id}
                saved={saved.includes(product.id)}
                toggle={toggle}
              />
            </div>
            <button className="text-link" onClick={() => go("request")}>
              Can’t source this locally? Request sourcing assistance{" "}
              <Icon name="arrow" />
            </button>
            <dl className="quick-specs">
              <div>
                <dt>Reference</dt>
                <dd>AB–CB–01</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>Washbasins</dd>
              </div>
              <div>
                <dt>Material</dt>
                <dd>Confirm with manufacturer</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>Enquire for current information</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section className="section detail-info">
        <div>
          <Eyebrow>Product information</Eyebrow>
          <h2>Designed for considered interiors.</h2>
          <p>
            Product information shown here is for design demonstration only.
            Technical specifications, certifications, dimensions, finish
            samples, and current availability should be confirmed directly with
            the manufacturer or supplier.
          </p>
        </div>
        <div className="accordion-list">
          {[
            "Description",
            "Materials & finishes",
            "Dimensions",
            "Technical documents",
            "Manufacturer information",
          ].map((x, i) => (
            <details key={x} open={i === 0}>
              <summary>
                {x}
                <Icon name="plus" />
              </summary>
              <p>
                {i === 0
                  ? "The form balances a soft interior bowl with a precise exterior edge for a minimal architectural expression."
                  : "Information available on enquiry. ArchiBOON does not publish unverified product data."}
              </p>
            </details>
          ))}
        </div>
      </section>
      <section className="section warm">
        <SectionTitle
          label="Related products"
          title="Continue your discovery."
        />
        <ProductGrid
          go={go}
          list={products.slice(1, 4)}
          saved={saved}
          toggle={toggle}
        />
      </section>
    </main>
  )
}

function Materials({ go }: { go: (page: Page) => void }) {
  const items = [
    "Natural stone",
    "Marble",
    "Granite",
    "Wood",
    "Ceramic & porcelain",
    "Glass",
    "Metal",
    "Concrete",
    "Engineered surfaces",
    "Sustainable materials",
  ]
  return (
    <main>
      <section className="page-hero material-hero">
        <Eyebrow>Material library</Eyebrow>
        <h1>
          Explore matter,
          <br />
          <em>texture, and possibility.</em>
        </h1>
        <p>
          An application-led library for discovering materials and the products,
          makers, and specialists behind them.
        </p>
        <SearchBar compact onSearch={() => undefined} />
      </section>
      <section className="section">
        <div className="material-grid">
          {items.map((x, i) => (
            <button key={x} onClick={() => go("material")}>
              <img
                alt=""
                src={
                  [
                    "/images/materials.jpg",
                    "/images/surface.jpg",
                    "/images/samples.jpg",
                    "/images/furniture.jpg",
                  ][i % 4]
                }
              />
              <span>0{i + 1}</span>
              <h3>{x}</h3>
              <Icon name="arrow" />
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

function MaterialDetail({
  go,
  saved,
  toggle,
}: {
  go: (page: Page) => void
  saved: number[]
  toggle: (id: number) => void
}) {
  return (
    <main>
      <section className="material-detail-hero">
        <img
          alt="Natural stone material sample collection"
          src="/images/materials.jpg"
        />
        <div>
          <Eyebrow light>Material library / Natural stone</Eyebrow>
          <h1>
            Natural
            <br />
            Stone
          </h1>
          <p>
            A durable, expressive material defined by geological variation and
            suited to a wide range of interior and exterior applications.
          </p>
          <Button onClick={() => go("request")}>
            Source this material <Icon name="arrow" />
          </Button>
        </div>
      </section>
      <section className="section detail-info">
        <div>
          <Eyebrow>Material overview</Eyebrow>
          <h2>Unique by nature.</h2>
          <p>
            Natural stone varies by quarry, batch, finish, and application.
            Request current samples and verified technical data from the
            relevant supplier before specification.
          </p>
        </div>
        <div className="application-grid">
          {[
            "Interior floors",
            "Wall cladding",
            "Countertops",
            "Exterior paving",
          ].map((x) => (
            <div key={x}>
              <span>Application</span>
              <b>{x}</b>
            </div>
          ))}
        </div>
      </section>
      <section className="section warm">
        <SectionTitle
          label="Products in natural stone"
          title="Related product discoveries."
        />
        <ProductGrid
          go={go}
          list={[products[5], products[0], products[4]]}
          saved={saved}
          toggle={toggle}
        />
      </section>
    </main>
  )
}

function Directory({
  type,
  go,
}: {
  type: "brands" | "professionals" | "fabricators"
  go: (page: Page) => void
}) {
  const config = {
    brands: {
      eyebrow: "Manufacturers & brands",
      title: "Discover the names behind considered products.",
      filters: ["All brands", "Bathroom", "Lighting", "Furniture", "Surfaces"],
      names: [
        "Atelier Forma",
        "Nord Werk",
        "Studio Ceramica",
        "Material Works",
        "Forma Luce",
        "Common Objects",
      ],
    },
    professionals: {
      eyebrow: "Professional directory",
      title: "Find the right expertise for your project.",
      filters: [
        "All professionals",
        "Architects",
        "Interior designers",
        "Consultants",
        "Suppliers",
      ],
      names: [
        "Field Office",
        "North & Line Studio",
        "Material Assembly",
        "Civic Workshop",
        "Parallel Practice",
        "Grounded Design",
      ],
    },
    fabricators: {
      eyebrow: "Fabricators & installers",
      title: "Connect with specialists who make and install.",
      filters: ["All specialists", "Stone", "Metal", "Joinery", "Glass"],
      names: [
        "Stone Assembly",
        "Precision Metalworks",
        "Oak & Joint",
        "Clearline Glass",
        "Surface Lab",
        "Buildcraft Studio",
      ],
    },
  }[type]
  return (
    <main>
      <section className="page-hero directory-hero">
        <Eyebrow>{config.eyebrow}</Eyebrow>
        <h1>{config.title}</h1>
        <SearchBar compact onSearch={() => undefined} />
      </section>
      <section className="section">
        <div className="directory-filters">
          {config.filters.map((x, i) => (
            <button className={i === 0 ? "selected" : ""} key={x}>
              {x}
            </button>
          ))}
        </div>
        <div className="directory-grid">
          {config.names.map((name, i) => (
            <button
              key={name}
              onClick={() => go(type === "brands" ? "brand" : "professional")}
            >
              <div className="directory-monogram">
                {name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <Eyebrow>
                {type === "brands"
                  ? "Independent brand"
                  : type === "fabricators"
                    ? "Specialist studio"
                    : "Design practice"}
              </Eyebrow>
              <h3>{name}</h3>
              <p>
                {type === "brands"
                  ? "Architectural products for considered residential and contract interiors."
                  : "Illustrative profile with project expertise and contextual enquiry."}
              </p>
              <span>
                View profile <Icon name="arrow" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

function Profile({ brand, go }: { brand?: boolean; go: (page: Page) => void }) {
  return (
    <main>
      <section className="profile-hero section">
        <div className="profile-mark">{brand ? "AF" : "FO"}</div>
        <div>
          <Eyebrow>
            {brand
              ? "Independent architectural brand"
              : "Architecture & interior design"}
          </Eyebrow>
          <h1>{brand ? "Atelier Forma" : "Field Office"}</h1>
          <p>
            {brand
              ? "A prototype brand profile presenting a considered collection of bathroom products and material-led objects."
              : "A multidisciplinary practice focused on thoughtful residential, hospitality, and workplace interiors."}
          </p>
          <div className="profile-actions">
            <Button onClick={() => go(brand ? "enquiry" : "contact")}>
              {brand ? "Enquire with brand" : "Contact this practice"}{" "}
              <Icon name="arrow" />
            </Button>
            <Button kind="secondary" onClick={() => go("request")}>
              Request assistance
            </Button>
          </div>
        </div>
      </section>
      <section className="section warm">
        <SectionTitle
          label={brand ? "Product collection" : "Selected work"}
          title={
            brand ? "Explore the collection." : "Projects and capabilities."
          }
        />
        {brand ? (
          <ProductGrid
            go={go}
            list={products.slice(0, 3)}
            saved={[]}
            toggle={() => undefined}
          />
        ) : (
          <div className="portfolio-grid">
            {["Residential interiors", "Hospitality", "Workplace strategy"].map(
              (x, i) => (
                <article key={x}>
                  <img
                    alt=""
                    src={
                      [
                        "/images/hero.jpg",
                        "/images/surface.jpg",
                        "/images/furniture.jpg",
                      ][i]
                    }
                  />
                  <h3>{x}</h3>
                  <p>Illustrative portfolio imagery and project category.</p>
                </article>
              ),
            )}
          </div>
        )}
      </section>
    </main>
  )
}

function Assistant({ go }: { go: (page: Page) => void }) {
  return (
    <main>
      <section className="assistant-landing">
        <div>
          <Eyebrow light>ArchiBOON Material Assistant</Eyebrow>
          <h1>
            You tell us what you need.
            <br />
            <em>We find the right resources.</em>
          </h1>
          <p>
            A research-led sourcing service for products, materials,
            manufacturers, specialists, fabricators, installers, and technical
            solutions.
          </p>
          <Button onClick={() => go("request")}>
            Start your request <Icon name="arrow" />
          </Button>
        </div>
        <img
          alt="Architectural materials arranged for specification"
          src="/images/materials.jpg"
        />
      </section>
      <section className="section">
        <SectionTitle
          label="The process"
          title="Our research. Your resource."
          copy="The service supports discovery and decision-making; it does not guarantee availability, performance, or certification."
        />
        <div className="process-grid">
          {[
            ["01", "Request", "Describe your requirement and project context."],
            ["02", "Check", "Review available and known resources."],
            [
              "03",
              "Hunt",
              "Research and identify potentially suitable options.",
            ],
            ["04", "Verify", "Evaluate information against your requirement."],
            ["05", "Assist", "Present findings and practical next steps."],
          ].map(([n, t, c]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section warm">
        <SectionTitle
          label="What we help you find"
          title="One brief. A broader field of possibilities."
        />
        <div className="request-types">
          {[
            "Material or product",
            "Brand or manufacturer",
            "Professional or consultant",
            "Fabricator or installer",
            "Technical solution",
          ].map((x) => (
            <button key={x} onClick={() => go("request")}>
              {x}
              <Icon name="arrow" />
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      {children}
    </label>
  )
}

function RequestForm({
  go,
  enquiry = false,
  join = false,
}: {
  go: (page: Page) => void
  enquiry?: boolean
  join?: boolean
}) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState(
    enquiry
      ? "Product enquiry"
      : join
        ? "Brand or manufacturer"
        : "Material / Product",
  )
  const max = enquiry ? 3 : join ? 4 : 6
  const next = () => setStep(Math.min(max, step + 1))
  if (submitted)
    return (
      <main className="form-shell success-shell">
        <div className="success-icon">
          <Icon name="check" size={34} />
        </div>
        <Eyebrow>{join ? "Registration prepared" : "Request received"}</Eyebrow>
        <h1>
          {join
            ? "Application prepared."
            : "Thank you for contacting ArchiBOON."}
        </h1>
        <p>
          {join
            ? "This prototype has not sent data to a live business system. Submitted network information would be used internally and would not be publicly displayed at this stage."
            : "Our team will review your requirement and check existing resources. If a suitable resource is not already available, ArchiBOON may conduct additional research to identify appropriate options. We will contact you if further information is required."}
        </p>
        <Button onClick={() => go("home")}>
          Return home <Icon name="arrow" />
        </Button>
      </main>
    )
  return (
    <main className="form-page">
      <div className="form-aside">
        <Logo go={go} variant="white" />
        <div>
          <Eyebrow light>
            {join
              ? "Join our network"
              : enquiry
                ? "Product enquiry"
                : "Request assistance"}
          </Eyebrow>
          <h2>
            {join
              ? "Introduce your practice to ArchiBOON."
              : "Tell us what your project needs."}
          </h2>
          <p>
            {enquiry
              ? "Your enquiry is prefilled with the selected product context."
              : "Your entries are preserved as you move through this prototype flow."}
          </p>
        </div>
        <button
          onClick={() => go(enquiry ? "product" : join ? "home" : "assistant")}
        >
          ← Exit form
        </button>
      </div>
      <div className="form-main">
        <div className="step-header">
          <span>
            Step {step} of {max}
          </span>
          <div>
            {Array.from({ length: max }, (_, i) => (
              <i className={i + 1 <= step ? "done" : ""} key={i} />
            ))}
          </div>
        </div>
        {step === 1 && (
          <div className="form-content">
            <Eyebrow>
              {join
                ? "Organisation type"
                : enquiry
                  ? "Product context"
                  : "What do you need?"}
            </Eyebrow>
            <h1>
              {join
                ? "How would you like to join?"
                : enquiry
                  ? "Confirm the product."
                  : "Choose the closest request type."}
            </h1>
            {enquiry ? (
              <div className="prefill-card">
                <img alt="" src="/images/basin.jpg" />
                <div>
                  <span>Product enquiry</span>
                  <h3>Contour Vessel Basin</h3>
                  <p>Atelier Forma · AB–CB–01</p>
                </div>
              </div>
            ) : (
              <div className="choice-grid">
                {(join
                  ? [
                    "Brand or manufacturer",
                    "Architect or designer",
                    "Supplier",
                    "Fabricator or installer",
                  ]
                  : [
                    "Material / Product",
                    "Professional / Consultant",
                    "Fabricator / Installer",
                    "Not Sure / Need Guidance",
                  ]
                ).map((x) => (
                  <button
                    className={type === x ? "selected" : ""}
                    key={x}
                    onClick={() => setType(x)}
                  >
                    <span>{type === x && <Icon name="check" />}</span>
                    {x}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {step > 1 && step < max && (
          <div className="form-content">
            <Eyebrow>
              {enquiry
                ? "Your enquiry"
                : join
                  ? "Application details"
                  : step === 2
                    ? "Your requirement"
                    : step === 3
                      ? "Project information"
                      : step === 4
                        ? "Reference material"
                        : "Contact information"}
            </Eyebrow>
            <h1>
              {enquiry
                ? "Tell us about your project."
                : join
                  ? "Tell us about your organisation."
                  : step === 2
                    ? "Describe what you’re looking for."
                    : step === 3
                      ? "Add some project context."
                      : step === 4
                        ? "Share useful references."
                        : "How should we contact you?"}
            </h1>
            <div className="field-grid">
              {!join && !enquiry && step === 2 && (
                <Field label="Who are you?" required>
                  <select defaultValue="">
                    <option disabled value="">
                      Select your role
                    </option>
                    {[
                      "Client",
                      "Architect",
                      "Interior Designer",
                      "Engineer",
                      "Contractor",
                      "Developer",
                      "Consultant",
                      "Other Professional",
                      "Other",
                    ].map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </Field>
              )}
              {!join && !enquiry && step === 3 && (
                <>
                  <Field label="Project type" required>
                    <input placeholder="Residential, hospitality, workplace…" />
                  </Field>
                  <Field label="Project location" required>
                    <input placeholder="City, state, or region" />
                  </Field>
                  <Field label="Project stage">
                    <select>
                      <option>Concept</option>
                      <option>Design development</option>
                      <option>Specification</option>
                      <option>Procurement</option>
                      <option>Execution</option>
                    </select>
                  </Field>
                  <Field label="Required timeline">
                    <input placeholder="Optional" />
                  </Field>
                  <Field label="Budget range">
                    <input placeholder="Optional" />
                  </Field>
                </>
              )}
              <Field
                label={
                  join
                    ? "Organisation name"
                    : step === 5
                      ? "Full name"
                      : "Requirement title"
                }
                required
              >
                <input
                  defaultValue={
                    enquiry ? "Enquiry about Contour Vessel Basin" : ""
                  }
                  placeholder={
                    join ? "Studio or company name" : "A clear, short title"
                  }
                />
              </Field>
              <Field
                label={
                  join
                    ? "Website or portfolio"
                    : step === 5
                      ? "Company"
                      : "Preferred material, product, or service"
                }
              >
                <input placeholder="Optional" />
              </Field>
              <Field
                label={step === 5 ? "Email" : "Detailed description"}
                required
              >
                {step === 5 ? (
                  <input placeholder="name@company.com" type="email" />
                ) : (
                  <textarea
                    placeholder="Include intended application, performance needs, aesthetic direction, or known constraints."
                    rows={5}
                  />
                )}
              </Field>
              {!join && !enquiry && step === 5 && (
                <>
                  <Field label="Mobile number" required>
                    <input placeholder="Include country code" type="tel" />
                  </Field>
                  <Field label="WhatsApp">
                    <input placeholder="Optional" type="tel" />
                  </Field>
                  <Field label="Preferred contact method">
                    <select>
                      <option>Email</option>
                      <option>Mobile call</option>
                      <option>WhatsApp</option>
                    </select>
                  </Field>
                </>
              )}
              {step === 4 && (
                <div className="upload">
                  <Icon name="upload" />
                  <b>Upload reference files</b>
                  <span>Prototype control · JPG, PNG, or PDF</span>
                </div>
              )}
            </div>
          </div>
        )}
        {step === max && (
          <div className="form-content">
            <Eyebrow>Review and submit</Eyebrow>
            <h1>Check your information.</h1>
            <div className="review-panel">
              <div>
                <span>Request type</span>
                <b>{type}</b>
              </div>
              {enquiry && (
                <div>
                  <span>Product</span>
                  <b>Contour Vessel Basin · AB–CB–01</b>
                </div>
              )}
              <div>
                <span>Project details</span>
                <b>Information entered in previous steps</b>
              </div>
              <div>
                <span>Privacy</span>
                <b>Consent required before a production submission</b>
              </div>
            </div>
            <label className="consent">
              <input type="checkbox" /> I confirm that the information is
              accurate and give ArchiBOON permission to contact me regarding
              this request.
            </label>
          </div>
        )}
        <div className="form-nav">
          <Button
            disabled={step === 1}
            kind="secondary"
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
          <Button onClick={step === max ? () => setSubmitted(true) : next}>
            {step === max
              ? join
                ? "Submit application"
                : "Submit request"
              : "Continue"}{" "}
            <Icon name="arrow" />
          </Button>
        </div>
      </div>
    </main>
  )
}

function Saved({
  go,
  saved,
  toggle,
}: {
  go: (page: Page) => void
  saved: number[]
  toggle: (id: number) => void
}) {
  const list = products.filter((p) => saved.includes(p.id))
  return (
    <main>
      <section className="page-hero">
        <Eyebrow>Your library</Eyebrow>
        <h1>Saved products & materials.</h1>
        <p>Keep useful references together as your project develops.</p>
      </section>
      <section className="section">
        {list.length ? (
          <ProductGrid go={go} list={list} saved={saved} toggle={toggle} />
        ) : (
          <div className="empty-state">
            <Icon name="bookmark" size={32} />
            <h2>Your saved library is empty.</h2>
            <p>
              Save products while exploring the catalogue and they’ll appear
              here.
            </p>
            <Button onClick={() => go("products")}>
              Explore products <Icon name="arrow" />
            </Button>
          </div>
        )}
      </section>
    </main>
  )
}

function ContentPage({
  page,
  go,
}: {
  page: "how" | "about" | "contact"
  go: (page: Page) => void
}) {
  if (page === "contact")
    return (
      <main>
        <section className="page-hero">
          <Eyebrow>Contact</Eyebrow>
          <h1>Start a conversation.</h1>
          <p>
            For sourcing support, use the assistance request so the right
            context reaches the research team.
          </p>
        </section>
        <section className="section contact-grid">
          <div>
            <h2>General enquiry</h2>
            <p>
              This prototype does not publish unverified business contact
              details.
            </p>
            <Button onClick={() => go("request")}>
              Request sourcing assistance
            </Button>
          </div>
          <form className="contact-form">
            <Field label="Name" required>
              <input />
            </Field>
            <Field label="Email" required>
              <input type="email" />
            </Field>
            <Field label="Enquiry type">
              <select>
                <option>General enquiry</option>
                <option>Partnership</option>
                <option>Press</option>
              </select>
            </Field>
            <Field label="Message" required>
              <textarea rows={5} />
            </Field>
            <Button type="button">
              Prepare message <Icon name="arrow" />
            </Button>
          </form>
        </section>
      </main>
    )
  return (
    <main>
      <section className="page-hero">
        <Eyebrow>{page === "how" ? "How it works" : "About ArchiBOON"}</Eyebrow>
        <h1>
          {page === "how"
            ? "Two ways to move your project forward."
            : "Built for the realities of architectural sourcing."}
        </h1>
        <p>
          {page === "how"
            ? "Discover independently or ask for research-led assistance when the answer is harder to find."
            : "ArchiBOON connects product discovery, material understanding, and professional expertise in one considered experience."}
        </p>
      </section>
      <section className="section">
        {page === "how" ? (
          <>
            <div className="journey">
              <Eyebrow>A · Self-service discovery</Eyebrow>
              {["Discover", "Filter", "Compare", "Enquire"].map((x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  <h3>{x}</h3>
                </div>
              ))}
            </div>
            <div className="journey dark">
              <Eyebrow light>B · Assisted sourcing</Eyebrow>
              {["Request", "Check", "Hunt", "Verify", "Assist"].map((x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  <h3>{x}</h3>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="about-grid">
            <img alt="Calm modern architecture" src="/images/hero.jpg" />
            <div>
              <Eyebrow>Why we exist</Eyebrow>
              <h2>Good projects depend on better information.</h2>
              <p>
                Architectural sourcing is fragmented. Products, technical
                details, manufacturers, and specialist capability often live in
                separate places. ArchiBOON is conceived as a clearer bridge
                between project intent and practical resources.
              </p>
              <p>
                The Material Assistant adds human research to digital
                discovery—helping teams identify relevant avenues without
                presenting unsupported claims as fact.
              </p>
              <Button onClick={() => go("assistant")}>
                Meet the Material Assistant
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [saved, setSaved] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("archiboon-saved") || "[]")
    } catch {
      return []
    }
  })
  useEffect(() => {
    localStorage.setItem("archiboon-saved", JSON.stringify(saved))
  }, [saved])
  const toggle = (id: number) =>
    setSaved((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    )
  const go = (target: Page) => {
    setPage(target)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const formPage = page === "request" || page === "enquiry" || page === "join"
  const content = useMemo(() => {
    if (page === "home") return <MvpHome go={go} />
    if (page === "products")
      return <Listing go={go} saved={saved} toggle={toggle} />
    if (page === "category")
      return <Listing category go={go} saved={saved} toggle={toggle} />
    if (page === "product")
      return <ProductDetail go={go} saved={saved} toggle={toggle} />
    if (page === "materials") return <Materials go={go} />
    if (page === "material")
      return <MaterialDetail go={go} saved={saved} toggle={toggle} />
    if (page === "brands" || page === "professionals" || page === "fabricators")
      return <Directory go={go} type={page} />
    if (page === "brand") return <Profile brand go={go} />
    if (page === "professional") return <Profile go={go} />
    if (page === "assistant") return <Assistant go={go} />
    if (page === "request") return <RequestForm go={go} />
    if (page === "enquiry") return <RequestForm enquiry go={go} />
    if (page === "join") return <RequestForm go={go} join />
    if (page === "saved") return <Saved go={go} saved={saved} toggle={toggle} />
    return <ContentPage go={go} page={page as "how" | "about" | "contact"} />
  }, [page, saved])
  return (
    <div className="app">
      {!formPage && <Header go={go} page={page} />}
      {content}
      {!formPage && <Footer go={go} />}
    </div>
  )
}
