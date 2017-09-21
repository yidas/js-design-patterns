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
