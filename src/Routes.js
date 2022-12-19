import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PetDetailPage from "./pages/PetDetailPage";
import UserDetailPage from "./pages/UserDetailPage";
import CartPage from "./pages/CartPage";
import { ProductPage } from "./pages/ProductPage";
import CheckoutForm from "./components/Checkout/CheckoutForm";

 const Routess = () =>{
    return (
        <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="**" element={<HomePage />} />
        <Route path="/product/:id" element={<PetDetailPage />} />
        <Route path="/profile" element={<UserDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/pages/:categoryId/:breedId" element={<ProductPage />} />
        <Route path="/pages/:keyword" element={<ProductPage />} />
        <Route path="/pages" element={<ProductPage />} />         
       <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    )
}
export default Routess