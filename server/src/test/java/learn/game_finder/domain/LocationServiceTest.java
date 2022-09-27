package learn.game_finder.domain;

import learn.game_finder.data.LocationRepository;
import learn.game_finder.models.Location;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class LocationServiceTest {

    @MockBean
    LocationRepository repository;

    @Autowired
    LocationService service;



}