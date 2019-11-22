import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class NavMenu extends Component {
    constructor() {
        super();
        this.state = {
            isClosed: true
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        if(window.innerWidth < 700) {
            this.setState({
                isClosed: !this.state.isClosed
            })
        }
        
    }

    render() {
        return (
        <nav className={"app-navigation-menu " + ((this.state.isClosed) ? 'closed' : '')} onClick={this.toggleMenu}>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/redux">Redux</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
            <button className="nav-menu--open">{(this.state.isClosed) ? <i className="fas fa-bars"></i> : <i className="fas fa-times"></i>}</button>
        </nav>
        )
    }
}

