package sfcs.bkfoodcourt.src.module.myorder;

import android.widget.TextView;

import sfcs.bkfoodcourt.src.model.OrderProvisional;

public interface IOnClickCart {
    void increase(OrderProvisional orderProvisional, TextView numberCart);
    void reduce(OrderProvisional orderProvisional, TextView numberCart);
}
