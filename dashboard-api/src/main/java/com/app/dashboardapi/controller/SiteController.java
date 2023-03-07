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
public class SiteController {

    @Autowired
    private EventService ddmService;

    @PostMapping(path = "/api/site/add")
    public ResponseEntity<MessageResponse> addSite(@RequestBody EventMessage site) {


        return ResponseEntity.ok(new MessageResponse("site crée"));
    }

    @GetMapping(path = "/api/site/list")
    public ResponseEntity<List<EventMessage>> getEventsBySiteId(@RequestParam String siteId) {
        List<EventMessage> events = ddmService.getAllEventBySiteId(siteId)
                .orElseThrow(() -> new UsernameNotFoundException("Aucun events pour ce site"));
        return ResponseEntity.ok(events);
    }
}
