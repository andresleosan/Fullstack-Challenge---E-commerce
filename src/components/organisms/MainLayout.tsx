import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import type { HeaderProps } from './Header'
import type { FooterProps } from './Footer'
import './MainLayout.css'

export interface MainLayoutProps {
  children: React.ReactNode
  headerProps?: Partial<HeaderProps>
  footerProps?: Partial<FooterProps>
  showHeader?: boolean
  showFooter?: boolean
  showSidebar?: boolean
  sidebarContent?: React.ReactNode
  className?: string
}

/**
 * MainLayout Organism
 * Combina: Header + Footer
 * Layout principal con header, footer y área de contenido
 */
export const MainLayout = React.forwardRef<HTMLDivElement, MainLayoutProps>(
  (
    {
      children,
      headerProps = {},
      footerProps = {},
      showHeader = true,
      showFooter = true,
      showSidebar = false,
      sidebarContent,
      className = '',
    },
    ref
  ) => {
    return (
      <div ref={ref} className={`main-layout ${className}`}>
        {/* Header */}
        {showHeader && (
          <Header
            onSearch={headerProps.onSearch}
            onMenuToggle={headerProps.onMenuToggle}
            onCartClick={headerProps.onCartClick}
            cartItemCount={headerProps.cartItemCount}
            isUserLoggedIn={headerProps.isUserLoggedIn}
            userName={headerProps.userName}
            onLoginClick={headerProps.onLoginClick}
            onUserMenuClick={headerProps.onUserMenuClick}
          />
        )}

        {/* Main Content */}
        <main className="main-layout-content">
          <div className="main-layout-container">
            {/* Primary Content */}
            <div className="main-layout-primary">{children}</div>

            {/* Sidebar (Optional) */}
            {showSidebar && sidebarContent && (
              <aside className="main-layout-sidebar">{sidebarContent}</aside>
            )}
          </div>
        </main>

        {/* skips to main when available */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Footer */}
        {showFooter && (
          <Footer
            onNewsletterSubmit={footerProps.onNewsletterSubmit}
            companyName={footerProps.companyName}
            currentYear={footerProps.currentYear}
            showNewsletter={footerProps.showNewsletter}
          />
        )}
      </div>
    )
  }
)

MainLayout.displayName = 'MainLayout'
