package com.app.dashboardapi.utils;

import lombok.*;

@Data
public class MessageResponse {
    public String message;

    public MessageResponse(String message) {
        this.message = message;
    }

}
