$(document).ready(function(){
    $('#input-search').keyup(function(){
        var searchString = $(this).val().toLowerCase();
        $('.block').hide();
        $('.block').each(function(index, value) {
            console.log(searchString);
            var name = $(this).find('.name-food').text().toLowerCase();
            console.log(name);
            if(name.search(searchString)!=-1){
                $(this).show();
            }
        })
    });
    $('.add-to-card').click(function(){
        var name = $(this).siblings('h3')[0];
        var id = $(this).data('id');
        $.post('/order',{id: id},function(data){
            if(!data.user){
                location.replace("/login");
                return;
            }
            alert($(name).text()+" được thêm vào giỏ hàng !!!");
            if(!$('li.nav-item.cart a').has($('.bag.d-flex.justify-content-center.align-items-center')).length){
                $('li.nav-item.cart a').append('<span class="bag d-flex justify-content-center align-items-center"></span>');
            };
            $('li.nav-item.cart a .bag.d-flex.justify-content-center.align-items-center').empty();
            $('li.nav-item.cart a .bag.d-flex.justify-content-center.align-items-center').append('<small>'+data.newOrder+'</small>')
        });
    });
})