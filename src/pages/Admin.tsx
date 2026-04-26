import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Card, Button, Badge, Input } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import { fakeStoreService } from '@services'
import type { Product } from '@types'
import './Admin.css'

interface EditingProduct extends Product {
  isEditing?: boolean
}

interface AdminModalState {
  type: 'view' | 'edit' | null
  product: Product | null
}

export const AdminPage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useUser()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EditingProduct | null>(null)
  const [searchFilter, setSearchFilter] = useState('')
  const [modal, setModal] = useState<AdminModalState>({ type: null, product: null })

  // Load products from FakeStore
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        const fetchedProducts = await fakeStoreService.getAllProducts()
        setProducts(fetchedProducts)
        setError(null)
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos'
        setError(errorMessage)
        toast.error('Error al cargar productos')
        console.error('Error loading products:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Check authorization
  if (!isAuthenticated || !user) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <Card>
            <h2>Acceso Denegado</h2>
            <p>Por favor inicia sesión para acceder al panel administrativo.</p>
            <Button onClick={() => navigate('/login')}>Ir a Login</Button>
          </Card>
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase())
  )

  const handleOpenView = (product: Product) => {
    setModal({ type: 'view', product })
  }

  const handleOpenEdit = (product: Product) => {
    setEditForm({ ...product })
    setModal({ type: 'edit', product })
  }

  const handleSaveEdit = () => {
    if (editForm && modal.product) {
      // Simulate save - FakeStore doesn't persist changes
      setProducts(
        products.map((p) => (p.id === modal.product?.id ? { ...editForm } : p))
      )
      setModal({ type: null, product: null })
      toast.success('Producto actualizado')
    }
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts(products.filter((p) => p.id !== productId))
      toast.success('Producto eliminado')
    }
  }

  const handleCloseModal = () => {
    setModal({ type: null, product: null })
    setEditForm(null)
  }

  const handleEditFieldChange = <K extends keyof EditingProduct>(
    field: K,
    value: EditingProduct[K]
  ) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value })
    }
  }

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-loading">
            <p>Cargando productos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <section className="admin-header">
          <h1>Panel Administrativo</h1>
          <p>Gestión de productos (CRUD simulado)</p>
        </section>

        {/* Error State */}
        {error && (
          <div className="admin-error">
            <p>❌ {error}</p>
            <Button size="sm" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </div>
        )}

        {/* Search Bar */}
        <div className="admin-controls">
          <Input
            placeholder="Buscar por nombre o categoría..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            type="text"
          />
          <Button variant="outline" onClick={() => navigate('/profile')}>
            Volver
          </Button>
        </div>

        {/* Products Table */}
        {filteredProducts.length === 0 ? (
          <Card className="admin-empty">
            <h3>No hay productos</h3>
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </Card>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="admin-product-row">
                    <td className="admin-image">
                      <img
                        src={product.image || 'https://via.placeholder.com/50x50?text=IMG'}
                        alt={product.name}
                      />
                    </td>
                    <td className="admin-name">
                      {product.name}
                    </td>
                    <td className="admin-price">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="admin-category">
                      <Badge variant="secondary" size="sm">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="admin-actions">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenView(product)}
                      >
                        Ver detalle
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEdit(product)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {modal.type && modal.product && (
          <div className="admin-modal" role="dialog" aria-modal="true">
            <div className="admin-modal__backdrop" onClick={handleCloseModal} />
            <Card className="admin-modal__card">
              <div className="admin-modal__header">
                <h2>{modal.type === 'view' ? 'Detalle del producto' : 'Editar producto'}</h2>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  Cerrar
                </Button>
              </div>

              {modal.type === 'view' ? (
                <div className="admin-modal__content">
                  <img src={modal.product.image} alt={modal.product.name} className="admin-modal__image" />
                  <p><strong>Nombre:</strong> {modal.product.name}</p>
                  <p><strong>Precio:</strong> ${modal.product.price.toFixed(2)}</p>
                  <p><strong>Categoría:</strong> {modal.product.category}</p>
                  <p><strong>Stock:</strong> {modal.product.stock}</p>
                  <p><strong>Descripción:</strong> {modal.product.description}</p>
                </div>
              ) : (
                <div className="admin-modal__content">
                  <Input
                    label="Nombre"
                    value={editForm?.name || ''}
                    onChange={(e) => handleEditFieldChange('name', e.target.value)}
                    type="text"
                  />
                  <Input
                    label="Precio"
                    value={editForm?.price || ''}
                    onChange={(e) => handleEditFieldChange('price', parseFloat(e.target.value))}
                    type="number"
                  />
                  <Input
                    label="Stock"
                    value={editForm?.stock || ''}
                    onChange={(e) => handleEditFieldChange('stock', parseInt(e.target.value, 10))}
                    type="number"
                  />
                  <Input
                    label="Categoría"
                    value={editForm?.category || ''}
                    onChange={(e) => handleEditFieldChange('category', e.target.value)}
                    type="text"
                  />
                  <div className="admin-modal__actions">
                    <Button onClick={handleSaveEdit}>Guardar</Button>
                    <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="admin-footer">
          <Button
            variant="outline"
            onClick={() => navigate('/profile')}
          >
            Volver al Perfil
          </Button>
          <Button onClick={() => navigate('/')}>
            Ir a Inicio
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
