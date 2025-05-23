import React from 'react';
import './App.css';
import TextToImageGenerator from './components/TextToImageGenerator';
import "@fontsource/poppins";
function App() {
  return (
    <div className="App">
      <header className="text-white font-semibold">
        <h1 className="bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] p-4 text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>BeArt</h1>
      </header>
      <main className="p-4">
        <TextToImageGenerator />
      </main>
      <footer className="bg-gray-800 p-4 text-white text-center relative w-full top-[22rem]"style={{ fontFamily: 'Poppins, sans-serif' }}>
        <p>© 2024 AI Art Generator Becodewala-YouTube</p>
      </footer>
    </div>
  );
}

export default App;
