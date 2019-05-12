let partitions = {
    Partition1: [],
    Partition2: [],
    Partition3: []
};


$(function() {

    $.ajax({
        url: `http://127.0.0.1:3000/partition?random=${Math.random() * 100000}`,
        method: 'GET',
        success: function(data) {
            console.log('what happened');
            console.log(data);
            partitions = JSON.parse(data);
            refreshPartition();
        }
    })

    $('#change-partition').on('click', function() {
        $.ajax({
            url: `http://127.0.0.1:3000/partition?random=${Math.random() * 100000}`,
            method: 'POST',
            data: JSON.stringify(partitions),
            success: function() {
                window.location.reload();
            }
        })
    })
})

function refreshPartition() {
    for (let i = 1; i <= 3; i++) {
        const partitionId = `partition-${i}`;
        let html = '';
        const partitionKey = `Partition${i}`;
        const servers = partitions[partitionKey];
        for (let i in servers) {
            const serverId = servers[i];
            html += `<button type="button" class="btn btn-cyan btn-sm btn-sq" style="margin: 5px" draggable="true"
                                ondragstart="drag(event)" id="server-${serverId}">Server ${serverId + 1}
                        </button>`
        }
        document.getElementById(partitionId).innerHTML = html;
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("serverId", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let serverId = ev.dataTransfer.getData("serverId");
    let partitionId = ev.target.id;
    let serverIdInt = parseInt(serverId[serverId.length - 1]);
    let partitionIdInt = parseInt(partitionId[partitionId.length - 1]);
    let appendPartitionKey = `Partition${partitionIdInt}`;
    for (const key in partitions) {
        partitions[key] = partitions[key].filter(function(value) {
            return value !== serverIdInt;
        })
    }
    partitions[appendPartitionKey].push(serverIdInt);
    refreshPartition();
    // ev.target.appendChild(document.getElementById(data));
}