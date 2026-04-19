# 🔥 Estructura Firestore - Fullstack Challenge E-commerce

## 📊 Diagrama de Colecciones

```
firestore
├── products/                   [Catálogo de productos]
│   ├── {productId}
│   │   ├── id: number
│   │   ├── title: string
│   │   ├── price: number
│   │   ├── description: string
│   │   ├── image: string
│   │   ├── category: string
│   │   ├── rating: { rate, count }
│   │   └── createdAt: timestamp
│   │
├── users/                      [Perfiles de usuario]
│   ├── {userId}
│   │   ├── uid: string
│   │   ├── email: string
│   │   ├── name: string
│   │   ├── profilePicture: string (URL)
│   │   ├── role: 'user' | 'admin'
│   │   ├── createdAt: timestamp
│   │   ├── phone: string
│   │   ├── addresses: [
│   │   │   { street, city, state, zipCode, country, isDefault }
│   │   │ ]
│   │   └── updatedAt: timestamp
│   │
├── carts/                      [Carritos de usuario]
│   ├── {userId}
│   │   ├── userId: string
│   │   ├── items: [
│   │   │   {
│   │   │     productId: string,
│   │   │     quantity: number,
│   │   │     addedAt: timestamp,
│   │   │     price: number  (snapshot al momento)
│   │   │   }
│   │   │ ]
│   │   ├── total: number
│   │   └── lastUpdated: timestamp
│   │
├── orders/                     [Historial de compras]
│   ├── {orderId}
│   │   ├── id: string
│   │   ├── userId: string
│   │   ├── items: [
│   │   │   {
│   │   │     productId: string,
│   │   │     title: string,
│   │   │     quantity: number,
│   │   │     price: number,
│   │   │     subtotal: number
│   │   │   }
│   │   │ ]
│   │   ├── total: number
│   │   ├── status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
│   │   ├── createdAt: timestamp
│   │   ├── shippingAddress: {
│   │   │   street, city, state, zipCode, country
│   │   │ }
│   │   └── notes: string
│   │
└── categories/                 [Categorías disponibles]
    ├── {categoryId}
    │   ├── id: string
    │   ├── name: string
    │   ├── slug: string
    │   ├── description: string
    │   └── icon: string (URL o emoji)
```

---

## 📋 Referencia Completa de Colecciones

### 1️⃣ Colección `products`

**Path**: `/products/{productId}`

**Documento modelo**:
```typescript
{
  id: "1",
  title: "Fjallraven - Backpack",
  price: 109.95,
  description: "Your perfect pack for everyday use... ",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  category: "electronics",
  rating: {
    rate: 3.9,
    count: 120
  },
  createdAt: Timestamp(2024-01-15),
  updatedAt: Timestamp(2024-01-20)
}
```

**Índices necesarios**:
- [ ] Field `category` (Ascending)
- [ ] Field `price` (Ascending)

**Security Rules**:
```javascript
// Lectura: Pública
match /products/{productId} {
  allow read: if true;
  
  // Escritura: Solo admin
  allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

**Operaciones**:
```typescript
// Leer todos
const products = await getDocs(collection(db, 'products'));

// Leer con filtro (ej: electronics)
const q = query(collection(db, 'products'), where('category', '==', 'electronics'));
const results = await getDocs(q);

// Leer individual
const doc = await getDoc(doc(db, 'products', productId));

// Crear (admin)
await setDoc(doc(db, 'products', newId), newProduct);

// Actualizar (admin)
await updateDoc(doc(db, 'products', productId), updates);

// Eliminar (admin)
await deleteDoc(doc(db, 'products', productId));
```

---

### 2️⃣ Colección `users`

**Path**: `/users/{userId}`

**Documento modelo**:
```typescript
{
  uid: "abc123xyz",
  email: "user@example.com",
  name: "Andrés Santiago",
  profilePicture: "https://example.com/avatar.jpg",
  role: "user", // or "admin"
  phone: "+34 666 123 456",
  addresses: [
    {
      street: "Calle Principal 123",
      city: "Madrid",
      state: "Madrid",
      zipCode: "28001",
      country: "España",
      isDefault: true
    }
  ],
  createdAt: Timestamp(2024-01-01),
  updatedAt: Timestamp(2024-01-20)
}
```

**Security Rules**:
```javascript
match /users/{userId} {
  // Lectura: Usuario de sí mismo o admin
  allow read: if request.auth.uid == userId || 
              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
  
  // Escritura: Usuario de sí mismo
  allow write: if request.auth.uid == userId;
}
```

**Operaciones**:
```typescript
// Crear usuario (onCreate trigger en Auth)
await setDoc(doc(db, 'users', userId), {
  uid: userId,
  email: user.email,
  name: displayName,
  role: 'user',
  addresses: [],
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
});

// Actualizar perfil
await updateDoc(doc(db, 'users', userId), {
  name: newName,
  phone: newPhone,
  updatedAt: serverTimestamp()
});

// Agregar dirección
await updateDoc(doc(db, 'users', userId), {
  addresses: arrayUnion(newAddress)
});
```

---

### 3️⃣ Colección `carts`

**Path**: `/carts/{userId}`

**Documento modelo**:
```typescript
{
  userId: "abc123xyz",
  items: [
    {
      productId: "1",
      quantity: 2,
      price: 109.95, // snapshot del precio en ese momento
      addedAt: Timestamp(2024-01-20)
    },
    {
      productId: "5",
      quantity: 1,
      price: 55.99,
      addedAt: Timestamp(2024-01-20)
    }
  ],
  total: 275.89, // Calculado local
  lastUpdated: Timestamp(2024-01-20T15:30:00Z)
}
```

**Security Rules**:
```javascript
match /carts/{userId} {
  // Cada usuario solo ve su carrito
  allow read, write: if request.auth.uid == userId;
}
```

**Operaciones**:
```typescript
// Obtener carrito del usuario
const cartSnap = await getDoc(doc(db, 'carts', userId));
const cart = cartSnap.data() || { items: [], total: 0 };

// Agregar producto
const existingItem = cart.items.find(i => i.productId === productId);
if (existingItem) {
  existingItem.quantity += quantity;
} else {
  cart.items.push({ productId, quantity, price, addedAt: serverTimestamp() });
}
await updateDoc(doc(db, 'carts', userId), {
  items: cart.items,
  total: calculateTotal(cart.items),
  lastUpdated: serverTimestamp()
});

// Listener en tiempo real
onSnapshot(doc(db, 'carts', userId), (doc) => {
  console.log('Cart updated:', doc.data());
  // Actualizar UI
});
```

---

### 4️⃣ Colección `orders`

**Path**: `/orders/{orderId}`

**Documento modelo**:
```typescript
{
  id: "ORD-2024-001",
  userId: "abc123xyz",
  items: [
    {
      productId: "1",
      title: "Fjallraven - Backpack",
      quantity: 2,
      price: 109.95,
      subtotal: 219.90
    }
  ],
  total: 219.90,
  status: "confirmed", // pending, confirmed, shipped, delivered
  createdAt: Timestamp(2024-01-20),
  shippingAddress: {
    street: "Calle Principal 123",
    city: "Madrid",
    state: "Madrid",
    zipCode: "28001",
    country: "España"
  },
  notes: "Envío express solicitado",
  estimatedDelivery: Timestamp(2024-01-25)
}
```

**Índices necesarios**:
- [ ] Field `userId` (Ascending) + Field `createdAt` (Descending)

**Security Rules**:
```javascript
match /orders/{orderId} {
  // Lectura: Usuario de la orden o admin
  allow read: if request.auth.uid == resource.data.userId || 
              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
  
  // Creación: Usuario autenticado
  allow create: if request.auth != null && 
                request.auth.uid == request.resource.data.userId;
  
  // Actualización: Solo admin (cambiar status)
  allow update: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

**Operaciones**:
```typescript
// Crear orden (desde Checkout)
const orderId = doc(collection(db, 'orders')).id;
await setDoc(doc(db, 'orders', orderId), {
  id: orderId,
  userId: currentUser.uid,
  items: cartItems,
  total: cartTotal,
  status: 'pending',
  createdAt: serverTimestamp(),
  shippingAddress: selectedAddress,
  estimatedDelivery: Timestamp(Date.now() + 5 * 24 * 60 * 60 * 1000) // +5 días
});

// Obtener órdenes del usuario
const q = query(
  collection(db, 'orders'),
  where('userId', '==', userId),
  orderBy('createdAt', 'desc')
);
const results = await getDocs(q);

// Actualizar estado (admin)
await updateDoc(doc(db, 'orders', orderId), {
  status: 'shipped'
});
```

---

### 5️⃣ Colección `categories`

**Path**: `/categories/{categoryId}`

**Documento modelo**:
```typescript
{
  id: "electronics",
  name: "Electrónica",
  slug: "electronics",
  description: "Productos electrónicos",
  icon: "⚡"
}
```

**Security Rules**:
```javascript
match /categories/{categoryId} {
  allow read: if true; // Pública
  allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

**Operaciones**:
```typescript
// Listar categorías
const categories = await getDocs(collection(db, 'categories'));

// Crear (admin)
await setDoc(doc(db, 'categories', slug), { id, name, slug, description, icon });
```

---

## 🔐 Firestore Security Rules (Completo)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper: Obtener rol del usuario
    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }
    
    function isAdmin() {
      return getUserRole() == 'admin';
    }
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Products - Lectura pública, escritura admin
    match /products/{document=**} {
      allow read: if true;
      allow create, update, delete: if isAuthenticated() && isAdmin();
    }
    
    // Categories - Lectura pública, escritura admin
    match /categories/{document=**} {
      allow read: if true;
      allow write: if isAuthenticated() && isAdmin();
    }
    
    // Users - Lectura privada, escritura propia
    match /users/{userId} {
      allow read: if request.auth.uid == userId || isAdmin();
      allow create: if request.auth.uid == userId;
      allow update, delete: if request.auth.uid == userId || isAdmin();
    }
    
    // Carts - Privado por usuario
    match /carts/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Orders - Usuario o admin
    match /orders/{orderId} {
      allow read: if request.auth.uid == resource.data.userId || isAdmin();
      allow create: if isAuthenticated() && 
                       request.auth.uid == request.resource.data.userId;
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Denegar todo lo demás
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 📊 Estimaciones de Datos

### Free Tier Firestore Limits
- **Lectura**: 50K/día (sin costo)
- **Escritura**: 20K/día (sin costo)
- **Deleción**: 20K/día (sin costo)
- **Storage**: 1GB gratis

### Estimación del Proyecto
- **Productos**: ~20 (FakeStore API)
- **Usuarios**: ~50 (testing)
- **Órdenes**: ~100 (máximo testing)
- **Tamaño**: < 100MB (muy por debajo de límite)

✅ **Cómplementamente dentro del free tier**

---

## 🔌 Operaciones CRUD por Contexto

### ProductContext (Lectura + Real-time)
```typescript
export const ProductContext = createContext<{
  products: Product[];
  loading: boolean;
} | null>(null);

export const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener en tiempo real
    const unsubscribe = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
```

### CartContext (Sincronización Bidireccional)
```typescript
export const CartProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext)!;
  const [cart, setCart] = useState<Cart | null>(null);

  // Leer carrito del usuario
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, 'carts', user.uid), (doc) => {
      setCart(doc.data() as Cart || { items: [], total: 0 });
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // Actualizar carrito
  const updateCart = async (newCart: Cart) => {
    if (!user) return;
    await updateDoc(doc(db, 'carts', user.uid), newCart);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
```

---

## 🚀 Script de Inicialización

En `src/scripts/initializeProducts.ts`:

```typescript
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export const initializeProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();

  for (const product of products) {
    await setDoc(doc(db, 'products', String(product.id)), {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      rating: product.rating,
      createdAt: serverTimestamp()
    });
  }

  console.log('✅ Products initialized');
};

// Ejecutar una sola vez
// En App.tsx o durante setup:
// if (!localStorage.getItem('productsInitialized')) {
//   await initializeProducts();
//   localStorage.setItem('productsInitialized', 'true');
// }
```

---

**Documento versión**: 1.0  
**Última actualización**: Abril 2026  
**Responsable**: Database Architect  
**Próxima revisión**: Cuando cambien esquemas
