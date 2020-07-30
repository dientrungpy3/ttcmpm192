$(document).ready(function(){
    var sumCost = $('.total-price').text().split(',').join('');
    function updateFood(){
        var idFoods = [];
        var quantities = [];
        $('.delete-food').each(function(){
            idFoods.push($(this).attr('data-id'));
        });
        $('.quantity input').each(function(){
            quantities.push(parseInt($(this).val()));
        });

        var stringFoods = "";
        for(let i = 0; i < quantities.length; i++){
            for(let j = 0; j < quantities[i]; j++){
                stringFoods = stringFoods + idFoods[i] + ",";
            }
        }
        stringFoods = stringFoods.substring(0, stringFoods.length - 1);
        $.post('/cart',{stringFoods:stringFoods});
    }
    $('.delete-food').click(function(){
        $(this).closest('tr').remove();
        var sum = 0;
        $('.total').each(function(index, value){
            sum+=parseInt($(this).text());
        });
        sumCost = sum;
        var sumString = sum.toString() + ',000';
        $('.sub-total').text(sumString);
        $('.total-price').text(sumString);
        updateFood();
    });
    $('input.quantity').on('input',function(){
        var total = $(this).closest('td.quantity').siblings('.total')[0];
        var price = $(this).closest('td.quantity').siblings('.price')[0];
        var totalInt = parseInt($(price).text())*parseInt($(this).val());
        console.log($(price).text());
        $(total).text(totalInt.toString()+',000');

        var sum = 0;
        $('.total').each(function(index, value){
            sum+=parseInt($(this).text());
        });
        sumCost = sum;
        var sumString = sum.toString() + ',000';
        $('.sub-total').text(sumString);
        $('.total-price').text(sumString);
        updateFood();
    });
    $('#btn-pay').click(function() {
        if(+sumCost>0){
            $.post('/payment',{cost: sumCost}, function(data){
                if(data){
                    location.reload();
                    location.replace(data);
                }
            })
        }
        else{
            alert("Vui lòng chọn món trước khi thanh toán !!!");
        }
    })
})