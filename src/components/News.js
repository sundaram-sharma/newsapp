import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  

    constructor(){
        super();
        console.log("constructor calling");
        this.state={
            articles: [],
            loading: false,
            page: 1
        }

    }
  
  async componentDidMount(){ //async function wait for some promises from fetch API to resolve
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=afddc95fd23d41fe881016e9454a94a5&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    let data = await fetch(url); //to fetch the data from URL
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles, 
      totalResults: parseData.totalResults,
      loading: false})
  }

  handlePreviousClick = async () =>{

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=afddc95fd23d41fe881016e9454a94a5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    let data = await fetch(url); //to fetch the data from URL
    let parseData = await data.json()

    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false
    })

  }
  handleNextClick = async () =>{

    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=afddc95fd23d41fe881016e9454a94a5&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({loading: true});
      let data = await fetch(url); //to fetch the data from URL
      let parseData = await data.json()

      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      })
    }
  }

  render() {
    
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
            
        </div>
        <div className='container d-flex justify-content-between'> 
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePreviousClick} >&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark"onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News