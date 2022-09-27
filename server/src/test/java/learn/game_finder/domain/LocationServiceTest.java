package learn.game_finder.domain;

import learn.game_finder.data.LocationRepository;
import learn.game_finder.models.Location;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;



import static org.junit.jupiter.api.Assertions.*;
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

        location = makeLocation();
        location.setLatitude(null);
        location.setLongitude(null);
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
        assertEquals("Id must be set for 'update' operation", actual.getMessages().get(0));

        location = makeLocation();
        location.setLocationId(1);
        location.setLatitude(-2000.778);
        actual = service.update(location);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("latitude must be between -90 and 90", actual.getMessages().get(0));

        location = makeLocation();
        location.setLocationId(1);
        location.setLongitude(-333.333);
        actual = service.update(location);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("longitude must be between -180 and 180", actual.getMessages().get(0));

    }

    @Test
    void shouldUpdate(){
        Location location = makeLocation();
        location.setLocationId(1);

        when(repository.update(location)).thenReturn(true);

        Result<Location> actual = service.update(location);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }



    @Test
    void shouldDelete(){
        when(repository.deleteById(2)).thenReturn(true);
        assertTrue(service.deleteById(2));
    }

    @Test
    void shouldNotDeleteIfInUse(){
        when(repository.deleteById(1)).thenReturn(false);
        assertFalse(service.deleteById(1));
    }

    Location makeLocation() {
        Location location = new Location();
        location.setLatitude(-45.33);
        location.setLongitude(112.444);
        return location;
    }



}