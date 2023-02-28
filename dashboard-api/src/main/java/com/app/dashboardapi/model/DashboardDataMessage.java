package com.app.dashboardapi.model;

import java.util.ArrayList;

public record DashboardDataMessage(
        long clientId,
        long appId, String windowSize,
        long clientTimestamp, ArrayList<InnerIClick> clicks) {
}
