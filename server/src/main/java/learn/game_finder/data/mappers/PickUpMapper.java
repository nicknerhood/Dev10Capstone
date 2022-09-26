package learn.game_finder.data.mappers;

import learn.game_finder.data.PickUpRepository;
import learn.game_finder.models.PickUp;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PickUpMapper implements RowMapper<PickUp> {

    @Override
    public PickUp mapRow(ResultSet resultSet, int i) throws SQLException{
        PickUp pickUp = new PickUp();
        pickUp.setPickUpId(resultSet.getInt("pickup_id"));
        pickUp.setPickUpInfo(resultSet.getString("pickup_info"));
        if(resultSet.getDate("play_date") != null){
            pickUp.setPlayDate(resultSet.getDate("play_date").toLocalDate());
        }
        pickUp.setLocationId(resultSet.getInt("location_id"));
        pickUp.setGameId(resultSet.getInt("game_id"));
        pickUp.setUserId(resultSet.getInt("user_id"));
        return pickUp;
    }
}
