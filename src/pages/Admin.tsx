import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Badge, Input, Icon } from '@components/atoms'
import { useUser } from '@hooks/useUser'
import { fakeStoreService } from '@services'
import type { Product } from '@types'
import './Admin.css'

interface EditingProduct extends Product {
  isEditing?: boolean
}

export const AdminPage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, isAdmin } = useUser()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EditingProduct | null>(null)
  const [searchFilter, setSearchFilter] = useState('')

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

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setEditForm({ ...product })
  }

  const handleSaveEdit = () => {
    if (editForm && editingId) {
      // Simulate save - FakeStore doesn't persist changes
      setProducts(
        products.map((p) => (p.id === editingId ? { ...editForm } : p))
      )
      setEditingId(null)
      setEditForm(null)
      // Toast would go here with react-hot-toast
      console.log('✅ Producto actualizado:', editForm.name)
    }
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts(products.filter((p) => p.id !== productId))
      console.log('✅ Producto eliminado:', productId)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleEditFieldChange = (field: keyof EditingProduct, value: unknown) => {
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
                  <th>Stock</th>
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
                      {editingId === product.id ? (
                        <Input
                          value={editForm?.name || ''}
                          onChange={(e) => handleEditFieldChange('name', e.target.value)}
                          type="text"
                        />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td className="admin-price">
                      {editingId === product.id ? (
                        <Input
                          value={editForm?.price || ''}
                          onChange={(e) => handleEditFieldChange('price', parseFloat(e.target.value))}
                          type="number"
                        />
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </td>
                    <td className="admin-category">
                      <Badge variant="secondary" size="sm">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="admin-stock">
                      {editingId === product.id ? (
                        <Input
                          value={editForm?.stock || ''}
                          onChange={(e) => handleEditFieldChange('stock', parseInt(e.target.value))}
                          type="number"
                        />
                      ) : (
                        product.stock
                      )}
                    </td>
                    <td className="admin-actions">
                      {editingId === product.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={handleSaveEdit}
                          >
                            Guardar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(product)}
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
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
