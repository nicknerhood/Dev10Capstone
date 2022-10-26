package learn.game_finder.data;

import learn.game_finder.data.mappers.SignedUpMapper;
import learn.game_finder.models.SignedUp;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class SignedUpJdbcTemplateRepository implements SignedUpRepository{

    private final JdbcTemplate jdbcTemplate;

    public SignedUpJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<SignedUp> joinedUsers(int pickUpId){
        final String sql = "   select * from signedUp s right join users u on u.user_id = s.user_id where pickup_id = ?;";

        return new ArrayList<>( jdbcTemplate.query(sql, new SignedUpMapper(), pickUpId));
    }

    @Override
    public List<SignedUp> allSignedUp(){

        final String sql = "   select * from signedUp";

        return new ArrayList<>( jdbcTemplate.query(sql, new SignedUpMapper()));

    }


    @Override
    public boolean add(SignedUp signedUp) {
        final String sql = "insert into signedUp (signed_up_id, user_id, pickup_id) values (?,?,?)";
        return jdbcTemplate.update(sql,
                signedUp.getSignedUpId(),
                signedUp.getPickupId(),
                signedUp.getUserId()) > 0;
        }

    @Override
    public boolean update(SignedUp signedUp) {
        final String sql = "update signedUp set user_id = ?,  pickup_id = ?)";
        return jdbcTemplate.update(sql,
                signedUp.getPickupId(),
                signedUp.getUserId()) > 0;
    }


    @Override
    public boolean deleteById(int signedUpId) {

        final String sql = "delete from signedUp where signed_up_id = ?";

        return jdbcTemplate.update(sql, signedUpId) > 0;
    }
}
