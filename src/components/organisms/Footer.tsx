import React from 'react'
import { Button, Icon } from '@components/atoms'
import './Footer.css'

export interface FooterProps {
  onNewsletterSubmit?: (email: string) => void
  companyName?: string
  currentYear?: number
  showNewsletter?: boolean
}

/**
 * Footer Organism
 * Combina: Button, Icon
 * Pie de página con links, newsletter y copyright
 */
export const Footer = React.forwardRef<HTMLFootElement, FooterProps>(
  (
    {
      onNewsletterSubmit,
      companyName = 'E-Store',
      currentYear = new Date().getFullYear(),
      showNewsletter = true,
    },
    ref
  ) => {
    const [email, setEmail] = React.useState('')
    const [isSubscribed, setIsSubscribed] = React.useState(false)

    const handleNewsletterSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (onNewsletterSubmit) {
          onNewsletterSubmit(email)
        }
        setIsSubscribed(true)
        setEmail('')
        setTimeout(() => setIsSubscribed(false), 3000)
      }
    }

    return (
      <footer ref={ref} className="footer">
        <div className="footer-container">
          {/* Newsletter Section */}
          {showNewsletter && (
            <section className="footer-newsletter">
              <div className="newsletter-content">
                <h3 className="newsletter-title">Suscribirse a Ofertas</h3>
                <p className="newsletter-description">
                  Recibe las mejores ofertas directo en tu email
                </p>
              </div>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                  aria-label="Email for newsletter"
                />
                <Button
                  variant="primary"
                  size="base"
                  type="submit"
                  className="newsletter-btn"
                  aria-label="Subscribe to newsletter"
                >
                  Suscribir
                </Button>
              </form>
              {isSubscribed && (
                <p className="newsletter-success">
                  ¡Gracias por suscribirse!
                </p>
              )}
            </section>
          )}

          {/* Main Footer Content */}
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-column">
              <h4 className="footer-title">Sobre Nosotros</h4>
              <ul className="footer-links">
                <li>
                  <a href="#about">Quiénes somos</a>
                </li>
                <li>
                  <a href="#careers">Carreras</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#press">Prensa</a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-column">
              <h4 className="footer-title">Atención al Cliente</h4>
              <ul className="footer-links">
                <li>
                  <a href="#contact">Contacto</a>
                </li>
                <li>
                  <a href="#faq">Preguntas Frecuentes</a>
                </li>
                <li>
                  <a href="#shipping">Envíos</a>
                </li>
                <li>
                  <a href="#returns">Devoluciones</a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="footer-column">
              <h4 className="footer-title">Legal</h4>
              <ul className="footer-links">
                <li>
                  <a href="#privacy">Privacidad</a>
                </li>
                <li>
                  <a href="#terms">Términos de Uso</a>
                </li>
                <li>
                  <a href="#cookies">Cookies</a>
                </li>
                <li>
                  <a href="#warranty">Garantía</a>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="footer-column">
              <h4 className="footer-title">Síguenos</h4>
              <div className="footer-social">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="social-link"
                >
                  <Icon name="menu" size="md" />
                </a>
                <a
                  href="#twitter"
                  aria-label="Twitter"
                  className="social-link"
                >
                  <Icon name="search" size="md" />
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="social-link"
                >
                  <Icon name="shopping-bag" size="md" />
                </a>
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="social-link"
                >
                  <Icon name="check" size="md" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} {companyName}. Todos los derechos reservados.
            </p>
            <p className="footer-payment">
              Métodos de pago seguros:
              <span className="payment-icons">💳 🏦 📱</span>
            </p>
          </div>
        </div>
      </footer>
    )
  }
)

Footer.displayName = 'Footer'
