const APIUtil = {
  followUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: 'POST',
      dataType: 'JSON'
    });
  },

  unfollowUser: id =>{
    return $.ajax({
      url: `/users/${id}/follow`,
      method: 'DELETE',
      dataType: 'JSON'
    });
  },

  searchUsers: (queryVal) =>{
      return $.ajax({
        url: '/users/search',
        dataType: 'JSON',
        data: queryVal
      });
  }
};



module.exports = APIUtil;
