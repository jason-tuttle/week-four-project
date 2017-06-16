(function() {
  const CLIENT_ID = "8538a1744a7fdaa59981232897501e04";
  const CLIENT_ID2 = "095fe1dcd09eb3d0e1d3d89c76f5618f";
  const baseURL = 'https://api.soundcloud.com';

  const audioPlayerBaseURL = "https://w.soundcloud.com/player/"
  const audioPlayerURLOptions = "&color=ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"
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
  results.addEventListener('click', function(e) {
    console.log(e);
    getAudioFile(e);
  });
  // the widget
  var widgetIframe = document.getElementById('sc-widget');
  var widget = SC.Widget(widgetIframe);

  // 2. Create your `onSubmit` event for getting the user's search term
  doSearch.addEventListener("click", function() {
    event.preventDefault(); // this is to prevent page reloads when form submits
    console.log("I don't think I'm running...");
    performSearch();
    searchText.value = "";
    searchText.blur();
  });

  // 3. Create your `fetch` request that is called after a submission
  function performSearch() {
    const term = searchText.value;
    let searchURL = baseURL + '/tracks?client_id=' + CLIENT_ID;
    const searchObj = {}; // need an object to set search params
      searchObj.q = term;
      searchObj.limit = 25;
    // console.log(searchURL, searchObj);
    SC.get('/tracks', searchObj)  // perform the search with SC.get method
      .then(response => processResponse(response)); // and process the response
  }

  // 4. Create a way to append the fetch results to your page
  // NEED PROPERTIES:
  // artwork_url:
  // stream_url:
  // user.username:
  // title:
  function processResponse(tracks) {
    if(results.hasChildNodes()) {
      while (results.firstChild) {
        results.removeChild(results.firstChild);
      }
    }
    tracks.forEach(function(track) {
      let trackBox = document.createElement('div'); // container for track info
      trackBox.classList.add('track');  // class for styling
      trackBox.setAttribute('data-track-url', track.uri); // grab url for sending to player widget
      let trackImg = document.createElement('img');
      if (track.artwork_url) {
        trackImg.setAttribute('src', track.artwork_url);  // use track img if available
      } else {
        trackImg.setAttribute('src', 'images/record_blank.jpeg'); // default if not
      }
      let trackArtist = document.createElement('p');
      trackArtist.classList.add('artist-name'); // want to style artist name apart from track name
      trackArtist.textContent = track.user.username;
      let trackTitle = document.createElement('p');
      trackTitle.classList.add('track-title');
      trackTitle.textContent = track.title;
      trackBox.appendChild(trackImg);     // append all of the info
      trackBox.appendChild(trackTitle);   // as children of the div
      trackBox.appendChild(trackArtist);  // container element,
      results.appendChild(trackBox);      // and add to results container
    });
  }

  // 5. Create a way to listen for a click that will play the song in the audio play
  function getAudioFile(event) {
    const audioURL = event.target.parentElement.dataset.trackUrl;
    widget.load(audioURL);
  }




})();
