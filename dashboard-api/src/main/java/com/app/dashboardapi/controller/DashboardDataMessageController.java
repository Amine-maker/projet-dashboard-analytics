package com.app.dashboardapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dashboardapi.model.DashboardDataMessage;
import com.app.dashboardapi.service.DashboardDataMessageService;
import static com.app.dashboardapi.utils.apiUrl.*;

@ResponseBody
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/")
public class DashboardDataMessageController {

    @Autowired
    private DashboardDataMessageService ddmService;

    @PostMapping(path = SEND_MESSAGE)
    public ResponseEntity<String> sendDashboardDataMessage(@RequestBody DashboardDataMessage message) {

        ddmService.sendMessage(message);
        return ResponseEntity.ok("good");
    }

}
