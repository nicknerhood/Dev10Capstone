package learn.game_finder.data;

import learn.game_finder.data.mappers.PickUpMapper;
import learn.game_finder.models.PickUp;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
    public PickUp add(PickUp pickUp) {
        return null;
    }

    @Override
    public boolean update(PickUp pickUp) {
        return false;
    }

    @Override
    public boolean deleteById(PickUp pickUp) {
        return false;
    }
}
