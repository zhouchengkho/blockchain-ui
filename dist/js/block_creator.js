$(function() {

    let lastTransactionIndex = 0;

    function createNewTransaction() {
        const lastElement = $(`#transaction-${lastTransactionIndex}`);
        lastTransactionIndex++;
        const html = `<div class="col-md-4" id="transaction-${lastTransactionIndex}">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Transaction</h5>
                            <div class="row mb-3 align-items-center">
                                <div class="col-lg-4 col-md-12 text-right">
                                    <span>From</span>
                                </div>
                                <div class="col-lg-8 col-md-12">
                                    <input type="text" data-toggle="tooltip" class="form-control" id="transaction-from-${lastTransactionIndex}" placeholder="From" required>
                                </div>
                            </div>
                            <div class="row mb-3 align-items-center">
                                <div class="col-lg-4 col-md-12 text-right">
                                    <span>To</span>
                                </div>
                                <div class="col-lg-8 col-md-12">
                                    <input type="text" data-toggle="tooltip" class="form-control" id="transaction-to-${lastTransactionIndex}" placeholder="To" required>
                                </div>
                            </div>
                            <div class="row mb-3 align-items-center">
                                <div class="col-lg-4 col-md-12 text-right">
                                    <span>Amount</span>
                                </div>
                                <div class="col-lg-8 col-md-12">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Amount" id="transaction-amount-${lastTransactionIndex}" aria-label="Recipient 's username" aria-describedby="basic-addon2">
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="basic-addon2">$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
        lastElement.after(html);
    }

    function removeLastTransaction() {
        if (lastTransactionIndex - 1 >= 0) {
            $(`#transaction-${lastTransactionIndex}`).remove();
            lastTransactionIndex--;
        }
    }

    function createBlock() {
        let clientId = $('#client-id').val();
        console.log(clientId);
        if (clientId === 'Choose Client') {
            console.log('missing client id');
            return;
        }
        let transactions = [];
        for (let i = 0; i <= lastTransactionIndex; i++) {
            const transaction = {
                From: $(`#transaction-from-${i}`).val(),
                To: $(`#transaction-to-${i}`).val(),
                Amount: $(`#transaction-amount-${i}`).val(),
            }
            if (!transaction.From || !transaction.To || !transaction.Amount) {
                console.log('missing value');
                return;
            }
            transaction.Amount = parseFloat(transaction.Amount);
            transactions.push(transaction);
        }
        const block = {
            Transactions: transactions
        };
        $.ajax({
            url: `http://127.0.0.1:3000/client/${clientId}/block`,
            method: 'POST',
            data: JSON.stringify(block),
            success: function(result) {
                console.log(result);
                window.location = '/blockchain-UI/html/ltr/index.html'
            },
            error: function(err) {
                console.log(err);
            }
        })

    }

    $('#create-new-transaction').on('click', createNewTransaction);

    $('#remove-last-transaction').on('click', removeLastTransaction);

    $('#create-block').on('click', createBlock);


})