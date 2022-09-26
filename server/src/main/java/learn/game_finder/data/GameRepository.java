package learn.game_finder.data;

import learn.game_finder.models.Game;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GameRepository {

    List<Game> findAll();

    Game findById(int gameId);

    Game findByGenre(String genre);

    Game add(Game game);

    boolean update(Game game);

    @Transactional
    boolean deleteById(int gameId);
}
