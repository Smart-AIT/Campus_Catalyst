import { EVENT, LINKS, isRegistrationOpen } from '../data/event'
import { Social } from '../components/Social'

export function Footer() {
  return (
    <footer className="footer dark-stock" aria-labelledby="footer-title">
      <p id="footer-title" className="footer__word t-display">
        <span className="sr-only">Campus Catalyst 2K26</span>
        <span aria-hidden="true">Campus</span>
        <span aria-hidden="true">Catalyst</span>
        <span className="footer__yr" aria-hidden="true">2K26</span>
      </p>
      <div className="footer__grid">
        <div>
          <p className="t-kicker footer__k">Organised by</p>
          <p className="footer__v">
            College Innovation &amp;
            <br />
            Development Club
          </p>
        </div>
        <div>
          <p className="t-kicker footer__k">Venue</p>
          <p className="footer__v">
            Army Institute of Technology
            <br />
            Pune
          </p>
        </div>
        <div>
          <p className="t-kicker footer__k">When</p>
          <p className="footer__v">
            {EVENT.dateLabel}
            <br />
            {EVENT.timeLabel}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="t-kicker footer__k">Links</p>
          <ul className="footer__links">
            <li>
              <a href={LINKS.cidc} target="_blank" rel="noopener noreferrer">CIDC website ↗</a>
            </li>
            <li>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            </li>
            <li>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </li>
            <li>
              {isRegistrationOpen() ? (
                <a href={LINKS.registration} target="_blank" rel="noopener noreferrer">Register ↗</a>
              ) : (
                <a href="#register">Register</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer__bottom">
        <p className="t-hand footer__line">Built with ideas. Shipped in 9 hours.</p>
        <Social className="social--footer" />
        <p className="t-type footer__copy">© 2026 CIDC — Campus Catalyst</p>
      </div>
    </footer>
  )
}
