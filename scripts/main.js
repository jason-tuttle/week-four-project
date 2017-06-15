(function() {
  const CLIENT_ID = "8538a1744a7fdaa59981232897501e04";
  const CLIENT_ID2 = "095fe1dcd09eb3d0e1d3d89c76f5618f";
  const baseURL = 'https://api.soundcloud.com';
  // initialize SoundCloud API with our client ID
  SC.initialize({
    client_id: CLIENT_ID
  });
  /*
    Here is a guide for the steps you could take:
  */

  // 1. First select and store the elements you'll be working with
  const musicPlayer = document.querySelector('.music-player');
  const searchText = document.querySelector('#search-text');
  const doSearch = document.querySelector('#search');
  const results = document.querySelector('.results');


  // 2. Create your `onSubmit` event for getting the user's search term
  doSearch.addEventListener("click", function() {
    event.preventDefault();
    performSearch(searchText.value);
  });

  // 3. Create your `fetch` request that is called after a submission
  function performSearch() {
    const term = searchText.value;
    let searchURL = baseURL + '/tracks?client_id=' + CLIENT_ID;
    const searchObj = {};
    searchObj.q = term;
    searchObj.limit = 25;
    console.log(searchURL, searchObj);
    SC.get('/tracks', searchObj)
      .then(response => processResponse(response)
    );

  }

  // 4. Create a way to append the fetch results to your page
  //artwork_url:
  //stream_url:
  //user.username:
  //title:
  function processResponse(tracks) {
    console.log(tracks);
    tracks.forEach(function(track) {
      console.log("I'm building a trackbox...");
      let trackBox = document.createElement('div');
      trackBox.classList.add('track');
      let trackImg = document.createElement('img');
      if (track.artwork_url) {
        trackImg.setAttribute('src', track.artwork_url);
      } else {
        trackImg.setAttribute('src', 'images/record_blank.jpeg');
      }
      let trackArtist = document.createElement('p');
      trackArtist.textContent = track.user.username;
      let trackTitle = document.createElement('p');
      trackTitle.textContent = track.title;
      trackBox.appendChild(trackImg);
      trackBox.appendChild(trackTitle);
      trackBox.appendChild(trackArtist);
      results.appendChild(trackBox);
    });
  }

  // 5. Create a way to listen for a click that will play the song in the audio play





})();
