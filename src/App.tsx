import React, { useState } from 'react';
import { Play, Music, Palette, Film, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import WelcomePage from './components/WelcomePage';
import Games from './components/Games';
import MusicComponent from './components/Music';
import Art from './components/Art';
import Movies from './components/Movies';
import ContactForm from './components/ContactForm';
import FeaturedContentSlider from './components/FeaturedContentSlider';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');
  const [history, setHistory] = useState<string[]>(['welcome']);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveSection('welcome');
  };

  const navigateTo = (section: string) => {
    setActiveSection(section);
    setHistory([...history, section]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setActiveSection(newHistory[newHistory.length - 1]);
    }
  };

  const goForward = () => {
    console.log("Go forward");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'games':
        return <Games />;
      case 'music':
        return <MusicComponent />;
      case 'art':
        return <Art />;
      case 'movies':
        return <Movies />;
      case 'contact':
        return <ContactForm />;
      default:
        return (
          <div>
            <FeaturedContentSlider />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Content for games, music, art, and movies */}
            </div>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return <WelcomePage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Entertainment and Leisure</h1>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1 rounded-l text-black"
            />
            <button type="submit" className="bg-blue-500 px-3 py-1 rounded-r">
              <Search size={20} />
            </button>
          </form>
        </div>
      </header>

      <nav className="bg-gray-700 p-4">
        <div className="container mx-auto flex justify-center space-x-4">
          {['games', 'music', 'art', 'movies', 'contact'].map((section) => (
            <button
              key={section}
              className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-600 transition text-white"
              onClick={() => navigateTo(section)}
            >
              {section === 'games' && <Play />}
              {section === 'music' && <Music />}
              {section === 'art' && <Palette />}
              {section === 'movies' && <Film />}
              <span className="capitalize">{section}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {renderContent()}
      </main>

      <div className="fixed bottom-4 left-4 flex space-x-4">
        <button
          onClick={goBack}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={goForward}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
