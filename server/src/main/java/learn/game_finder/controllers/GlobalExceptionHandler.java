package learn.game_finder.controllers;

import learn.game_finder.domain.Result;
import learn.game_finder.domain.ResultType;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ValidationException;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponse> handleException(DataAccessException ex){
        System.out.println(ex);
        Result result = new Result<>();
        result.addMessage("Something went wrong with the database. We apologize for the inconvenience.", ResultType.SERVER_ERROR);
        return ErrorResponse.build(result);
    }
    
    @ExceptionHandler({IllegalArgumentException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ErrorResponse> handleException(IllegalArgumentException ex){
        System.out.println(ex);
        return new ResponseEntity(ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<?> handleException(HttpMediaTypeNotSupportedException ex){
        System.out.println(ex);
        return new ResponseEntity<>(ex, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex){
        System.out.println(ex);
        Result result = new Result();
        result.addMessage("Something went wrong on our end. Your request failed.", ResultType.SERVER_ERROR);
        return ErrorResponse.build(result);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<List<String>> handleValidationException(ValidationException ex) {
        return new ResponseEntity<>(List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<List<String>> handleDuplicateKeyException(DuplicateKeyException ex) {
        return new ResponseEntity<>(List.of("That username is already in use"), HttpStatus.BAD_REQUEST); // because this is a specific use case, might not be the best place to handle this
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException ex){
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
