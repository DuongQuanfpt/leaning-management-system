package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class NullException extends RuntimeException{
    public NullException() {
        super();
    }

    public NullException(String message) {
        super(message);
    }
}
