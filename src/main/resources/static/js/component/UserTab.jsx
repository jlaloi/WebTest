import React from 'react';
import Http from './../http.jsx';

const User = (props) => (
    <li>
        <b>{props.user.id}</b> {props.user.name}
        <a onClick={() => props.deleteUser(props.user)} title="Delete">
            <img src={require('../../img/delete.png')} alt="delete" />
        </a>
    </li>
);

const UserCreate = (props) => {
    let input
    return (
        <div>
            <input type="text" ref={node => { input = node }} placeholder="Name" />
            <input type="button" value="Create" onClick={() => props.createUser({ 'name': input.value })} />
        </div>
    )
};

class UserTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        // @TODO Find a proper fix or back to React.createClass
        this.createUser = this.createUser.bind(this);
        this.loadUsersFromServer = this.loadUsersFromServer.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    componentDidMount() {
        this.loadUsersFromServer();
    }
    loadUsersFromServer() {
        Http.get('/tatane')
            .then(response => response.json())
            .then(json => this.setState({ users: json }))
    }
    createUser(user) {
        Http.post('/tatane', user)
            .then(this.loadUsersFromServer)
    }
    deleteUser(user) {
        Http.delete('/tatane/' + user.id)
            .then(this.loadUsersFromServer)
    }
    render() {
        var users = this.state.users.map((user) => (<User key={user.id} user={user} deleteUser={this.deleteUser} />));
        return (
            <div>
                <h2>This is the user tab!</h2>
                <ul>
                    {users}
                </ul>
                <UserCreate createUser={this.createUser} />
            </div>
        );
    }
}

export default UserTab;
