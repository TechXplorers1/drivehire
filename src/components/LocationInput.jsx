import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

export default function LocationInput({ label, placeholder, icon: Icon = MapPin, onSelect, initialValue = '' }) {
    const [query, setQuery] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);

    // Debounce functionality
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 2 && showSuggestions) {
                fetchSuggestions(query);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, showSuggestions]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const fetchSuggestions = async (searchText) => {
        setLoading(true);
        try {
            // Nominatim API restricted to US
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&countrycodes=us&limit=5`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching locations:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (suggestion) => {
        setQuery(suggestion.display_name);
        setSuggestions([]);
        setShowSuggestions(false);
        if (onSelect) {
            onSelect(suggestion.display_name);
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        setShowSuggestions(true);
        if (onSelect) {
            onSelect(e.target.value); // Allow free text typing too
        }
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            {label && <label className="block text-xs text-gray-500 uppercase font-bold mb-1">{label}</label>}
            <div className="flex items-center border-b border-gray-200 py-2">
                <Icon className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder={placeholder}
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    autoComplete="off"
                />
                {loading && <div className="animate-spin h-4 w-4 border-2 border-gray-500 rounded-full border-t-transparent"></div>}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-100 max-h-60 overflow-auto">
                    {suggestions.map((item) => (
                        <button
                            key={item.place_id}
                            onClick={() => handleSelect(item)}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors flex items-start"
                        >
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{item.display_name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
