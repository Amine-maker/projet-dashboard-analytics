package com.app.dashboardapi.controller;

import com.app.dashboardapi.model.EventMessage;
import com.app.dashboardapi.service.EventService;
import com.app.dashboardapi.service.SiteService;
import com.app.dashboardapi.utils.MessageResponse;
import com.app.dashboardapi.utils.NotFoundException;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.app.dashboardapi.utils.apiUrl.*;

@RestController
@RequestMapping(EVENT_BASE)

@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService ddmService;

    @Autowired
    private SiteService siteService;

    @PostMapping()
    public ResponseEntity<MessageResponse> sendEvent(@RequestBody EventMessage message,
            HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        message.setUserAgent(userAgent);
        ddmService.sendEvent(message);
        return ResponseEntity.ok(new MessageResponse("Good"));
    }

    @GetMapping("/getEvents")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getEventsBySiteId(@RequestParam String siteId) {
        if (siteService.isSiteExist(siteId)) {
            List<EventMessage> events = ddmService.getAllEventBySiteId(siteId)
                    .orElseThrow(() -> new NotFoundException(siteId));

            return ResponseEntity.ok(events);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ce site n'existe pas");
        }

    }
}
