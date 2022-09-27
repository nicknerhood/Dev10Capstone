package learn.game_finder.domain;

import learn.game_finder.data.GameRepository;
import learn.game_finder.models.Game;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    private final GameRepository gameRepository;

    private final JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public GameService(GameRepository gameRepository){
        this.gameRepository = gameRepository;
    }

    public List<Game> findAll(){
        return gameRepository.findAll();
    }

    public Game findById(int gameId){
        return gameRepository.findById(gameId);
    }

    public Game findByTitle(String title){
        return gameRepository.findByTitle(title);
    }

    public List<Game> findByGenre(String genre){
        return gameRepository.findByGenre(genre);
    }

    public Result<Game> add(Game game){
        Result<Game> result = validate(game);
        if(!result.isSuccess()){
            return result;
        }
        if(game.getGameId() != 0){
            result.addMessage("Game Id cannot be set for the add operation", ResultType.INVALID);
            return result;
        }
        game = gameRepository.add(game);
        result.setPayload(game);
        return result;
    }

    public Result<Game> update(Game game){
        Result<Game> result = validate(game);
        if(!result.isSuccess()){
            return result;
        }
        if(game.getGameId() <=0){
            result.addMessage("Game Id must be set for the update operation", ResultType.INVALID);
            return result;
        }
        if(!gameRepository.update(game)){
            String message = String.format("Game Id: %s not found", game.getGameId());
            result.addMessage(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Game> deleteById(int gameId){
        Result<Game> result = new Result<>();
        if(gameId <= 0){
            result.addMessage("Invalid id for deletion", ResultType.INVALID);
            return result;
        }
        if(gameRepository.findIfInUse(gameId)){
            result.addMessage("At this time, we cannot delete games that are in use.", ResultType.INVALID);
            return result;
        }
        if(!gameRepository.deleteById(gameId)){
            String message = String.format("Game Id: %s not found", gameId);
            result.addMessage(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<Game> validate(Game game){
        Result<Game> result = new Result<>();
        if(game == null){
            result.addMessage("Game cannot be null", ResultType.INVALID);
            return null;
        }
        if(Validations.isNullOrBlank(game.getTitle())){
            result.addMessage("Game Title is required", ResultType.INVALID);
        }
        if(Validations.isNullOrBlank(game.getGameInfo())){
            result.addMessage("Game Description is required", ResultType.INVALID);
        }
        if(Validations.isNullOrBlank(game.getGenre())){
            result.addMessage("Genre is required", ResultType.INVALID);
        }
        Game duplicate = gameRepository.findByTitle(game.getTitle());
        if(duplicate != null){
            result.addMessage("That Game already exists", ResultType.INVALID);
        }

        return result;
    }
}
