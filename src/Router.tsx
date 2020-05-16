import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from 'components/PrivateRoute';
import { Home } from 'components/Home';
import { Details } from 'components/Details';
import { Quadrant } from 'components/Quadrant';
import { PageGrid } from 'components/shared/PageGrid';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Login } from 'pages/auth/Login';
import { Logout } from 'pages/auth/Logout';
import { Verify } from 'pages/auth/Verify';
import { NotFound } from 'components/NotFound';
import { ScrollToTop } from 'hooks/topScroll';

export const Router: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <PageGrid>
      <Header />
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/:provider/callback" component={Verify} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/auth/logout" component={Logout} />
        <PrivateRoute path="/:quadrant/:technology" component={Details} />
        <PrivateRoute path="/:quadrant" component={Quadrant} />
        <Route exact path="/not-found">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </PageGrid>
  </BrowserRouter>
);
