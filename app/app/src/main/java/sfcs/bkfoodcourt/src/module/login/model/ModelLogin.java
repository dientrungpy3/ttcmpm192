package sfcs.bkfoodcourt.src.module.login.model;

import android.util.Log;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import sfcs.bkfoodcourt.src.model.BaseResponse;
import sfcs.bkfoodcourt.src.model.ErrorResponse;
import sfcs.bkfoodcourt.src.model.User;
import sfcs.bkfoodcourt.src.module.login.presenter.PresenterLogin;
import sfcs.bkfoodcourt.src.network.APIVnFood;
import sfcs.bkfoodcourt.src.network.IApiVnFood;
import sfcs.bkfoodcourt.src.utils.ErrorUtils;

public class ModelLogin {
    public void loginUser(String email, String password, final PresenterLogin presenterLogin) {
        Log.d("sfcs", "loginUser: " + email);
        IApiVnFood apiService = APIVnFood.getAPIVnFood().create(IApiVnFood.class);
        Call<BaseResponse<User>> call = apiService.handlerLogin(email, password);
        call.enqueue(new Callback<BaseResponse<User>>() {
            @Override
            public void onResponse(@NotNull Call<BaseResponse<User>> call, @NotNull Response<BaseResponse<User>> response) {
                //success code >= 200 <= 300
                if (response.isSuccessful()) {
                    assert response.body() != null;
                    presenterLogin.resultLogin(true, response.body().getData().getToken());
                    Log.d("sfcs", "onResponse: " + response.body().getData().getToken());
                } else {
                    ErrorResponse err = ErrorUtils.parseError(response);
                    presenterLogin.resultLogin(false, err.getStatusCode() + " - " + err.getErr());
                }
            }
            @Override
            public void onFailure(@NotNull Call<BaseResponse<User>> call, @NotNull Throwable t) {
                presenterLogin.resultLogin(false,t.getMessage());
            }
        });
    }
}
