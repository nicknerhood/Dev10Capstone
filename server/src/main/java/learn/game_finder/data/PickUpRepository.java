package learn.game_finder.data;

import learn.game_finder.models.PickUp;

import java.util.List;

public interface PickUpRepository {

    List<PickUp> findAll();

    PickUp findById(int pickUpId);

    PickUp add(PickUp pickUp);

    boolean update(PickUp pickUp);

    boolean deleteById(PickUp pickUp);
}
