package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
        super();
    }

    public InvalidTokenException(String message) {
        super(message);
    }
}
