package learn.game_finder.data;

import learn.game_finder.data.mappers.LocationMapper;
import learn.game_finder.models.Location;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class LocationJdbcTemplateRepository implements LocationRepository {

    private final JdbcTemplate jdbcTemplate;

    public LocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
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
        final String sql = "insert into locations (latitude, longitude) values (?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setDouble(1, location.getLatitude());
            ps.setDouble(2, location.getLongitude());
            return ps;
        }, keyHolder);

        if (rowAffected <= 0) {
            return null;
        }
        location.setLocationId(keyHolder.getKey().intValue());
        return location;
    }

    @Override
    public boolean update(Location location) {
        final String sql = "update locations set latitude = ?, longitude = ? where location_id = ?;";
        return jdbcTemplate.update(sql,
                location.getLatitude(),
                location.getLongitude(),
                location.getLocationId()) > 0;
    }

    @Override
    public boolean deleteById(int locationId) {

        if (!findIfInUse(locationId)) {

            final String sql = "delete from locations where location_id = ?;";
            return jdbcTemplate.update(sql, locationId) > 0;
        }

        return false;
    }

    @Override
    public boolean findIfInUse(int locationId){
        int countInUser = jdbcTemplate.queryForObject(
                "select count(*) from users where location_id = ?;"
                , Integer.class
                , locationId);

        int countInPickups = jdbcTemplate.queryForObject(
                "select count(*) from pickups where location_id = ?;"
                , Integer.class
                , locationId);



        if(countInPickups != 0 || countInUser != 0){
            return true;
        }
        return false;
    }

}
