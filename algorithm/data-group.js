// AJAX response sample
var res.data = [{'id':1, 'category': 'a'}, {'id':2, 'category': 'a'}, {'id':3, 'category': 'b'}];

var dataTree = {};

$.each(res.data, function(key, row) {

  var hashKey = row.id+ '_'+  row.category;

  if (Array.isArray(dataTree[hashKey])) {

    dataTree[hashKey].push(row);

  } else {

    dataTree[hashKey] = [row];
  }
});

console.log(dataTree)
