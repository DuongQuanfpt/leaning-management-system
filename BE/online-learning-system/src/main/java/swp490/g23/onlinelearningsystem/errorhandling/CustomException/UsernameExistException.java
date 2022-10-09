package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class UsernameExistException extends RuntimeException{
    public UsernameExistException() {
        super();
    }

    public UsernameExistException(String message) {
        super(message);
    }
}
