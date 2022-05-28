package de.fom.project.onlineshop.backend.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Timestamp;

public class DateUtil {

    private final static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");

    public static String dateToString(Timestamp timestamp) {
        return formatter.format(timestamp);
    }

    public static Timestamp stringToDate(String dateString) throws ParseException {
        return new Timestamp(formatter.parse(dateString).getTime());
    }

}
