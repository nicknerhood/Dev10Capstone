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
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class LocationServiceTest {

    @MockBean
    LocationRepository repository;

    @Autowired
    LocationService service;

    @Test
    void shouldNotAddOutOfRangeValues(){
        Location location = makeLocation();
        location.setLongitude(-185.99);
        Result<Location> actual = service.add(location);
        assertEquals(ResultType.INVALID, actual.getType() );


        location = makeLocation();
        location.setLatitude(115.55);
        actual = service.add(location);
        assertEquals(ResultType.INVALID, actual.getType() );

    }

    @Test
    void shouldAdd(){
        Location location = makeLocation();
        Location mockOut = makeLocation();
        mockOut.setLocationId(1);

        when(repository.add(location)).thenReturn(mockOut);

        Result<Location> actual = service.add(location);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Location location = makeLocation();
        Result<Location> actual = service.update(location);
        assertEquals(ResultType.INVALID, actual.getType());
    }

Location makeLocation() {
    Location location = new Location();
    location.setLatitude(-45.33);
    location.setLongitude(112.444);
    return location;
}

}