import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { default as Ecommerce } from './components/ecommerce/Main';
import { default as Cart } from './components/ecommerce/Cart';
import { default as WishList } from './components/ecommerce/WishList';
import { default as Admin } from './components/admin/Main';
import { default as Users } from './components/admin/users/List';
import { default as Products } from './components/admin/products/List';
import { default as ProductsForm } from './components/admin/products/Form';
import { default as Categories } from './components/admin/categories/List';
import { default as CategoriesForm } from './components/admin/categories/Form';
import Login from './components/Login';
import Register from './components/Register';
import EcommerceRoute from './routes/EcommerceRoute';
import AdminRoute from './routes/AdminRoute';
import AuthenticateRoute from './routes/AuthenticateRoute';

const App = () => {
  return (
    <div className="App d-flex flex-column vh-100">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<AuthenticateRoute />}>
            {/* ECOMMERCE */}
            <Route element={<EcommerceRoute />}>
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/ecommerce/wish-list" element={<WishList />} />
              <Route path="/ecommerce/cart" element={<Cart />} />
            </Route>
            {/* ADMIN */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/products/create" element={<ProductsForm editMode={false} />} />
              <Route path="/admin/products/:id/edit" element={<ProductsForm editMode={true} />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/categories/create" element={<CategoriesForm editMode={false} />} />
              <Route path="/admin/categories/:id/edit" element={<CategoriesForm editMode={true} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}








export default App;
