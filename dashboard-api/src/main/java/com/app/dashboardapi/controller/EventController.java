package com.app.dashboardapi.controller;

import com.app.dashboardapi.model.EventMessage;
import com.app.dashboardapi.service.EventService;
import com.app.dashboardapi.utils.MessageResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.app.dashboardapi.utils.apiUrl.SEND_MESSAGE;

@RestController
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService ddmService;

    @PostMapping(path = SEND_MESSAGE)
    public ResponseEntity<MessageResponse> sendEvent(@RequestBody EventMessage message,
                                                     HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");

        message.setUserAgent(userAgent);
        ddmService.sendEvent(message);
        return ResponseEntity.ok(new MessageResponse("Good"));
    }

    @GetMapping(path = "/api/event/getEvents")
    public ResponseEntity<List<EventMessage>> getEventsBySiteId(@RequestParam Long siteId) {
        List<EventMessage> events = ddmService.getAllEventBySiteId(siteId)
                .orElseThrow(() -> new UsernameNotFoundException("Aucun events pour ce site"));
        return ResponseEntity.ok(events);
    }
}
