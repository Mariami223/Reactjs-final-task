import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import RegisterForm from "./components/register/RegisterForm";
import { UserContextProvider } from "./context/userContext";
import HomePage from "./pages/HomePage";
import Profile from "./components/profile/Profile";
import MainLayout from "./components/layout";
import LoginPage from "./pages/LoginPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProtectedRoute from "./app/ProtectedRoute";
import { isUserAdmin } from "./app/util";
import { ProductContextProvider } from "./context/productContext";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
import { CartContextProvider } from "./context/cartContext";
import CartPage from "./pages/CartPage";

function App() {
  const isAdmin = isUserAdmin();

  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/profile/:name" element={<Profile />} />
                  <Route
                    path="/products/categories/:categoryName"
                    element={<CategoryProductsPage />}
                  />
                  <Route
                    path="/products/categories/:categoryName/:productName"
                    element={<SingleProductPage />}
                  />
                  <Route
                    path="/products/new"
                    element={
                      <ProtectedRoute hasAccess={isAdmin}>
                        <ProductFormPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/products/:id/edit"
                    element={
                      <ProtectedRoute hasAccess={isAdmin}>
                        <ProductFormPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/cart" element={<CartPage />} />
                </Routes>
              </MainLayout>
            </CartContextProvider>
          </ProductContextProvider>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
