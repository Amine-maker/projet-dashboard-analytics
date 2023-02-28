package com.app.dashboardapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dashboardapi.model.Greeting;
import com.app.dashboardapi.service.GreetingService;

@RestController
public class GreetingController {
    private static final String template = "Hello, %s";
    private final long counter = 0;

    @Autowired
    private GreetingService gService;

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "world") String name) {
        return gService.sayHello(counter, String.format(template, name));
    }
}
