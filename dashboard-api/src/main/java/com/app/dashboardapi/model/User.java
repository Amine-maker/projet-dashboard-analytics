package com.app.dashboardapi.model;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private Collection<String> roles;

    public Collection<String> getRoles() {
        return this.roles;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;

        ArrayList<String> roles = new ArrayList<String>();
        roles.add("USER");
        this.roles = roles;

    }

    public void setRoles(Collection<String> roles) {
        this.roles = roles;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}