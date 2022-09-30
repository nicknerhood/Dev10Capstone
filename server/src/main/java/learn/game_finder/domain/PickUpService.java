package learn.game_finder.domain;

import learn.game_finder.data.PickUpRepository;
import learn.game_finder.models.Location;
import learn.game_finder.models.PickUp;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PickUpService {
    private final PickUpRepository repository;

    public PickUpService(PickUpRepository repository){
        this.repository = repository;
    }

    public List<PickUp> findAll(){
        return this.repository.findAll();
    }

    public PickUp findById(int pickUpId){
        return this.repository.findById(pickUpId);
    }

    public List<PickUp> findByGameId(int gameId){
        return this.repository.findByGameId(gameId);
    }

    public List<PickUp> findByLocationId(int locationId){
        return this.repository.findByLocationId(locationId);
    }

    public List<PickUp> findByUserId(int userId){
        return this.repository.findByUserId(userId);
    }

    

    public Result<PickUp> add(PickUp pickUp){
        Result<PickUp> result= validate(pickUp);
        if(!result.isSuccess()){
            return result;
        }

        if(pickUp.getPickUpId() != 0){
            result.addMessage("PickUp Id cannot be set for add operation", ResultType.INVALID);
            return result;
        }

//        if(repository.findIfGameIdExists(pickUp.getGameId()) <= 0){
//            result.addMessage("Game not found. Please select a valid game", ResultType.INVALID);
//            return result;
//        }
//
//        if(repository.findIfUserIdExists(pickUp.getUserId()) <=0){
//            result.addMessage("User not found. Please select a valid user", ResultType.INVALID);
//            return result;
//        }

        pickUp = repository.add(pickUp);
        result.setPayload(pickUp);
        return result;
    }



    public Result<PickUp> update(PickUp pickUp){
        Result<PickUp> result = validate(pickUp);
        if(!result.isSuccess()) {
            return result;
        }
        if(pickUp.getPickUpId() <=0){
            result.addMessage("PickUp Id must be set for the update operation", ResultType.INVALID);
            return result;
        }
        if(!repository.update(pickUp)){
            String message = String.format("PickUp Id %s not found", pickUp.getPickUpId());
            result.addMessage(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById(int pickUpId){
        return repository.deleteById(pickUpId);
    }

    private Result<PickUp> validate(PickUp pickUp){
        Result<PickUp> result = new Result<>();

        if(pickUp == null){
            result.addMessage("PickUp cannot be null", ResultType.INVALID);
            return result;
        }

        if(Validations.isNullOrBlank(pickUp.getPickUpInfo())){
            result.addMessage("Pickup Information cannot be empty", ResultType.INVALID);
        }
        if(pickUp.getPlayDate() == null){
            result.addMessage("Please enter a date", ResultType.INVALID);
        }
        if(pickUp.getPlayDate().isBefore(LocalDate.now())){
            result.addMessage("PickUps must be in the future", ResultType.INVALID);
        }
        if(pickUp.getLocationId()<=0){
            result.addMessage("Location Id must be set and must be more than 0", ResultType.INVALID);
        }
        if(pickUp.getGameId()<=0){
            result.addMessage("Game Id must be set and must be more than 0", ResultType.INVALID);
        }
        if(pickUp.getUserId()<=0){
            result.addMessage("User Id must be set and must be more than 0", ResultType.INVALID);
        }
        return result;
    }
}
