package learn.game_finder.data.mappers;

import learn.game_finder.models.Game;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GameMapper implements RowMapper<Game> {
    @Override
    public Game mapRow(ResultSet resultSet, int i) throws SQLException{
        Game game = new Game();
        game.setGameId(resultSet.getInt("game_id"));
        game.setTitle(resultSet.getString("title"));
        game.setGameInfo(resultSet.getString("game_info"));
        if(resultSet.getString("img_path") != null) {
            game.setImagePath(resultSet.getString("img_path"));
        }
        game.setGenre(resultSet.getString("genre"));
        return game;
    }
}
