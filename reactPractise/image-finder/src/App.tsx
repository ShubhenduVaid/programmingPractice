import { useState } from "react";
import "./App.css";
import SearchBar from "./components/searchBar";
import ImageGrid from "./components/imageGrid";

function App() {
  const [images, setImages] = useState<Array<string>>([]);
  const url = "http://localhost:3000/?q=";

  async function handleSubmit(value: string): Promise<void> {
    try {
      const response = await fetch(url + value);
      if (!response.ok) {
        throw new Error("Error with calling API");
      }
      const json = await response.json();
      setImages(json.response.response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div>
        <p>Nasa Image Gallery</p>
        <SearchBar handleSubmit={handleSubmit} />
      </div>
      <div className="imageContainer">
        <ImageGrid images={images} />
      </div>
    </div>
  );
}

export default App;
