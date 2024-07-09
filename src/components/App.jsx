import { useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, redirect } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import Home from './pages/dashboard/home/Home';
import Statistics from './pages/dashboard/statistics/StatisticsTab'; 
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PrivateRoute from './pages/PriveteRoute'; 
// import { refreshUser } from './redux/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import { getAllTransactions, getTransactionsCategories } from './redux/transactions/operations';

async function transactionsLoader() {
  await Promise.allSettled([
    store.dispatch(getTransactionsCategories()),
    store.dispatch(getAllTransactions())
  ])
  return null;
}
function authLoader() {
  return store.getState().auth.isAuthenticated ? redirect("/dashboard") : redirect("/login");
}

const router = createBrowserRouter(createRoutesFromElements(<>
    <Route path="/" loader={authLoader} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<PrivateRoute element={DashboardPage} />} loader={transactionsLoader} >
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="statistics" element={<Statistics />} />
    </Route>
  </>), { basename: import.meta.env.DEV ? '/' : '/React-Team-Project' }
// process.env.NODE_ENV!=='production'
);


export const App = () => {
    const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      // dispatch(refreshUser());
    }
  }, [dispatch, isAuthenticated]);
  return (
    <RouterProvider router={router} /* fallbackElement={<Loader />} */ />
  );
};

export default App;
