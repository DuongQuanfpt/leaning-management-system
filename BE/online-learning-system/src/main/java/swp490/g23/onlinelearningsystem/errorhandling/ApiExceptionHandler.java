package swp490.g23.onlinelearningsystem.errorhandling;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import swp490.g23.onlinelearningsystem.errorhandling.CustomException.InvalidTokenException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoUserException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.PermissionException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.RoleException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.UnverifiedUserException;

@RestControllerAdvice
public class ApiExceptionHandler {
   
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public ErrorMessage handleAllException(Exception ex, WebRequest request) {
        // quá trình kiểm soat lỗi diễn ra ở đây
    
        return new ErrorMessage(10000, ex.getLocalizedMessage());
    }

    
   
    @ExceptionHandler(UnverifiedUserException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorMessage unverifiedExceptionHandler(Exception ex,  WebRequest request) {
        return new ErrorMessage(10101, "This account is unverified");
    }

    @ExceptionHandler(InvalidTokenException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorMessage invalidTokenException(Exception ex,  WebRequest request) {
        return new ErrorMessage(10102, "Invalid token");
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorMessage badCredentialsException(Exception ex,  WebRequest request) {
        return new ErrorMessage(10103, "Incorect credentials");
    }

    @ExceptionHandler(NoUserException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage noUserException(Exception ex,  WebRequest request) {
        return new ErrorMessage(10104, "User doesnt exist");
    }

    @ExceptionHandler(PermissionException.class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public ErrorMessage permissionExceptionHandler(Exception ex,  WebRequest request) {
        return new ErrorMessage(10105, "Your account dont have access to this resource");
    }

    @ExceptionHandler(RoleException.class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public ErrorMessage roleExceptionHandler(Exception ex,  WebRequest request) {
        return new ErrorMessage(10106, "Ko phai admin thi dung co vao :/");
    }
}
