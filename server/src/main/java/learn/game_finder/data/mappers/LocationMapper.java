package learn.game_finder.data.mappers;

import learn.game_finder.models.Location;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationMapper implements RowMapper<Location> {
    @Override
    public Location mapRow(ResultSet resultSet, int i) throws SQLException {
        Location location = new Location();
        location.setLocationId(resultSet.getInt("location_id"));
        location.setLatitude(resultSet.getDouble("latitude"));
        location.setLongitude(resultSet.getDouble("longitude"));
        return location;
    }
}
