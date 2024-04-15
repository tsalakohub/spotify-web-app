export const authEndpoint = "https://accounts.spotify.com/authorize"
const redirectUri = "http://localhost:3000/"
const clientId = "06f2477dbd454e0c970453b3f1bf503d"
const accessToken = "#access_token=BQB-m-TIBVSAmDMSd-9McUNWUHLbqCKzO5BBm8hujzB8cspERR4Yrf_FE7a2Q-NqMgIVmY1txhT2l1hctH7VM3kRoWag8tg5K0q5j_VPXDh7zD6IhpSLIcZyBqAoqBiZ92zkkRLM0BSEBctc68H-nGQuXEg0ynfTDsJVMfqP7IwSSdAw_7ljEb4h_IwoLClPax6PVGLYp2QsKA&token_type=Bearer&expires_in=3600"


const scopes =  [
    "ugc-image-upload",
    "user-modify-playback-state",
    "playlist-read-private",
    "user-read-playback-position",
    "user-library-modify"
]

export const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&') // Split the fragment into key-value pairs.
        .reduce((initial, item) => {
            let parts = item.split('=');
            if (parts[0] === 'access_token') {
                // Redirect to "grid.js" after token retrieval
                const redirectUrl = "/grid.js"; // URL of the page to redirect to
                window.location.href = redirectUrl; // Redirect the user
                return parts[1]; // Return only the access token
            }
            return initial;
        }, '');
}