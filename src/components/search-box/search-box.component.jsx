import './search-box.styles.scss'
import { ReactComponent as Search } from '../../assets/icons/search.svg'


const SearchBox = ({ onSearchChange }) => {
    const handleInputChange = (event) => {
        const value = event.target.value;
        onSearchChange(value);
    };

    return (
        <form className="search-bar">
            <button className="search-bar__button">
                <Search />
            </button>
            <input
                type="text"
                className="search-bar__input"
                placeholder="البحث عن معطيات"
                onChange={handleInputChange}
            />
        </form>
    );
};

export default SearchBox;