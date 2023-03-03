package com.app.dashboardapi.service;

import com.app.dashboardapi.model.EventMessage;
import com.app.dashboardapi.repository.EventRepository;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository dashboardRepository;

    public void sendEvent(EventMessage message) {

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        message.setServerTimestamp(timestamp.getTime());
        dashboardRepository.save(message);
    }
}
