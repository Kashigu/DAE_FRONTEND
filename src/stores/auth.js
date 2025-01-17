import api from '/src/api/api.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const token = ref('');
    const user = ref(null);
    const isLoggedIn = ref(false);

    const checkValue = (value) => {
        /*
        should get a json like this:
            {
                "username": "string",
                "password": "string"
            }
        */
        if (typeof value !== 'object' || value === null) {
            return false;
        }

        const { username, password } = value;

        return typeof username === 'string' && typeof password === 'string';
    };

    const login = async (credentials) => {
        if (!checkValue(credentials)) {
            throw new Error('Invalid credentials');
        }
        const response = await api.post('auth/login', credentials, {
            responseType: 'text',
        });
        const tokenValue = response.data;
        if(!tokenValue){
            throw new Error('Invalid credentials');
        }
        token.value = tokenValue;
        api.defaults.headers.common = {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        isLoggedIn.value = true;
        await getUser();
    };

    const getUser = async () => {
        const response = await api.get('auth/user', {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });
        user.value = response.data;
    }

    const logout = () => {
        token.value = '';
        user.value = null;
        isLoggedIn.value = false;
    }

    return {
        token,
        user,
        isLoggedIn,
        login,
        logout,
    };
});
