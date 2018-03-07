const client_id = 'ee4071dd7e254750a540280a973cfd67';
const redirect_uri = 'http://foolish-system.surge.sh';

let accessToken ='';
let expiresIn = "";

let Spotify ={

  getAccessToken(){
  if(accessToken){
    return accessToken;
  } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {

    accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
        expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

        window.setTimeout(() => accessToken = '', expiresIn*1000);
        window.history.pushState('Access Token', null, '/');

        return accessToken;

  } else {
    let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        window.location = url;
  }
},

 search(term) {
         const accessToken = this.getAccessToken();
         return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
             headers: {
                 Authorization: `Bearer ${accessToken}`
             }
         }).then(response => {
             return response.json();
         }).then(jsonResponse => {
             if (!jsonResponse.tracks) {
                 return [];
             }
             return jsonResponse.tracks.items.map(track => ({
                 id: track.id,
                 name: track.name,
                 artist: track.artists[0].name,
                 album: track.album.name,
                 uri: track.uri
             }));
         });
     },



     savePlaylist(playlistName, trackURIs){
       if(!(playlistName&&trackURIs)){
         return;
       }
       const accessToken = this.getAccessToken();
       const headers = {
           Authorization: `Bearer ${accessToken}`
       };
       let user_id='';
       let playlistID='';

//De return voor fetch is verplicht, anders krijg je een foutmelding op then bij de call van Spotify.savePlaylist in App.js
       return fetch('https://api.spotify.com/v1/me', {
           headers: headers
       }).then(response => {
           return response.json();
       }).then(jsonResponse => { user_id=jsonResponse.id; console.log(user_id);
             fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,{
             method:'POST',
             headers: headers,
             body:JSON.stringify({name:playlistName})
           }).then(response => {
               return response.json();
             }).then(
               jsonResponse => { playlistID = jsonResponse.id; console.log(playlistID);
                    fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistID}/tracks`,{
                     method:'POST',
                     headers: headers,
                     body:JSON.stringify({"uris":trackURIs})
                   });
                 });
               });
       }
};


export default Spotify;
