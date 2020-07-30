package sfcs.bkfoodcourt.src.module.register.presenter;


import sfcs.bkfoodcourt.src.model.User;

public interface IPresenterRegister {
    void handlerRegister(User user);
    void resultRegister(boolean success, String msg);
}
