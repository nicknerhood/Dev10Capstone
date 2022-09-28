package learn.game_finder.controllers;

import learn.game_finder.domain.LocationService;
import learn.game_finder.domain.Result;
import learn.game_finder.domain.UserService;
import learn.game_finder.models.Location;
import learn.game_finder.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/user")
public class UserController {




        private final UserService service;


        public UserController(UserService service) {
            this.service = service;
        }
        @GetMapping
        public List<User> findAll() {

            return service.findAll();
        }

        @GetMapping("/{userId}")
        public ResponseEntity<User> findById(@PathVariable int userId) {
            User user = service.findById(userId);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(user);
        }

        @PostMapping
        public ResponseEntity<Object> add(@RequestBody User user, @RequestHeader  ) {
            Result<User> result = service.add(user);
            if (result.isSuccess()) {
                return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
            }
            return ErrorResponse.build(result);
        }

        @PutMapping("/{userId}")
        public ResponseEntity<Object> update(@PathVariable int userId, @RequestBody User user) {
            if (userId != user.getUserId()) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            Result<User> result = service.update(user);
            if (result.isSuccess()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return ErrorResponse.build(result);
        }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> update(@PathVariable int userId){
        Result<User> result = service.deleteById(userId);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

//        @DeleteMapping("/{locationId}")
//        public ResponseEntity<Void> deleteById(@PathVariable int userId) {
//            if(service.deleteById(userId)){
//                return ResponseEntity.noContent().build();
//            }
//            else if (service.findById(locationId) != null
//                    && !service.deleteById(locationId)) {
//                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//            } else  {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
        }


