import React, {Component} from "react"
import classes from "./Search.css"
import axios from "axios"
import { connect} from "react-redux"
import AllResults from "../../../components/AllResults/AllResults"
import ReactPaginate from "react-paginate"

const apiKey = process.env.REACT_APP_GOODREADS_API_KEY


class Search extends Component{
   
  state ={
    error:'',
    fetchingData: false
  }
 

   onButtonClick=(page)=>{
       this.setState({
         fetchingData:true
       })

       const input =this.props.input;
       this.props.onEmptyResults()
       
    ///console.log(input)
       const config ={
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
           
          },
    }

    axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?page=${page}&key=${apiKey}&q=${input}`,config)
      .then(response =>{
        
        const XMLParser = require('react-xml-parser');
        //console.log(response.data)
          const xml = new XMLParser().parseFromString(response.data);
          const parseError = xml.getElementsByTagName("parsererror");
          

          if(parseError.length){
            this.setState({
              error: "There was an error fetching results.",
              fetchingData: false
            });
          }

          else{
        xml.getElementsByTagName('best_book').map((x) =>
         
           


         // console.log(x.children)
             this.XMLToJson(x.children)


            
        
        );

        
        this.setState({
          fetchingData:true
        })

          }

        
          
      })

      .catch(error => {
        this.setState({
          error: error.toString(),
          fetchingData: false
        });
      });


   }

   XMLToJson = XML => {
    

 //console.log(XML)



 //   XML.forEach(node =>{

       // console.log(node)

    const jsonResult = {

        id:(XML[0].value),
        title:(XML[1].value),
        author:(XML[2].children[1].value),
        image_url:(XML[3].value),
        small_image_url:(XML[4].value)


        
    };


   
   
   this.props.onSearch(jsonResult)

    
    
   // console.log(this.props.searchResults[0])
  // })   

   
  };
render(){
  let paginationElement;

  paginationElement = (
    <ReactPaginate previousLabel={"<- Previous"} nextLabel={"Next ->"} breakLabel={<span className="gap">...</span>} 
    onPageChange={(e) =>this.onButtonClick(e.selected+1)}  pageClassName={classes.eachPage}  containerClassName={classes.pageContainer} 
    initialPage={0}
    activeClassName={classes.activePage} pageLinkClassName={classes.pageLink} 
    previousLinkClassName={classes.prevNext} nextLinkClassName={classes.prevNext} /> 
    
    )
 let dis = (this.props.searchResults[0] === undefined) ? 'hidden' : 'visible' 
 // console.log(this.state.searchResults[0])
return(
    <div className={classes.page}>
    
    
    <div className={classes.form}>
    <input
            
            type="text"
            placeholder="Search Books By title, author, or ISBN..."
            name="searchText"
            onChange={(e) =>this.props.onInputChange(e.target.value)}
            value={this.props.input}

            className={classes.SearchBox}
          />


          <button className= {classes.SearchButton}
          
            onClick={() =>this.onButtonClick('1')}
          >Search</button>


         
          </div>
         
          <div className={classes.AllResults} style={{visibility:dis}}  >
          <div >
           {paginationElement}
         </div>
            <AllResults results ={this.props.searchResults}  />
         
        
          
            <div >
            {paginationElement}
          </div>
         

         </div>
           
       <div className={classes.AllResults} style={{visibility:dis}}  >
          <div >
           {paginationElement}
         </div>
            <AllResults results ={this.props.searchResults}  />
         
        
          
            <div >
            {paginationElement}
          </div>
         

         </div>
         

          

       
         
         
          
      
    </div>
)


}

}


const mapStateToProps =(state)=>{

  return{
    input: state.inputText,
    searchResults:state.searchResults
  }

}


const mapDispatchToProps =(dispatch)=>{
      return{


        onInputChange:(value) => dispatch({type: 'INPUT CHANGE', payload:value}),
        onSearch: (searchResult) => dispatch({type: "SEARCH BOOK", search:searchResult}),
        onEmptyResults: () => dispatch({type:'EMPTY ARRAY'})

      }

}

export default connect(mapStateToProps, mapDispatchToProps)(Search)