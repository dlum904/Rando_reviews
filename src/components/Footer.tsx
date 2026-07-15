const footerLinkClasses =
  'text-[15px] leading-[1.55] text-text-muted no-underline transition-colors duration-200 hover:text-accent'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-8 px-6 pt-12 pb-8 max-md:grid-cols-1 max-md:gap-7 max-md:px-4 max-md:pt-9 max-md:pb-7">
        <div className="flex flex-col gap-2">
          <h3 className="mb-1 text-xs font-semibold tracking-wide text-accent uppercase">
            Location
          </h3>
          <p className="text-[15px] leading-[1.55] text-text-muted">Queens, NY, USA</p>
          <a href="mailto:dlum904@gmail.com" className={footerLinkClasses}>
            dlum904@gmail.com
          </a>
          <a href="tel:+17185706760" className={footerLinkClasses}>
            718-570-6760
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="mb-1 text-xs font-semibold tracking-wide text-accent uppercase">
            Around the Web
          </h3>
          <a
            href="https://www.linkedin.com/in/dennis-lum-12526b7a/"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClasses}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/dlum904"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClasses}
          >
            GitHub
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="mb-1 text-xs font-semibold tracking-wide text-accent uppercase">
            About This Site
          </h3>
          <p className="text-[15px] leading-[1.55] text-text-muted">
            This site is a random review generator. It is a fun way to get a
            random review for a restaurant, movie, book, or any other product.
          </p>
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 text-center max-md:px-4">
        <p className="text-[13px] text-text-muted">
          © {new Date().getFullYear()} Rando Reviews
        </p>
      </div>
    </footer>
  )
}
