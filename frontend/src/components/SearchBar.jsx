import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import inclulexLogo from '/logo.svg';
import Typo from 'typo-js';

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const dictEs = new Typo('es', null, null, { dictionaryPath: '/assets' });
  const validCharsRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ´\s]*$/; // Ajustado para permitir solo letras y espacios

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Por favor ingrese una palabra antes de buscar.');
      return;
    }

    if (!validCharsRegex.test(searchTerm)) {
      alert('Por favor ingrese solo caracteres válidos (letras y espacios).');
      return;
    }

    const suggestions = dictEs.suggest(searchTerm.toLowerCase());
    const correctedWord = suggestions.length > 0 ? suggestions[0] : searchTerm;

    navigate(`/search/${correctedWord.toLowerCase()}`);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (validCharsRegex.test(value) || value === '') {
      setSearchTerm(value);
    } else {
      alert('Por favor ingrese solo caracteres válidos (letras y espacios).');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const searchInputClass = props.darkMode ? 'dark-mode-search-input' : 'light-mode-search-input';
  const searchButtonClass = props.darkMode ? 'dark-mode-search-button' : 'light-mode-search-button';
  const explanationTextClass = props.darkMode ? 'dark-mode-explanation-text' : 'light-mode-explanation-text';

  return (
    <>
      <div id="header" role="banner" className="app-container">
        <h1 className="brand-text">
          <span className="brand-text-inclu">Inclu</span>
          <span className="brand-text-lex">Lex</span>
        </h1>
      </div>
      <div id="sitelookup" role="search" className="search-bar-container">
        <Form.Control
          required
          title='Ingrese una palabra para buscar su significado en el diccionario de IncluLex.'
          type="text"
          placeholder="Ingrese una palabra"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className={`search-input ${searchInputClass}`}
          spellCheck="true"
        />
        <Button
          variant="primary"
          onClick={handleSearch}
          className={`search-button ${searchButtonClass}`}
        >
          Buscar
        </Button>
      </div>
      <h2 id="footer" role="contentinfo" className={`explanation-text ${explanationTextClass}`}>
        Queremos ayudarte a entender palabras difíciles de una manera divertida. Te mostramos palabras parecidas, te damos ejemplos y usamos dibujos para que sea fácil y divertido aprender nuevas palabras.
      </h2>
    </>
  );
};

export default SearchBar;


