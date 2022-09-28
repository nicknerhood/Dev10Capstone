package learn.game_finder.data;

import learn.game_finder.models.Game;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class GameJdbcTemplateRepositoryTest {

    final static int next_id = 4;

    @Autowired
    GameJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll(){
        List<Game> games = repository.findAll();
        assertNotNull(games);
        assertEquals(3, games.size());
    }

    @Test
    void shouldFindById(){
        Game game = repository.findById(1);
        assertNotNull(game);
        assertEquals("Football", game.getTitle());
    }

    @Test
    void shouldFindByTitle(){
        Game game = repository.findByTitle("Football");
        assertNotNull(game);
        assertEquals(1, game.getGameId());
    }

    @Test
    void shouldAdd() {
        Game game = makeGame();
        Game actual = repository.add(game);
        assertNotNull(actual);
        assertEquals(next_id, actual.getGameId());
    }
    @Test
    void shouldUpdate() {
        Game game = makeGame();
        game.setGameId(3);
        assertTrue(repository.update(game));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(2));
    }

    @Test
    void shouldFindIfInUse(){
        assertTrue(repository.findIfInUse(3));
    }

    private Game makeGame() {
        Game game = new Game();
        game.setTitle("Baseball");
        game.setImagePath(null);
        game.setGameInfo("Swing and a miss");
        game.setGenre("Sports");
        return game;
    }
}
