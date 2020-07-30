package sfcs.bkfoodcourt.src.module.profile.presenter;

import java.io.File;

import okhttp3.MultipartBody;
import sfcs.bkfoodcourt.src.model.User;
import sfcs.bkfoodcourt.src.module.profile.model.ModelProfile;
import sfcs.bkfoodcourt.src.module.profile.view.IViewProfile;

public class PresenterProfile implements IPresenterProfile{
    private IViewProfile iViewProfile;
    private ModelProfile modelProfile;

    public PresenterProfile(IViewProfile iViewProfile) {
        this.iViewProfile = iViewProfile;
        modelProfile = new ModelProfile();
    }

    @Override
    public void getProfile() {
        modelProfile.profile(this);
    }

    @Override
    public void resultGetProfile(boolean success, User user,String msg) {
        if(success){
            iViewProfile.onSuccess(user);
        }else{
            iViewProfile.onFailed(msg);
        }
    }

    @Override
    public void uploadImage(MultipartBody.Part value) {
        modelProfile.uploadImageToServer(value);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        modelProfile.changePassword(oldPassword,newPassword,this);
    }

    @Override
    public void resultChangePassword(boolean success, String msg) {
        if(success){
            iViewProfile.onChangePasswordSuccess(msg);
        }else {
            iViewProfile.onChangePasswordFail(msg);
        }
    }


}
