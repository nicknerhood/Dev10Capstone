package learn.game_finder.data;

import learn.game_finder.data.mappers.GameMapper;
import learn.game_finder.models.Game;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
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
        final String sql = "select game_id, title, img_path, game_info, genre "
                +"from games "
                +"where game_id = ?";

        return jdbcTemplate.query(sql, new GameMapper(), gameId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Game findByTitle(String title) {
        final String sql = "select game_id, title, img_path, game_info, genre "
                +"from games "
                +"where title = ?;";

        return jdbcTemplate.query(sql, new GameMapper(), title).stream()
                .findFirst().orElse(null);
    }

    @Override
    public Game add(Game game) {

        final String sql = "insert into games (title, img_path, game_info, genre) "
                + " values (?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, game.getTitle());
            ps.setString(2, game.getImagePath() == null ? null : String.valueOf(game.getImagePath()));
            ps.setString(3, game.getGameInfo());
            ps.setString(4, game.getGenre());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0){
            return null;
        }

        game.setGameId(keyHolder.getKey().intValue());
        return game;
    }

    @Override
    public boolean update(Game game) {

        final String sql = "update games set "
                +"title = ?, "
                +"img_path = ?, "
                +"game_info = ?, "
                +"genre = ? "
                +"where game_id = ?;";

        return jdbcTemplate.update(sql,
                game.getTitle(),
                game.getImagePath(),
                game.getGameInfo(),
                game.getGenre(),
                game.getGameId()) > 0;
    }

    @Override
    public boolean deleteById(int gameId) {
        return jdbcTemplate.update("delete from games where game_id = ?;", gameId) > 0;
    }
}
