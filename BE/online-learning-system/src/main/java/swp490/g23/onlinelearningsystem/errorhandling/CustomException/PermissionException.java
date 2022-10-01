package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class PermissionException extends RuntimeException{
    public PermissionException() {
        super();
    }

    public PermissionException(String message) {
        super(message);
    }
}
