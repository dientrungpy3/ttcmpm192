package sfcs.bkfoodcourt.src.module.register.presenter;

import sfcs.bkfoodcourt.src.model.User;
import sfcs.bkfoodcourt.src.module.register.model.ModelRegister;
import sfcs.bkfoodcourt.src.module.register.view.IViewRegister;

public class PresenterRegister implements IPresenterRegister {
    IViewRegister iViewRegister;
    ModelRegister modelRegister;

    public PresenterRegister(IViewRegister iViewRegister) {
        this.iViewRegister = iViewRegister;
        modelRegister = new ModelRegister();
    }

    @Override
    public void handlerRegister(User user) {
        modelRegister.register(user,this);
    }

    @Override
    public void resultRegister(boolean success, String msg) {
        if(success){
            iViewRegister.onSuccess();
        }else {
            iViewRegister.onFailed(msg);

        }
    }
}
