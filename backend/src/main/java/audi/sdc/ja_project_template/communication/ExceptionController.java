package audi.sdc.ja_project_template.communication;

import audi.sdc.ja_project_template.model.exception.DatabaseException;
import audi.sdc.ja_project_template.model.exception.IllegalDateException;
import audi.sdc.ja_project_template.model.exception.NotPersistedException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {DatabaseException.class})
    protected ResponseEntity<Object> handleDatabaseException(RuntimeException ex, WebRequest request) {
        return handleExceptionInternal(ex, "Problem communicating with database",
                new HttpHeaders(), HttpStatus.SERVICE_UNAVAILABLE, request);
    }

    @ExceptionHandler(value = {IllegalArgumentException.class})
    protected ResponseEntity<Object> handleIllegalArgumentException(RuntimeException ex, WebRequest request) {
        return handleExceptionInternal(ex, ex.getMessage(),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {NotPersistedException.class})
    protected ResponseEntity<Object> handleNotPersistedException(Exception ex, WebRequest request) {
        return handleExceptionInternal(ex, ex.getMessage(),
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(value = {IllegalDateException.class})
    protected ResponseEntity<Object> handleInvalidRequestException(IllegalDateException ex, WebRequest request) {
        return handleExceptionInternal(ex, ex.getMessage(),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}
