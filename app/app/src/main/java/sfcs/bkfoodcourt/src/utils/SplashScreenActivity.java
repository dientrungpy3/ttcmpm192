package sfcs.bkfoodcourt.src.utils;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;

import sfcs.bkfoodcourt.NavigationActivity;
import sfcs.bkfoodcourt.R;
import sfcs.bkfoodcourt.src.module.login.view.LoginActivity;

public class SplashScreenActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN);

        setContentView(R.layout.activity_splash_screen);
//        APIVnFood.init(getApplicationContext());
        SharedPreferences pref = getSharedPreferences("User", MODE_PRIVATE);
        String token = pref.getString("token", null);
        findViewById(R.id.btnLoginSplash).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                findViewById(R.id.btnLoginSplash).setClickable(false);
                if (token != null) {
                    startActivity(new Intent(SplashScreenActivity.this, NavigationActivity.class));
                } else {
                    startActivity(new Intent(SplashScreenActivity.this, LoginActivity.class));
                }
                finish();


            }
        });
    }
}
