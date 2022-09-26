package learn.game_finder.data;

import learn.game_finder.data.mappers.UserMapper;
import learn.game_finder.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

public class UserJdbcTemplateRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {
        final String sql = "select user_id, username, first_name, last_name" +
                " email, location_id from users;";

        return jdbcTemplate.query(sql,new UserMapper());
    }

    @Override
    public User findById(int userId) {
        final String sql = "select user_id, username, first_name, last_name, email, location_id " +
                "from users where user_id = ?;";

        return jdbcTemplate.query(sql, new UserMapper(), userId).stream().findAny().orElse(null);
    }

    @Override
    public User add(User user) {

        final String sql = "insert into users (username, first_name, last_name, email, location_id) " +
                "values (?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getFirstName());
            ps.setString(3, user.getLastName());
            ps.setString(4, user.getEmail());
            ps.setInt(5, user.getLocation().getLocationId());
            return ps;
        }, keyHolder);

        if (rowAffected <= 0){
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());
        return user;
    }

    @Override
    public boolean update(User user) {
       final String sql = "update users set " +
               "username = ?, " +
               "first_name = ? " +
               "last_name = ? " +
               "email = ? " +
               "location_id " +
               "where user_id = ?;";

       return jdbcTemplate.update(sql,
               user.getUsername(),
               user.getFirstName(),
               user.getLastName(),
               user.getEmail(),
               user.getLocation().getLocationId(),
               user.getUserId()) > 0;
    }

    @Override
    public boolean deleteById(int userId) {
       return false;
    }
}
