import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Placeholder pages - will be implemented in Subfase 2.6
const Home = () => <div className="container"><h1>Home - Fase 2 Ready</h1></div>
const ProductDetail = () => <div className="container"><h1>Product Detail</h1></div>
const Cart = () => <div className="container"><h1>Cart</h1></div>
const Checkout = () => <div className="container"><h1>Checkout</h1></div>

function App() {
  return (
    <Router>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
