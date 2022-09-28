package learn.game_finder.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import learn.game_finder.data.GameRepository;
import learn.game_finder.models.Game;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class GameControllerTest {

    @MockBean
    GameRepository repository;

    @Autowired
    MockMvc mvc;

//    @Test
//    void addShouldReturn400WhenEmpty() throws Exception{
//        var request = post("/game")
//                .contentType(MediaType.APPLICATION_JSON);
//        mvc.perform(request)
//                .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    void addShouldReturn201() throws Exception{
//        Game game = new Game(0, "Test Game", null, "This is a test game", "Test");
//        Game expected = new Game(1, "Test Game", null, "This is a test game", "Test");
//
//        when(repository.add(any())).thenReturn(expected);
//        ObjectMapper jsonMapper = new ObjectMapper();
//
//        String gameJson = jsonMapper.writeValueAsString(game);
//        String expectedJson = jsonMapper.writeValueAsString(expected);
//
//        var request = post("/game")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(gameJson);
//        mvc.perform(request)
//                .andExpect(status().isCreated())
//                .andExpect(content().json(expectedJson));
//    }
}