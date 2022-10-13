package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class ValueMissingException  extends RuntimeException{
    public ValueMissingException() {
        super();
    }

    public ValueMissingException(String message) {
        super(message);
    }
}
