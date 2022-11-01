package swp490.g23.onlinelearningsystem.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringUltility {
    public static String removeAccent(String s) {
        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("");
       }
}
