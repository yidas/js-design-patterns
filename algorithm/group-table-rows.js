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
        row.edit = '<center><i class="fa fa-pencil font-size_16 color_green Link btn-edit-modal" data-id="'+row.s_sn+'"></i></center>';
        row.delete = '<center><i class="fa fa-trash font-size_16 color_red Link btn-delete" data-id="'+row.s_sn+'"></i></center>';
        row.payment_belong = row.payment_belong_myear+ '/'+ row.payment_belong_month;

        var hash = row.u_sn+ '_'+  row.income_category;

        if (lastHash===hash) {

            count++;

            // Check new head exist
            if (!lastHeadRow) {
                console.log('Create a new head')

                // Assign object reference
                lastHeadRow = groupData[groupData.length-1]

                // Clone head obj to next row
                var lastNewRow = JSON.parse(JSON.stringify(lastHeadRow));
                groupData.push(lastNewRow);
                count++;

                // Head row features
                lastHeadRow.payment_date = '';
                lastHeadRow.payment_belong = '';
                lastHeadRow.edit = '';
                lastHeadRow.delete = '';
                // For display the number of sub rows of a group
                lastHeadRow.groupTitle = lastHeadRow.income_category_title;
        
            }

            // Head row features
            lastHeadRow.income_category_title = lastHeadRow.groupTitle+ ' 共計'+ count +'筆';
            lastHeadRow.payment_date = count;

            // Sum up to head
            var sumKeys = [
                'amount_self', 
                'amount_payment',
                'amount_tax', 
                'amount_2ndnhi',
                'amount_total'
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
            row.ins_setting,
            row.payment_date,
            row.payment_belong,
            row.income_category_title,
            '',
            row.amount_self,
            row.amount_payment,
            row.amount_tax,
            '',
            row.amount_2ndnhi,
            row.amount_total,
        ] ).draw();
    });

} catch(e) {
    
    console.log(e)
}