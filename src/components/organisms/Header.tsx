import React from 'react'
import { Button, Icon, Badge } from '@components/atoms'
import { SearchInput } from '@components/molecules'
import { useCart } from '@hooks/useCart'
import './Header.css'

export interface HeaderProps {
  onSearch?: (query: string) => void
  onMenuToggle?: () => void
  onCartClick?: () => void
  cartItemCount?: number
  isUserLoggedIn?: boolean
  userName?: string
  onLoginClick?: () => void
  onUserMenuClick?: () => void
}

/**
 * Header Organism
 * Combina: SearchInput, Button, Icon, Badge
 * Barra superior con logo, búsqueda, carrito y menú usuario
 */
export const Header = React.forwardRef<HTMLHeaderElement, HeaderProps>(
  (
    {
      onSearch,
      onMenuToggle,
      onCartClick,
      cartItemCount = 0,
      isUserLoggedIn = false,
      userName = 'Usuario',
      onLoginClick,
      onUserMenuClick,
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = React.useState('')
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

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

    return (
      <header ref={ref} className="header">
        <div className="header-container">
          {/* Logo y Menú Mobile */}
          <div className="header-left">
            <button
              className="header-menu-btn"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <Icon name="menu" size="md" />
            </button>
            <div className="header-logo">
              <Icon name="shopping-bag" size="lg" />
              <span className="logo-text">E-Store</span>
            </div>
          </div>

          {/* Búsqueda Central */}
          <div className="header-search">
            <SearchInput
              value={searchValue}
              onChange={handleSearch}
              placeholder="Buscar productos..."
              onClear={() => setSearchValue('')}
            />
          </div>

          {/* Carrito y Usuario */}
          <div className="header-right">
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
                  onClick={onUserMenuClick}
                  aria-label="User menu"
                >
                  <span className="user-avatar">{userName.charAt(0).toUpperCase()}</span>
                  <span className="user-name">{userName}</span>
                  <Icon name="menu" size="sm" />
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onLoginClick}
                className="header-login-btn"
                aria-label="Login"
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Menú Mobile - Navegación */}
        {isMenuOpen && (
          <nav className="header-mobile-menu">
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
        )}
      </header>
    )
  }
)

Header.displayName = 'Header'
