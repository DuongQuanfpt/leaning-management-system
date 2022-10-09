package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class ObjectDuplicateException extends RuntimeException {
    public ObjectDuplicateException() {
        super();
    }

    public ObjectDuplicateException(String message) {
        super(message);
    }
}
