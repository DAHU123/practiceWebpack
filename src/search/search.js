'use strict'
import React from "react";
import ReactDOM from "react-dom";
import './search.less'
import girl from './images/girl.jpg'

class Search extends React.Component{

    render() {
        return (
            <div className="search-text">
                我的天呐，真是美女呀~
                <br/>
                真是醉了！
                <br/>
                ohmygod！
                <br/>
                <img src={girl} alt="girl"/>
            </div>
        );
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)