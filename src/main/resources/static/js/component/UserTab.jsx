import React from 'react';
import Http from './../http.jsx';

const User = React.createClass({
    delete() {
        this.props.deleteUser(this.props.user);
    },
    render() {
        return (
            <li>
                <b>{this.props.user.id}</b> {this.props.user.name}
                <a onClick={this.delete} title="Delete">
                    <img src={require('../../img/delete.png')} alt="delete" />
                </a>
            </li>
        );
    }
});

const UserCreate = React.createClass({
    getInitialState() {
        return { name: undefined };
    },
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    },
    create() {
        this.props.createUser({ 'name': this.state.name })
    },
    render() {
        return (
            <div>
                <input type="text" onChange={this.handleNameChange} placeholder="Name" />
                <input type="button" value="Create" onClick={this.create} />
            </div>
        );
    }
});

const UserTab = React.createClass({
    getInitialState() {
        return { users: [] };
    },
    componentDidMount() {
        this.loadUsersFromServer();
    },
    createUser(user) {
        Http.post(
            '/tatane',
            user
        )
            .then(this.loadUsersFromServer)
    },
    deleteUser(user) {
        Http.delete(
            '/tatane/' + user.id
        )
            .then(this.loadUsersFromServer)
    },
    loadUsersFromServer() {
        Http.get('/tatane')
            .then(json => this.setState({ users: json }))
    },
    render() {
        var users = this.state.users.map(function (user) {
            return (<User key={user.id} user={user} deleteUser={this.deleteUser} />);
        }.bind(this));
        return (
            <div>
                <h2>This is the user tab! </h2>
                <ul>
                    {users}
                </ul>
                <UserCreate createUser={this.createUser} />
            </div>
        );
    }
});

export default UserTab;
