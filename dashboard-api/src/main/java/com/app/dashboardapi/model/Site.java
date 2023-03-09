package com.app.dashboardapi.model;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "sites")
public class Site {

   @Id
   private String id;

   @NotBlank
   @Size(min = 5)
   private String name;

   @NotBlank
   private String userId;

   public Site() {

   }

   public Site(String name, String userId) {
      this.name = name;
      this.userId = userId;
   }

}