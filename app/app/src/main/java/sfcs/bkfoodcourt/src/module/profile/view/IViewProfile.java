package sfcs.bkfoodcourt.src.module.profile.view;

import sfcs.bkfoodcourt.src.model.User;

public interface IViewProfile {
    void onSuccess(User user);
    void onFailed(String msg);

    void onChangePasswordSuccess(String msg);
    void onChangePasswordFail(String msg);
}
