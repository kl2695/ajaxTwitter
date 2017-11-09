/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);

$( ()=> {
  $('.toggle-button').each( (index, el)=> {
      new FollowToggle($(el));
  });

  new UsersSearch($('.users-search'));






  }
);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map