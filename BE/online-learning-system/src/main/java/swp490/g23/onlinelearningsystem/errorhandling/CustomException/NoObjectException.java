package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class NoObjectException extends RuntimeException{
    public NoObjectException() {
        super();
    }

    public NoObjectException(String message) {
        super(message);
    }
}
