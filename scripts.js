var shopcart = [];
            $(document).ready(function(){
				outputCart();
                
                $(".productitem").click(function(e){
                    e.preventDefault();
                    
                    var iteminfo = $(this.dataset)[0];
                    iteminfo.qty = 1;
                    var itemInCart = false;
                    
                    $.each(shopcart,function(index,value){
                        // console.log(index + ' ' + value.id);
                        if(value.id == iteminfo.id){
                            value.qty= parseInt(value.qty) + parseInt(iteminfo.qty);
                            itemInCart = true;
                        }
                    })
                    
                    if(!itemInCart){
                        shopcart.push(iteminfo);
                    }
                    sessionStorage["sc"] = JSON.stringify(shopcart);
                    outputCart();
                })
            
            function outputCart(){
                if(sessionStorage["sc"] != null){
                   shopcart = JSON.parse(sessionStorage["sc"].toString());
                   console.log(sessionStorage["sc"]);
                    $("#checkout-div").show();
                }
                var holderHTML = '';
                var total = 0;
                var itemCount = 0;
                $.each(shopcart,function(index,value){
                    console.log(value);
                    var subtotal = value.qty * value.price;
                    total += subtotal;
                    itemCount += parseInt(value.qty);
                    holderHTML += '<tr><td>'+value.qty + '</td><td>#' + value.id + ' ' + value.name + '(' + value.s + ')</td><td>'+ formatMoney(value.price) +'</td><td class="text-right">' +formatMoney(subtotal)+'</td></tr>';
                })
                holderHTML += '<tr><td colspan="3" class="text-right">Total</td><td class="text-right">'+formatMoney(total)+'</td></tr>';
                $("#output").html(holderHTML);
                $(".total").html(formatMoney(total));
                $(".items").html(itemCount);
                }
            function formatMoney(n){
                return '$' + (n/100).toFixed(2);
            }
            })