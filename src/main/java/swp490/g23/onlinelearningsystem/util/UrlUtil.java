package swp490.g23.onlinelearningsystem.util;

import javax.servlet.http.HttpServletRequest;

public class UrlUtil {
    public static String getSiteURL(HttpServletRequest request){
        String siteURL =request.getRequestURI().toString();
        return siteURL.replace(request.getServletPath(), "");
    }
}
