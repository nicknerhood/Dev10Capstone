package learn.game_finder.domain;

import learn.game_finder.data.AppUserRepository;
import learn.game_finder.data.UserRepository;
import learn.game_finder.models.AppUser;
import learn.game_finder.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;
    private final AppUserRepository appUserRepository;

    public UserService(UserRepository repository, AppUserRepository appUserRepository) {
        this.repository = repository;
        this.appUserRepository = appUserRepository;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findById(int userId){
        return repository.findById(userId);
    }

    public Result<User> deleteById(int userId){
        Result<User> result = new Result<>();
        if(userId <= 0){
            result.addMessage("Invalid id for deletion", ResultType.INVALID);
            return result;
        }
        if(repository.findIfInUse(userId)){
            result.addMessage("At this time, we cannot delete users that have pickup posts", ResultType.INVALID);
            return result;
        }
        if(!repository.deleteById(userId)){
            String message = String.format("User Id: %s not found", userId);
            result.addMessage(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<User> add(User user){
        Result<User> result = validate(user);
        if(!result.isSuccess()){
            return result;
        }

        if(user.getUserId() != 0){
            result.addMessage("Id cannot be set for 'add' operation", ResultType.INVALID);
            return result;
        }

        user = repository.add(user);
        result.setPayload(user);
        return result;
    }

    public Result<User> update(User user){
        Result<User> result = validate(user);
        if(!result.isSuccess()){
            return result;
        }

        if(user.getUserId() <= 0){
            result.addMessage("Id must be set for 'update' operation", ResultType.INVALID);
            return result;
        }

        if(!repository.update(user)){
            String msg = String.format("userId: %s, not found", user.getUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<User> validate(User user){
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("User cannot be null", ResultType.INVALID);
            return result;
        }

        if(Validations.isNullOrBlank(user.getFirstName())){
            result.addMessage("Please enter a first name", ResultType.INVALID);
        }
        if(Validations.isNullOrBlank(user.getLastName())){
            result.addMessage("Please enter a last name", ResultType.INVALID);
        }
        if(Validations.isNullOrBlank(user.getUsername())){
            result.addMessage("Please enter a username", ResultType.INVALID);
        }
        if(Validations.isNullOrBlank(user.getEmail())){
            result.addMessage("Please enter a valid email address", ResultType.INVALID);
        }
//        List<AppUser> appUsers = (List<AppUser>) appUserRepository.findByUsername(user.getUsername());
        List<User> all = repository.findAll();
        for(User value : all){
            if(user.getAppUserId() == value.getAppUserId() )
//                    user.getFirstName().equalsIgnoreCase(value.getFirstName()) &&
//                    user.getLastName().equalsIgnoreCase(value.getLastName()) &&
//                    user.getEmail().equals(value.getEmail())) {
            {
                result.addMessage("You Already Have a Profile", ResultType.INVALID);
            }
        }

        return result;
    }
}
