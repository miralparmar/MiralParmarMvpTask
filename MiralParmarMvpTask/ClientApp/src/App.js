import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AllCustomers from './components/AllCustomers';
import AllProducts from './components/AllProducts';
import AllStores from './components/AllStores';
import AllSales from './components/AllSales';
import 'semantic-ui-css/semantic.min.css'


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
       
            <Route path='/all-customers' component={AllCustomers} />
            <Route path='/all-products' component={AllProducts} />
            <Route path='/all-stores' component={AllStores} />
            <Route path='/all-sales' component={AllSales} />
      </Layout>
    );
  }
}
