import React, { Component } from 'react'
import api from './Api'
import { Redirect  } from 'react-router-dom'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class NewSeries extends Component{
    constructor(props){
        super(props)
    
        this.state = {
          genres:[],
          isLoading: false,
          redirect: false
        }
        this.saveSeries = this.saveSeries.bind(this)
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

      saveSeries(){
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        console.log(newSeries)
        api.saveSeries(newSeries)
            .then((res)=>{
                this.setState({
                    redirect: '/series/'+this.refs.genre.value
                })
             })
      }

    render(){
        return(            
            <div className="container section_newseries px-0">
                <section className="col-lg-8 px-0">

                    {this.state.redirect &&
                    <Redirect to={this.state.redirect} />}

                    <h2 className="section_newseries_title">Adicione uma nova série:</h2>
                    <form className="section_newseries_form d-flex flex-column">
                        <label>Nome:</label>
                        <input type="text" ref='name' className="section_newseries_form_input"/>
                        <label>Status:</label>
                        <select ref='status' className="section_newseries_form_select custom-select rounded-0">
                        {
                            Object.keys(statuses)
                            .map(key => <option key={key} value={key}> {statuses[key]} </option>)
                        }
                        </select>
                        <label>Gênero:</label>
                        <select ref='genre' className="custom-select rounded-0">
                        {
                           this.state.genres
                            .map(key => <option key={key} value={key}>{key}</option>)
                        }
                        </select>
                        <label>Comentarios:</label>
                        <textarea ref='comments' className="form-control rounded-0"></textarea>
                        <br/>
                        <button type="button" onClick={this.saveSeries} >Salvar</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default NewSeries