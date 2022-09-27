package learn.game_finder.domain;

import learn.game_finder.data.GameRepository;
import learn.game_finder.models.Game;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class GameServiceTest {
    @Autowired
    GameService service;

    @MockBean
    GameRepository gameRepository;

    // Game game = new Game(0, "Test", null, "Test info", "Test genre");

    @Test
    void shouldFindGames(){
        when(gameRepository.findAll()).thenReturn(
                Arrays.asList(
                        new Game(1, "Football", null, "Throw the old pigskin around", "Sports"),
                        new Game(2, "Super Smash Brothers", null, "Beat up your friends virtually", "Fighting Game"),
                        new Game(3, "Dungeons and Dragons", null, "Wanna be a wizard?", "Board Game")
                )
        );
        List<Game> games = service.findAll();
        assertEquals(3, games.size());
    }

    @Test
    void shouldAdd(){
        Game game = new Game(0, "Test", null, "Test info", "Test genre");
        Game mockOut = new Game(7, "Test", null, "Test info", "Test genre");
        when(gameRepository.add(game)).thenReturn(mockOut);

        Result<Game> actual = service.add(game);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddWhenInvalid(){
        Game badId = new Game(9, "Test", null, "Test info", "Test genre");
        Result<Game> actual = service.add(badId);
        assertEquals(ResultType.INVALID, actual.getType());

        Game badTitle = new Game(0, null, null, "Test info", "Test genre");
        actual = service.add(badTitle);
        assertEquals(ResultType.INVALID, actual.getType());

        Game badInfo = new Game(0, "Test", null, null, "Test genre");
        actual = service.add(badInfo);
        assertEquals(ResultType.INVALID, actual.getType());

        Game badGenre = new Game(0, "Test", null, "Test info", null);
        actual = service.add(badGenre);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotAddExistingGame(){
        Game sameTitle = new Game(0, "Football", null, "Test info", "Test genre");
        when(gameRepository.findByTitle("Football")).thenReturn(new Game(7, "Football", null, "Test info", "Test genre"));
        Result<Game> actual = service.add(sameTitle);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate(){
        Game game = new Game(7, "Test", null, "Test info", "Test genre");
        when(gameRepository.update(game)).thenReturn(true);
        Result<Game> actual = service.update(game);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldDelete(){
        when(gameRepository.deleteById(2))
                .thenReturn(true);
        Result<Game> result = service.deleteById(2);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotDeleteInvalid(){
        Result<Game> result = service.deleteById(99);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }

    @Test
    void shouldNotDeleteIfInUse(){
        Result<Game> result = service.deleteById(3);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
    }
}
