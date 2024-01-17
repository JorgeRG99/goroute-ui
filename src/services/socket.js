import Echo from "laravel-echo"
import Pusher from 'pusher-js'

window.Pusher = Pusher

export function createSocketConnection(token) {
    if (!window.Echo) {
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: '3yQmygRcoJJEvvkqXlsFYvBk8Nc7PnCG',
            cluster: 'mt1',
            wsHost: '127.0.0.1',
            wsPort: 6001,
            disableStats: true,
            forceTLS: false,
            authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
            auth: {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
            namespace: 'App.Events',
            encrypted: "true"
        });
    }
}