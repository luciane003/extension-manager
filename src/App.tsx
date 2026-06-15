import data from './data/data.json'

import extensionsLogoLight from '../public/images/logo-thema-light.svg'
import extensionsLogoDark from '../public/images/logo-thema-dark.svg'
import darkThemeIcon from '../public/images/icon-moon.svg'
import clearThemeIcon from '../public/images/icon-sun.svg'
import { useEffect, useState } from 'react'

function App() {
    const [items, setItems] = useState(data)
    const [activo, setActivo] = useState(false)
    const [filter, setFilter] = useState ('all')

    useEffect(() => {
        document.body.className = activo
        ? "theme-dark-body"
        : "theme-light-body";
    }, [activo]);

    function handleCheckbox(id: number) {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, isActive: !item.isActive }
                    : item
            )
        )
    }

    function changeTheme() {
        setActivo(!activo)
    }

    const filteredItems = items.filter((item) => {
        if(filter === 'all') return true;
        if(filter === 'active') return item.isActive
        return !item.isActive;
    })

    function handleRemove(id: number) {
        setItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        )
    }

    return (
        <>
            <header className={`page-header ${activo ? 'theme-dark-primary' : 'theme-light-primary'}`}>
                <div>
                    <img src={extensionsLogoLight} alt="Extensions logo" className={`extensions-logo ${activo ? 'show' : 'hide'}`} />
                    <img src={extensionsLogoDark} alt="Extensions logo" className={`extensions-logo ${activo ? 'hide' : 'show'}`} />
                </div>

                <button className={`theme-button focus-style ${activo ? 'theme-dark-secondary' : 'theme-light-secondary'} ${activo ? 'dark-theme-button' : 'light-theme-button'}`} onClick={changeTheme}>
                    <img src={darkThemeIcon} alt="Enable dark theme" className={`dark-theme-icon ${activo ? 'hide' : 'show'}`} />
                    <img src={clearThemeIcon} alt="Enable light theme" className={`clear-theme-icon ${activo ? 'show' : 'hide'}`} />
                </button>
            </header>

            <div className="extensions-header">
                <div>
                    <h2 className={`extensions-title ${activo ? 'text-theme-dark' : 'text-theme-light'}`}>Extensions List</h2>
                </div>

                <div className="extension-controls">
                    <button className={`control-button all-button focus-style ${activo ? 'theme-dark-primary' : 'theme-light-primary'} ${activo ? 'dark-theme-button' : 'light-theme-button'} ${activo ? 'text-theme-dark' : 'text-theme-light'} ${activo ? 'border-light': 'border-dark'} ${filter === 'all' ? 'filter-button-active' : ''}`} onClick={() => setFilter('all')}>
                        All
                    </button>
                    <button className={`control-button active-button focus-style ${activo ? 'theme-dark-primary' : 'theme-light-primary'} ${activo ? 'dark-theme-button' : 'light-theme-button'} ${activo ? 'text-theme-dark' : 'text-theme-light'} ${activo ? 'border-light': 'border-dark'} ${filter === 'active' ? 'filter-button-active' : ''}`} onClick={() => setFilter('active')}>
                        Active
                    </button>
                    <button className={`control-button inactive-button focus-style ${activo ? 'theme-dark-primary' : 'theme-light-primary'} ${activo ? 'dark-theme-button' : 'light-theme-button'} ${activo ? 'text-theme-dark' : 'text-theme-light'} ${activo ? 'border-light': 'border-dark'} ${filter === 'inactive' ? 'filter-button-active' : ''}`} onClick={() => setFilter('inactive')}>
                        Inactive
                    </button>
                </div>
            </div>

            <main className="extensions-list">
                {filteredItems.length === 0 ? (
                    <div className={`empty-state ${activo ? 'theme-dark-primary' : 'theme-light-primary'} ${activo ? 'border-light' : 'border-dark'}`}>
                        <h3 className={`title-status-empty ${activo ? 'text-theme-dark' : 'text-theme-light'}`}>
                            Empty extension list
                        </h3>
                    </div>
                ) : (
                filteredItems.map((item) => (
                    <section key={item.id} className={`extension-card ${activo ? 'theme-dark-primary' : 'theme-light-primary'} ${activo ? 'border-light': 'border-dark'}`}>
                        <div className="extension-content">
                            <div className="extension-image-container">
                                <img className="extension-icon" src={item.logo} alt="Extension icon" />
                            </div>

                            <div className="extension-details">
                                <h3 className={`extension-name ${activo ? 'text-theme-dark' : 'text-theme-light'}`}>{item.name}</h3>
                                <p className={`extension-description ${activo ? 'text-theme-dark' : 'text-theme-light'}`}>{item.description}</p>
                            </div>
                        </div>

                        <div className="extension-actions">
                            <div className="extension-remove">
                                <button className={`remove-extension-button focus-style ${activo ? 'theme-dark-primary' : 'theme-light-primary'} ${activo ? 'text-theme-dark' : 'text-theme-light'} ${activo ? 'border-light' : 'border-dark'}`} onClick={() => handleRemove(item.id)}>
                                    Remove
                                </button>
                            </div>

                            <div>
                                <label htmlFor={`switch-${item.id}`} className={`switch ${item.isActive ? 'active' : 'inactive'}`}>
                                    <input type="checkbox" name="toggle" id={`switch-${item.id}`} checked={item.isActive}
                                        onChange={() => handleCheckbox(item.id)} 
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </section>
                ))  
                )}
            </main>
        </>
    )
}

export default App