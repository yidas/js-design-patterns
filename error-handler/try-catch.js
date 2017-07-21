try {

    // Couldn't prevent `the property of undefined` error
    if (!viewData.Root.rows) {
        return;
    }

    $.each(viewData.Root.rows, function(key, row){

        // Code..
    });

} catch(e) {

    console.log(e.message);
}