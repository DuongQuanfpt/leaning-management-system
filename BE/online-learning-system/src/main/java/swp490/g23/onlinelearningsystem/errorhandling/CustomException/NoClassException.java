package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class NoClassException extends RuntimeException{
    public NoClassException() {
        super();
    }

    public NoClassException(String message) {
        super(message);
    }
}
