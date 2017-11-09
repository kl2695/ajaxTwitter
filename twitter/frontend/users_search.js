const APIUtil = require('./api_util.js');

class UsersSearch{

  constructor($el){
    this.$el = $el;
    this.$input = $el.children().find('input');
    this.$ul = $el.find('.users');
    this.$el.on("input", this.handleInput.bind(this));
  }

  handleInput(event){
    const queryVal = $(event.target).serialize();
    APIUtil.searchUsers(queryVal).then(this.renderResults.bind(this));
  }

  renderResults(json) {
    this.$ul.children().remove();
    console.log(json);
    let that = this;


    json.forEach((user) => {
      const $li = $('<li></li>');
      $li.text(user.username);
      that.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
