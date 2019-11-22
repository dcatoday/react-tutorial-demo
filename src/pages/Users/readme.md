import React, { Component } from 'react'
import './users.scss';
import axios from 'axios';
export default class FaceDude extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.getUsers = this.getUsers.bind(this);
    }

    getUsers() {
        axios.get('https://randomuser.me/api/?results=12').then(res => res.data).then((res)=>{
            console.log(res);
            this.setState({users: res.results});
        })
    }

    displayUsers() {
        const {
            users
        } = this.state;

        if (!users) {
            return;
        }

        const listItems = users.map((user) => {
            return (
                <li className="users__item" key={user.email}>
                    <img className="users__avatar" src={user.picture.large} />
                    <p className="users__name">{`${user.name.first} ${user.name.last}`}</p>
                    <p>{`${user.dob.age} years old`}</p>
                </li>
            )
        });

        return (
            <ul className="users__list">
                {listItems}
            </ul>
        )
    }

    render() {
        const users = this.displayUsers();
        return (
            <div className="users">
                <h1>Users</h1>
                <button onClick={this.getUsers}>Get Users</button>
                {users}
            </div>
        )
    }
}