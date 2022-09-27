package learn.game_finder.domain;

import learn.game_finder.data.LocationRepository;
import learn.game_finder.models.Location;
import learn.game_finder.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

private final LocationRepository repository;

    public LocationService(LocationRepository repository) {
        this.repository = repository;
    }

    public List<Location> findAll(){
        return repository.findAll();
    }

    public Location findById(int locationId){
        return repository.findById(locationId);
    }


//    public boolean deleteById(int locationId) {
//        if (repository.findIfInUse(locationId)) {
//            return false;
//        } else {
//            return repository.deleteById(locationId);
//        }
//    }

    public Result<Location> deleteById(int locationId){
        Result<Location> result = new Result<>();
        if(locationId <= 0){
            result.addMessage("Invalid id for deletion", ResultType.INVALID);
            return result;
        }
            if(repository.findIfInUse(locationId)){
            result.addMessage("At this time, we cannot delete locations that are in use", ResultType.INVALID);
            return result;
        }
        if(!repository.deleteById(locationId)){
            String message = String.format("location Id: %s not found", locationId);
            result.addMessage(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Location> add(Location location){
        Result<Location> result = validate(location);
        if(!result.isSuccess()){
            return result;
        }

        if(location.getLocationId() != 0){
            result.addMessage("Id cannot be set for add operation", ResultType.INVALID);
            return result;
        }

        location = repository.add(location);
        result.setPayload(location);
        return result;
    }

    public Result<Location> update(Location location){
        Result<Location> result = validate(location);
        if(!result.isSuccess()){
            return result;
        }


        if(location.getLocationId() <= 0){
            result.addMessage("Id must be set for 'update' operation", ResultType.INVALID);
            return result;
        }

        if(!repository.update(location)){
            String msg = String.format("locationId: %s, not found", location.getLocationId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<Location> validate(Location location) {

        Result<Location> result = new Result<>();
        if (location == null) {
            result.addMessage("Location cannot be null", ResultType.INVALID);
            return result;
        }
        if (location.getLatitude() == null) {
            result.addMessage("latitude cannot be null or empty", ResultType.INVALID);
            return result;
        }
        if (location.getLongitude() == null) {
            result.addMessage("longitude cannot be null or empty", ResultType.INVALID);
            return result;
        }
        if (location.getLatitude() < -90.0 || location.getLatitude() > 90.0){
            result.addMessage("latitude must be between -90 and 90", ResultType.INVALID);
        }
        if (location.getLongitude() < -180 || location.getLongitude() > 180){
            result.addMessage("longitude must be between -180 and 180", ResultType.INVALID);
        }

        return result;
    }
}
