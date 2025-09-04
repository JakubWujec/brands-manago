const signupUser = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: "admin1",
                password: "admin1",
                email: "admin@admin.admin",
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

const signInUser = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: "admin1",
                password: "admin1",
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

const makeGetRequest = async (token) => {
    try {
        const searchParams = new URLSearchParams({
            minWorth: 250,
        })

        const response = await fetch('http://localhost:3000/api/v1/orders?' + searchParams, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};
// signInUser();
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yjk2MDZkYjUyODg4MThkMzEwZjI1NyIsImlhdCI6MTc1Njk4NzQyMSwiZXhwIjoxNzU3MDczODIxfQ.d5pAxlMeNm9CQtVD6nKp_n65rEz7XQVp1-6cUXCSorE'
makeGetRequest(token);