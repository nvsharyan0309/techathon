import React, { useState, useEffect } from 'react';

const Art: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedArt, setGeneratedArt] = useState<string | null>(null);
  const [artLibrary, setArtLibrary] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = 'AIzaSyCbPJSfhN3gTScRorYu9kNvD4Ki3lIPl58';

  useEffect(() => {
    const savedLibrary = localStorage.getItem('artLibrary');
    if (savedLibrary) {
      setArtLibrary(JSON.parse(savedLibrary));
    }
  }, []);

  const generateArt = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a detailed description of an artwork based on the following prompt: ${prompt}`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate art description');
      }

      const data = await response.json();
      const newArt = data.candidates[0].content.parts[0].text;
      setGeneratedArt(newArt);
      const updatedLibrary = [newArt, ...artLibrary.slice(0, 19)];
      setArtLibrary(updatedLibrary);
      localStorage.setItem('artLibrary', JSON.stringify(updatedLibrary));
    } catch (error) {
      console.error('Error generating art:', error);
      alert('Failed to generate art description. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', 'abstract', 'landscape', 'portrait', 'still-life'];

  const filteredArt = activeCategory === 'all'
    ? artLibrary
    : artLibrary.filter((_, index) => index % categories.length === categories.indexOf(activeCategory) - 1);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Art</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">AI Art Description Generator</h3>
        <div className="flex mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-l"
            placeholder="Enter a prompt for AI art description"
          />
          <button
            onClick={generateArt}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {generatedArt && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Generated Art Description:</h4>
            <p className="bg-gray-100 p-4 rounded">{generatedArt}</p>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Categories</h3>
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 rounded ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Art Description Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArt.map((art, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <p>{art}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Art;
