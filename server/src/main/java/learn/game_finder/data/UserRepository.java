package learn.game_finder.data;

import learn.game_finder.models.User;

import java.util.List;

public interface UserRepository {

    List<User> findAll();

    User findById(int userId);

    User add(User user);

    boolean update(User user);

    boolean deleteById(int userId);

    boolean findIfInUse(int gameId);
}
