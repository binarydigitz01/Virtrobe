package com.manipalhash.virtrobe.api;

import android.content.Context;
import android.os.AsyncTask;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.manipalhash.virtrobe.ui.register.UserModel;}

public class RegisterAPI {
    public final String URL = BaseAPI.API_ENDPOINT + "/api/register";
    private RequestQueue queue;

    public RegisterAPI(Context context){
        queue = Volley.newRequestQueue(context);
    }

    public void register(UserModel um){
//        StringRequest req = new StringRequest(Request.Method.POST, URL
//                });
    }
}
