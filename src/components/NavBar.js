import React from 'react'

function NavBar() {
    return (
        <div className='top__nav'>
            <div className='logo__info'>
                <img src={`${process.env.PUBLIC_URL}/assets/main-logo.png`} alt='site__logo' width='50px'/>
                <p id='logo__name'>Online Compiler</p>
            </div>
        </div>
    )
}

export default NavBar
