package com.app.dashboardapi.service;

import com.app.dashboardapi.model.EventMessage;
import com.app.dashboardapi.model.Site;
import com.app.dashboardapi.repository.EventRepository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.app.dashboardapi.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    public Site addSIte(Site site) {
        return siteRepository.save(site);
    }

}
