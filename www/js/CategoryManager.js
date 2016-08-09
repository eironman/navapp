var CategoryManager = {
  categories: [],

  getTopLevelIds: function()
  {
    var result = [];
    for (var key in this.categories) {
      if (this.categories.hasOwnProperty(key)) {
        if (this.categories[key].parent === 0) {
          result.push(this.categories[key].id);
        }
      }
    }
    return result;
  },

  getCategory: function (id)
  {
    for (var key in this.categories) {
      if (this.categories.hasOwnProperty(key)) {
        if (this.categories[key].id == id) {
          return this.categories[key];
        }
      }
    }

    return null;
  },

  getParentOf: function (id)
  {
    for (var key in this.categories) {
      if (this.categories.hasOwnProperty(key)) {
        if (Helper.arrayContains(this.categories[key].children, id)) {
          return this.categories[key];
        }
      }
    }

    return null;
  }
};