var CategoryManager = {
  categories: [
    {
      id      : 0,
      parent  : null,
      name    : 'ÍNDICE',
      children: [1, 2, 3]
    },
    {
      id      : 1,
      parent  : 0,
      name    : 'CALIDAD',
      children: [4, 5, 6]
    },
    {
      id      : 2,
      parent  : 0,
      name    : 'SEGURIDAD',
      children: [7]
    },
    {
      id      : 3,
      parent  : 0,
      name    : 'LOGÍSTICA',
      children: [8]
    },
    {
      id      : 4,
      parent  : 1,
      name    : 'BLOQUE 1',
      children: [9, 10, 11]
    },
    {
      id      : 5,
      parent  : 1,
      name    : 'BLOQUE 2',
      children: []
    },
    {
      id      : 6,
      parent  : 1,
      name    : 'BLOQUE 3',
      children: []
    },
    {
      id      : 7,
      parent  : 2,
      name    : 'BLOQUE 1',
      children: []
    },
    {
      id      : 8,
      parent  : 3,
      name    : 'BLOQUE 1',
      children: []
    },
    {
      id      : 9,
      parent  : 4,
      name    : 'EVALUACIÓN PROVISIONISTAS',
      children: []
    },
    {
      id      : 10,
      parent  : 4,
      name    : 'UNIFORMIDAD E IMAGEN PERSONAL',
      children: []
    },
    {
      id      : 11,
      parent  : 4,
      name    : 'CONTROL DE LIMPIEZA EN CAMAROTES DE PASAJE',
      children: []
    }
  ],
  getTopLevelIds: function() {
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
  getCategory: function (id) {
    return this.categories[id];
  },
  getParentOf: function (id) {
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