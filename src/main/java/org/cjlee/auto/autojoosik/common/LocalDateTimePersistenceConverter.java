package org.cjlee.auto.autojoosik.common;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.time.LocalDateTime;
import java.util.Date;

import static java.time.Instant.ofEpochMilli;
import static java.time.LocalDateTime.ofInstant;
import static java.time.ZoneId.systemDefault;

@Converter
public class LocalDateTimePersistenceConverter implements AttributeConverter<LocalDateTime, Date> {

  @Override
  public Date convertToDatabaseColumn(LocalDateTime localDateTime) {
    if (localDateTime != null){
      return Date.from(localDateTime.atZone(systemDefault()).toInstant());
    }
    else{
      return null;
    }
  }

  @Override
  public LocalDateTime convertToEntityAttribute(Date date) {
    if (date != null){
      return ofInstant(ofEpochMilli(date.getTime()), systemDefault());
    }
    else{
     return null;
    }
  }
}