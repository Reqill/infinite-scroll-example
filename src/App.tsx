import React, { useState } from 'react';
import InfiniteScroll from './components/InfiniteScroll';
import LaunchCard from './components/LaunchCard';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [querry, setQuerry] = useState<string>('')

  return (
    <div>
      <div className="bg-gray-900 sticky top-0 py-4 my-2 mt-6">
        <h1 className=" font-extrabold text-5xl py-6 mx-4 mb-2 px-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-400">
          SpaceX Launches
        </h1>
        <SearchBar setMainQuerry={setQuerry} />
      </div>

      <InfiniteScroll querry={querry} />
    </div>
  );
}

export default App;
