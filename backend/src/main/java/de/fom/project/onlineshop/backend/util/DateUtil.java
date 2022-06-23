package de.fom.project.onlineshop.backend.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Timestamp;

public class DateUtil {

    private final static SimpleDateFormat outFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");

    public static Timestamp stringToDate(String dateString) throws ParseException {
        if(!dateString.isEmpty()) {
            return new Timestamp(outFormat.parse(dateString).getTime());
        } else {
            return null;
        }
    }

}
