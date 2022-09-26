package learn.game_finder.domain;

import learn.game_finder.data.UserRepository;
import learn.game_finder.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public User findById(int userId){
        return repository.findById(userId);
    }

}
