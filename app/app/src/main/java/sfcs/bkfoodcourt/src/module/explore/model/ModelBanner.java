package sfcs.bkfoodcourt.src.module.explore.model;

import android.util.Log;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import sfcs.bkfoodcourt.src.model.BaseResponse;
import sfcs.bkfoodcourt.src.model.Images;
import sfcs.bkfoodcourt.src.module.explore.presenter.PresenterBanner;
import sfcs.bkfoodcourt.src.network.APIVnFood;
import sfcs.bkfoodcourt.src.network.EndPoint;
import sfcs.bkfoodcourt.src.network.IApiVnFood;

public class ModelBanner {
    public void getBanner(PresenterBanner presenterBanner){
        IApiVnFood apiService = APIVnFood.getAPIVnFood().create(IApiVnFood.class);
        apiService.getBanner().enqueue(new Callback<BaseResponse<List<Images>>>() {
            @Override
            public void onResponse(Call<BaseResponse<List<Images>>> call, Response<BaseResponse<List<Images>>> response) {

                Log.d("sfcs", "onResponse: c" + response.code() );
                if(response.isSuccessful()){
                    String[] list = new String[response.body().getData().size()];
                    for(int i = 0; i < response.body().getData().size(); i++){
                        list[i] = EndPoint.BASE_URL_PUBLIC + response.body().getData().get(i).getUrl();
                    }
                    presenterBanner.resultGetBanner(true, list,"");
                }else {
                    presenterBanner.resultGetBanner(false, null,"" + response.code());

                }
            }

            @Override
            public void onFailure(Call<BaseResponse<List<Images>>> call, Throwable t) {
                presenterBanner.resultGetBanner(false, null,t.getMessage());

            }
        });
    }
}

