import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from './Api'



class Home extends Component{
    constructor(props){
        super(props)
    
        this.state = {
          genres:[],
          isLoading: false
        }
      }

      componentDidMount(){
        // setInterval(()=> this.setState({count: this.state.count+1}), 1000)
        this.setState({isLoading: true})
        api.loadGenres()
          .then((res)=>{
            this.setState({
              isLoading: false,
              genres: res.data
            })
          }) 
      }
    
      renderGenreLink(genre){
          return(
            <span className="series_genre mr-3" key={genre}> <Link to={`/series/${genre}`}>{genre}</Link> </span>
          ) 
      }
    
    render(){
        return(
            <div>     
                <section id="intro" className="section-home">
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-12 px-0">
                        <h1 className="title_home">Gerencie suas Séries</h1>
                        <p className="title_home_text">Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
                        </div>
                    </div>
                    </div>
                </section>
                
                <section className="container pt-5 px-0">
                    {
                    this.state.isLoading &&
                    <span>Aguarde carregando...</span>
                    }
                    {     
                    !this.state.isLoading &&
                    <div className="genre_inner"><p>Ver series do genêro:</p>
                        <div className="d-flex mt-5">{this.state.genres.map(this.renderGenreLink)}</div>
                    </div>
                }
                </section>
            </div>              
        )
    }
}


export default Home
