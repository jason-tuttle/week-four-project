# SoundCloud Music Search

SoundCloud keys:
- 8538a1744a7fdaa59981232897501e04
- 095fe1dcd09eb3d0e1d3d89c76f5618f

```javascript
SC.initialize({
  client_id: 'YOUR_CLIENT_ID'
});

// find all sounds of buskers licensed under 'creative commons share alike'
SC.get('/tracks', {
  q: 'buskers'
}).then(function(tracks) {
  console.log(tracks);
});
```
