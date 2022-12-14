package learn.game_finder.controllers;

import learn.game_finder.domain.PickUpService;
import learn.game_finder.domain.Result;
import learn.game_finder.models.Location;
import learn.game_finder.models.PickUp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/pickup")
public class PickUpController {
    private final PickUpService service;

    public PickUpController(PickUpService service){
        this.service = service;
    }

    @GetMapping
    public List<PickUp> findAll(){
        return service.findAll();
    }

    @GetMapping("/{pickUpId}")
    public ResponseEntity<PickUp> findById(@PathVariable int pickUpId){
        PickUp pickUp = service.findById(pickUpId);
        if(pickUp == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(pickUp);
    }

    @GetMapping("/game/{gameId}")
    public List<PickUp> findByGameId(@PathVariable int gameId){
        return service.findByGameId(gameId);
    }

//    @GetMapping("/location/{locationId}")
//    public List<PickUp> findByLocationId(@PathVariable int locationId){
//        return service.findByLocationId(locationId);
//    }

    @GetMapping("/user/{userId}")
    public List<PickUp> findByUserId(@PathVariable int userId){
        return service.findByUserId(userId);
    }

    @GetMapping("/location/{locationId}")
    public ResponseEntity<?> getLocationFromLocationId(@PathVariable int locationId) {
        Location location = service.getLocationFromLocationId(locationId);
        if(location == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(location);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody PickUp pickUp){
        Result<PickUp> result = service.add(pickUp);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{pickUpId}")
    public ResponseEntity<?> update(@PathVariable int pickUpId, @RequestBody PickUp pickUp){
        if(pickUpId != pickUp.getPickUpId()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Result<PickUp> result = service.update(pickUp);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{pickUpId}")
    public ResponseEntity<?> deleteById(@PathVariable int pickUpId){
        if(service.deleteById(pickUpId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
