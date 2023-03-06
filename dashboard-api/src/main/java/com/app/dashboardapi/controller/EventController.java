package com.app.dashboardapi.controller;

import com.app.dashboardapi.model.EventMessage;
import com.app.dashboardapi.service.EventService;
import com.app.dashboardapi.utils.MessageResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.app.dashboardapi.utils.apiUrl.SEND_MESSAGE;

@ResponseBody
@RestController
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService ddmService;

    @PostMapping(path = SEND_MESSAGE)
    public ResponseEntity<MessageResponse> sendDashboardDataMessage(@RequestBody EventMessage message,
            HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        ddmService.sendEvent(message);
        message.setUserAgent(userAgent);
        return ResponseEntity.ok(new MessageResponse("Good"));
    }

}
