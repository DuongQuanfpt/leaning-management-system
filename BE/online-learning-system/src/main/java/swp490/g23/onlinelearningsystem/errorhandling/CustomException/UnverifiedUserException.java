package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class UnverifiedUserException extends RuntimeException {

    public UnverifiedUserException() {
        super();
    }

    public UnverifiedUserException(String message) {
        super(message);
    }

}
