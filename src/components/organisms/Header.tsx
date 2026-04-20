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
      if (onCartClick) {
        onCartClick()
      }
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
            <a href="/" className="header-menu-link">
              Inicio
            </a>
            <a href="#" className="header-menu-link">
              Categorías
            </a>
            <a href="#" className="header-menu-link">
              Ofertas
            </a>
            <a href="#" className="header-menu-link">
              Contacto
            </a>
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
                    <a href="/profile" className="dropdown-item" onClick={goToProfile}>
                      Mi Perfil
                    </a>
                    <a href="/orders" className="dropdown-item" onClick={goToOrders}>
                      Mis Órdenes
                    </a>
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
          <a href="/" className="header-menu-link">
            Inicio
          </a>
          <a href="#" className="header-menu-link">
            Categorías
          </a>
          <a href="#" className="header-menu-link">
            Ofertas
          </a>
          <a href="#" className="header-menu-link">
            Contacto
          </a>
        </nav>
      </header>
    )
  }
)

Header.displayName = 'Header'
