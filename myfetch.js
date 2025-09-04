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

const makeGetRequest = async () => {
    try {
       
        const response = await fetch('http://localhost:3000/api/v1/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
                // Add any other headers you need, like authorization
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};

// makeGetRequest();