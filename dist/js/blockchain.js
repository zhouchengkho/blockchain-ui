$(function() {

    function localTimeFormat() {
        const now = new Date();
        const offsetMs = now.getTimezoneOffset() * 60 * 1000;
        const dateLocal = new Date(now.getTime() - offsetMs);
        return dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    }

    function updateDashboard(index, data) {
        const now = localTimeFormat();
        let html = `<span class="text-muted float-right">Last Updated: ${now}</span>`
                        // <button type="button" class="btn btn-cyan btn-sm btn-sq">Edit</button>
                        // <button type="button" class="btn btn-success btn-sm btn-sq">Publish</button>
                        // <button type="button" class="btn btn-danger btn-sm btn-sq">Delete</button>`
        let classes = ["btn btn-cyan btn-sm btn-sq", "btn btn-success btn-sm btn-sq", "btn btn-danger btn-sm btn-sq", "btn btn-warning btn-sm btn-sq"];
        let classIndex = 0;
        for (const i in data) {
            const blockInfo = data[i];
            const clientIndex = index;
            const clickInfo = `window.open('/blockchain-UI/html/ltr/block.html?client=${clientIndex}&index=${parseInt(blockInfo.Index)}')`;
            html += `<button type="button" class="${classes[classIndex]}" onclick="${clickInfo}">Block ${parseInt(i) + 1}</button>`;
            classIndex = (classIndex + 1) % classes.length;
        }
        $(`#server${index + 1}-chain-info`).html(html);
    }

    function refreshServer(index) {
        // console.log('refreshing server ' + index);
        const limit = -100;
        const url = 'http://127.0.0.1:3000/client/' + index + '/block/' + limit;
        $.ajax({
            url: url,
            method: 'GET',
            // dataType: 'jsonp',
            // contentType: 'application/json',
            success: function(data) {
                console.log(data);
                if (data === '') return;
                updateDashboard(index, JSON.parse(data));
            },
            error: function(err) {
                console.log(err);
            },
            timeout: 5000
        })
    }

    setInterval(function() {
        for (let i = 0; i < 5; i++) {
            refreshServer(i);
        }
    }, 5000);

})