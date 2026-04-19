# 🏗️ Arquitectura del Proyecto - Fullstack Challenge E-commerce

## 1️⃣ Diagrama Arquitectónico General

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO (NAVEGADOR)                      │
└────────────────┬────────────────────────────────────────────────┘
                 │
        ┌────────▼────────┐
        │   REACT APP     │
        │  (TypeScript)   │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐  ┌──────────┐  ┌─────────────┐
│ Router │  │ Context  │  │  localStorage │
│  Pages │  │   API    │  │   (Fase 2)   │
└────────┘  └──────────┘  └─────────────┘
    │            │           │
    └────────────┼───────────┘
                 │
    ┌────────────▼────────────┐
    │   (Fase 3) Firebase     │
    │  ┌────────────────────┐ │
    │  │ Firestore Database │ │
    │  │  Auth + Products   │ │
    │  │      Orders        │ │
    │  └────────────────────┘ │
    └─────────────────────────┘
```

---

## 2️⃣ Estructura de Carpetas Detallada

```
src/
├── components/                      # Componentes React (Atomic Design)
│   ├── atoms/
│   │   ├── Button.tsx              # Botón básico
│   │   ├── Input.tsx               # Input básico
│   │   ├── Badge.tsx               # Badge estilizado
│   │   ├── Card.tsx                # Card contenedor
│   │   ├── Icon.tsx                # Wrapper de iconos
│   │   └── Loader.tsx              # Spinner de carga
│   │
│   ├── molecules/
│   │   ├── ProductCard.tsx         # Card de producto (átomo + datos)
│   │   ├── CartItem.tsx            # Fila de carrito
│   │   ├── SearchInput.tsx         # Input + botón de búsqueda
│   │   ├── FilterGroup.tsx         # Grupo de filtros
│   │   ├── Pagination.tsx          # Controles de paginación
│   │   ├── ToastNotification.tsx   # Notificación individual
│   │   └── Modal.tsx               # Modal base
│   │
│   ├── organisms/
│   │   ├── Header.tsx              # Navbar global
│   │   ├── Footer.tsx              # Footer
│   │   ├── ProductGallery.tsx      # Grid de productos
│   │   ├── CartSidebar.tsx         # Carrito lateral (o modal)
│   │   ├── CheckoutForm.tsx        # Formulario de checkout
│   │   └── AdminPanel.tsx          # Panel admin (Fase 3)
│   │
│   └── templates/
│       ├── MainLayout.tsx          # Layout principal (Header + Footer)
│       ├── AdminLayout.tsx         # Layout admin (Sidebar + Content)
│       └── CheckoutLayout.tsx      # Layout customizado checkout
│
├── pages/                           # Vistas/Rutas principales
│   ├── Home.tsx                    # Página principal (listado)
│   ├── ProductDetail.tsx           # Detalle de producto
│   ├── Cart.tsx                    # Página de carrito
│   ├── Checkout.tsx                # Página de checkout
│   ├── Login.tsx                   # Página de login
│   ├── Register.tsx                # Página de registro
│   ├── Profile.tsx                 # Perfil de usuario
│   ├── Orders.tsx                  # Historial de órdenes
│   ├── Admin.tsx                   # Panel admin (Fase 3)
│   └── NotFound.tsx                # 404
│
├── store/                           # State management
│   ├── CartContext.tsx             # Context para carrito
│   ├── UserContext.tsx             # Context para usuario
│   ├── ProductContext.tsx          # Context para productos
│   └── useContextsHook.ts          # Hook unificado
│
├── hooks/                           # Custom hooks reutilizables
│   ├── useCart.ts                  # Lógica del carrito
│   ├── useUser.ts                  # Lógica de usuario
│   ├── useProducts.ts              # Lógica de productos
│   ├── useFetch.ts                 # Fetch genérico
│   ├── useLocalStorage.ts          # Persistencia
│   ├── useDebounce.ts              # Debounce para búsqueda
│   └── useNotification.ts          # Toast notifications
│
├── types/                           # Interfaces TypeScript
│   ├── product.types.ts            # Type Product, Category
│   ├── user.types.ts               # Type User, Auth
│   ├── order.types.ts              # Type Order
│   ├── cart.types.ts               # Type CartItem
│   ├── api.types.ts                # Type API responses
│   └── index.ts                    # Barrel exports
│
├── utils/                           # Funciones utilitarias
│   ├── api.ts                      # Llamadas HTTP (axios)
│   ├── validators.ts               # Validaciones (email, etc)
│   ├── formatters.ts               # Formateo (moneda, fechas)
│   ├── localStorage.ts             # Helpers de storage
│   ├── constants.ts                # Constantes globales
│   └── helpers.ts                  # Helpers varias
│
├── styles/                          # CSS global
│   ├── variables.css               # Variables CSS (colores, spacing)
│   ├── global.css                  # Reset + global styles
│   ├── components/
│   │   ├── Button.css
│   │   ├── Form.css
│   │   ├── ProductCard.css
│   │   └── ... (1 CSS por componente)
│   └── layouts/
│       ├── MainLayout.css
│       └── AdminLayout.css
│
├── firebase/                        # Configuración Firebase (Fase 3)
│   ├── config.ts                   # Inicialización Firebase
│   ├── auth.ts                     # Funciones de autenticación
│   ├── firestore.ts                # Servicios Firestore
│   └── storage.ts                  # Firebase Storage (imágenes)
│
├── mockdata/                        # Datos ficticios (Fase 2)
│   ├── products.ts                 # Array de productos
│   ├── users.ts                    # Array de usuarios
│   ├── categories.ts               # Categorías
│   ├── orders.ts                   # Órdenes de ejemplo
│   └── index.ts                    # Exports
│
├── App.tsx                          # Componente raíz + Router
├── main.tsx                         # Entry point
└── index.css                        # Importaciones de estilos
```

---

## 3️⃣ Flujo de Datos

### **Fase 2: Context API + localStorage**

```
User Interaction (click, input)
              │
              ▼
    React Component
              │
         ┌────┴────┐
         │          │
         ▼          ▼
     Dispatch   Update
     Action     State
         │          │
         └────┬─────┘
              │
              ▼
    Context Provider
    (CartContext, UserContext, etc)
              │
         ┌────┴────────────┐
         │                │
         ▼                ▼
  Update UI         Sync to
  Components        localStorage
```

**Ejemplo - Agregar producto al carrito**:

```typescript
// 1. Usuario hace click en "Agregar al carrito"
// 2. Component dispach action
const handleAddToCart = (product: Product) => {
  cartDispatch({ type: 'ADD_TO_CART', payload: product });
};

// 3. Reducer actualiza estado
const cartReducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    return {
      ...state,
      items: [...state.items, action.payload]
    };
  }
};

// 4. Context actualiza
// 5. localStorage sinc (useEffect en CartContext)
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartState));
}, [cartState]);

// 6. Componentes suscritos re-renderizan
```

### **Fase 3: Firebase + Real-time**

```
User Interaction
         │
         ▼
React Component
         │
    ┌────┴────────────┐
    │                 │
    ▼                 ▼
 Local State    Firebase SDK
    │                 │
    ├─────────────────┤
         │
         ▼
  Firestore Listener
  (Real-time updates)
         │
         ▼
  Context Update
         │
         ▼
  UI Re-render
```

---

## 4️⃣ Componentes Principales

### **Atomic Design Structure**

#### **Atoms (Componentes base)**
```typescript
// Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  ...props 
}) => {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
};
```

#### **Molecules (Componentes compuestos)**
```typescript
// ProductCard.tsx
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart
}) => {
  return (
    <Card className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <Button onClick={() => onAddToCart(product)}>
        Agregar al carrito
      </Button>
    </Card>
  );
};
```

#### **Organisms (Componentes complejos)**
```typescript
// ProductGallery.tsx
export const ProductGallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Lógica de búsqueda + filtros
  useEffect(() => {
    const filtered = products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="gallery">
      <SearchInput onChange={setSearchTerm} />
      <FilterGroup onCategoryChange={setSelectedCategory} />
      <div className="grid-products">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
```

#### **Templates (Layouts de página)**
```typescript
// MainLayout.tsx
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};
```

---

## 5️⃣ Gestión de Estado (State Management)

### **Fase 2: Context API**

```typescript
// store/CartContext.tsx
import { createContext, useReducer, useEffect } from 'react';

type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_FROM_STORAGE'; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    // ... más cases
  }
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Sincronizar con localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: JSON.parse(saved) });
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
```

### **Fase 3: Integración Firebase**

En Fase 3, migrar:
- User authentication → Firebase Auth
- Cart → Firestore collection `carts/{userId}`
- Orders → Firestore collection `orders`
- Products → Firestore collection `products`

El Context API continúa, pero sincroniza con Firestore:

```typescript
// Pseudo-code para Fase 3
useEffect(() => {
  // Listener en tiempo real de Firestore
  const unsubscribe = db.collection('carts')
    .doc(userId)
    .onSnapshot(snapshot => {
      dispatch({ type: 'SYNC_FROM_FIRESTORE', payload: snapshot.data() });
    });

  return () => unsubscribe();
}, [userId]);
```

---

## 6️⃣ Type Safety con TypeScript

### **Interfaces Principales**

```typescript
// types/product.types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  rating: {
    rate: number;
    count: number;
  };
}

export type Category = 'electronics' | 'clothing' | 'books' | 'home';

// types/user.types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  createdAt: Date;
  role: 'user' | 'admin';
}

export interface AuthCredentials {
  email: string;
  password: string;
}

// types/cart.types.ts
export interface CartItem extends Product {
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  total: number;
  lastUpdated: Date;
}

// types/order.types.ts
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

---

## 7️⃣ Custom Hooks para Lógica Reutilizable

```typescript
// hooks/useCart.ts
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  const { state, dispatch } = context;

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    items: state.items,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    itemCount: state.items.length,
  };
};

// hooks/useProducts.ts
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(
        import.meta.env.VITE_API_PRODUCTS_URL + '/products'
      );
      setProducts(response.data);
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
};

// hooks/useDebounce.ts
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

---

## 8️⃣ Routing Architecture

```typescript
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <UserProvider>
        <ProductProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/product/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
              <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
              <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><MainLayout><Orders /></MainLayout></ProtectedRoute>} />

              {/* Admin Routes (Fase 3) */}
              <Route path="/admin" element={<ProtectedRoute admin><AdminLayout><Admin /></AdminLayout></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ProductProvider>
      </UserProvider>
    </CartProvider>
  );
};
```

---

## 9️⃣ API Integration Pattern

```typescript
// utils/api.ts
import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PRODUCTS_URL,
  timeout: 10000,
});

export const api = {
  // Products
  getProducts: async (params?: any) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  getProductById: async (id: number) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  },

  // Fase 3: Órdenes (Firebase)
  createOrder: async (order: Order) => {
    // Llamar a Firebase
  },

  getOrdersByUser: async (userId: string) => {
    // Consultar Firestore
  },
};
```

---

## 🔟 Error Handling

```typescript
// Manejo consistente de errores
try {
  const products = await api.getProducts();
  setProducts(products);
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      setError('Productos no encontrados');
    } else if (error.response?.status === 500) {
      setError('Error del servidor');
    } else {
      setError(error.message);
    }
  } else {
    setError('Error desconocido');
  }
}
```

---

## 1️⃣1️⃣ Performance Optimizations

```typescript
// React.memo para evitar re-renders innecesarios
export const ProductCard = React.memo(({ product }: Props) => {
  return <Card>{/* ... */}</Card>;
});

// useMemo para cálculos costosos
const filteredProducts = useMemo(
  () => products.filter(p => p.category === selectedCategory),
  [products, selectedCategory]
);

// useCallback para evitar recrear funciones
const handleAddToCart = useCallback((product: Product) => {
  dispatch({ type: 'ADD_TO_CART', payload: product });
}, [dispatch]);

// Lazy loading de componentes
const Admin = lazy(() => import('./pages/Admin'));
```

---

## 1️⃣2️⃣ Testing Strategy

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

**Documento versión**: 1.0  
**Última actualización**: Abril 2026  
**Responsable**: Equipo de Arquitectura  
**Próxima revisión**: Cuando cambie la estructura base
