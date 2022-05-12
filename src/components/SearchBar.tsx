import React, { useState } from 'react';
import { Search } from 'react-feather';

interface Props {
    setMainQuerry: (querry: string) => void
}

const SearchBar: React.FC<Props> = ({ setMainQuerry }) => {
    const [querry, setQuerry] = useState("")

    const _handleSearch = () => {
        setMainQuerry(querry)
    }

    return (
        <div className="inline-flex justify-between align-middle w-full pl-6 pr-3 py-2 bg-gray-800 rounded-lg focus-within:ring-blue-400/75 focus-within:ring-2">

            <input
                onKeyDown={({ key }) => { if (key === "Enter") _handleSearch() }}
                placeholder='search'
                onBlur={() => _handleSearch()}
                className="text-[#F0F0F0] font-medium text-lg my-auto bg-transparent w-full outline-none"
                value={querry}
                onChange={(e) => setQuerry(e.target.value)}
            />

            <button
                onClick={() => _handleSearch()}
                title="search"
                className="p-2 rounded-full group bg-transparent cursor-pointer hover:bg-slate-900/30 transition-all">
                <Search size={24} className="stroke-[1.75px] stroke-gray-500 group-hover:stroke-gray-300 transition-all " />
            </button>
        </div>
    );
}

export default SearchBar;