// import { useEffect } from "react";
import "./App.css";
import Header from "./common/header/Header";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import Footer from "./common/footer/Footer";
// import PetDetailPage from "./pages/PetDetailPage";
// import UserDetailPage from "./pages/UserDetailPage";
import { Toaster } from "react-hot-toast";
// import CartPage from "./pages/CartPage";
// import { ProductPage } from "./pages/ProductPage";
// import CheckoutForm from "./components/Checkout/CheckoutForm";
import { Helmet } from "react-helmet";
import MessengerCustomerChat from "react-messenger-customer-chat/lib/MessengerCustomerChat";
import useGaTracker from "./components/googleAnalytics/cofigGoogleAnalytics";
import  Routess  from "./Routes";
import React from "react";
const App = () => {
  useGaTracker();
  return (
    <>
      <Helmet>
        <title>OkaKoro Store</title>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://petheaven.vercel.app/"/>
        <meta property="og:title" content="OkoKaro Store"/>
        <meta property="og:description" content="OkaKoro - Thiên đường thú cưng"/>
        <meta property="og:image" content="https://petheaven.vercel.app/images/logo.png"/>
        <meta property="og:image:width" content="500"/>
        <meta property="og:image:height" content="200"/>
      </Helmet>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerStyle={{
          zIndex: "10000",
        }}
      />
      <MessengerCustomerChat
        pageId="105898941761897"
        appId="783041989536896"
      />,
      {/* <Router> */}
        <Header />
        <Routess/>
        <Footer />
      {/* </Router> */}
    </>
  );

};

export default App;
