package com.app.dashboardapi.controller;

import com.app.dashboardapi.model.Site;
import com.app.dashboardapi.repository.EventRepository;
import com.app.dashboardapi.service.CustomUserDetailsService;
import com.app.dashboardapi.service.SiteService;
import com.app.dashboardapi.utils.MessageResponse;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import static com.app.dashboardapi.utils.apiUrl.*;

@RestController
@RequestMapping(SITE_BASE)
@CrossOrigin(origins = "*")
public class SiteController {

    @Autowired
    private SiteService siteService;

    @Autowired
    private CustomUserDetailsService customUserService;

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Site> addSite(@RequestBody Site site, HttpServletRequest request) {

        Site newSite = siteService.addSite(site);
        customUserService.AddSiteToUserDetails(site);
        return ResponseEntity.ok(newSite);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping("/remove")
    public ResponseEntity<MessageResponse> removeSite(@RequestParam String siteId) {
        try {
            siteService.removeSite(siteId);
            return ResponseEntity.ok(new MessageResponse("supprimé"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Erreur lors de la suppression " + e.getMessage()));
        }
    }

}
