package com.app.dashboardapi.service;

import com.app.dashboardapi.model.Site;

import com.app.dashboardapi.repository.EventRepository;
import com.app.dashboardapi.repository.SiteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SiteService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SiteRepository siteRepository;

    public Site addSite(Site site) {
        return siteRepository.save(site);
    }

    public void removeSite(String siteId) {
        // supprimer tous les events qui sont liée au site
        eventRepository.deleteAllBySiteId(siteId).get();
        siteRepository.deleteById(siteId);
    }

    public boolean isSiteExist(String siteId) {
        return siteRepository.existsById(siteId);
    }
}
