package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class NoUserException extends RuntimeException{
    public NoUserException() {
        super();
    }

    public NoUserException(String message) {
        super(message);
    }
}
