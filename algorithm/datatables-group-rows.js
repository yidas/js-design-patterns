/** 
 * Group by a same attribute for table rows (Demo code) 
 *
 * This algorithm will group each row ordinally until next row with different 
 * attribute, so the rows most sort by the same attribute for group by.
 *
 * @author Nick Tsai <myintaer@gmail.com>
 */

if (res.code!==200 || !res.data) {

    return;
}

try {

    var groupData = [];
    var lastHash;
    var lastHeadRow;
    var count = 0;

    // GroupData process 
    $.each(res.data, function(key, row) {

        // Row basic features
        row.edit = '<i class="fa fa-pencil font-size_16 btn-edit" data-id="'+row.id+'"></i>';
        row.delete = '<i class="fa fa-trash font-size_16 btn-delete" data-id="'+row.id+'"></i>';

        var hash = row.u_id+ '_'+  row.category;

        if (lastHash===hash) {

            count++;

            // Check new head exist
            if (!lastHeadRow) {
                // console.log('Create a new head')

                // Assign object reference
                lastHeadRow = groupData[groupData.length-1]

                // Clone head obj to next row
                var lastNewRow = JSON.parse(JSON.stringify(lastHeadRow));
                groupData.push(lastNewRow);
                count++;

                // Head row features
                lastHeadRow.edit = '';
                lastHeadRow.delete = '';
                // For display the number of sub rows of a group
                lastHeadRow.groupTitle = lastHeadRow.category_title;
        
            }

            // Head row features
            lastHeadRow.category_title = lastHeadRow.groupTitle+ ' Total:'+ count;

            // Sum up to head
            var sumKeys = [
                'amount_a', 
                'amount_b',
                'amount_c', 
                'amount_d',
                'amount_e'
                ];
            $.each(sumKeys, function(key, sumKey) {
                // console.log(sumKey)
                lastHeadRow[sumKey] = parseInt(lastHeadRow[sumKey]) + parseInt(row[sumKey]);
            });

        } else {

            // Unset lastHeadRow
            lastHeadRow = null;
            count = 0;
        }

        lastHash = hash;

        groupData.push(row);
    });

    // Render   
    $.each(groupData, function(key, row) {

        // Add row
        datatable.row.add( [
            row.edit,
            row.delete,
            row.user,
            row.category_title,
            row.amount_a,
            row.amount_b,
            row.amount_c,
            row.amount_d,
            row.amount_e,
        ] ).draw();
    });

} catch(e) {
    
    console.log(e)
}
