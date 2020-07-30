package sfcs.bkfoodcourt.src.module.explore.presenter;

import sfcs.bkfoodcourt.src.module.explore.model.ModelBanner;

public class PresenterBanner implements IBanner.IPresenterBanner{
    IBanner.IViewBanner iViewBanner;
    ModelBanner modelBanner;

    public PresenterBanner(IBanner.IViewBanner iViewBanner) {
        this.iViewBanner = iViewBanner;
        modelBanner = new ModelBanner();
    }

    @Override
    public void getBanner() {
        modelBanner.getBanner(this);
    }

    @Override
    public void resultGetBanner(boolean success, String[] listBanner,String msg) {
        if(success){
            iViewBanner.onSuccessGetBanner(listBanner);
        }else {
            iViewBanner.onFailGetBanner(msg);
        }
    }
}
