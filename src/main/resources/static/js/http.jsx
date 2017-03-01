import Fetch from 'whatwg-fetch';

const http = {
    checkStatus: function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    },
    get: function (url) {
        return fetch(url, {
            credentials: 'include'
        })
            .then(this.checkStatus)
    },
    post: function (url, data) {
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(this.checkStatus)
    },
    delete: function (url) {
        return fetch(url,
            {
                method: 'DELETE',
                credentials: 'include'
            })
            .then(this.checkStatus)
    }
};

export default http