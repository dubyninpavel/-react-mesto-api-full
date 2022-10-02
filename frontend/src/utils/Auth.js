export const BASE_URL = "https://api.project.mesto.russia.nomoredomains.icu";

export function register({ email, password }) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "password": password,
            "email": email 
        })
    })
    .then((res) => {
        try {
            if (res.ok){
                return res.json();
            }
        } catch(err) {
            return (err);
        }
    })
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
    });
}

export function authorize({ email, password }) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
    .then((res) => {
        try {
            if (res.ok){
                return res.json();
            }
        } catch(err) {
            return (err);
        }
    })
    .then((data) => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            return data;
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

export function getContent(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => {
        if (res.ok){
            return res.json();
        }
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.log(err);
    });
}