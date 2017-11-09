const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor ($el) {
    this.$el = $el;
    this.userId = $el.data("user-id");
    this.followState = $el.data("initial-follow-state");
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
    this.disabled = false;
  }

  render(){
    if(this.followState === 'unfollowed'){
      this.$el.text("Follow");
      this.disabled = false;
    }else if (this.followState === 'followed'){
      this.$el.text("Unfollow");
      this.disabled = false;
    }else if (this.followState === 'following'){
      this.$el.text("following...");
      this.disabled = true;
    }else if (this.followState === 'unfollowing'){
      this.$el.text("unfollowing...");
      this.disabled = true;
    }
  }

  handleClick(event){
    event.preventDefault();

    if(this.disabled === false){
      if (this.followState === "unfollowed"){
        this.followState = "following";
        this.render();

        APIUtil.followUser(this.userId).then(() => {this.changeState('followed');}).then(this.render.bind(this));
      }else{
        this.followState = "unfollowing";
        this.render();
        APIUtil.unfollowUser(this.userId).then(() => {this.changeState('unfollowed');}).then(this.render.bind(this));
      }
    }
  }

  changeState(state){
    this.followState = state;
  }

}

module.exports = FollowToggle;
