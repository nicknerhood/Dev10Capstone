package learn.game_finder.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import learn.game_finder.data.LocationRepository;
import learn.game_finder.models.Location;
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
class LocationControllerTest {

    @MockBean
    LocationRepository repository;

    @Autowired
    MockMvc mvc;

    @Test
    void addShouldReturn400WhenEmpty() throws Exception {
        var request = post("/location")
                .contentType(MediaType.APPLICATION_JSON);

        mvc.perform(request)
                .andExpect(status().isBadRequest());
    }

//    @Test
//    void addShouldReturn400WhenInvalid() throws Exception {
//        ObjectMapper jsonMapper = new ObjectMapper();
//
//        Location location = new Location();
//        location.setLongitude(-185.44);
//        location.setLatitude(32.44);
//        String locationJson = jsonMapper.writeValueAsString(location);
//
//        var request = post("/location")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(locationJson);
//
//        mvc.perform(request)
//                .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    void addShouldReturn201() throws Exception {
//        Location location = new Location();
//        location.setLocationId(0);
//        location.setLatitude(45.66);
//        location.setLongitude(112.321);
//
//        Location expected = new Location();
//        location.setLocationId(0);
//        location.setLatitude(45.66);
//        location.setLongitude(112.321);
//
//        when(repository.add(any())).thenReturn(expected);
//        ObjectMapper jsonMapper = new ObjectMapper();
//
//        String locationJson = jsonMapper.writeValueAsString(location);
//        String expectedJson = jsonMapper.writeValueAsString(expected);
//
//        var request = post("/location")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(locationJson);
//
//        mvc.perform(request)
//                .andExpect(status().isCreated())
//                .andExpect(content().json(expectedJson));
//    }

}