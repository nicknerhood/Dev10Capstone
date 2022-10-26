package learn.game_finder.controllers;

import learn.game_finder.domain.Result;
import learn.game_finder.domain.SignedUpService;
import learn.game_finder.models.SignedUp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("signedUp")
public class SignedUpController {

    private final SignedUpService signedUpService;

    public SignedUpController(SignedUpService signedUpService) {
        this.signedUpService = signedUpService;
    }

    @GetMapping
    public List<SignedUp> findAllSignedUp(){
        return signedUpService.findAllSignedUp();
    }

    @GetMapping("/{pickupId}")
    public List<SignedUp> findSignedUp(@PathVariable int pickupId){
       return signedUpService.findSignedUpForPickupId(pickupId);
    }

    @PostMapping
    public ResponseEntity<Object> joinPickup(@RequestBody SignedUp signedUp){
        Result<SignedUp> result = signedUpService.addSignedUp(signedUp);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);

    }
}
