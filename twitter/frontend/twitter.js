const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$( ()=> {
  $('.toggle-button').each( (index, el)=> {
      new FollowToggle($(el));
  });

  new UsersSearch($('.users-search'));






  }
);
