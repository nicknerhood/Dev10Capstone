package learn.game_finder.data;

import learn.game_finder.models.Location;

import java.util.List;

public interface LocationRepository {

    Location findById(int locationId);

    List<Location> findAll();

    Location add(Location location);

    boolean update(Location location);

    boolean deleteById(int locationId);
}
