package com.app.dashboardapi.model;

import java.util.ArrayList;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("events")
public class EventMessage {

    @Id
    private String id;

    private Long clientId;
    private Long siteId;
    private String windowSize;
    private Long clientTimestamp;

    private Long serverTimestamp;

    private String userAgent;

    private ArrayList<InnerIClick> clicks;

    public EventMessage(String id, Long clientId, Long siteId, String windowSize, Long clientTimestamp,
                        ArrayList<InnerIClick> clicks) {
        this.id = id;
        this.clientId = clientId;
        this.siteId = siteId;
        this.windowSize = windowSize;
        this.clientTimestamp = clientTimestamp;
        this.clicks = clicks;
    }

}
