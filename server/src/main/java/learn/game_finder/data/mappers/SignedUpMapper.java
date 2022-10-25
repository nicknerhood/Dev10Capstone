package learn.game_finder.data.mappers;

import learn.game_finder.models.PickUp;
import learn.game_finder.models.SignedUp;
import learn.game_finder.models.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SignedUpMapper implements RowMapper<SignedUp> {

    @Override
    public SignedUp mapRow(ResultSet resultSet, int i) throws SQLException {

        UserMapper userMapper = new UserMapper();
        PickUpMapper pickUpMapper = new PickUpMapper();
        SignedUp signedUp = new SignedUp();

        signedUp.setSignedUpId(resultSet.getInt("signed_up_id"));
//        signedUp.setPickup(pickUpMapper.mapRow(resultSet, i));
//        signedUp.setUser(userMapper.mapRow(resultSet, i));
        signedUp.setUserId(resultSet.getInt("user_id"));
        signedUp.setPickupId(resultSet.getInt("pickup_id"));


        return signedUp;
    }
}
