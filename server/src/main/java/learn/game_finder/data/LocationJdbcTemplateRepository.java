package learn.game_finder.data;

import learn.game_finder.data.mappers.LocationMapper;
import learn.game_finder.models.Location;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LocationJdbcTemplateRepository implements LocationRepository{

    private final JdbcTemplate jdbcTemplate;

    public LocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Location findById(int locationId) {
        final String sql = "select location_id, latitude, longitude from locations where location_id = ?;";
        return jdbcTemplate.query(sql, new LocationMapper(), locationId).stream().findAny().orElse(null);
    }

    @Override
    public List<Location> findAll() {
        final String sql = "select location_id, latitude, longitude from locations;";
        return jdbcTemplate.query(sql, new LocationMapper());
    }

    @Override
    public Location add(Location location) {
        return null;
    }

    @Override
    public boolean update(Location location) {
        return false;
    }

    @Override
    public boolean delete(int locationId) {
        return false;
    }
}
