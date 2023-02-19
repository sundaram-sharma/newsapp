import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  

    constructor(){
        super();
        console.log("constructor calling");
        this.state={
            articles: [],
            loading: false
        }

    }
  
  async componentDidMount(){ //async function wait for some promises from fetch API to resolve
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=afddc95fd23d41fe881016e9454a94a5"
    let data = await fetch(url); //to fetch the data from URL
    let parseData = await data.json()
    this.setState({articles: parseData.articles})
  }

  render() {
    
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top Headlines</h2>
        
        <div className='row'>
        {this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
            
        </div>
      </div>
    )
  }
}

export default News