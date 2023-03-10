let accessToken;
let clientId;
const redirectUri = 'http://localhost:3000/';
const baseUrl = 'https://api.spotify.com/v1';

const Spotify = {

    getAccessToken() {
        //Checks if an access token is already saved
        if(accessToken) return accessToken;
        //If not already saved, searches user's url for access token & token expiration time
        const spotifyUrl = window.location.href;
        const accessTokenMatch = spotifyUrl.match(/access_token=([^&]*)/);
        const expiresInMatch = spotifyUrl.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //clears the parameters & allows us to grab new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            //redirects user to Spotify login page
            const spotifyLogin = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location.href = spotifyLogin;
        }
    },

    search(term) {
        const accessToken = this.getAccessToken();
        //requests tracks that match search term
        return fetch(`${baseUrl}/search?type=track&q=${term}`,
            {headers: {
                Authorization: `Bearer ${accessToken}`
            }
        //parses response to JS object
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            //returns an array of track objects
            return jsonResponse.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlaylist(name, trackUris) {
        if(!name || !trackUris) return;
        const accessToken = this.getAccessToken();
        let userId;
        const headers = { Authorization: `Bearer ${accessToken}` }
        //requests user's Spotify profile
        return fetch(`${baseUrl}/me`, {headers: headers}
        //parses response to JS object
        ).then(response => response.json()
        ).then(jsonResponse => {
                userId = jsonResponse.id;
                //creates a new playlist in user's account
                return fetch(`${baseUrl}/users/${userId}/playlists`, 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                //parses response to JS object that represents the new (blank) playlist
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    //adds tracklist to playlist
                    return fetch(`${baseUrl}/users/${userId}/playlists/${playlistId}/tracks`,
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackUris})
                    })
                })
        })    
    }

}

export default Spotify;