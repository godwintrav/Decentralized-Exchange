import React from 'react';
import Dropdown from './Dropdown';

function Header({user, tokens, contracts, selectToken}) {
    return (
        <header id='header' className='card'>
            <div className='row'>
                <div className='col-sm-3 flex'>
                    <Dropdown
                        items={tokens.map(token => ({
                            label: token.ticker,
                            value: token
                        }))}
                        activeItem={{
                            label: user.selectedToken.ticker,
                            value: user.selectedToken
                        }}
                        onSelect={selectToken}
                    />
                </div>
                <div className='col-sm-9'>
                    <h1 className='header-title'>
                        Dex- <span className='contract-address'>Contract Address: <span className='address'>{contracts.dex.options.address}</span><p>To purchase DAI pay to the contract address 0.0006ETH = 1DAI</p></span>
                    </h1>
                </div>
            </div>
        </header>
    );
}

export default Header;