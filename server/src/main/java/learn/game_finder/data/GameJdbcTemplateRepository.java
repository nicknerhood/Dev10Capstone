package learn.game_finder.data;

import learn.game_finder.data.mappers.GameMapper;
import learn.game_finder.models.Game;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GameJdbcTemplateRepository implements GameRepository{
    private final JdbcTemplate jdbcTemplate;

    public GameJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Game> findAll() {
        final String sql = "select game_id, title, img_path, game_info, genre "
                +"from games limit 1000;";
        return jdbcTemplate.query(sql, new GameMapper());
    }

    @Override
    public Game findById(int gameId) {
        return null;
    }

    @Override
    public Game findByGenre(String genre) {
        return null;
    }

    @Override
    public Game add(Game game) {
        return null;
    }

    @Override
    public boolean update(Game game) {
        return false;
    }

    @Override
    public boolean deleteById(int gameId) {
        return false;
    }
}
