package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class NoContactException extends RuntimeException {
    public NoContactException() {
        super();
    }

    public NoContactException(String message) {
        super(message);
    }
}
