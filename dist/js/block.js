$(function() {

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }


    const clientIndex = getUrlVars().client;
    const blockIndex = getUrlVars().index;
    const url = 'http://127.0.0.1:3000/client/' + clientIndex + '/block/' + blockIndex;

    $.ajax({
        url: url,
        method: 'GET',
        // dataType: 'jsonp',
        // contentType: 'application/json',
        success: function(data) {
            updateTable(JSON.parse(data));
        },
        error: function(err) {
            console.log(err);
        }
    });

    function updateTable(data) {
        let html = '';
        const transactions = data[0].BlockData.Transactions;
        for (let i in transactions) {
            html += (`<tr>
                        <td>${transactions[i].From}</td>
                        <td>${transactions[i].To}</td>
                        <td>${transactions[i].Amount}</td>
                    </tr>`);
        }
        $('#transaction-body').html(html);
    }

})