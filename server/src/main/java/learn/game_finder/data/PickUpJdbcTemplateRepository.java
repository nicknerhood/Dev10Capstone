package learn.game_finder.data;

import learn.game_finder.data.mappers.PickUpMapper;
import learn.game_finder.models.PickUp;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PickUpJdbcTemplateRepository implements PickUpRepository{

    private final JdbcTemplate jdbcTemplate;

    public PickUpJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<PickUp> findAll() {
        final String sql = "select pickup_id, pickup_info, play_date, location_id, game_id, user_id "
                +"from pickups;";
        return jdbcTemplate.query(sql, new PickUpMapper());

    }

    @Override
    public PickUp findById(int pickUpId) {
        final String sql = "select pickup_id, pickup_info, play_date, location_id, game_id, user_id "
                +"from pickups "
                +"where pickup_id = ?;";
        return jdbcTemplate.query(sql, new PickUpMapper(), pickUpId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public List<PickUp> findByGameId(int gameId) {
        final String sql = "select pickup_id, pickup_info, play_date, location_id, game_id, user_id "
                +"from pickups "
                +"where game_id = ?;";
        return jdbcTemplate.query(sql, new PickUpMapper());
    }

    @Override
    public List<PickUp> findByLocationId(int locationId) {
        final String sql = "select pickup_id, pickup_info, play_date, location_id, game_id, user_id "
                +"from pickups "
                +"where location_id = ?;";
        return jdbcTemplate.query(sql, new PickUpMapper());
    }

    @Override
    public List<PickUp> findByUserId(int pickUpId) {
        final String sql = "select pickup_id, pickup_info, play_date, location_id, game_id, user_id "
                +"from pickups "
                +"where user_id = ?;";
        return jdbcTemplate.query(sql, new PickUpMapper());
    }

    @Override
    public PickUp add(PickUp pickUp) {
        final String sql = "insert into pickups (pickup_info, play_date, location_id, game_id, user_id "
                +" values (?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, pickUp.getPickUpInfo());
            ps.setDate(2, Date.valueOf(pickUp.getPlayDate()));
            ps.setInt(3, pickUp.getLocationId());
            ps.setInt(4, pickUp.getGameId());
            ps.setInt(5, pickUp.getUserId());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }

        pickUp.setPickUpId(keyHolder.getKey().intValue());
        return pickUp;
    }

    @Override
    public boolean update(PickUp pickUp) {
        final String sql = "update pickups set "
                +"pickup_info = ?, "
                +"play_date = ?, "
                +"location_id = ?, "
                +"game_id = ?, "
                +"user_id = ? "
                +"where pickup_id = ?;";
        return jdbcTemplate.update(sql,
                pickUp.getPickUpInfo(),
                pickUp.getPlayDate(),
                pickUp.getLocationId(),
                pickUp.getGameId(),
                pickUp.getUserId(),
                pickUp.getPickUpId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int pickUpId) {
        return jdbcTemplate.update("delete from pickups where pickup_id = ?;", pickUpId) > 0;
    }

    @Override
    public int findIfGameIdExists(int gameId) {
        Integer value = jdbcTemplate.queryForObject(
                "select count(*) from games where game_id = ?;", Integer.class, gameId);
        return value;
    }

    @Override
    public int findIfUserIdExists(int userId) {
        Integer value = jdbcTemplate.queryForObject(
                "select count(*) from users where user_id = ?;", Integer.class, userId
        );
        return value;
    }


}
