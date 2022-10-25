package learn.game_finder.controllers;

import learn.game_finder.domain.SignedUpService;
import learn.game_finder.models.SignedUp;
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

    @GetMapping("/{pickupId}")
    public List<SignedUp> findSignedUp(@PathVariable int pickupId){
       return signedUpService.findSignedUpForPickupId(pickupId);
    }
}
