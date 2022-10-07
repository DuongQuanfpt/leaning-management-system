package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class NoSettingException extends RuntimeException{
    public NoSettingException() {
        super();
    }

    public NoSettingException(String message) {
        super(message);
    }
}
