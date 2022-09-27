package learn.game_finder.controllers;

import learn.game_finder.domain.GameService;
import learn.game_finder.domain.Result;
import learn.game_finder.models.Game;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/game")
public class GameController {
    private final GameService gameService;

    public GameController(GameService gameService){
        this.gameService = gameService;
    }

    @GetMapping
    public List<Game> findAll(){
        return gameService.findAll();
    }

    @GetMapping("/{gameId}")
    public ResponseEntity<Game> findById(@PathVariable int gameId){
        Game game = gameService.findById(gameId);
        if(game == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(game);
    }

    @GetMapping("/{title}")
    public ResponseEntity<Game> findByTitle(@PathVariable String title){
        Game game = gameService.findByTitle(title);
        if(game == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(game);
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody Game game){
        Result<Game> result = gameService.add(game);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{gameId}")
    public ResponseEntity<?> update(@PathVariable int gameId, @RequestBody Game game){
        if(gameId != game.getGameId()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Result<Game> result = gameService.add(game);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<?> update(@PathVariable int gameId){
        Result<Game> result = gameService.deleteById(gameId);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
