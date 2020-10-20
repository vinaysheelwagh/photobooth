import React, { useEffect, useState } from 'react';
import axios from "axios"
import Gallery from './Gallery';
import Categories from './Categories';

function App() {
  const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127"
  const [girdItems, setGridItems] = useState([])
  const [query, setQuery] = useState("mountain")
  const [searchString, setSearchString] = useState("")

  const filterItems = (category) =>{
    setQuery(category)
    }

    useEffect(()=>{
      console.log(query)
      getImages()
    }, [query])
    

  const getImages = () =>{
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        setGridItems(response.data.photos.photo);
        //setLoading(false);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  }
  const handleSubmit = (e) =>{
    console.log("submit form")
    e.preventDefault()
    setQuery(searchString)
    setSearchString("")
    //getImages()
  }

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Photo Booth</h2>
          <div className="underline"></div>
          <input 
            type="text" 
            className ="textArea"
            value={searchString} 
            placeholder="Search images" 
            onChange={(e)=>{setSearchString(e.target.value)}} 
          />
          <button type="button" className = "search-btn" 
          onClick={handleSubmit}>Search</button>
        </div>        
        <Categories filterItems={filterItems} />
        <h3 className= "title">{query} Images</h3>
        <Gallery items={girdItems} />
      </section>
    </main>
  );
}

export default App;
