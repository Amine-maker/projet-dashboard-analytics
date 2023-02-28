package com.app.dashboardapi.service;

import com.app.dashboardapi.model.Greeting;
import org.springframework.stereotype.Service;

@Service
public class GreetingService {
    // code métier
    public Greeting sayHello(long counter, String message) {
        return new Greeting(counter, message);
    }
}
