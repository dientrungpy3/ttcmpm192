package sfcs.bkfoodcourt.src.module.myorder;

import java.util.List;

import sfcs.bkfoodcourt.src.model.Gift;
import sfcs.bkfoodcourt.src.model.Order;
import sfcs.bkfoodcourt.src.model.OrderDetails;

public interface IOrder {
    interface IPresenterOrder{
        void addCartToServer(Order order,  List<OrderDetails> orderDetails);
        void resultAddCart(boolean result, String msg);


        void checkGift(String codeGift);
        void resultCheckGift(boolean result, Gift gift, String msg);


    }
    interface IViewOrder{
        void onSuccess(String msg);
        void onFailed(String msg);

        void onCheckGiftSuccess(Gift gift);
        void onCheckGiftFailed(String msg);
    }
}
