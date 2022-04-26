package com.blal;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // here
import zendesk.chat.Chat;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */


  @Override
  protected String getMainComponentName() {
    return "blal";
  }

@Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        Chat.INSTANCE.init(getApplicationContext(), "HiJ2rqAzU7barBEOJHFGWID9CF2bNwGs");
        super.onCreate(savedInstanceState);
    }
}
