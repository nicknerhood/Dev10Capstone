package learn.game_finder.data;

import learn.game_finder.models.SignedUp;
import learn.game_finder.models.User;

import java.util.List;

public interface SignedUpRepository {

    List<SignedUp> joinedUsers(int pickUpId);

    boolean add(SignedUp signedUp);

    boolean update(SignedUp signedUp);

    boolean deleteById(int signedUpId);
}
