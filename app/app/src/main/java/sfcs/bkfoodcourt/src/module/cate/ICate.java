package sfcs.bkfoodcourt.src.module.cate;

import java.util.List;

import sfcs.bkfoodcourt.src.model.Cate;
import sfcs.bkfoodcourt.src.model.Product;

public interface ICate {
    interface IPresenterCate{
        void getListCate();
        void resultGetListCate(boolean success,List<Cate> cateList,String msg);

        void getProductForCate(String cateId);
        void resultGetProductForCate(boolean success, List<Product> productList, String msg);
    }
    interface IViewCate{
        void onGetListSuccess(List<Cate> cateList);
        void onGetListFailed(String msg);
    }
    interface IViewProductForCate{
        void onGetListProductSuccess(List<Product> productList);
        void onGetListProductFailed(String msg);
    }
    interface IOnClick{
        void onClickGetProductForCate(String cateId,String cateName);
    }
}
