package learn.game_finder.data;

import learn.game_finder.models.PickUp;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PickUpRepository {

    List<PickUp> findAll();

    PickUp findById(int pickUpId);

    List<PickUp> findByGameId(int gameId);

    PickUp add(PickUp pickUp);

    boolean update(PickUp pickUp);

    @Transactional
    boolean deleteById(int pickUpId);
}
