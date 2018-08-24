import React, { Component } from 'react'
import api from './Api'
import { Link } from 'react-router-dom'


const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class Series extends Component{

    constructor(props){
        super(props)
    
        this.state = {
          isLoading: false,
          series: []
        }
        this.renderSeries = this.renderSeries.bind(this) // faz com que o renderSeries tenha acesso ao THIS
        this.loadData = this.loadData.bind(this) // faz com que o loadData tenha referencia do THIS 
      }

    // Quando o componente carregar na tela
    componentDidMount(){
       this.loadData()
    }

    //
    loadData(){
        this.setState({ isLoading: true })
        api.loadSeriesByGenre(this.props.match.params.genre).then((res)=>{ 
        this.setState({
            isLoading: false,
            series: res.data
        })
      })
    }

    // DELETE SERIES QUE VEM DA API.JS 
    deleteSeries(id){
        api.deleteSeries(id).then((res)=> this.loadData()) // VOCÊ PODE UTILIZAR O THIS DENTRO DA ARROW FUNCTION PQ A REFERENCIA DO THIS É GLOBAL NESTE CASO DO - BIND
    }

    renderSeries(series){
        return(
            <section className="container px-0" key={series.id}>
                <div className=" col-lg-8 px-0">
                    <div className="thumbnail">
                        <div className="card_series d-flex">
                            <div className="mr-auto">
                                <h4 className="card_series_name">{series.name}</h4>
                                <p className="lead card_series_status">{series.genre} / {statuses[series.status]}</p>
                            </div>
                            <div className="ml-auto align-self-center">
                                <Link className="btn btn-success" to={'/seriesEdit/'+series.id}>Editar</Link>
                                <a className="btn btn-danger ml-2" href="" onClick={() => this.deleteSeries(series.id)}>Excluir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    }



    render(){
        return(
            <section className="inner_series container px-0">
                <h1 className="title_series">Series de {this.props.match.params.genre}</h1>
                {
                    this.state.isLoading && // quando o icone esta carregando o estado dele..
                    <p>Carregando, aguarde...</p> // COLOCAR ANIMAÇÃO COM ICONE DE LOADING 
                }
                {
                    !this.state.isLoading && this.state.series.length === 0 && 
                    <div className="alert alert-info">Nenhuma Série cadastrada</div>
                }
                
                <div id="series" className="row list-group">
                   {
                    !this.state.isLoading && 
                    this.state.series.map(this.renderSeries)
                    }
                </div>
            </section>
            
        )
    }
}

export default Series