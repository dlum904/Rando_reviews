export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__section">
          <h3 className="footer__heading">Location</h3>
          <p>Queens, NY, USA</p>
          <a href="mailto:dlum904@gmail.com">dlum904@gmail.com</a>
          <a href="tel:+17185706760">718-570-6760</a>
        </div>
        <div className="footer__section">
          <h3 className="footer__heading">Around the Web</h3>
          <a
            href="https://www.linkedin.com/in/dennis-lum-12526b7a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/dlum904"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className="footer__section">
          <h3 className="footer__heading">About This Site</h3>
          <p>
            This site is a random review generator. It is a fun way to get a
            random review for a restaurant, movie, book, or any other product.
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Rando Reviews</p>
      </div>
    </footer>
  )
}