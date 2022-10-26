package learn.game_finder.domain;

import learn.game_finder.data.SignedUpRepository;
import learn.game_finder.models.SignedUp;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SignedUpService {

    private final SignedUpRepository signedUpRepository;

    public SignedUpService(SignedUpRepository signedUpRepository) {
        this.signedUpRepository = signedUpRepository;
    }

    public List<SignedUp> findSignedUpForPickupId(int pickupId){
        return signedUpRepository.joinedUsers(pickupId);
    }

    public List<SignedUp> findAllSignedUp(){
        return signedUpRepository.allSignedUp();
    }

    public boolean deleteSignedUp(int signedUpId) {
        return signedUpRepository.deleteById(signedUpId);
    }

    public Result<SignedUp> addSignedUp(SignedUp signedUp) {
        Result<SignedUp> result = new Result<>();

        if (signedUp.getUserId() <= 0) {
            result.addMessage("User does not exist", ResultType.NOT_FOUND);
            return result;
        }

        if(signedUp.getPickupId() <= 0) {
            result.addMessage("Pickup does not exist", ResultType.NOT_FOUND);
            return result;
        }

        signedUpRepository.add(signedUp);


        return result;
    }
}
