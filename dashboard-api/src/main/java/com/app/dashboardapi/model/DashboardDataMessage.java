package com.app.dashboardapi.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("events")
public class DashboardDataMessage {

        @Id
        private String id;

        private Long clientId;
        private Long appId;
        private String windowSize;
        private Long clientTimestamp;
        private ArrayList<InnerIClick> clicks;

        public String getId() {
                return this.id;
        }

        public void setId(String id) {
                this.id = id;
        }

        public Long getClientId() {
                return this.clientId;
        }

        public void setClientId(Long clientId) {
                this.clientId = clientId;
        }

        public Long getAppId() {
                return this.appId;
        }

        public void setAppId(Long appId) {
                this.appId = appId;
        }

        public String getWindowSize() {
                return this.windowSize;
        }

        public void setWindowSize(String windowSize) {
                this.windowSize = windowSize;
        }

        public Long getClientTimestamp() {
                return this.clientTimestamp;
        }

        public void setClientTimestamp(Long clientTimestamp) {
                this.clientTimestamp = clientTimestamp;
        }

        public ArrayList<InnerIClick> getClicks() {
                return this.clicks;
        }

        public void setClicks(ArrayList<InnerIClick> clicks) {
                this.clicks = clicks;
        }

        public DashboardDataMessage(String id, Long clientId, Long appId, String windowSize, Long clientTimestamp,
                        ArrayList<InnerIClick> clicks) {
                this.id = id;
                this.clientId = clientId;
                this.appId = appId;
                this.windowSize = windowSize;
                this.clientTimestamp = clientTimestamp;
                this.clicks = clicks;
        }

        @Override
        public String toString() {
                return "{" +
                                " id='" + getId() + "'" +
                                ", clientId='" + getClientId() + "'" +
                                ", appId='" + getAppId() + "'" +
                                ", windowSize='" + getWindowSize() + "'" +
                                ", clientTimestamp='" + getClientTimestamp() + "'" +
                                ", clicks='" + getClicks() + "'" +
                                "}";
        }

}
