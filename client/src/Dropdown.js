import React, {useState, useEffect} from 'react';

function Dropdown({onSelect, activeItem, items}) {
    const [dropdownVisisble, setDropdownVisible] = useState(false);

    const selectItem = (e, item) => {
        e.preventDefault();
        setDropdownVisible(!dropdownVisisble);
        onSelect(item);
    }

    return (
        <div className='dropdown'>
            <button 
                className='btn btn-secondary dropdown-toggle' 
                type='button' 
                onClick={() => setDropdownVisible(!dropdownVisisble)}
            >
                {activeItem.label}
            </button>
            <div className={`dropdown-menu ${dropdownVisisble ? 'visible' : ''}`}>
                {items && items.map((item, i) => (
                    <a 
                        className={`dropdown-menu ${item.value === activeItem.value ? 'active' : null}`} 
                        href="#" 
                        key={i} 
                        onClick={e => selectItem(e, item)}
                    >

                    </a>
                ))}

            </div>
        </div>
    );
}

export default Dropdown;