package learn.game_finder.data;

import learn.game_finder.models.PickUp;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PickUpRepository {

    List<PickUp> findAll();

    PickUp findById(int pickUpId);

    List<PickUp> findByGameId(int gameId);

    List<PickUp> findByLocationId(int locationId);

    List<PickUp> findByUserId(int userId);

    PickUp add(PickUp pickUp);

    boolean update(PickUp pickUp);

    @Transactional
    boolean deleteById(int pickUpId);

    int findIfGameIdExists(int gameId);
    int findIfUserIdExists(int userId);
}
