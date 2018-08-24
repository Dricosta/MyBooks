import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import Series from './Series'
import NewSeries from './NewSeries'
import EditSeries from './EditSeries'

// functional-stateless-component
const About = () => <section className="intro-section"><h1>Sobre</h1></section>

class App extends Component {

  render() {
    return (
      <Router>
        
        <div>
          <nav className="navbar navbar-expand-lg fixed-top pt-3" role="navigation">
            <div className="container px-0">
              <div className="">
                  <h2 className="navbar-title">MINHAS SÉRIES</h2>
              </div>

              <div className="content_menu">
                <ul className="navbar-nav menu_list">
                  <li className="mr-3 menu_list_item">
                    <Link  to="/">Home</Link>
                  </li>
                  <li className="mr-3 menu_list_item">
                    <Link  to="/New">Nova Série</Link>
                  </li> 
                  <li className="menu_list_item">
                    <Link to="/About">Sobre</Link>
                  </li>
                </ul>
              </div>
              
            </div>
          </nav>
          <Route exact path='/' component={Home} />
          <Route path='/seriesEdit/:id' component={EditSeries} />
          <Route path='/series/:genre' component={Series} />
          <Route exact path='/About' component={About} />
          <Route exact path='/New' component={NewSeries} />
       
        </div>
      </Router>
    )
  }
}

export default App;
