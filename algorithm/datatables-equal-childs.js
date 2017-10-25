/** 
 * Make Datatables child rows equal to parent rows (Demo code) 
 *
 * This algorithm will process One-dimensional array data to Two-dimensional group by attributes 
 * to hash, then draws a Datatables with parent rows and child rows together as equal tr DOM.
 *
 * @author Nick Tsai <myintaer@gmail.com>
 */

// Datatables init
var datatable = $('#example').DataTable(); 

if (res.code!==200 || !res.data) {

    return;
}

try {

  var dataTree = {};

  // Data process
  $.each(res.data, function(key, row) {

    var hashKey = row.id+ '_'+  row.category;

    if (dataTree[hashKey]) {

      dataTree[hashKey].childs.push(row);

    } else {

      // New head with first child
      dataTree[hashKey] = {'childs': [row]};

      // Head data is cloned from first row
      dataTree[hashKey].data = JSON.parse(JSON.stringify(row));
    }
  });

  // Head sum up attr map
  var sumKeys = [
    'count_a', 
    'count_b',
    'count_c',
    'count_d',
    ];

  // Render   
  $.each(dataTree, function(key, head) {

    var childCount = 0;

    // Head count reset
    $.each(sumKeys, function(key, sumKey) {
      // console.log(sumKey)
      head.data[sumKey] = 0;
    });

    /* Head Childs Process */
    var childs = [];
    $.each(head.childs, function(key, row) {
      // Add row
      var childRow = $("<tr></tr>")
        .append('<td><i class="fa fa-pencil btn-edit" data-id="'+row.id+'"></i></td>')
        .append('<td><i class="fa fa-trash btn-delete" data-id="'+row.id+'"></i></td>')
        .append('<td>'+row.user+'</td>')
        .append('<td>'+row.category+'</td>')
        .append('<td>'+row.count_a+'</td>')
        .append('<td>'+row.count_b+'</td>')
        .append('<td>'+row.count_c+'</td>')
        .append('<td>'+row.count_d+'</td>')
        .append('<td>'+row.count_e+'</td>')
        .get(0);

      childs.push(childRow);
      childCount++;

      // Event binding
      bindEventAfterList($(childRow));

      /* Head Count */
      $.each(sumKeys, function(key, sumKey) {
        // console.log(sumKey)
        head.data[sumKey] = parseInt(head.data[sumKey]) + parseInt(row[sumKey]);
      });
    });

    /* Head Process */
    var headRow = datatable.row.add( [
      '<i class="fa btn-collapse fa fa-minus-square-o"></i>',
      '',
      head.data.user,
      head.data.category+ ' ('+ childCount+')',
      head.data.count_a,
      head.data.count_b,
      head.data.count_c,
      head.data.count_d,
      head.data.count_e,
    ] ).draw().node();

    // Build childs for a head
    datatable.row(headRow).child(childs);

    $(headRow).addClass('datatables-head');

    bindEventAfterList($(headRow));

    // List group collapse
    $(headRow).find('.btn-collapse').click();
  });

} catch(e) {

  console.log(e)
}

function bindEventAfterList($tr) {

  // List Child Rows Collapse
  $tr.find('.btn-collapse').click(function() {

    var groupID = $(this).parents('tr').attr('data-group-id');

    var isShowed = $(this).hasClass('fa-minus-square-o');

    var $groupRows = $(".group-row[data-group-id="+groupID+"]");
    
    if (isShowed) {

      $(this).removeClass('fa fa-minus-square-o');
      $(this).addClass('fa fa-plus-square-o');

      // Hide childs from Datatables
      datatable.row($(this).closest('tr')).child.hide();

    } else {

      $(this).removeClass('fa fa-plus-square-o');
      $(this).addClass('fa fa-minus-square-o');

      // Show childs from Datatables
      datatable.row($(this).closest('tr')).child.show();
    }
  });
}
