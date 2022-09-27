package learn.game_finder.controllers;

import learn.game_finder.domain.Result;
import learn.game_finder.domain.ResultType;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponse> handleException(DataAccessException ex){
        System.out.println(ex);
        Result result = new Result<>();
        result.addMessage("Something went wrong with the database, sorry", ResultType.SERVER_ERROR);
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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex){
        System.out.println(ex);
        Result result = new Result();
        result.addMessage("Something went wrong on our end. Your request failed.", ResultType.SERVER_ERROR);
        return ErrorResponse.build(result);
    }
}
