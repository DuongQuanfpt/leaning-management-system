package swp490.g23.onlinelearningsystem.errorhandling.CustomException;

public class DuplicateSubjectCodeException extends RuntimeException {
    public DuplicateSubjectCodeException() {
        super();
    }

    public DuplicateSubjectCodeException(String message) {
        super(message);
    }
}
