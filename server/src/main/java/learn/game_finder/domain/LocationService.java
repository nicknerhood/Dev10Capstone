package learn.game_finder.domain;

import learn.game_finder.data.LocationRepository;
import learn.game_finder.models.Location;

import java.util.List;

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

    public boolean deleteById(int locationId){
        if(repository.findIfInUse(locationId)){
            return false;
        }
         return repository.deleteById(locationId);

    }

    private Result<Location> validate(Location location) {

        Result<Location> result = new Result<>();
        if (location == null) {
            result.addMessage("Location cannot be null", ResultType.INVALID);
            return result;
        }
        if (Validations.isNullOrBlank(String.valueOf(location.getLatitude()))) {
            result.addMessage("latitude cannot be null or empty", ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(String.valueOf(location.getLongitude()))) {
            result.addMessage("longitude cannot be null or empty", ResultType.INVALID);
        }

        if(repository.findIfInUse(location.getLocationId())){
            result.addMessage("Cannot delete Location that is used in a post or on a profile", ResultType.INVALID);
        }
        return result;
    }
}
