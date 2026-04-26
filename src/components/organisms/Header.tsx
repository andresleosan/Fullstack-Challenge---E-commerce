import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon, Badge } from '@components/atoms'
import { SearchInput } from '@components/molecules'
import { useUser } from '@hooks/useUser'
import './Header.css'

export interface HeaderProps {
  onSearch?: (query: string) => void
  onMenuToggle?: () => void
  onCartClick?: () => void
  cartItemCount?: number
  isUserLoggedIn?: boolean
  userName?: string
  onUserMenuClick?: () => void
}

/**
 * Header Organism
 * Combina: SearchInput, Button, Icon, Badge
 * Barra superior con logo, búsqueda, carrito y menú usuario
 */
export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      onSearch,
      onMenuToggle,
      onCartClick,
      cartItemCount = 0,
      isUserLoggedIn: externalIsLoggedIn,
      userName: externalUserName,
      onUserMenuClick,
    },
    ref
  ) => {
    const navigate = useNavigate()
    const { user, isAuthenticated, logout } = useUser()
    const [searchValue, setSearchValue] = React.useState('')
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)

    // Use Firebase auth if available, fallback to props
    const isUserLoggedIn = isAuthenticated ?? externalIsLoggedIn
    const userName = user?.name || externalUserName || 'Usuario'

    const handleSearch = (value: string) => {
      setSearchValue(value)
      // ✅ Buscar en tiempo real mientras escribes
      if (onSearch) {
        onSearch(value)
      }
    }

    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen)
      if (onMenuToggle) {
        onMenuToggle()
      }
    }

    const handleCartClick = () => {
      navigate('/carrito')
      window.scrollTo(0, 0)
    }

    const handleUserMenuToggle = () => {
      setIsUserMenuOpen(!isUserMenuOpen)
      if (onUserMenuClick) {
        onUserMenuClick()
      }
    }

    const handleLogout = async () => {
      try {
        await logout()
        setIsUserMenuOpen(false)
        navigate('/', { replace: true })
      } catch (error: any) {
        console.error('Logout error:', error)
      }
    }

    const goToProfile = () => {
      setIsUserMenuOpen(false)
      navigate('/profile')
    }

    const goToOrders = () => {
      setIsUserMenuOpen(false)
      navigate('/orders')
    }

    const goToLogin = () => {
      navigate('/login')
    }

    const handleContactClick = () => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsMenuOpen(false) // Cerrar menú móvil si está abierto
      }
    }

    return (
      <header ref={ref} className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="header-left">
            <button 
              onClick={() => {
                navigate('/')
                window.scrollTo(0, 0)
              }}
              className="header-logo-btn"
              aria-label="Ir al inicio"
            >
              <div className="header-logo">
                <Icon name="shopping-bag" size="lg" />
                <span className="logo-text">E-Store</span>
              </div>
            </button>
          </div>

          {/* Menú Desktop */}
          <nav className="header-desktop-menu">
            <button 
              onClick={() => {
                navigate('/')
                window.scrollTo(0, 0)
              }}
              className="header-menu-link"
            >
              Inicio
            </button>
            <button className="header-menu-link">
              Categorías
            </button>
            <button className="header-menu-link">
              Ofertas
            </button>
            <button 
              onClick={handleContactClick}
              className="header-menu-link"
            >
              Contacto
            </button>
          </nav>

          {/* Búsqueda */}
          <div className="header-search">
            <SearchInput
              value={searchValue}
              onChange={handleSearch}
              placeholder="Buscar..."
              onClear={() => setSearchValue('')}
            />
          </div>

          {/* Carrito y Usuario */}
          <div className="header-right">
            {/* Menú Mobile Button */}
            <button
              className="header-menu-btn"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <Icon name="menu" size="md" />
            </button>

            {/* Carrito */}
            <button
              className="header-cart-btn"
              onClick={handleCartClick}
              aria-label={`Carrito (${cartItemCount} items)`}
            >
              <Icon name="shopping-cart" size="md" />
              {cartItemCount > 0 && (
                <Badge
                  variant="error"
                  size="sm"
                  className="header-cart-badge"
                  aria-label={`${cartItemCount} items in cart`}
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Badge>
              )}
            </button>

            {/* Usuario */}
            {isUserLoggedIn ? (
              <div className="header-user-menu">
                <button
                  className="header-user-btn"
                  onClick={handleUserMenuToggle}
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <span className="user-avatar">{userName.charAt(0).toUpperCase()}</span>
                  <span className="user-name">{userName}</span>
                  <Icon name="menu" size="sm" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="header-user-dropdown">
                    <button className="dropdown-item" onClick={goToProfile}>
                      Mi Perfil
                    </button>
                    <button className="dropdown-item" onClick={goToOrders}>
                      Mis Órdenes
                    </button>
                    <hr className="dropdown-divider" />
                    <button
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                      aria-label="Logout"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={goToLogin}
                className="header-login-btn"
                aria-label="Login"
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Menú Mobile */}
        <nav 
          className={`header-mobile-menu ${isMenuOpen ? 'open' : ''}`}
          aria-hidden={isMenuOpen ? false : undefined}
        >
          <button 
            onClick={() => {
              navigate('/')
              setIsMenuOpen(false)
              window.scrollTo(0, 0)
            }}
            className="header-menu-link"
          >
            Inicio
          </button>
          <button className="header-menu-link">
            Categorías
          </button>
          <button className="header-menu-link">
            Ofertas
          </button>
          <button 
            onClick={() => {
              handleContactClick()
              setIsMenuOpen(false)
            }}
            className="header-menu-link"
          >
            Contacto
          </button>
        </nav>
      </header>
    )
  }
)

Header.displayName = 'Header'
